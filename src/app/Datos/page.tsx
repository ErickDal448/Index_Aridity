import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="bg-foreground text-background lg:grid lg:grid-rows-[250px_auto] justify-items-center min-h-screen  gap-5 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-end lg:flex-row justify-between w-full">
        <div className="w-10/12 hidden shadow-lg lg:flex items-center justify-center bg-backinfo h-full lg:w-2/6 rounded-r-full lg:animate-l_to_r">
        <Image
          src="/Data_img.svg"
          alt="Imagen de pregunta"
          width={250}
          height={250}
        />
        </div>
        <div className='abhaya absolute shadow-lg lg:static flex h-[250px] rounded-b-[50px] items-center justify-center bg-backinfo font-extrabold w-full text-4xl md:text-5xl lg:rounded-none lg:rounded-l-full xl:text-5xl 2xl:text-6xl lg:w-3/5 animate-t_to_d lg:animate-r_to_l'>
          <p className="lg:pl-10 text-center">¿De dondé salieron nuestros datos?</p>
        </div>
      </div>
      <div className="flex pt-[200px] flex-col justify-center gap-4 lg:p-0 lg:flex-row mt-0 lg:gap-3 lg:pr-5 lg:row-start-2 items-center lg:justify-between lg:pb-5 w-full lg:animate-l_to_r">
        <div className="bg-backimage shadow-lg h-[auto] pt-[2rem] p-6 rounded-b-[50px] lg:h-full lg:p-0 lg:py-6 lg:pr-6 lg:rounded-none lg:w-[40%] lg:rounded-r-[80px] w-full animate-t_to_d lg:animate-none">
          <div className="bg-backinfo h-full w-[auto] pt-6 rounded-b-[60px] flex justify-center items-center lg:hidden">
            <Image
              src="/Flujo-de-trabajo.svg"
              alt="Imagen del flujo de trabajo"
              width={700}
              height={400}
            />
          </div>
          <div className="bg-backinfo hidden h-full w-[auto] p-2 lg:rounded-none lg:rounded-r-[40px] flex justify-center items-center lg:block">
            <Image
              src="/Flujo-de-trabajo-vertical.svg"
              alt="Imagen del flujo de trabajo"
              width={500}
              height={5000}
            />
          </div>
        </div>
        <div className="bg-backinfo h-full shadow-lg w-[98%] rounded-[50px] p-8 mx-4 lg:mx-0 animate-r_to_l lg:animate-none items-center flex flex-col">
          <p className="text-justify text-lg">
            ⪢ Primeramente se tomaron los datos de precipitaciones y evapotranspiración de la pagina (https://app.climateengine.org/climateEngine). <br></br><br></br>
            ⪢ A partir de estos datos se manipularon a traves de un script de phyton el cual hace uso de ArcPy, GDAL, numpy y pandas para el procesamiento de estos datos, haciendo uso de aplicaciones como ArcMap se toma como referencia las coordenadas de INEGI, La proyección Lambert Conformal Conic EPSG:6372. (Para mas informacion de este apartado ir al articulo -&gt; ... enlace de articulo ...)<br></br> <br></br>
            ⪢ Teniendo los archivos .shp generados a partir de este script se publican en nuestro servidor de postgresql con la extencion de postgis, esta extencion permite la manipulacion de datos geometricos y espaciales. <br></br><br></br>
            ⪢ Con la base de datos postgresql montada se sube la base de datos en el servidor intermedio de geoserver, este servidor permite la manipulación de los datos geoespaciales y transformarlos en mapas con sus respectivos datos, ademas permite generar un enlace para mostrarlo en esta página web. (Para mas informacion ir al articulo -&gt; ... nombre de articulo ...) <br></br><br></br>
            ⪢ Finalmente los estilos de este se presentan a traves de una tabla de referencia de datos, donde se usan los limites de categorias de indice de aridez, la cual es la siguiente:
            <br></br><br></br>
          </p>
          <table className="table-fixed border-collapse border border-gray-400 text-center">
            <thead>
              <tr>
                <th className="border border-gray-500 p-2">Índice de aridez (IA)</th>
                <th className="border border-gray-500 p-2">Tipo de clima / Suelo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-500"> Mayor que 0.65</td>
                <td className="border border-gray-500">Húmedo</td>
              </tr>
              <tr>
                <td className="border border-gray-500">Entre 0.65 y 0.5</td>
                <td className="border border-gray-500">Subhúmedo seco</td>
              </tr>
              <tr>
                <td className="border border-gray-500">Entre 0.5 y 0.2</td>
                <td className="border border-gray-500">Semiárido</td>
              </tr>
              <tr>
                <td className="border border-gray-500">Entre 0.2 y 0-05</td>
                <td className="border border-gray-500">Árido</td>
              </tr>
              <tr>
                <td className="border border-gray-500">Menor que 0.05</td>
                <td className="border border-gray-500">Hiperárido</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
