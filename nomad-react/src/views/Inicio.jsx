import { destinos } from "../data.js";
import { Link } from "react-router-dom";
import { ocultarImagen } from "../utils.js";
import useTitulo from "../hooks/useTitulo.js";
import { useViaje } from "../context/ViajeContext.jsx";
import SectionHead from "../components/SectionHead.jsx";
import DestinoCard from "../components/DestinoCard.jsx";

export default function Inicio() {
  useTitulo("Inicio");
  const { cliente, carrito } = useViaje(); // datos del contexto global (persisten tras recargar)

  return (
    <>
      <section className="hero">
        <img src="/img/hero-agencia.jpg" alt="" className="hero-bg-img" onError={ocultarImagen} />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-coords">05°32'N — 73°21'O</p>
          <h1>El mapa termina<br />donde empieza NÖMAD.</h1>
          <p className="hero-sub">
            Expediciones de aventura y naturaleza por Colombia, Brasil y Venezuela. Territorio real,
            guías locales, cero relleno.
          </p>
          <div className="hero-actions">
            <Link to="/destinos" className="btn btn-primary">Ver destinos</Link>
            <Link to="/paquetes" className="btn btn-ghost">Ver paquetes</Link>
          </div>
        </div>
      </section>

      {carrito.length > 0 && (
        <div className="resume-strip">
          <p>
            {cliente.nombre ? `${cliente.nombre.split(" ")[0]}, tienes` : "Tienes"}{" "}
            <strong>{carrito.length} {carrito.length === 1 ? "paquete" : "paquetes"}</strong> guardados en tu viaje.
          </p>
          <Link to="/mi-viaje" className="btn btn-primary">Continuar mi viaje</Link>
        </div>
      )}

      <section className="section">
        <SectionHead titulo="Destinos destacados" texto="Tres puntos del mapa para empezar." />
        <div className="card-grid">
          {destinos.slice(0, 3).map((d) => (
            <DestinoCard key={d.id} destino={d} />
          ))}
        </div>
      </section>
    </>
  );
}
