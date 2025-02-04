"use client";
import React, {useEffect, useRef, useState } from 'react';
import { OpItems, LegendOp } from "../elements";

import Map from "../Components/Map"
import Menu from '../downloadpdf';
import { MovingMarker } from '../Markers';
import { TileLayer, WMSTileLayer, WMSTileLayerProps } from 'react-leaflet'; 
import L from 'leaflet';

import { motion } from "framer-motion";
import axios from 'axios';
const DEFAULT_CENTER: L.LatLng = L.latLng(24.59119, -107.39151); 

//Motion variantes 
const legendVariant = {
  hidden: { height: "0px"},
  show: { height: 'auto'},
};

const ShowVariant = {
  hidden: { opacity: 0, display: "none"},
  show: { opacity: 1, display: "flex"},
};

//Generacion de parametros para datos de mapas
function useWmsParams(layer: string) {
  const [wmsParams, setWmsParams] = useState<WMSTileLayerProps>({
    url: "http://localhost:8080/geoserver/IA/wms",
    layers: "IA:" + layer, 
    format: "image/png",
    transparent: true,
    opacity: 0.7,
  });
  // useEffect para actualizar wmsParams cuando cambia layer
  useEffect(() => {
    setWmsParams((prevParams) => ({ ...prevParams, layers: "IA:" + layer }));
  }, [layer]);

  return wmsParams;
}


