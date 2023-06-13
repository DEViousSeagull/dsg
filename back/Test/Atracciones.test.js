const request = require("supertest");
const app = require("../index.js");
const { tablas } = require("../constantes/tablas.js");

const { atracciones: { atributos } } = tablas;

const atraccionAlta = {
    [atributos.nombre]: "Atraccion Epica",
    [atributos.duracion]: 190,
    [atributos.fechaInauguracion]: "2002-10-31",
    [atributos.idSucursales]: 1
}
const atraccionModificacion = {
    [atributos.nombre]: "Atraccion Super Epica",
    [atributos.duracion]: 202,
    [atributos.fechaInauguracion]: "2002-04-11",
    [atributos.idSucursales]: 1
}

describe("Test de Atracciones", () => {
    let idAtraccion;

    it("GET /api/Atracciones", async () => {
        const res = await request(app).get("/api/Atracciones");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                Atracciones:
                    expect.arrayContaining([
                        expect.objectContaining({
                            [atributos.id]: expect.any(Number),
                            [atributos.nombre]: expect.any(String),
                            [atributos.duracion]: expect.any(Number),
                            [atributos.fechaInauguracion]: expect.any(String),
                            [atributos.idSucursales]: expect.any(Number),
                        })
                    ]),
                Total: expect.any(Number)
            })
        );
    });

    it("POST /api/Atracciones", async () => {
        const res = await request(app).post("/api/Atracciones").send(atraccionAlta);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(
            expect.objectContaining(atraccionAlta)
        );

        idAtraccion = res.body[atributos.id];
    });

    it("Check POST id", () => {
        expect(idAtraccion).toEqual(expect.any(Number));
    });

    it(`GET by id /api/Atracciones/${idAtraccion}`, async () => {
        const res = await request(app).get(`/api/Atracciones/${idAtraccion}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining(atraccionAlta)
        );
    });

    it(`PUT /api/Atracciones/${idAtraccion}`, async () => {
        const res = await request(app).put(`/api/Atracciones/${idAtraccion}`).send(atraccionModificacion);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining(atraccionModificacion)
        );
    });

    it(`DELETE /api/Atracciones/${idAtraccion}`, async () => {
        const res = await request(app).delete(`/api/Atracciones/${idAtraccion}`);
        expect(res.statusCode).toEqual(200);
    });
});
