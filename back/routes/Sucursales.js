const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { tablas } = require("../constantes/tablas");

const { sucursales: { atributos } } = tablas;

// GET /api/Sucursales
router.get("/api/Sucursales", async function (req, res) {
  const data = await db.Sucursales.findAll();
  res.json(data);
});

// GET by id /api/Sucursales/:id
router.get("/api/Sucursales/:id", async function (req, res) {

  const data = await db.Sucursales.findAll({
    attributes:
      [
        atributos.id,
        atributos.direccion,
        atributos.fechaApertura
      ],
    where: { [atributos.id]: req.params.id },
  });

  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ mensaje: 'No existe!!' })
});

// POST /api/Sucursales
// En el body se debe pasar un json con { id, direccion, fecha_apertura }
router.post("/api/Sucursales", async (req, res) => {
  const Sucursal = await db.Sucursales.create(req.body);

  return res.status(201).json(Sucursal);
})

// PUT /api/Sucursales
// En el body se debe pasar un json con { direccion, fecha_apertura }
router.put("/api/Sucursales/:id", async (req, res) => {
  const { id } = req.params;
  const { direccion, fecha_apertura } = req.body;

  const sucursal = await db.Sucursales.findOne({
    where: {
      [atributos.id]: id
    }
  });

  if (!sucursal)
    return res.status(404).json({ error: "No existe la Sucursal" });

  sucursal[atributos.direccion] = direccion;
  sucursal[atributos.fechaApertura] = fecha_apertura;

  await sucursal.save();

  return res.status(200).json(sucursal);
});

// DELETE /api/Sucursales/:id
router.delete("/api/Sucursales/:id", async (req, res) => {
  const { id } = req.params;

  const sucursal = await db.Sucursales.findOne({
    where: {
      [atributos.id]: id
    }
  });

  if (!sucursal)
    return res.status(404).json({ error: "No existe la Sucursal" });

  await sucursal.destroy();

  return res.status(200).json({ message: "Sucursal eliminada" });
})

module.exports = router;