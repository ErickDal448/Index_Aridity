
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.scss';

const { MapContainer } = ReactLeaflet;

const Map = ({mapRefGeo, children, className, ...rest }) => {
  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }
  
  return (
    <MapContainer ref={mapRefGeo} className={mapClassName} {...rest}>
      {children}
    </MapContainer>
  )
}

export default Map;
