const request = require("supertest");
const app = require("../index.js");
const { tablas } = require("../constantes/tablas.js");

const { empleados: { atributos } } = tablas;

const empleadosAlta = {
    [atributos.idSucursales]: 1,
    [atributos.nombre]: 'Jorge',
    [atributos.apellido]: 'Curioso',
    [atributos.fechaIngreso]: "1939-03-12",
}
const empleadosModificacion = {
    [atributos.idSucursales]: 2,
    [atributos.nombre]: 'Hombre',
    [atributos.apellido]: 'Sombrero',
    [atributos.fechaIngreso]: "1928-01-11",
}

describe("Test de Empleados", () => {
    let idEmpleado;

    it("GET /api/Empleados", async () => {
        const res = await request(app).get("/api/Empleados");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    [atributos.id]: expect.any(Number),
                    [atributos.idSucursales]: expect.any(Number),
                    [atributos.nombre]: expect.any(String),
                    [atributos.apellido]: expect.any(String),
                    [atributos.fechaIngreso]: expect.any(String)
                })
            ])
        );
    });

    it("POST /api/Empleados", async () => {
        const res = await request(app).post("/api/Empleados").send(empleadosAlta);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(
            expect.objectContaining(empleadosAlta)
        );

        idEmpleado = res.body[atributos.id];
    });

    it("Check POST id", () => {
        expect(idEmpleado).toEqual(expect.any(Number));
    });

    it(`GET by id /api/Empleados/:id`, async () => {
        const res = await request(app).get(`/api/Empleados/${idEmpleado}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining(empleadosAlta)
        );
    });

    it(`PUT /api/Empleados/:id`, async () => {
        const res = await request(app).put(`/api/Empleados/${idEmpleado}`).send(empleadosModificacion);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining(empleadosModificacion)
        );
    });

    it(`DELETE /api/Empleados/:id`, async () => {
        const res = await request(app).delete(`/api/Empleados/${idEmpleado}`);
        expect(res.statusCode).toEqual(200);
    });

});
