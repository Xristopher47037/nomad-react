import { useViaje } from "../context/ViajeContext.jsx";

// Componente reutilizable: tarjeta de paquete (Paquetes y detalle de destino).
// El botón usa el CONTEXTO GLOBAL para agregar el paquete a "Mi viaje".
export default function PaqueteCard({ paquete: p }) {
  const { estaEnCarrito, agregarAlCarrito, quitarDelCarrito } = useViaje();
  const agregado = estaEnCarrito(p.id);

  return (
    <article className={`pkg-card${agregado ? " is-added" : ""}`}>
      <div className="pkg-body">
        <div className="pkg-top">
          <h3>{p.nombre}</h3>
          <span className="pkg-cat">{p.categoria}</span>
        </div>
        <p className="pkg-meta">{p.destino} · {p.duracion} días</p>
        <p className="pkg-desc">{p.descripcion}</p>
        <div className="pkg-price-row">
          <span className="pkg-price">USD ${p.precio}</span>
          <span className="pkg-price-unit">por persona</span>
        </div>
        <button
          type="button"
          className={`btn ${agregado ? "btn-ghost" : "btn-primary"} pkg-btn`}
          onClick={() => (agregado ? quitarDelCarrito(p.id) : agregarAlCarrito(p.id))}
        >
          {agregado ? "✓ En mi viaje · quitar" : "+ Agregar a mi viaje"}
        </button>
      </div>
    </article>
  );
}
