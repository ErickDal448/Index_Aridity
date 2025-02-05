"use client"
import React, { useEffect, useState } from 'react';
import { motion , useMotionValue } from 'framer-motion';

interface CloudProps {
  x: number;
  y: number;
  scale: number;
}

const Cloud1: React.FC<CloudProps> = ({ x, y, scale }) => {
  const [isClient, setIsClient] = useState(false);
  const windowWidth = useMotionValue(0);  
   const windowHeight = useMotionValue(0);
  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
    if (typeof window !== 'undefined') {
      windowWidth.set(window.innerWidth);  
      windowHeight.set(window.innerHeight);
  console.log(windowWidth.get())
    }
  }, []);
  return (
    <>
      {isClient && (
        <motion.div
          className="cloud absolute"
          style={{ left: x, top: y, scale }}
          animate={{ x: [-windowWidth.get(), windowWidth.get() +400], transition: { repeat: Infinity, duration: 60 } }}
        >
            <div className="cloud-shape animate-cloud blur opacity-75"> 
                <svg width="485" height="310" viewBox="0 0 970 620" fill='backinfo' xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="178" cy="324.5" rx="178" ry="173.5" />
                    <ellipse cx="752" cy="162.5" rx="218" ry="162.5" />
                    <ellipse cx="650" cy="347.5" rx="178" ry="173.5" />
                    <ellipse cx="472" cy="173.5" rx="178" ry="173.5" />
                    <ellipse cx="356" cy="446.5" rx="178" ry="173.5" />
                    <ellipse cx="294" cy="173.5" rx="178" ry="173.5" />
                </svg>
            </div>
        </motion.div>
      )}
    </>
  );
};
const Cloud2: React.FC<CloudProps> = ({ x, y, scale }) => {
  const [isClient, setIsClient] = useState(false);
  const windowWidth = useMotionValue(0);  
  const windowHeight = useMotionValue(0);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
    if (typeof window !== 'undefined') {
      windowWidth.set(window.innerWidth);  
        windowHeight.set(window.innerHeight);
    }
  }, []);
  return (
    <>
      {isClient && (
        <motion.div
          className="cloud absolute"
          style={{ left: x, top: y, scale }}
          animate={{ x: [-windowWidth.get(), windowWidth.get()*1.5], transition: { repeat: 0, duration: 60 } }}
        >
            <div className="cloud-shape animate-cloud blur opacity-75"> 
            <svg width="1223" height="443" viewBox="0 0 1223 443" fill="backinfo" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="276.5" cy="294" rx="276.5" ry="98"/>
                <ellipse cx="966" cy="98" rx="182" ry="98"/>
                <ellipse cx="946.5" cy="196" rx="276.5" ry="98"/>
                <ellipse cx="689.5" cy="127" rx="276.5" ry="98"/>
                <ellipse cx="675.5" cy="247" rx="276.5" ry="98"/>
                <ellipse cx="354.5" cy="345" rx="217.5" ry="98"/>
                <ellipse cx="398.5" cy="196" rx="276.5" ry="98"/>
            </svg>
            </div>
        </motion.div>
      )}
    </>
  );
};

const Clouds = () =>{
  const [seed, setSeed] = useState(Date.now());
  const [cloudData, setCloudData] = useState<CloudProps[]>([]); // <-- Almacena los datos aquí
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
          setIsClient(typeof window !== 'undefined');
    
          const generateCloudData = (seed: number) => { // <-- Mueve la función aquí
            const cloudData: CloudProps[] = [];
            const cloudWidth = 500; // Ancho aproximado de una nube
            const cloudHeight = 400; // Alto aproximado de una nube
            const margin = 500; // Margen entre nubes
          
            for (let i = 0; i < 3; i++) {
              seed = seed;
              const random = Math.random();
              cloudData.push({
                x: random * (window.innerWidth - cloudWidth - margin * 4) + margin, // <-- Usa window.innerWidth aquí
                y: random * (window.innerHeight - cloudHeight - margin * 3) + margin, // <-- Usa window.innerHeight aquí
                scale: 0.5 + random,
              });
            }
            return cloudData;
          };
    
          if (isClient) { // <-- Genera los datos solo en el cliente
            setCloudData(generateCloudData(seed));
          }
        }, [seed, isClient]);
  
    useEffect(() => {
      // Actualizar semilla
      const intervalId = setInterval(() => {
        setSeed(Date.now());
      }, 60000); // duracion de la animacion
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
        <div className="cloud-container">
          {isClient && (
            <>
               {cloudData.map((cloud, index) => (
                  <motion.div
                  key={index}>
                      <Cloud1 key={index + 5} {...cloud} />
                      <Cloud2 key={index + 10} {...cloud} />
                  </motion.div>
              ))}
            </>
          )}
      </div>
    );
  };
  
  export default Clouds;