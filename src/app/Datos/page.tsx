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
      <div className="flex pt-[200px] flex-col justify-center gap-4 lg:p-0 lg:flex-row mt-0 lg:gap-5 lg:pr-5 lg:row-start-2 items-center lg:justify-between lg:pb-5 w-full lg:animate-l_to_r">
        <div className="bg-backimage shadow-lg lg:shadow-none h-[35vh] pt-[2rem] p-8 rounded-b-[50px] lg:h-full lg:rounded-none lg:w-2/6 lg:rounded-r-[80px] w-full animate-t_to_d lg:animate-none">
          imagen de elementos usados
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex at dolore aperiam nisi hic ab non distinctio magnam perspiciatis labore corporis aliquid deleniti, minus alias a, neque atque ipsam. Ab?
        </div>
        <div className="bg-backinfo h-full shadow-lg w-[98%] rounded-[50px] p-8 mx-4 lg:mx-0 animate-r_to_l lg:animate-none">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt fugit tempora nisi cupiditate repudiandae eligendi iste, molestiae optio molestias aliquid voluptatibus nam laborum doloremque ipsam vero minus voluptas, soluta voluptatem?
        </div>
      </div>
    </div>
  );
}
