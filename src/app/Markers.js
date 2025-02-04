
import L from "leaflet";
import {  useRef, useState } from "react";
import { Marker, Popup, useMapEvent  } from "react-leaflet";
import proj4 from 'proj4';
import 'proj4leaflet';
const DEFAULT_CENTER = L.latLng(24.59119, -107.39151); 
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs"); // WGS84 (latitud/longitud)
proj4.defs("EPSG:6372", "+proj=lcc +lat_1=17.5 +lat_2=29.5 +lat_0=12 +lon_0=-102 +x_0=2500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"); // EPSG:6372

const MARKER = `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?>
 <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.6363 26.2666C19.9945 29.7332 20.3418 29.4666 16.8683 31.9999C13.7421 29.8666 13.0474 29.5999 4.36353 26.2666C4.36353 23.6156 9.77025 22.3999 16.8683 22.3999C23.9663 22.3999 27.6363 23.6156 27.6363 26.2666Z" fill="#444444" fill-opacity="0.61"/>
<path d="M32 12.2444C21.4925 23.2222 21.9701 22.3778 17.194 30.4C12.8955 23.6444 11.9403 22.8 0 12.2444C0 3.84972 7.43425 0 17.194 0C26.9538 0 32 3.84972 32 12.2444Z" fill="#444444"/>
<ellipse cx="16.7273" cy="10.4002" rx="8" ry="7.2" fill="#F0F0C9"/>
</svg>

  `)}`;

  const MarkerIcon = L.icon({
      iconUrl: MARKER,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [0, 0],
  });
  
export function MovingMarker({ features, Year}) {
  const [position, setPosition] = useState(DEFAULT_CENTER);
  const [PopCategoria, setPopCategoria] = useState("...");
  const [PopSuperficie, setPopSuperficie] = useState(0);
  const [PopFlag, setPopFlag] = useState(false);
  const markerRef = useRef(null);

  function realizarConsultaWFS(latlng) {
    if(Year == 0)
    {
      return 0; 
    }
    var params = {
      SERVICE: 'WMS',
      VERSION: '1.1.1',
      REQUEST: 'GetFeatureInfo',
      QUERY_LAYERS: 'IA:ia_' + Year,
      LAYERS: 'IA:ia_' + Year,
      INFO_FORMAT: 'application/json', // O application/json si quieres JSON
      FEATURE_COUNT: 50, // Ajusta según tus necesidades
      X: 50, // Coordenada X (calculada, ver explicación abajo)
      Y: 50, // Coordenada Y (calculada, ver explicación abajo)
      SRS: 'EPSG:6372',
      WIDTH: 101, // Ancho de la imagen (calculado, ver explicación abajo)
      HEIGHT: 101, // Alto de la imagen (calculado, ver explicación abajo)
      BBOX: latlng.lng + ',' + latlng.lat + ',' + (latlng.lng + 10) + ',' + (latlng.lat + 10) // Bounding box (calculado, ver explicación abajo)
    };
    var url = 'http://localhost:8080/geoserver/IA/wms' + L.Util.getParamString(params);
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.features && data.features.length > 0) {
            setPopCategoria(data.features[0].properties.categoria);
            setPopSuperficie(data.features[0].properties.superficie);

            // Procesar los datos de la respuesta WFS
            console.log(PopCategoria);
            console.log(PopSuperficie);
            setPopFlag(true)
          } 
          else {
            // Procesar los datos de la respuesta WFS
            if(data.properties){
              setPopCategoria(data.properties.categoria);
              setPopSuperficie(data.properties.superficie);
              console.log(PopCategoria);
              console.log(PopSuperficie);
              setPopFlag(true)
            }
            else{
              setPopCategoria("...");
              setPopSuperficie(0);
              setPopFlag(false)
            }
            
          }
            
        })
        .catch(error => {
            console.error('Error al realizar la consulta WFS:', error);
        });
  }
    
  useMapEvent("click", (e) => {
    const clickLatlng = e.latlng;
    setPosition(e.latlng);
    if(Year == 0)
    {
      setPopFlag(false)
    }
    // Convertir a EPSG:6372
    if (clickLatlng && features) {
      const projectedCoords = proj4('EPSG:4326', 'EPSG:6372',  [clickLatlng.lng, clickLatlng.lat]);
      console.log(projectedCoords)
      const projectedLatLng = L.latLng(projectedCoords[1], projectedCoords[0]);
      realizarConsultaWFS(projectedLatLng)
    }
  });


  return (
    <>
      <Marker position={position} ref={markerRef} icon={MarkerIcon}>
        <Popup>
          <div className="items-center justify-center">
            <p>x: {position.lng.toFixed(2)}</p>
            <p>y: {position.lat.toFixed(2)}</p>
            {(PopFlag)? 
            <>
            <p> <strong>Categoria:</strong> {PopCategoria}</p>
            <p> <strong>Superficie:</strong>  {PopSuperficie.toFixed(2)}km²</p>
            </>
            :<></>}
          </div>
        </Popup>
      </Marker>
      
    </>
  );
}