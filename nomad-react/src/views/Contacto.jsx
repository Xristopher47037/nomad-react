import { useState } from "react";
import { Link } from "react-router-dom";
import { paquetes } from "../data.js";
import { useViaje } from "../context/ViajeContext.jsx";
import useTitulo from "../hooks/useTitulo.js";
import SectionHead from "../components/SectionHead.jsx";
import Campo from "../components/Campo.jsx";
import PanelEstado from "../components/PanelEstado.jsx";

/* ============================================================
   ACTIVIDAD 6 — Formulario de contacto con estados (useState)
   PROYECTO CORTE 2 — ahora también usa el CONTEXTO GLOBAL:
     · precarga nombre/correo del cliente guardado (localStorage)
     · precarga el primer paquete de "Mi viaje"
     · al enviar, guarda el cliente y la solicitud en el contexto
   ============================================================ */

/* ---------- Constantes ---------- */
const VALORES_INICIALES = { nombre: "", email: "", paquete: "", viajeros: "", mensaje: "" };
const MAX_MENSAJE = 300;

/* ---------- VALIDACIONES ----------
   Funciones puras (no usan estado): reciben el nombre del campo y su valor
   y devuelven el texto del error. Si el campo está bien devuelven "". */
function validarCampo(nombre, valor) {
  const v = String(valor).trim();

  switch (nombre) {
    case "nombre":
      if (!v) return "El nombre es obligatorio.";
      if (v.length < 3) return "Escribe al menos 3 caracteres.";
      if (!/^(?=.*\p{L})[\p{L}' -]+$/u.test(v)) return "Usa solo letras y espacios.";
      return "";

    case "email":
      if (!v) return "El correo es obligatorio.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Ingresa un correo válido (ej: nombre@correo.com).";
      return "";

    case "paquete":
      return v ? "" : "Selecciona un paquete de interés.";

    case "viajeros": {
      if (!v) return "Indica cuántos viajeros son.";
      const n = Number(v);
      if (!Number.isInteger(n) || n < 1 || n > 20) return "Debe ser un número entero entre 1 y 20.";
      return "";
    }

    case "mensaje":
      if (!v) return "Cuéntanos qué necesitas.";
      if (v.length < 10) return "El mensaje debe tener al menos 10 caracteres.";
      if (v.length > MAX_MENSAJE) return `Máximo ${MAX_MENSAJE} caracteres.`;
      return "";

    default:
      return "";
  }
}

// Valida todos los campos y devuelve un objeto { campo: "mensaje de error" } solo con los que fallan
function validarTodo(datos) {
  const errores = {};
  for (const nombre of Object.keys(VALORES_INICIALES)) {
    const mensaje = validarCampo(nombre, datos[nombre]);
    if (mensaje) errores[nombre] = mensaje;
  }
  return errores;
}

export default function Contacto() {
  useTitulo("Contacto");

  /* ---------- 0) CONTEXTO GLOBAL (useContext a través de useViaje) ---------- */
  const { cliente, setCliente, itemsCarrito, agregarSolicitud } = useViaje();

  // Valores con los que arranca el formulario: datos del cliente guardado + primer paquete de "Mi viaje"
  const datosIniciales = () => ({
    ...VALORES_INICIALES,
    nombre: cliente.nombre,
    email: cliente.email,
    paquete: itemsCarrito[0]?.id ?? "",
    viajeros: itemsCarrito[0] ? String(itemsCarrito[0].viajeros) : "",
  });

  /* ---------- 1) ESTADOS LOCALES con useState() ---------- */
  const [formData, setFormData] = useState(datosIniciales); // lo que el usuario escribe
  const [errors, setErrors] = useState({});                    // errores de validación por campo
  const [confirmacion, setConfirmacion] = useState(null);      // datos de la solicitud ya enviada
  const [eventos, setEventos] = useState([]);                  // bitácora de eventos (panel de desarrollo)

  // Guarda un evento en la bitácora y lo muestra también en la consola del navegador
  const registrar = (texto) => {
    const hora = new Date().toLocaleTimeString("es-CO", { hour12: false });
    console.log(`[${hora}] ${texto}`);
    setEventos((prev) => [`${hora}  ${texto}`, ...prev].slice(0, 8));
  };

  /* ---------- 2) onChange: se ejecuta en CADA cambio de un campo ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target; // "name" del input = clave dentro de formData

    // actualizamos solo la clave que cambió y conservamos las demás
    setFormData((prev) => ({ ...prev, [name]: value }));

    // si el campo ya mostraba un error, lo revalidamos mientras el usuario corrige
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validarCampo(name, value) }));
    }

    registrar(`onChange → ${name} = "${value}"`);
  };

  // onBlur: al salir de un campo se valida solo ese campo
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validarCampo(name, value) }));
  };

  /* ---------- 3) onSubmit: se ejecuta al enviar el formulario ---------- */
  const handleSubmit = (e) => {
    e.preventDefault(); // evita que el navegador recargue la página

    const nuevosErrores = validarTodo(formData);
    setErrors(nuevosErrores);

    const cantidadErrores = Object.keys(nuevosErrores).length;
    if (cantidadErrores > 0) {
      registrar(`onSubmit → bloqueado: ${cantidadErrores} campo(s) con error`);
      // llevamos el cursor al primer campo con error
      const primerError = Object.keys(nuevosErrores)[0];
      e.currentTarget.elements[primerError]?.focus();
      return;
    }

    // Todo válido: preparamos el mensaje de confirmación personalizado
    const paquete = paquetes.find((p) => p.id === formData.paquete);
    const viajeros = Number(formData.viajeros);

    const solicitud = {
      nombre: formData.nombre.trim(),
      email: formData.email.trim(),
      paquete: paquete.nombre,
      viajeros,
      total: paquete.precio * viajeros,
    };
    setConfirmacion(solicitud);

    // CONTEXTO GLOBAL: recordamos al cliente y guardamos la solicitud en el historial.
    // Ambos se persisten solos en localStorage gracias al useEffect del Provider.
    setCliente({ nombre: solicitud.nombre, email: solicitud.email });
    agregarSolicitud({ ...solicitud, mensaje: formData.mensaje.trim() });

    registrar(`onSubmit → enviado: ${formData.nombre.trim()} · ${paquete.nombre} · ${viajeros} viajero(s)`);

    // y dejamos el formulario limpio (conservando nombre y correo del cliente)
    setFormData({ ...VALORES_INICIALES, nombre: solicitud.nombre, email: solicitud.email });
    setErrors({});
  };

  const nuevaSolicitud = () => {
    setConfirmacion(null);
    registrar("Nueva solicitud: formulario reiniciado");
  };

  /* ---------- 4) Vista (JSX) ---------- */
  return (
    <section className="section">
      <SectionHead titulo="Solicitar cotización" texto="Cuéntanos qué expedición te interesa." />

      {!confirmacion && cliente.nombre && (
        <p className="form-hint">
          Hola de nuevo, {cliente.nombre.split(" ")[0]}: cargamos tus datos guardados.
        </p>
      )}

      {confirmacion ? (
        /* Mensaje de confirmación PERSONALIZADO: usa los datos que guardamos en el estado */
        <div className="form-confirmation confirm-card" role="status" id="confirmacion">
          <h3>¡Gracias, {confirmacion.nombre}! Recibimos tu solicitud.</h3>
          <p>
            Estamos preparando la cotización de <strong>{confirmacion.paquete}</strong> para{" "}
            <strong>{confirmacion.viajeros === 1 ? "1 viajero" : `${confirmacion.viajeros} viajeros`}</strong>.
          </p>
          <p>
            Te escribiremos a <strong>{confirmacion.email}</strong> en las próximas 24 horas.
          </p>
          <p className="confirm-total">Total estimado: USD ${confirmacion.total.toLocaleString("en-US")}</p>
          <div className="calc-actions">
            <button type="button" className="btn btn-ghost" onClick={nuevaSolicitud}>
              Hacer otra solicitud
            </button>
            <Link to="/mi-viaje" className="btn btn-primary">Ver mis solicitudes</Link>
          </div>
        </div>
      ) : (
        <form className="quote-form" id="quoteForm" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <Campo id="nombre" label="Nombre completo *" error={errors.nombre}>
              <input
                type="text"
                id="nombre"
                name="nombre"
                autoComplete="name"
                value={formData.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.nombre}
                aria-describedby="err-nombre"
              />
            </Campo>

            <Campo id="email" label="Correo electrónico *" error={errors.email}>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.email}
                aria-describedby="err-email"
              />
            </Campo>

            <Campo id="paquete" label="Paquete de interés *" error={errors.paquete}>
              <select
                id="paquete"
                name="paquete"
                value={formData.paquete}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.paquete}
                aria-describedby="err-paquete"
              >
                <option value="">Selecciona…</option>
                {paquetes.map((p) => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
            </Campo>

            <Campo id="viajeros" label="Número de viajeros *" error={errors.viajeros}>
              <input
                type="number"
                id="viajeros"
                name="viajeros"
                min="1"
                max="20"
                value={formData.viajeros}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.viajeros}
                aria-describedby="err-viajeros"
              />
            </Campo>

            <Campo id="mensaje" label="Mensaje *" error={errors.mensaje} full>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="5"
                placeholder="Fechas aproximadas, nivel de experiencia, dudas…"
                value={formData.mensaje}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.mensaje}
                aria-describedby="err-mensaje"
              />
              <span className={`char-count${formData.mensaje.length > MAX_MENSAJE ? " is-over" : ""}`}>
                {formData.mensaje.length}/{MAX_MENSAJE}
              </span>
            </Campo>
          </div>

          <button type="submit" className="btn btn-primary btn-submit">Enviar solicitud</button>
        </form>
      )}

      <PanelEstado
        formData={formData}
        errors={errors}
        eventos={eventos}
        contexto={{ cliente, carrito: itemsCarrito.map((i) => `${i.id} x${i.viajeros}`) }}
      />
    </section>
  );
}
