import Image from "next/image";
import React from "react";
import { artItems } from "../elements";

export default function Home() {
  return (
    <div className="bg-foreground text-background grid grid-rows-[150px_auto] md:grid-rows-[200px_auto] lg:grid-rows-[250px_auto] justify-items-center min-h-screen gap-1 lg:gap-5 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-1 flex sm:flex-col sm:items-end lg:flex-row justify-between w-full">
        <div className="w-10/12 shadow-lg hidden lg:flex items-center justify-center pr-14 bg-backinfo h-full lg:w-2/6 rounded-r-full lg:animate-l_to_r">
        <Image
          src="/articulo_icon.svg"
          alt="icono de articulo"
          width={150}
          height={150}
        />
        </div>
        <div className='abhaya flex rounded-b-[50px] items-center justify-center bg-backinfo font-extrabold w-full text-4xl shadow-lg md:text-5xl lg:rounded-none lg:rounded-l-full xl:text-5xl 2xl:text-6xl h-full lg:w-3/5 animate-t_to_d lg:animate-r_to_l'>
          <p className="lg:pl-10 text-center">Nuestros artículos de divulgación</p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-top gap-4 p-4 mt-0 lg:gap-8 row-start-2 w-full ">
        {artItems.map((item, Index) => ( 
            <div className="bg-backinfo flex flex-col lg:flex-row lg:justify-between w-full rounded-[50px] p-6 shadow-lg lg:gap-8 animate-d_to_t" key={Index}>
              <div className="bg-gray-600 min-h-[15rem] md:min-h-0 py-6 rounded-[30px] shadow-xl lg:max-w-[25%] w-full">
                <div className="bg-backimage abhaya font-extrabold text-2xl text-foreground w-fit max-w-[75%] rounded-r-[30px] px-8 shadow-lg md:hidden">
                  {item.autor}
                </div>
                imagen de {item.title}
              </div>
              <div className="flex flex-col lg:w-full">
                <p className="font-bold text-2xl pt-3">{item.title}</p>
                <hr className="border-background pb-3"/>
                <p className="font-bold text-1xl hidden md:block"> por: {item.autor} </p>
                <p className="font-bold text-1xl">publicado el: {item.fecha}</p>
                <p className="font-bold text-1xl">{item.info}</p>
                <div className="flex justify-end lg:px-10">
                  <a href={item.href} className="bg-backbtn rounded-full w-fit px-6 py-3 shadow-lg text-foreground hover:text-primary lg:text-[1.2rem]">
                    ir al artículo
                  </a>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
