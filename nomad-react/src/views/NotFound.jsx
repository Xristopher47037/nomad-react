import { Link } from "react-router-dom";
import { ocultarImagen } from "../utils.js";
import useTitulo from "../hooks/useTitulo.js";

// Página 404
export default function NotFound() {
  useTitulo("404");

  return (
    <section className="section not-found not-found-bg">
      <img src="/img/404.jpeg" alt="" className="bg-404" onError={ocultarImagen} />
      <div className="contenido-404">
        <p>ERROR 404</p>
        <h1>Territorio sin mapear</h1>
        <p className="hero-sub">La página que buscas no existe o fue movida.</p>
        <Link to="/" className="btn btn-primary btn-404">Volver al inicio</Link>
      </div>
    </section>
  );
}
