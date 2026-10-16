/* Datos: destinos y paquetes */
export const destinos = [
  {
    id: "parque-tayrona",
    fondo: "tayrona",
    nombre: "Parque Tayrona",
    tipo: "Playa",
    ubicacion: "Magdalena, Colombia",
    descripcion: "Selva tropical que cae directo sobre playas de arena blanca vigiladas por la Sierra Nevada. Senderos cortos, agua turquesa, ni un edificio a la vista.",
    destacado: "Playa Cabo San Juan, la más fotografiada del Caribe colombiano",
    img: "/img/tayrona.jpg"
  },
  {
    id: "cano-cristales",
    fondo: "cano",
    nombre: "Caño Cristales",
    tipo: "Río",
    ubicacion: "Meta, Colombia",
    descripcion: "El \"río de los cinco colores\": una planta acuática endémica tiñe el lecho de rojo, verde y amarillo entre junio y noviembre.",
    destacado: "Fenómeno natural único en el mundo",
    img: "/img/cano-cristales.jpg"
  },
  {
    id: "valle-de-cocora",
    fondo: "cocora",
    nombre: "Valle de Cocora",
    tipo: "Montaña",
    ubicacion: "Quindío, Colombia",
    descripcion: "Caminata de altura entre palmas de cera —el árbol nacional de Colombia y la palma más alta del mundo— con niebla de eje cafetero.",
    destacado: "Palmas de hasta 60 metros de altura",
    img: "/img/valle-cocora.jpg"
  },
  {
    id: "ciudad-perdida",
    fondo: "perdida",
    nombre: "Ciudad Perdida",
    tipo: "Trekking",
    ubicacion: "Sierra Nevada, Colombia",
    descripcion: "Cuatro a cinco días de selva y río hasta una ciudad Tairona de 700 d.C., 650 años más antigua que Machu Picchu.",
    destacado: "1.200 escalones de piedra original",
    img: "/img/ciudad-perdida.jpg"
  },
  {
    id: "chapada-diamantina",
    fondo: "chapada",
    nombre: "Chapada Diamantina",
    tipo: "Trekking",
    ubicacion: "Bahía, Brasil",
    descripcion: "Mesetas, cañones y cuevas de cuarzo en el corazón de Bahía. La Cachoeira da Fumaça es una de las caídas de agua más altas de Brasil.",
    destacado: "Cuevas con lagunas de agua cristalina",
    img: "/img/chapada-diamantina.jpg"
  },
  {
    id: "pantanal",
    fondo: "pantanal",
    nombre: "Pantanal",
    tipo: "Selva",
    ubicacion: "Mato Grosso, Brasil",
    descripcion: "El humedal más grande del planeta. Mayor densidad de fauna observable de Sudamérica: jaguares, caimanes, guacamayas.",
    destacado: "Mejor lugar del mundo para ver jaguares salvajes",
    img: "/img/pantanal.jpg"
  },
  {
    id: "foz-do-iguacu",
    fondo: "iguazu",
    nombre: "Foz do Iguaçu",
    tipo: "Río",
    ubicacion: "Paraná, Brasil",
    descripcion: "275 saltos de agua repartidos en casi 3 km de selva subtropical, en la frontera entre Brasil y Argentina.",
    destacado: "Garganta del Diablo, el salto más caudaloso",
    img: "/img/foz-iguazu.jpg"
  },
  {
    id: "canaima-y-salto-angel",
    fondo: "canaima",
    nombre: "Canaima y Salto Ángel",
    tipo: "Selva",
    ubicacion: "Bolívar, Venezuela",
    descripcion: "Vuelo en avioneta sobre la sabana hasta la catarata ininterrumpida más alta del mundo: 979 metros de caída libre.",
    destacado: "16 veces más alta que las Cataratas del Niágara",
    img: "/img/canaima-salto-angel.jpg"
  },
  {
    id: "los-roques",
    fondo: "roques",
    nombre: "Los Roques",
    tipo: "Playa",
    ubicacion: "Dependencias Federales, Venezuela",
    descripcion: "Archipiélago de coral con más de 300 cayos deshabitados y agua de un turquesa que no se ve en fotos de verdad.",
    destacado: "Parque nacional marino desde 1972",
    img: "/img/los-roques.jpg"
  },
  {
    id: "monte-roraima",
    fondo: "roraima",
    nombre: "Monte Roraima",
    tipo: "Montaña",
    ubicacion: "Gran Sabana, Venezuela",
    descripcion: "Tepuy de 2.800 millones de años que inspiró \"El Mundo Perdido\" de Conan Doyle. Seis días de trekking hasta un paisaje de otro planeta.",
    destacado: "Formación rocosa más antigua de la Tierra",
    img: "/img/monte-roraima.jpg"
  }
];

export const paquetes = [
  {
    id: "ciudad-perdida",
    nombre: "Expedición Ciudad Perdida",
    destino: "Ciudad Perdida, Colombia",
    duracion: 5,
    precio: 650,
    categoria: "Aventura",
    descripcion: "Trekking de selva y río hasta las ruinas Tairona. Campamentos, guía local y mulas de carga incluidas."
  },
  {
    id: "costa-salvaje",
    nombre: "Costa Salvaje",
    destino: "Parque Tayrona, Colombia",
    duracion: 3,
    precio: 450,
    categoria: "Familiar",
    descripcion: "Playas vírgenes y senderos cortos de selva. Ideal para primerizos o viajes en familia."
  },
  {
    id: "colores-colombia",
    nombre: "Colores de Colombia",
    destino: "Caño Cristales + Valle de Cocora",
    duracion: 4,
    precio: 650,
    categoria: "Naturaleza",
    descripcion: "El río de los cinco colores y las palmas de cera más altas del mundo, en una sola ruta."
  },
  {
    id: "gigantes-brasil",
    nombre: "Gigantes de Brasil",
    destino: "Foz do Iguaçu + Pantanal",
    duracion: 6,
    precio: 1000,
    categoria: "Premium",
    descripcion: "Las cataratas más caudalosas del planeta y el mejor avistamiento de fauna de Sudamérica."
  },
  {
    id: "chapada-extremo",
    nombre: "Chapada Extremo",
    destino: "Chapada Diamantina, Brasil",
    duracion: 5,
    precio: 1200,
    categoria: "Aventura",
    descripcion: "Trekking técnico entre cañones, cuevas de cuarzo y las cascadas más altas de Bahía."
  },
  {
    id: "venezuela-salvaje",
    nombre: "Venezuela Salvaje",
    destino: "Salto Ángel + Monte Roraima",
    duracion: 7,
    precio: 1100,
    categoria: "Premium",
    descripcion: "La catarata más alta del mundo y el tepuy que inspiró El Mundo Perdido, en una sola expedición."
  },
  {
    id: "los-roques-relax",
    nombre: "Los Roques Relax",
    destino: "Los Roques, Venezuela",
    duracion: 3,
    precio: 550,
    categoria: "Económico",
    descripcion: "Archipiélago de coral, cayos desiertos y snorkel. La escapada de playa más simple del catálogo."
  }
];
