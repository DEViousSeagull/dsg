const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { tablas } = require("../constantes/tablas");

const { clientes: { atributos } } = tablas;

// GET /api/clientes
router.get("/api/clientes", async function (req, res, next) {
  let data = await db.Clientes.findAll({
    attributes: [
      atributos.id,
      atributos.nombre,
      atributos.apellido,
      atributos.fechaNacimiento
    ],
  });
  res.json(data);
});

// GET by id /api/clientes/:id
router.get("/api/clientes/:id", async function (req, res, next) {

  const data = await db.Clientes.findAll({
    attributes: [
      atributos.id,
      atributos.nombre,
      atributos.apellido,
      atributos.fechaNacimiento
    ],
    where: { [atributos.id]: req.params.id },
  });

  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ mensaje: `No existe el cliente con id ${req.params.id}` })
});

// POST /api/clientes
// En el body se debe pasar un json con { id, nombre, apellido, fecha_nacimiento }
router.post("/api/clientes", async (req, res) => {
  const cliente = await db.Clientes.create(req.body);

  return res.status(201).json(cliente);
})

// PUT /api/clientes
// En el body se debe pasar un json con { nombre, apellido, fecha_nacimiento }
router.put("/api/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, fecha_nacimiento } = req.body;

  const cliente = await db.Clientes.findOne({
    where: {
      [atributos.id]: id
    }
  });

  if (!cliente)
    return res.status(404).json({ error: "No existe el cliente" });

  cliente[atributos.nombre] = nombre;
  cliente[atributos.apellido] = apellido;
  cliente[atributos.fechaNacimiento] = fecha_nacimiento;

  await cliente.save();

  return res.status(200).json(cliente);
});

// DELETE /api/clientes/:id
router.delete("/api/clientes/:id", async (req, res) => {
  const { id } = req.params;

  const cliente = await db.Clientes.findOne({
    where: {
      [atributos.id]: id
    }
  });

  if (!cliente)
    return res.status(404).json({ error: "No existe el cliente" });

  await cliente.destroy();

  return res.status(200).json({ message: "cliente eliminado" });
})


module.exports = router;