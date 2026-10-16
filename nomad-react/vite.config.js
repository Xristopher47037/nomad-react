import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "/" porque BrowserRouter usa rutas reales (/destinos/...) y las imágenes se piden desde la raíz
export default defineConfig({
  base: "/",
  plugins: [react()],
});
