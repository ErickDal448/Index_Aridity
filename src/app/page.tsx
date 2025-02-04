"use client"

import Link from "next/link";
import { navItems } from "./elements";
import Clouds from "./clouds";
import { motion } from "framer-motion";

const ShowVariant = {
  hidden: { 
    display: "none",
    opacity: 0
   },
  show: { 
    display: "flex",
    opacity: 1
   },
}

const fitTitle ={
  start: { top: "50%"  },
  end: {top: "10%"}
}


export default function Home() {
  return (
    <div className="bg-foreground items-center justify-items-center w-full h-full min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] flex flex-col items-center justify-center bg-background w-[80vw] h-[75vh] md:w-[40vw] md:h-[70vh] rounded-[60px] p-8 z-[9999] shadow-xl  animate-home"
      >
        <motion.div className="bg-background fixed top-[-20%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-xl flex items-center justify-center min-w-fit min-h-fit z-[99999]"
        variants={fitTitle}
        initial = "start"
        animate = "end"
        transition={{ duration: 2, ease: "easeOut", delay: 2 }}
        >
          <p className=" block text-foreground text-center font-bold text-3xl">
            Aridity Index
          </p>
        </motion.div>
        
        <motion.ul className="flex flex-col items-center justify-center gap-8 p-4"
        variants={ShowVariant}
        initial = "hidden"
        animate = "show"
        transition={{ duration: 3, ease: "easeOut", delay: 3 }}
        >
                {navItems.map((item) => (
                  <li
                  key={item.id}
                  className="flex items-center text-2xl gap-x-2 bg-bghover rounded-full p-3 text-foreground hover:text-primary hover:bg-backprimary">
                    <Link href={item.href}
                    className={`flex items-center w-full hover:text-primary`}
                    prefetch={false}>
                        <p>
                        {item.name}
                        </p>
                    </Link>
                  </li>
                ))}
        </motion.ul>
      </main>
        <div className="h-[100vh] w-[100vw] fixed top-0 left-0 delay-1000">
          <Clouds />
        </div>
        
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </div>
  );
}
