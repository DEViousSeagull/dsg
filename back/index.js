// Importacion de modulos de terceros
const express = require("express");
const cors = require('cors');

// Importacion de los routers
const ventasTicketsRouter = require("./routes/VentasTickets.js");
const clientesRouter = require("./routes/Clientes.js");
const empleadosRouter = require("./routes/Empleados.js");
const sucursalesRouter = require("./routes/Sucursales.js");
const atraccionesRouter = require("./routes/Atracciones.js");

// Crear la base de datos si no existe
require("./base-orm/sqlite-init.js");

// Creacion de la app
const app = express();

// Configuracion de la app
app.use(express.json());

// Configuración de CORS
app.use(cors());

app.use(ventasTicketsRouter);
app.use(clientesRouter);
app.use(empleadosRouter);
app.use(sucursalesRouter);
app.use(atraccionesRouter);

const port = process.env.PORT || 4000;

// Ruta principal
app.get("/", (req, res) => {
    res.status(200).send('TPI DDS - Etapa 1');
});

// Si es el proceso principal, levantar el servidor
if (!module.parent) {
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
}

module.exports = app;