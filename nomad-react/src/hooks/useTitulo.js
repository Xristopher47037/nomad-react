import { useEffect } from "react";

// Cambia el título de la pestaña según la vista (antes lo hacía renderizar() en app.js)
export default function useTitulo(titulo) {
  useEffect(() => {
    document.title = `${titulo} · NÖMAD`;
  }, [titulo]);
}
