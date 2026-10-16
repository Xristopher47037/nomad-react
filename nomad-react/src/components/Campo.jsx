// Componente reutilizable: campo de formulario (etiqueta + control + mensaje de error).
// El control (input, select, textarea) llega como "children"; el error llega por props.
export default function Campo({ id, label, error, full = false, children }) {
  const clases = ["form-field", error && "has-error", full && "form-field--full"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={clases}>
      <label htmlFor={id}>{label}</label>
      {children}
      <span className="field-error" id={`err-${id}`} role="alert">
        {error}
      </span>
    </div>
  );
}
