// Componente reutilizable: encabezado de sección
export default function SectionHead({ titulo, texto }) {
  return (
    <div className="section-head">
      <h2>{titulo}</h2>
      {texto && <p>{texto}</p>}
    </div>
  );
}
