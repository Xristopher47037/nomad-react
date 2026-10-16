import { useState } from "react";
import { Link } from "react-router-dom";
import { paquetes } from "../data.js";
import { useViaje } from "../context/ViajeContext.jsx";
import useTitulo from "../hooks/useTitulo.js";
import SectionHead from "../components/SectionHead.jsx";
import PaqueteCard from "../components/PaqueteCard.jsx";

export default function Paquetes() {
  useTitulo("Paquetes");

  // Del contexto global solo necesitamos la función para agregar al carrito
  const { agregarAlCarrito, estaEnCarrito } = useViaje();

  // Estados LOCALES de la calculadora (solo los usa esta vista)
  const [paqueteId, setPaqueteId] = useState(paquetes[0].id);
  const [viajeros, setViajeros] = useState("2");

  const paquete = paquetes.find((p) => p.id === paqueteId);
  const cantidad = Math.min(20, Math.max(1, parseInt(viajeros, 10) || 1));
  const total = paquete.precio * cantidad;

  return (
    <section className="section section--alt">
      <SectionHead titulo="Paquetes" texto="Elige una ruta, indica cuántos viajan y calculamos el total." />
      <div className="card-grid">
        {paquetes.map((p) => (
          <PaqueteCard key={p.id} paquete={p} />
        ))}
      </div>

      <div className="calculator">
        <h3>Calculadora de viaje</h3>
        <div className="calc-row">
          <div className="calc-field">
            <label htmlFor="calcPackage">Paquete</label>
            <select id="calcPackage" value={paqueteId} onChange={(e) => setPaqueteId(e.target.value)}>
              {paquetes.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>
          <div className="calc-field calc-field--narrow">
            <label htmlFor="calcTravelers">Viajeros</label>
            <input
              type="number"
              id="calcTravelers"
              min="1"
              max="20"
              value={viajeros}
              onChange={(e) => setViajeros(e.target.value)}
            />
          </div>
        </div>
        <div className="calc-result">
          <span className="calc-result-label">Total estimado</span>
          <span className="calc-result-value">USD ${total.toLocaleString("en-US")}</span>
        </div>
        <div className="calc-actions">
          <button type="button" className="btn btn-primary" onClick={() => agregarAlCarrito(paqueteId, cantidad)}>
            {estaEnCarrito(paqueteId) ? "Actualizar en mi viaje" : "Agregar a mi viaje"} ({cantidad} {cantidad === 1 ? "viajero" : "viajeros"})
          </button>
          <Link to="/mi-viaje" className="btn btn-ghost">Ver mi viaje</Link>
        </div>
      </div>
    </section>
  );
}
