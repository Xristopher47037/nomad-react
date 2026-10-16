import { Link } from "react-router-dom";
import { ocultarImagen } from "../utils.js";

// Componente reutilizable: tarjeta de destino (Inicio y Destinos)
export default function DestinoCard({ destino: d }) {
  return (
    <Link className="dest-card" to={`/destinos/${d.id}`}>
      <div className={`dest-media dest-media--${d.fondo}`}>
        <img src={d.img} alt={d.nombre} onError={ocultarImagen} />
        <span className="dest-tag">{d.tipo}</span>
      </div>
      <div className="dest-body">
        <div className="dest-top">
          <h3>{d.nombre}</h3>
          <span className="dest-loc">{d.ubicacion}</span>
        </div>
        <p>{d.descripcion}</p>
        <p className="dest-feature">★ {d.destacado}</p>
      </div>
    </Link>
  );
}
