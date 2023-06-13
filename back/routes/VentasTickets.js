const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { tablas } = require("../constantes/tablas");

const { ventasTickets: { atributos } } = tablas;

// GET /api/VentasTickets
router.get("/api/VentasTickets", async (req, res) => {
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 5;

    const { count, rows } = await db.VentasTickets.findAndCountAll({
        offset: (Pagina - 1) * TamañoPagina,
        limit: TamañoPagina
    });
    return res.status(200).json({ Ventas: rows, Total: count });
});

// GET by id /api/VentasTickets/:id/:idSucursal
// Como la pk es compuesta, se debe pasar tambien el id de la sucursal
router.get("/api/VentasTickets/:id/:idSucursal", async (req, res) => {
    const { id, idSucursal } = req.params;

    const venta = await db.VentasTickets.findOne({
        where: {
            [atributos.nroTicket]: id,
            [atributos.idSucursales]: idSucursal
        }
    });

    if (!venta)
        return res.status(404).json({ error: "No existe la venta" });

    return res.status(200).json(venta);
})

// POST /api/VentasTickets
// En el body se debe pasar un json con { id_sucursales, id_clientes, precio, fecha_venta, observacion }
router.post("/api/VentasTickets", async (req, res) => {
    const { id_sucursales, id_clientes, precio, fecha_venta, observacion } = req.body;

    // Para autoincrementar el nroTicket por sucursal
    // Obtener el maximo nroTicket de la sucursal
    const maxNroTicket = await db.VentasTickets.max(atributos.nroTicket, {
        where: {
            [atributos.idSucursales]: id_sucursales,
        },
    });

    // Incrementar el valor del nroTicket
    const nroTicket = (maxNroTicket || 0) + 1;

    const venta = await db.VentasTickets.create({
        nro_ticket: nroTicket,
        id_sucursales,
        id_clientes,
        precio,
        fecha_venta,
        observacion
    });

    return res.status(201).json(venta);
})

// PUT /api/VentasTickets/:id/:idSucursal
// En el body se debe pasar un json con { id_sucursales, id_clientes, precio, fecha_venta, observacion }
router.put("/api/VentasTickets/:id/:idSucursal", async (req, res) => {
    const { id, idSucursal } = req.params;
    const { id_sucursales, id_clientes, precio, fecha_venta, observacion } = req.body;

    const venta = await db.VentasTickets.findOne({
        where: {
            [atributos.nroTicket]: id,
            [atributos.idSucursales]: idSucursal
        }
    });

    if (!venta)
        return res.status(404).json({ error: "No existe la venta" });

    venta[atributos.idSucursales] = id_sucursales;
    venta[atributos.idClientes] = id_clientes;
    venta[atributos.precio] = precio;
    venta[atributos.fechaVenta] = fecha_venta;
    venta[atributos.observacion] = observacion;

    await venta.save();

    return res.status(200).json(venta);
})

// DELETE /api/VentasTickets/:id/:idSucursal
router.delete("/api/VentasTickets/:id/:idSucursal", async (req, res) => {
    const { id, idSucursal } = req.params;

    const venta = await db.VentasTickets.findOne({
        where: {
            [atributos.nroTicket]: id,
            [atributos.idSucursales]: idSucursal
        }
    });

    if (!venta)
        return res.status(404).json({ error: "No existe la venta" });

    await venta.destroy();

    return res.status(200).json({ message: "Venta eliminada" });
})


module.exports = router;