export default function Home() {
  const [featuresData, setfeaturesData] = useState({});
  const [YearSelected, setYearSelected] = useState("");
  // constantes de deteccion de menu parametros
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleOptionMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

//Obtener datos de la capa IA
async function getFeatures(IaYear: string) {
  console.log("Features from year: " + IaYear)
  const url = `http://localhost:8080/geoserver/IA/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IA:ia_${IaYear}&maxFeatures=50&outputFormat=application%2Fjson`;
  try {
    const response = await axios.get(url);
    setfeaturesData(response.data.features);
    console.log(featuresData)
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}
  //constantes para detectar el layer de terreno y aplicarlo en wmsParams
  const [selectedLayer, setSelectedLayer] = useState<string>('');
  const wmsParams = useWmsParams(selectedLayer); 

  //constantes para detectar el layer de Ia y aplicarlo en wmsParams
  const [selectedLayerIa, setSelectedLayerIa] = useState<string>('');
  const wmsParamsIa = useWmsParams(selectedLayerIa);

  //Constantes booleanas para detectar si abrir o cerrar la leyenda del mapa
  const [LegendFlag, setLegendFlag] = useState(true);
  const [IaFlag, setIaFlag] = useState(false);
  
  //Funcion de apertura de leyenda
  const toggleLegend = () => {
    setLegendFlag(!LegendFlag);
  };
  //Funcion de deteccion de layer de IA (Si no tiene la capa IA borra el leayer de IA o lo vuelve a generar en caso de que vuelva a cargar)
  const toggleIaTo = (SFlag : string) => {
    setIaFlag(SFlag == "ia" ? true: false)
    
    if(SFlag != "ia"){
      setSelectedLayerIa("ia_")
    }
    else{
      const selectAño = document.getElementById('año') as HTMLSelectElement;
      setSelectedLayerIa("ia_" + selectAño.value)
    }
  };

  //Variables de menu de descarga de pdf
  const [isDownMenuOpen, setIsDownMenuOpen] = useState(false);
  //Funcion de cambio de bandera de menu de descarga
  const toggleDownMenu = () => {
    setIsDownMenuOpen(!isDownMenuOpen);
  };

  //Return principal de la pagina
  const mapRef = useRef<HTMLDivElement>(null);
  const mapRefGeo = useRef<HTMLDivElement>(null);
  return (
    <div className="bg-foreground h-[calc(100vh_-_68px)] items-center justify-items-center font-[family-name:var(--font-geist-sans)]" id='root'>
      {/* Menu de parametros */}
      <div className="absolute top-0 h-[100vh] w-[100vw]  ">
        <div className={`absolute bottom-0 md:right-0 bg-backmap flex flex-col md:flex-row justify-center items-center z-[9999] p-[3px_3px_0px_3px] md:p-0 md:p-[3px_0px_3px_3px] w-full md:h-[calc(100vh-50px)] md:w-auto rounded-t-[30px] md:rounded-none md:rounded-l-[30px] min-w-screen shadow-lg animate-d_to_t md:animate-r_to_l transform transition-transform duration-300 ease-in-out gap-1`}>
          <div className="flex flex-row md:flex-col justify-around px-2 pt-2 bg-background w-full h-full rounded-t-[30px] md:rounded-none md:rounded-l-[30px] md:h-full max-h-[85px] md:max-h-none md:max-w-[85px]">
          {OpItems.map((item) => (
              <button className="flex bg-primaryback icon-map-menu-circle rounded-full p-1 " 
              onClick={toggleOptionMenu} id={item.id} key={item.id}
                type="button">
                <svg className="m-2"  viewBox={item.Box} width="40" height="40"  xmlns="http://www.w3.org/2000/svg">
                  <path d={item.path} className="icon-map-menu" strokeWidth="5"  strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
          ))}
          </div>
          {/* Elementos del menu parametros */}
          <div className={`bg-background h-full w-full flex flex-col items-center justify-center ${
              isMenuOpen ? "flex" : "hidden"
            }`}>
           {OpItems.map((item, index) => (  
            <div key={item.id} className="w-full h-full flex justify-around">
              {index + 1 === OpItems.length ? ( /* Generar boton de descarga de menu parametros */
                <button
                  className="flex bg-primaryback w-auto h-auto flex items-center my-auto icon-map-menu-circle rounded-full p-3"
                  onClick={toggleDownMenu}
                  id={item.id}
                  type="button"
                >
                  <p className="font-bold text-primary text-lg">
                    {item.Op}
                  </p>
                </button>
              ) : ( /* Generar selects de menu parametros */
                <div className='w-full h-full p-3 flex items-center justify-center flex-col'>
                  <p className='text-foreground font-bold '> {"Selección de " + item.Op}</p>
                  <select
                    id={item.Op}
                    disabled= {(!IaFlag && item.Op === "año")? true : false }
                    className="bg-foreground text-background p-3 rounded-full font-bold w-full text-center"
                    onChange={(e) => {
                      if(item.Op === "terreno"){
                        const selectedOption = item.Cont.find(
                          (option) => option.info === e.target.value
                        );
                        if (selectedOption) {
                          setSelectedLayer(selectedOption.enlace);
                        }
                      }
                      if(item.Op === "año"){
                        const selectedOption = item.Cont.find(
                          (option) => option.info === e.target.value
                        );
                        if (selectedOption) {
                          setSelectedLayerIa("ia_"+selectedOption.enlace);
                          getFeatures(selectedOption.enlace)
                          setYearSelected(selectedOption.enlace);
                        }
                      }
                      if(item.Op === "muestra"){
                        const selectedOption = item.Cont.find(
                          (option) => option.info === e.target.value
                        );
                        if (selectedOption) {
                          toggleIaTo(selectedOption.enlace);
                        }
                      }
                    }}
                  >
                    {item.Cont?.map((elemento, index) => (
                      <option key={index}>{elemento.info}</option>
                    ))}
                  </select>
                </div>

              )}
            </div>
          ))}
          </div>
        </div>
      </div>
      
      {/* Mapa */}
      <div className=" px-4 pt-4 md:p-0 md:py-6 md:pl-6 h-full w-full">
        <div className="flex bg-backmap p-1 md:p-2 h-full w-full rounded-t-[30px] md:rounded-none md:rounded-l-[30px] animate-d_to_t md:animate-r_to_l">
          <div ref={mapRef} className="row-start-1 h-full w-full">
            <div className={`z-[999] absolute left-[5rem] min-h-[20px] min-w-[8.5rem] bg-backmap rounded-b-xl cursor-pointer ${!IaFlag ? "hidden" : "block"}`} onClick={toggleLegend}>
              {/* Leyenda */}
              <motion.div
                      className='text-xs p-2 bg-backmap rounded-b-xl pointer'
                      variants={legendVariant}
                      initial="hidden"
                      animate={LegendFlag ? "show" : "hidden"}
                      transition={{ duration: 2, ease: "easeOut" }}
                      onClick={toggleLegend}
                    >
                      {LegendOp.map((item, Index) => (
                        <motion.div
                          className='flex flex-row p-1 gap-2'
                          key={Index}
                          variants={ShowVariant}
                          initial="hidden"
                          animate={LegendFlag ? "show" : "hidden"}
                          transition={{ duration: 1, ease: "easeOut", delay: 1 + Index * 0.4 }}
                          onClick={toggleLegend}
                        >
                          <div
                            style={{ background: item.color }}
                            className='h-[15px] w-[15px] border-solid rounded-full'
                          />
                          <p>{item.name}</p>
                        </motion.div>
                      ))}
                    </motion.div>
            </div>
            <div className='w-full h-full' >
              {/* Generación de mapa */}
              <Map mapRefGeo={mapRefGeo} className=" rounded-t-[30px] md:rounded-none md:rounded-l-[30px] w-full h-full mapDOM" center={DEFAULT_CENTER} zoom={6}>
                  <>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <WMSTileLayer key={wmsParams.layers} {...useWmsParams(selectedLayer)} />
                    
                    <WMSTileLayer key={"ia_" + wmsParamsIa.layers} {...useWmsParams(selectedLayerIa)} />
                  </>
                  <MovingMarker features={featuresData} Year={IaFlag ? YearSelected : 0}/>
              </Map>
            </div>
          </div>
        </div>
      </div>
      {/* Menu de descarga */}
      <Menu isOpen={isDownMenuOpen} onClose={() => setIsDownMenuOpen(false)} features={featuresData} mapRef={mapRef} IaFlag={IaFlag} IaYear={YearSelected}/>
        
    </div>
  );
}
