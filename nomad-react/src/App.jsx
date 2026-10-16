import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Inicio from "./views/Inicio.jsx";
import Destinos from "./views/Destinos.jsx";
import DetalleDestino from "./views/DetalleDestino.jsx";
import Paquetes from "./views/Paquetes.jsx";
import MiViaje from "./views/MiViaje.jsx";
import Nosotros from "./views/Nosotros.jsx";
import Contacto from "./views/Contacto.jsx";
import NotFound from "./views/NotFound.jsx";

export default function App() {
  const { pathname } = useLocation();

  // al cambiar de vista volvemos arriba de la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>
        {/* Tabla de rutas con React Router: URL -> vista */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/destinos/:id" element={<DetalleDestino />} /> {/* ruta dinámica */}
          <Route path="/paquetes" element={<Paquetes />} />
          <Route path="/mi-viaje" element={<MiViaje />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NotFound />} /> {/* cualquier otra ruta: 404 */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}
