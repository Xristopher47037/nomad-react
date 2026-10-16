# NÖMAD — Proyecto Corte 2 (React + Vite)

Agencia ficticia de expediciones de aventura por Colombia, Brasil y Venezuela.
Proyecto de **Aplicaciones Web** — Cristopher Correa Arenas y Astrid Alvarado Gómez.

## Ejecutar

```bash
npm install        # instala react, react-dom, react-router-dom y vite
npm run dev        # http://localhost:5173
```

Requiere Node.js 18 o superior.

## Qué incluye (requisitos del Corte 2)

| Requisito | Dónde |
|---|---|
| **Componentes** reutilizables | `src/components/` → Navbar, Footer, SectionHead, DestinoCard, PaqueteCard, Campo, PanelEstado |
| **Enrutamiento con React Router** | `main.jsx` (`BrowserRouter`), `App.jsx` (`Routes`/`Route`, ruta dinámica `/destinos/:id`, 404 con `path="*"`), `Navbar.jsx` (`NavLink`), `DetalleDestino.jsx` (`useParams`), `MiViaje.jsx` (`useNavigate`) |
| **Formularios** controlados con `useState`, eventos y validación | `src/views/Contacto.jsx` → `formData`, `errors`, `handleChange`, `handleBlur`, `handleSubmit`, `validarCampo`, `validarTodo` |
| **Estado global con Context API** | `src/context/ViajeContext.jsx` → `ViajeContext`, `ViajeProvider`, hook `useViaje()` (cliente, carrito "Mi viaje", solicitudes) |
| **Persistencia con localStorage + useEffect** | `ViajeContext.jsx` → `useState(() => leerStorage(...))` para recuperar y un `useEffect` por estado para guardar (`nomad-cliente`, `nomad-carrito`, `nomad-solicitudes`) |

## Rutas

| URL | Vista |
|---|---|
| `/` | Inicio |
| `/destinos` | Destinos (filtro y búsqueda) |
| `/destinos/:id` | Detalle del destino (vista dinámica) |
| `/paquetes` | Paquetes + calculadora |
| `/mi-viaje` | Mi viaje (carrito persistente + historial de solicitudes) |
| `/nosotros` | Nosotros |
| `/contacto` | Formulario de cotización |
| cualquier otra | 404 |

## Estructura

```
src/
  main.jsx                 ViajeProvider + BrowserRouter + App
  App.jsx                  tabla de rutas (Routes / Route)
  data.js                  destinos y paquetes
  utils.js                 ocultarImagen
  context/ViajeContext.jsx estado global + localStorage
  components/              Navbar, Footer, SectionHead, DestinoCard, PaqueteCard, Campo, PanelEstado
  hooks/useTitulo.js
  views/                   Inicio, Destinos, DetalleDestino, Paquetes, MiViaje, Nosotros, Contacto, NotFound
public/img/                imágenes
```

## Cómo probar la persistencia

1. En **Paquetes**, pulsa "Agregar a mi viaje" en dos paquetes (el contador del Navbar sube).
2. Pulsa **F5**: el contador y la vista **Mi viaje** siguen igual.
3. Envía una cotización en **Contacto**, recarga y vuelve: tu nombre y correo aparecen precargados
   y la solicitud queda en el historial de **Mi viaje**.
4. En DevTools → Application → Local Storage se ven las claves `nomad-cliente`, `nomad-carrito` y `nomad-solicitudes`.
