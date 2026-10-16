import { useState } from "react";
import { destinos } from "../data.js";
import useTitulo from "../hooks/useTitulo.js";
import SectionHead from "../components/SectionHead.jsx";
import DestinoCard from "../components/DestinoCard.jsx";

export default function Destinos() {
  useTitulo("Destinos");

  // Estados: tipo de terreno elegido y texto de búsqueda
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  const tipos = ["todos", ...new Set(destinos.map((d) => d.tipo))];
  const texto = busqueda.trim().toLowerCase();
  const visibles = destinos.filter(
    (d) => (filtro === "todos" || d.tipo === filtro) && d.nombre.toLowerCase().includes(texto)
  );

  return (
    <section className="section">
      <SectionHead titulo="Destinos" texto="Filtra por tipo de terreno o busca uno en concreto." />
      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar destino por nombre…"
          autoComplete="off"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <div className="filter-group">
          {tipos.map((t) => (
            <button
              key={t}
              className={`filter-btn${filtro === t ? " active" : ""}`}
              onClick={() => setFiltro(t)}
            >
              {t.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {visibles.length === 0 && (
        <p className="no-results">No encontramos destinos con esos filtros.</p>
      )}
      <div className="card-grid">
        {visibles.map((d) => (
          <DestinoCard key={d.id} destino={d} />
        ))}
      </div>
    </section>
  );
}
