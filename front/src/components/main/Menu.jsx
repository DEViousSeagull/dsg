import React from "react";
import { NavLink } from "react-router-dom";
import { rutas } from "../../js/constantes/rutas";


function Menu() {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-md">
            <a className="navbar-brand">
                <img className="Header-logo" src="/imgs/logo-utn.png" alt="Logo" />
                &nbsp;<i>Universo</i>
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to={rutas.inicio}>
                            Inicio
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={rutas.atracciones}>
                            Atracciones
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={rutas.clientes}>
                            Clientes
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={rutas.empleados}>
                            Empleados
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={rutas.sucursales}>
                            Sucursales
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={rutas.ventasTickets}>
                            Ventas Tickets
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export { Menu };
