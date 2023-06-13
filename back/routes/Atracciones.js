const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { tablas } = require("../constantes/tablas");

const { atracciones: { atributos } } = tablas;

// GET /api/Atracciones
router.get("/api/Atracciones", async (req, res) => {
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 5;

    const { count, rows } = await db.Atracciones.findAndCountAll({
        offset: (Pagina - 1) * TamañoPagina,
        limit: TamañoPagina
    });
    return res.status(200).json({ Atracciones: rows, Total: count });
});

// GET by id /api/Atracciones/:id/:idSucursal
router.get("/api/Atracciones/:id", async (req, res) => {
    const { id } = req.params;

    const atraccion = await db.Atracciones.findOne({
        where: {
            [atributos.id]: id,
        }
    });

    if (!atraccion)
        return res.status(404).json({ error: "No existe la atraccion" });

    return res.status(200).json(atraccion);
})

// POST /api/Atracciones
// En el body se debe pasar un json con { nombre, duracion, fecha_inauguracion, id_sucursales }
router.post("/api/Atracciones", async (req, res) => {
    // const { nombre, duracion, fecha_inauguracion, id_sucursales } = req.body;

    /*
    const atraccion = await db.atracciones.create({
        nombre,
        duracion,
        precio,
        fecha_inauguracion,
        id_sucursales
    });
    */

    const atraccion = await db.Atracciones.create(req.body)

    return res.status(201).json(atraccion);
})

// PUT /api/Atracciones/:id
// En el body se debe pasar un json con { nombre, duracion, fecha_inauguracion, id_sucursales }
router.put("/api/Atracciones/:id/", async (req, res) => {
    const { id } = req.params;
    const { nombre, duracion, fecha_inauguracion, id_sucursales } = req.body;

    const atraccion = await db.Atracciones.findOne({
        where: {
            [atributos.id]: id,
        }
    });

    if (!atraccion)
        return res.status(404).json({ error: "No existe la atraccion" });


    atraccion[atributos.nombre] = nombre;
    atraccion[atributos.duracion] = duracion;
    atraccion[atributos.fechaInauguracion] = fecha_inauguracion;
    atraccion[atributos.idSucursales] = id_sucursales;

    await atraccion.save();

    return res.status(200).json(atraccion);
})

// DELETE /api/Atracciones/:id
router.delete("/api/Atracciones/:id", async (req, res) => {
    const { id } = req.params;

    const atraccion = await db.Atracciones.findOne({
        where: {
            [atributos.id]: id,
        }
    });

    if (!atraccion)
        return res.status(404).json({ error: "No existe la atraccion" });

    await atraccion.destroy();

    return res.status(200).json({ message: "Atraccion eliminada" });
})

module.exports = router;