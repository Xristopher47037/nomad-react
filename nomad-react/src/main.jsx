import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ViajeProvider } from "./context/ViajeContext.jsx";
import App from "./App.jsx";
import "./styles.css";

/* Orden de los "envoltorios":
   - ViajeProvider: comparte el estado global (cliente, carrito, solicitudes) con TODA la app.
   - BrowserRouter: habilita React Router (rutas, Link, useParams, useNavigate...). */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ViajeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ViajeProvider>
  </StrictMode>
);
