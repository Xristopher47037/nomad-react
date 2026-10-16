import useTitulo from "../hooks/useTitulo.js";
import SectionHead from "../components/SectionHead.jsx";

const PUNTOS = [
  "Guías locales certificados en cada destino.",
  "Grupos reducidos: máximo 10 personas por expedición.",
  "Compensación directa a comunidades indígenas que resguardan el territorio.",
];

export default function Nosotros() {
  useTitulo("Nosotros");

  return (
    <section className="section">
      <SectionHead titulo="Nosotros" />
      <div className="about-grid">
        <p className="about-lead">
          NÖMAD nació de una idea simple: la mayoría de las agencias venden la foto, no el lugar.
          Nosotros mandamos gente a terreno real con guías que viven ahí.
        </p>
        <div className="about-points">
          {PUNTOS.map((texto, i) => (
            <div className="about-point" key={texto}>
              <span className="about-point-num">0{i + 1}</span>
              <p>{texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
