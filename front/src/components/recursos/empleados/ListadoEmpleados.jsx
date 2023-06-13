import React from 'react';
import { tablas } from '../../../js/constantes/tablas';

const { atributos: { id, idSucursales, nombre, apellido, fechaIngreso } } = tablas.empleados;

function ListadoEmpleados({ lista, onDelete }) {

    const mapEmpleados = (empleado) => {
        return (
            <tr key={empleado[id]}>
                <td>{empleado[id]}</td>
                <td>{empleado[idSucursales]}</td>
                <td>{empleado[nombre]}</td>
                <td>{empleado[apellido]}</td>
                <td>{empleado[fechaIngreso]}</td>
                <td className="text-center text-nowrap">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        title="Consultar"
                    >
                        <i className="fa fa-eye" />
                    </button>
                    <button
                        className="btn btn-sm btn-outline-primary"
                        title="Modificar"
                    >
                        <i className="fa fa-pencil" />
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        title="Borrar"
                        onClick={() => onDelete(empleado)}
                    >
                        <i className="fa fa-trash" />
                    </button>
                </td>
            </tr>
        );
    }

    return (
        <div className="container mt-3">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Id Sucursal</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha de Ingreso</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {lista.map(mapEmpleados)}
                </tbody>
            </table>
        </div>
    );
};

export default ListadoEmpleados;
