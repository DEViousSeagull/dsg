const request = require("supertest");
const app = require("../index");
const { tablas } = require("../constantes/tablas");

const { clientes: { atributos } } = tablas;

const nuevoCliente = {
  [atributos.nombre]: "John",
  [atributos.apellido]: "Doe",
  [atributos.fechaNacimiento]: "1990-01-01",
};

const updatedCliente = {
  [atributos.nombre]: "Otro",
  [atributos.apellido]: "Nombre",
  [atributos.fechaNacimiento]: "2000-03-04",
};

describe("Test de clientes", () => {
  let idCliente;

  it("GET /api/clientes", async () => {
    const res = await request(app)
      .get("/api/clientes")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          [atributos.id]: expect.any(Number),
          [atributos.nombre]: expect.any(String),
          [atributos.apellido]: expect.any(String),
          [atributos.fechaNacimiento]: expect.any(String),
        }),
      ])
    );
  });

  it("POST /api/clientes", async () => {

    const response = await request(app)
      .post("/api/clientes")
      .send(nuevoCliente);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining(nuevoCliente)
    );

    idCliente = response.body[atributos.id];
  });

  it("Check POST id", () => {
    expect(idCliente).toEqual(expect.any(Number));
  });

  it(`GET by id /api/clientes/:id`, async () => {
    const res = await request(app)
      .get(`/api/clientes/${idCliente}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining(nuevoCliente)
    );
  });

  it(`PUT /api/clientes/:id`, async () => {

    const res = await request(app)
      .put(`/api/clientes/${idCliente}`)
      .send(updatedCliente);

    expect(res.statusCode).toEqual(200); // 200 for successful update
    expect(res.body).toEqual(
      expect.objectContaining(updatedCliente)
    );
  });

  it(`DELETE /api/clientes/:id`, async () => {
    const res = await request(app)
      .delete(`/api/clientes/${idCliente}`);

    expect(res.statusCode).toEqual(200); // 200 for successful deletion
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "cliente eliminado",
      })
    );
  });

});