const request = require("supertest");
const app = require("../index.js");
const { tablas } = require("../constantes/tablas.js");

const { ventasTickets: { atributos } } = tablas;

const ventaAlta = {
    [atributos.idSucursales]: 1,
    [atributos.idClientes]: 1,
    [atributos.precio]: 100,
    [atributos.fechaVenta]: "2022-05-13",
    [atributos.observacion]: "Este registro fue creado por un test de POST"
}
const ventaModificacion = {
    [atributos.idClientes]: 1,
    [atributos.precio]: 150,
    [atributos.fechaVenta]: "2022-10-25",
    [atributos.observacion]: "Este registro fue modificado por un test de PUT"
}

describe("Test de VentasTickets", () => {
    let idSucursal;
    let nroTicket;

    it("GET /api/VentasTickets", async () => {
        const res = await request(app).get("/api/VentasTickets");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                Ventas:
                    expect.arrayContaining([
                        expect.objectContaining({
                            [atributos.nroTicket]: expect.any(Number),
                            [atributos.idSucursales]: expect.any(Number),
                            [atributos.idClientes]: expect.any(Number),
                            [atributos.precio]: expect.any(Number),
                            [atributos.fechaVenta]: expect.any(String),
                            [atributos.observacion]: expect.any(String)
                        })
                    ]),
                Total: expect.any(Number)
            })
        );
    });

    it("POST /api/VentasTickets", async () => {
        const res = await request(app).post("/api/VentasTickets").send(ventaAlta);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(
            expect.objectContaining(ventaAlta)
        );

        idSucursal = res.body[atributos.idSucursales];
        nroTicket = res.body[atributos.nroTicket];
    });

    it("Check POST ids", () => {
        expect(idSucursal).toEqual(expect.any(Number));
        expect(nroTicket).toEqual(expect.any(Number));
    });

    it(`GET by id /api/VentasTickets/:nroTicket/:idSucursal`, async () => {
        const res = await request(app).get(`/api/VentasTickets/${nroTicket}/${idSucursal}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining(ventaAlta)
        );
    });

    it(`PUT /api/VentasTickets/:nroTicket/:idSucursal`, async () => {
        const res = await request(app).put(`/api/VentasTickets/${nroTicket}/${idSucursal}`).send(ventaModificacion);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining(ventaModificacion)
        );
    });

    it(`DELETE /api/VentasTickets/:nroTicket/:idSucursal`, async () => {
        const res = await request(app).delete(`/api/VentasTickets/${nroTicket}/${idSucursal}`);
        expect(res.statusCode).toEqual(200);
    });

})