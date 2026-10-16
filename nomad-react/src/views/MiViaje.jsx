import { Link, useNavigate } from "react-router-dom";
import { useViaje } from "../context/ViajeContext.jsx";
import useTitulo from "../hooks/useTitulo.js";
import SectionHead from "../components/SectionHead.jsx";

/* Vista "Mi viaje": todo lo que muestra viene del CONTEXTO GLOBAL.
   Como el contexto se guarda en localStorage, esta vista sigue llena
   aunque el usuario recargue la página o cierre el navegador. */
export default function MiViaje() {
  useTitulo("Mi viaje");
  const navigate = useNavigate(); // navegación desde código (React Router)
  const {
    itemsCarrito,
    totalCarrito,
    cambiarViajeros,
    quitarDelCarrito,
    vaciarCarrito,
    solicitudes,
    borrarSolicitudes,
  } = useViaje();

  return (
    <section className="section">
      <SectionHead
        titulo="Mi viaje"
        texto="Paquetes guardados. Se conservan aunque recargues la página (localStorage)."
      />

      {itemsCarrito.length === 0 ? (
        <div className="empty-box">
          <p>Todavía no has agregado paquetes a tu viaje.</p>
          <Link to="/paquetes" className="btn btn-primary">Ver paquetes</Link>
        </div>
      ) : (
        <div className="trip">
          <ul className="trip-list">
            {itemsCarrito.map((item) => (
              <li className="trip-item" key={item.id}>
                <div className="trip-info">
                  <h3>{item.nombre}</h3>
                  <p className="pkg-meta">{item.destino} · {item.duracion} días · USD ${item.precio} por persona</p>
                </div>
                <div className="trip-qty" aria-label={`Viajeros para ${item.nombre}`}>
                  <button type="button" onClick={() => cambiarViajeros(item.id, item.viajeros - 1)} aria-label="Quitar un viajero">−</button>
                  <span>{item.viajeros}</span>
                  <button type="button" onClick={() => cambiarViajeros(item.id, item.viajeros + 1)} aria-label="Agregar un viajero">+</button>
                </div>
                <span className="trip-subtotal">USD ${item.subtotal.toLocaleString("en-US")}</span>
                <button type="button" className="trip-remove" onClick={() => quitarDelCarrito(item.id)}>quitar</button>
              </li>
            ))}
          </ul>

          <div className="calc-result">
            <span className="calc-result-label">Total del viaje</span>
            <span className="calc-result-value">USD ${totalCarrito.toLocaleString("en-US")}</span>
          </div>

          <div className="calc-actions">
            <button type="button" className="btn btn-primary" onClick={() => navigate("/contacto")}>
              Solicitar cotización
            </button>
            <button type="button" className="btn btn-ghost" onClick={vaciarCarrito}>Vaciar viaje</button>
          </div>
        </div>
      )}

      <h2 className="detail-sub">Mis solicitudes enviadas</h2>
      {solicitudes.length === 0 ? (
        <p className="no-results">Aún no has enviado solicitudes desde el formulario de contacto.</p>
      ) : (
        <>
          <ul className="request-list">
            {solicitudes.map((s) => (
              <li key={s.id} className="request-item">
                <span className="request-date">{s.fecha}</span>
                <strong>{s.paquete}</strong> · {s.viajeros} {s.viajeros === 1 ? "viajero" : "viajeros"} · USD $
                {s.total.toLocaleString("en-US")}
                <span className="request-mail">{s.nombre} — {s.email}</span>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-ghost" onClick={borrarSolicitudes}>Borrar historial</button>
        </>
      )}
    </section>
  );
}
