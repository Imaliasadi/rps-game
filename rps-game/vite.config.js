import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "logo-192.png", "logo-512.png"],
      filename: "manifest.webmanifest", // یا "manifest.json"
      manifest: {
        name: "Rock Paper Scissors Game",
        short_name: "RPS Game",
        description: "Play Rock Paper Scissors Lizard Spock!",
        start_url: "/",
        display: "standalone",
        background_color: "#1f3756",
        theme_color: "#1f3756",
        icons: [
          {
            src: "/logo-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
