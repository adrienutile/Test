import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({base:"/Test/",plugins:[react(),VitePWA({registerType:"autoUpdate",manifest:{name:"Dofus Retro Speedrun",short_name:"Dofus",start_url:"/Test/",scope:"/Test/",display:"standalone",theme_color:"#553013",background_color:"#392617",icons:[{src:"icon-192.png",sizes:"192x192",type:"image/png"},{src:"icon-512.png",sizes:"512x512",type:"image/png"}]},workbox:{globPatterns:["**/*.{js,css,html,png,jpg,svg}"]}})]});