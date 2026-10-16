import { createContext, useContext, useEffect, useState } from "react";
import { paquetes } from "../data.js";

/* ============================================================
   CONTEXTO GLOBAL "ViajeContext" (Context API + localStorage)
   ------------------------------------------------------------
   Guarda la información que varias vistas necesitan a la vez:
     - cliente     → datos de quien cotiza (nombre y correo)
     - carrito     → paquetes que el usuario agregó a "Mi viaje"
     - solicitudes → historial de cotizaciones enviadas
   Cada uno se guarda en localStorage con useEffect, así que al
   recargar la página (F5) la información NO se pierde.
   ============================================================ */

// 1) Crear el contexto
export const ViajeContext = createContext(null);

// Claves con las que se guarda cada dato en localStorage
const CLAVES = {
  cliente: "nomad-cliente",
  carrito: "nomad-carrito",
  solicitudes: "nomad-solicitudes",
};

/* Lee un valor de localStorage. Si no existe o el texto está dañado,
   devuelve el valor por defecto. localStorage solo guarda TEXTO, por
   eso se usa JSON.parse() para reconstruir el objeto o el arreglo. */
function leerStorage(clave, valorPorDefecto) {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorPorDefecto;
  } catch {
    return valorPorDefecto;
  }
}

// 2) Crear el Provider: componente que administra el estado y lo comparte
export function ViajeProvider({ children }) {
  /* useState con FUNCIÓN inicial: se ejecuta solo una vez, al crear el estado.
     Primero consulta localStorage; si no hay nada, usa el valor vacío. */
  const [cliente, setCliente] = useState(() => leerStorage(CLAVES.cliente, { nombre: "", email: "" }));
  const [carrito, setCarrito] = useState(() => leerStorage(CLAVES.carrito, []));
  const [solicitudes, setSolicitudes] = useState(() => leerStorage(CLAVES.solicitudes, []));

  /* useEffect: cada vez que un estado cambia, se guarda su copia en localStorage.
     JSON.stringify() convierte el objeto/arreglo en texto para poder guardarlo. */
  useEffect(() => {
    localStorage.setItem(CLAVES.cliente, JSON.stringify(cliente));
  }, [cliente]);

  useEffect(() => {
    localStorage.setItem(CLAVES.carrito, JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem(CLAVES.solicitudes, JSON.stringify(solicitudes));
  }, [solicitudes]);

  /* ---------- Funciones del carrito ("Mi viaje") ---------- */
  const estaEnCarrito = (paqueteId) => carrito.some((item) => item.id === paqueteId);

  // Agrega un paquete; si ya estaba, solo actualiza la cantidad de viajeros
  const agregarAlCarrito = (paqueteId, viajeros = 1) => {
    const n = Math.min(20, Math.max(1, viajeros));
    setCarrito((prev) =>
      prev.some((item) => item.id === paqueteId)
        ? prev.map((item) => (item.id === paqueteId ? { ...item, viajeros: n } : item))
        : [...prev, { id: paqueteId, viajeros: n }]
    );
  };

  const quitarDelCarrito = (paqueteId) => {
    setCarrito((prev) => prev.filter((item) => item.id !== paqueteId));
  };

  const cambiarViajeros = (paqueteId, cantidad) => {
    const n = Math.min(20, Math.max(1, cantidad)); // entre 1 y 20, igual que el formulario
    setCarrito((prev) => prev.map((item) => (item.id === paqueteId ? { ...item, viajeros: n } : item)));
  };

  const vaciarCarrito = () => setCarrito([]);

  /* Valores calculados (no son estado: se recalculan en cada render a partir del carrito) */
  const itemsCarrito = carrito
    .map((item) => {
      const paquete = paquetes.find((p) => p.id === item.id);
      return paquete ? { ...paquete, viajeros: item.viajeros, subtotal: paquete.precio * item.viajeros } : null;
    })
    .filter(Boolean);
  const totalCarrito = itemsCarrito.reduce((suma, item) => suma + item.subtotal, 0);

  /* ---------- Funciones de solicitudes ---------- */
  const agregarSolicitud = (solicitud) => {
    const nueva = { ...solicitud, id: Date.now(), fecha: new Date().toLocaleString("es-CO") };
    setSolicitudes((prev) => [nueva, ...prev]);
  };

  const borrarSolicitudes = () => setSolicitudes([]);

  // 3) value: todo lo que los componentes podrán leer con useViaje()
  const value = {
    cliente,
    setCliente,
    carrito,
    itemsCarrito,
    totalCarrito,
    estaEnCarrito,
    agregarAlCarrito,
    quitarDelCarrito,
    cambiarViajeros,
    vaciarCarrito,
    solicitudes,
    agregarSolicitud,
    borrarSolicitudes,
  };

  return <ViajeContext.Provider value={value}>{children}</ViajeContext.Provider>;
}

// 4) Hook propio para consumir el contexto con useContext() desde cualquier componente
export function useViaje() {
  const contexto = useContext(ViajeContext);
  if (!contexto) throw new Error("useViaje() debe usarse dentro de <ViajeProvider>");
  return contexto;
}
