
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.scss';

const { MapContainer } = ReactLeaflet;
const { TileLayer } = ReactLeaflet;
const { WMSTileLayer } = ReactLeaflet;

const Map = ({mapRefGeo, wmsParams, wmsParamsIa, children, className, ...rest }) => {
  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }
  
  return (
    <MapContainer ref={mapRefGeo} className={mapClassName} {...rest}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <WMSTileLayer key={wmsParams.layers} {...wmsParams} />
                            
      <WMSTileLayer key={"ia_" + wmsParamsIa.layers} {...wmsParamsIa} />
      {children}
    </MapContainer>
  )
}

export default Map;
