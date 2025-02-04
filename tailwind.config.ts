import { transform } from "next/dist/build/swc/generated-native";
import { text } from "stream/consumers";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        abhaya: ['Abhaya Libre', 'serif'],
        'abhaya-extrabold': ['Abhaya Libre', 'sans-serif', '800'],
      },
      colors: {
        background: "var(--background)",
        bghover: "var(--backgroundhover)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        primaryback: "var(--primaryback)",
        backinfo: "var(--backinfo)",
        backimage: "var(--backimage)",
        backbtn: "var(--backbtn)",
        backmap: "var(--backmap)",
      },
      animation: {
        home: 'home 3s ease-in-out',
        inicio: 'inicio 3s ease-in-out',
        r_to_l: 'r_to_l 2s ease-out',
        l_to_r: 'l_to_r 2s ease-out',
        d_to_t: 'd_to_t 2s ease-out',
        t_to_d: 't_to_d 2s ease-out',
        cloud: 'cloud 15s infinite',
      },
      keyframes: {
        home:{
          '0%': {
            top:"50%",
            height: '100vh',
            width: '100vw',
          },
          '50%': {
            top:"50%",
            height: '50vh',
            width: '50vw',
          }
        },
        inicio: {
          '0%': {
            position:'fixed',
            fontSize: '40px',
            transform: 'translate(-20px, 42vh)',
            height: '300vh',
            width: '100vw',
            z_index:'99999',
          },
          '20%': {
            transform: 'translate(-15px, 35vh)',
            height: '100vh',
            width: '100vw',
          },
          '50%': {
            transform: 'translate(10px, 60px)',
            height: '10vh',
            width: '12rem',
          },
          '80%': {
            height: '3rem',
            width: 'auto',
            transform: 'translate(10px, 50px)',
          },
          '100%': {
            height: 'auto',
            width: 'auto',
          },
        },
        r_to_l: {
          '0%': {
            transform: 'translate(100vw, 0px)'
          },
          '40%': {
            transform: 'translate(100vw, 0px)'
          },
          '80%': {
            transform: 'translate(0px, 0px)'
          },
        },
        l_to_r: {
          '0%': {
            transform: 'translate(-100vw, 0px)'
          },
          '40%': {
            transform: 'translate(-100vw, 0px)'
          },
          '80%': {
            transform: 'translate(0px, 0px)'
          },
        },
        d_to_t: {
          '0%': {
            transform: 'translate(0vw, 100vh)'
          },
          '40%': {
            transform: 'translate(0vw, 100vh)'
          },
          '80%': {
            transform: 'translate(0px, 0px)'
          },
        },
        t_to_d: {
          '0%': {
            transform: 'translate(0vw, -100vh)'
          },
          '40%': {
            transform: 'translate(0vw, -100vh)'
          },
          '80%': {
            transform: 'translate(0px, 0px)'
          },
        },
        cloud:{
          '0%': {
            transform: 'translate(0vw, -100px)'
          },
          '50%': {
            transform: 'translate(0vw, 100px)'
          },
          '100%': {
            transform: 'translate(0px, -100px)'
          },
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
