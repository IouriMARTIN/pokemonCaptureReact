import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
 plugins: [
 react(),
 VitePWA({
 registerType: "autoUpdate",
 manifest: {
 name: "Ma Super PWA React",
 short_name: "PWA React",
 theme_color: "#403ccf",
 background_color: "#F7F5FF",
 display: "standalone",
 icons: [
 /* on les ajoute après */
 ],
 },
 }),
 ],
});