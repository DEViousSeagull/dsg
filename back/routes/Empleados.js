const express = require('express');
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { tablas } = require("../constantes/tablas");
const { Op, ValidationError } = require("sequelize");

const { empleados: { atributos } } = tablas;

// GET /api/Empleados
router.get("/api/Empleados", async (req, res) => {
    const { [atributos.apellido]: apellido, [atributos.nombre]: nombre, [atributos.idSucursales]: idSucursales } = req.query;

    let where = {};
    if (apellido != undefined && apellido !== "") {
        where[atributos.apellido] = {
            [Op.like]: "%" + apellido + "%",
        };
    }
    if (nombre != undefined && nombre !== "") {
        where[atributos.nombre] = {
            [Op.like]: "%" + nombre + "%",
        };
    }
    if (idSucursales != undefined && idSucursales !== "") {
        where[atributos.idSucursales] = {
            [Op.like]: "%" + idSucursales + "%",
        };
    }

    let items = await db.Empleados.findAndCountAll({
        attributes: [
            atributos.id,
            atributos.idSucursales,
            atributos.nombre,
            atributos.apellido,
            atributos.fechaIngreso,
        ],
        order: [[atributos.id, "ASC"]],
        where,
    });

    return res.status(200).json(items.rows);
});

// GET by id /api/Empleados/:id
router.get("/api/Empleados/:id", async (req, res) => {
    const { id } = req.params;

    const empleado = await db.Empleados.findOne({
        where: {
            [atributos.id]: id,
        }
    });

    if (!empleado)
        return res.status(404).json({ error: "No existe el empleado" });

    return res.status(200).json(empleado);
})

// POST /api/Empleados
// En el body se debe pasar un json con { id, id_sucursales, nombre, apellido, fecha_ingreso }
router.post("/api/Empleados", async (req, res) => {
    const { id_sucursales, nombre, apellido, fecha_ingreso } = req.body;

    const empleados = await db.Empleados.create({
        id_sucursales,
        nombre,
        apellido,
        fecha_ingreso
    });

    return res.status(201).json(empleados);
})

// PUT /api/Empleados/:id
// En el body se debe pasar un json con { id_sucursales, nombre, apellido, fecha_ingreso }
router.put("/api/Empleados/:id", async (req, res) => {
    const { id } = req.params;
    const { id_sucursales, nombre, apellido, fecha_ingreso } = req.body;

    const empleado = await db.Empleados.findOne({
        where: {
            [atributos.id]: id
        }
    });

    if (!empleado)
        return res.status(404).json({ error: "No existe el empleado" });

    empleado[atributos.idSucursales] = id_sucursales;
    empleado[atributos.nombre] = nombre;
    empleado[atributos.apellido] = apellido;
    empleado[atributos.fechaIngreso] = fecha_ingreso;

    await empleado.save();

    return res.status(200).json(empleado);
})

// DELETE /api/Empleados/:id
router.delete("/api/Empleados/:id", async (req, res) => {
    const { id } = req.params;

    const empleado = await db.Empleados.findOne({
        where: {
            [atributos.id]: id
        }
    });

    if (!empleado)
        return res.status(404).json({ error: "No existe el empleado" });

    await empleado.destroy();

    return res.status(200).json({ message: "Empleado eliminado" });
})

module.exports = router;
