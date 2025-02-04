import Image from "next/image";
import React, { Suspense } from "react";

export default function Home() {
  return (
    <div className="bg-foreground pb-6 text-background lg:grid lg:grid-rows-[250px_auto_auto] lg:justify-items-center min-h-screen  gap-5 font-[family-name:var(--font-geist-sans)] ">
      <div className="lg:row-start-1 flex justify-between w-full">
        <div className="w-10/12 h-[150px] shadow-lg absolute lg:static flex items-center justify-end pr-10 bg-backinfo lg:h-full lg:w-2/6 rounded-r-full animate-l_to_r">
        <Suspense fallback={
          <div className="flex justify-center items-center p-4 h-full w-full">
            <div className="animate-pulse flex h-full w-full p-auto space-x-4">
              <div className="rounded-full bg-slate-700 h-full w-full"></div>
              <div className="rounded-full bg-slate-700 h-full w-full"></div>
            </div>
          </div>
        }> 
          <Image
            className="min-w-[100px] max-w-[120px] lg:min-w-[150px] "
            src="/logo_uas.svg"
            alt="uas logo"
            width={150}
            height={150}
          />
          <Image
            className="min-w-[130px] lg:min-w-[200px]"
            src="/fic_logo.svg"
            alt="fic logo"
            width={150}
            height={150}
          />
        </Suspense>
        </div>
        <div className='abhaya hidden lg:flex flex-col justify-center bg-backinfo font-extrabold md:text-3xl xl:text-4xl 2xl:text-5xl h-full w-3/5 rounded-l-full shadow-lg animate-r_to_l'>
          <p className="pl-10 pb-3">Universidad Autónoma de Sinaloa</p>
          <p className="pl-10">Facultad de Informática de Culiacán</p>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-center mt-[110px] mb-6 lg:gap-4 px-4 lg:p-0 lg:flex-row lg:m-0 lg:gap-8 lg:pl-8 lg:row-start-2 items-center lg:justify-between w-full animate-d_to_t md:animate-r_to_l">
        <div className="bg-backinfo h-full w-full rounded-b-[50px] lg:rounded-[50px] p-8  shadow-lg ">
        <p className="abhaya text-2xl">Universidad Autónoma de Sinaloa</p>
          <hr className="border-background pb-3"/>
          <p>
          Hoy en día, la UAS es una de las universidades más importantes de México, ofreciendo una amplia gama de programas académicos en diversos campos del conocimiento. Su compromiso con la educación de calidad y su contribución al desarrollo social y cultural de Sinaloa la han consolidado como una institución de prestigio.
          </p>
          <ul className="list-disc sm:pl-6">
            <p className="font-bold"> Algunos datos de interes:</p>
            <li> <strong>Fundación:</strong> 4 de diciembre de 1965. </li>
            <li> <strong>Ubicación:</strong> Principalmente en Culiacán, Sinaloa, aunque cuenta con diversas unidades académicas en todo el estado.</li>
            <li> <strong>Oferta académica:</strong> Bachillerato, licenciaturas, maestrías, doctorados y programas de educación continua.</li>
            <li> <strong>Impacto social:</strong>  Ha formado a generaciones de profesionales que han contribuido al desarrollo de Sinaloa y de México.</li>
          </ul>
        </div>
        <div className="bg-backimage  h-full justify-center flex lg:rounded-none lg:w-2/6 lg:rounded-l-[80px] rounded-t-[50px] w-full p-4 pb-0 lg:p-0 lg:py-4 lg:pl-4 ">
            <Image
              className="rounded-t-[50px] lg:rounded-none lg:rounded-l-[50px] max-h-[500px]"
              src="/Uas_img.svg"
              alt="fic foto"
              style={{objectFit: "cover"}}
              width={600}
              height={600}
            />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center px-4 pb-6 lg:p-0 lg:flex-row mt-0 lg:gap-8 lg:pr-8 row-start-3 lg:justify-between w-full animate-d_to_t md:animate-l_to_r">
        <div className="bg-backimage  h-full justify-center flex lg:rounded-none lg:w-2/6 lg:rounded-r-[80px] rounded-t-[50px] w-full p-4 pb-0 lg:p-0 lg:py-4 lg:pr-4">
          <Image
            className="rounded-t-[50px] lg:rounded-none lg:rounded-r-[50px] max-h-[500px]"
            src="/Fic_img.svg"
            alt="fic foto"
            style={{objectFit: "cover"}}
            width={600}
            height={600}
          />
        </div>
        <div className="bg-backinfo flex flex-col h-full w-full text-justify rounded-b-[50px] lg:rounded-[50px] p-8 shadow-lg">
          <p className="abhaya text-2xl">Facultad de Informática de Culiacán</p>
          <hr className="border-background pb-3"/>
          <p>
          La FIC es una institución académica de la Universidad Autónoma de Sinaloa (UAS) dedicada a la formación de profesionales en el campo de la informática. Se enfoca en brindar una educación de calidad y actualizada, preparando a sus estudiantes para enfrentar los desafíos del mundo digital.
          </p>
          <ul className="list-disc sm:pl-6">
            <p className="font-bold"> Algunos datos de interes:</p>
            <li> <strong>Fundación:</strong> febrero de 1994 </li>
            <li> <strong>Ubicación:</strong> <a href="https://maps.app.goo.gl/RSECyEVaxxKLWENX9" target="_blank" rel="noopener noreferrer"><u>C. Josefa Ortiz de Domínguez, Cd Universitaria, CIUDAD UNIVERSITARIA, 80013 Culiacán Rosales, Sin.</u></a></li>
            <li> <strong>Impacto social:</strong>Institución clave para el desarrollo tecnológico de Sinaloa y México. Su compromiso con la excelencia académica, la innovación y la vinculación con el sector productivo la posicionan como un referente en la formación de profesionales de la informática.</li>
            <li> <strong>Oferta académica:</strong>
              <ul className="list-disc sm:pl-6">
                <li>Licenciatura en Informática:</li>
                <li>Ingeniería en Telecomunicaciones, Sistemas y Electrónica.</li>
                <li>Ingeniería en Ciencia de Datos.</li>
                <li>postgrado en Ciencias de la Computación tanto de maestria como de doctorado.</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
