import { Link, useParams } from "react-router-dom";
import { destinos, paquetes } from "../data.js";
import { ocultarImagen } from "../utils.js";
import useTitulo from "../hooks/useTitulo.js";
import PaqueteCard from "../components/PaqueteCard.jsx";
import NotFound from "./NotFound.jsx";

// Vista DINÁMICA: el contenido depende del :id de la URL (/destinos/parque-tayrona)
export default function DetalleDestino() {
  const { id } = useParams(); // React Router entrega el parámetro :id de la URL
  const d = destinos.find((destino) => destino.id === id);

  useTitulo(d ? d.nombre : "404");

  // si el id no existe en los datos, mostramos la página 404
  if (!d) return <NotFound />;

  const relacionados = paquetes.filter((p) =>
    d.nombre.split(" y ").some((k) => p.destino.includes(k))
  );

  return (
    <section className="section detail">
      <Link to="/destinos" className="back-link">← volver a destinos</Link>
      <div className={`dest-media detail-media dest-media--${d.fondo}`}>
        <img src={d.img} alt={d.nombre} onError={ocultarImagen} />
        <span className="dest-tag">{d.tipo}</span>
      </div>
      <h1>{d.nombre}</h1>
      <p className="dest-loc">{d.ubicacion}</p>
      <p className="detail-text">{d.descripcion}</p>
      <p className="dest-feature">★ {d.destacado}</p>
      <h2 className="detail-sub">Paquetes que incluyen este destino</h2>
      <div className="card-grid">
        {relacionados.length > 0 ? (
          relacionados.map((p) => <PaqueteCard key={p.id} paquete={p} />)
        ) : (
          <p className="no-results">Aún no hay paquetes para este destino.</p>
        )}
      </div>
    </section>
  );
}
