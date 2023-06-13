import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { rutas } from "../../js/constantes/rutas";

import { Inicio } from "./Inicio";
import { Atracciones } from "../recursos/atracciones/Atracciones";
import { Clientes } from "../recursos/clientes/Clientes";

import { Empleados } from "../recursos/empleados/Empleados";
import { ABMCEmpleados } from "../recursos/empleados/ABMCEmpleados";
import { RegistroEmpleado } from "../recursos/empleados/RegistroEmpleado";

import { Sucursales } from "../recursos/sucursales/Sucursales";
import { VentasTickets } from "../recursos/ventas-tickets/VentasTickets";

function Rutas() {
    return (
        <div className="divBody">
            <Routes>
                <Route path={rutas.inicio} element={<Inicio />} />
                <Route path={rutas.atracciones} element={<Atracciones />}>
                    <Route path={rutas.agregarItem} />
                </Route>
                <Route path={rutas.clientes} element={<Clientes />}>
                    <Route path={rutas.agregarItem} />
                </Route>
                <Route path={rutas.empleados} element={<Empleados />}>
                    <Route path='' element={<ABMCEmpleados />} />
                    <Route path={rutas.agregarItem} element={<RegistroEmpleado />} />
                </Route>
                <Route path={rutas.sucursales} element={<Sucursales />}>
                    <Route path={rutas.agregarItem} />
                </Route>
                <Route path={rutas.ventasTickets} element={<VentasTickets />}>
                    <Route path={rutas.agregarItem} />
                </Route>
                <Route path="*" element={<Navigate to={rutas.inicio} replace />}>
                    <Route path={rutas.agregarItem} />
                </Route>
            </Routes>
        </div>
    );
}

export { Rutas };