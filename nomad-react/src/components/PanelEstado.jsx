// Panel de desarrollo: muestra en vivo el estado del formulario (useState)
// y los eventos que React va capturando (onChange / onBlur / onSubmit).
// Sirve como evidencia visual de la actividad.
// Proyecto Corte 2: también muestra el estado GLOBAL que llega del contexto.
export default function PanelEstado({ formData, errors, eventos, contexto }) {
  const erroresActivos = Object.fromEntries(Object.entries(errors).filter(([, mensaje]) => mensaje));

  return (
    <details className="debug-panel" id="panelEstado">
      <summary>Panel de desarrollo · estado del formulario y eventos</summary>
      <div className="debug-grid">
        <div>
          <h4>formData (useState)</h4>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
        <div>
          <h4>errors (useState)</h4>
          <pre>{JSON.stringify(erroresActivos, null, 2)}</pre>
        </div>
        {contexto && (
          <div>
            <h4>Contexto global (useViaje)</h4>
            <pre>{JSON.stringify(contexto, null, 2)}</pre>
          </div>
        )}
        <div>
          <h4>Eventos capturados (más reciente primero)</h4>
          <ol className="debug-log">
            {eventos.length === 0 && <li>— escribe en el formulario —</li>}
            {eventos.map((texto, i) => (
              <li key={`${i}-${texto}`}>{texto}</li>
            ))}
          </ol>
        </div>
      </div>
    </details>
  );
}
