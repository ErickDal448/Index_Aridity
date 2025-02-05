
import * as ReactLeaflet from 'react-leaflet';
import {useEffect, useState } from 'react';

import styles from './Map.module.scss';

const { MapContainer } = ReactLeaflet;
const { TileLayer } = ReactLeaflet;
const { WMSTileLayer } = ReactLeaflet;

const Map = ({mapRefGeo, wmsParams, wmsParamsIa, children, className, ...rest }) => {
  let mapClassName = styles.map;
  const [isClient, setIsClient] = useState(false); 

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
    if (typeof window !== 'undefined') { 
      import('leaflet/dist/leaflet.css');
      
    }
  }, []);

  return (
    <>
      {isClient ? (
        <MapContainer ref={mapRefGeo} className={mapClassName} {...rest}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <WMSTileLayer key={wmsParams.layers} {...wmsParams} />
                                
          <WMSTileLayer key={"ia_" + wmsParamsIa.layers} {...wmsParamsIa} />
          {children}
        </MapContainer>
        ) :(<></>)
      }
    </>
  )
}

export default Map;