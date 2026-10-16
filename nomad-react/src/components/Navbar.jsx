import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useViaje } from "../context/ViajeContext.jsx";

const LINKS = [
  ["/", "inicio"],
  ["/destinos", "destinos"],
  ["/paquetes", "paquetes"],
  ["/nosotros", "nosotros"],
  ["/contacto", "contacto"],
];

// Navbar con NavLink (React Router marca el link activo con la clase "active").
// El menú móvil se abre/cierra con un estado local (useState).
// El contador de "mi viaje" y el saludo vienen del CONTEXTO GLOBAL.
export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const { carrito, cliente } = useViaje();
  const cerrar = () => setAbierto(false);

  return (
    <header className="site-header">
      <nav className="nav">
        <Link to="/" className="nav-mark">NÖMAD</Link>
        <button
          className="nav-toggle"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto(!abierto)}
        >
          ☰
        </button>
        <ul className={`nav-links${abierto ? " open" : ""}`}>
          {LINKS.map(([to, texto]) => (
            <li key={to}>
              {/* "end" en "/" evita que inicio quede activo en todas las rutas */}
              <NavLink to={to} end={to === "/"} onClick={cerrar}>
                {texto}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/mi-viaje" className="nav-trip" onClick={cerrar}>
              mi viaje <span className="nav-badge">{carrito.length}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      {cliente.nombre && <p className="nav-hello">Hola, {cliente.nombre.split(" ")[0]} 👋</p>}
    </header>
  );
}
