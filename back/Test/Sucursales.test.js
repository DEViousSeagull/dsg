const request = require("supertest");
const app = require("../index");
const { tablas } = require("../constantes/tablas");

const { sucursales: { atributos } } = tablas;

const nuevaSucursal = {
  [atributos.direccion]: "Aldea Pitufa 666",
  [atributos.fechaApertura]: "2023-03-20",
};
const updatedSucursal = {
  [atributos.direccion]: "Pueblo de Gargamel 5448",
  [atributos.fechaApertura]: "2023-04-20",
};

describe("Test de Sucursales", () => {
  let idSucursal;

  it("GET /api/Sucursales", async () => {
    const res = await request(app)
      .get("/api/Sucursales")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          [atributos.id]: expect.any(Number),
          [atributos.direccion]: expect.any(String),
          [atributos.fechaApertura]: expect.any(String)
        })
      ])
    );
  });

  //describe("POST /api/Sucursales", () => {
  it("POST /api/Sucursales", async () => {
    const response = await request(app)
      .post("/api/Sucursales")
      .send(nuevaSucursal);

    expect(response.status).toBe(201); // Comprueba el código de estado 201 (creado exitosamente)
    expect(response.body).toEqual(
      expect.objectContaining(nuevaSucursal)
    );

    idSucursal = response.body[atributos.id];
  });

  it("Check POST id", () => {
    expect(idSucursal).toEqual(expect.any(Number));
  });

  //describe("GET by id /api/Sucursales/:id", function () {
  it(`GET by id /api/Sucursales/:id`, async () => {
    const res = await request(app)
      .get(`/api/Sucursales/${idSucursal}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining(nuevaSucursal)
    );
  });

  //describe("PUT /api/Sucursales/:id", function () {
  it(`PUT /api/Sucursales/:id`, async () => {
    const res = await request(app)
      .put(`/api/Sucursales/${idSucursal}`)
      .send(updatedSucursal);

    expect(res.statusCode).toEqual(200); // 200 for successful update
    expect(res.body).toEqual(
      expect.objectContaining(updatedSucursal)
    );
  });

  //describe("DELETE /api/Sucursales/:id", function () {
  it(`DELETE /api/Sucursales/:id`, async () => {
    const res = await request(app)
      .delete(`/api/Sucursales/${idSucursal}`);

    expect(res.statusCode).toEqual(200); // 200 for successful deletion
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Sucursal eliminada",
      })
    );
  });

})