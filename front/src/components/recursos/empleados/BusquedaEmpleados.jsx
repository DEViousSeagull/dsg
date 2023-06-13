import React from 'react';
import { useForm } from 'react-hook-form';
import { tablas } from '../../../js/constantes/tablas';
import { rutas } from '../../../js/constantes/rutas';
import { useNavigate } from 'react-router-dom';

const { atributos: { id, idSucursales, nombre, apellido, fechaIngreso } } = tablas.empleados;

function BusquedaEmpleados({ onSubmit }) {
    const { register, handleSubmit } = useForm();
    let navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label">Apellido:</label>
                <input type="text" className="form-control" {...register(apellido)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Nombre:</label>
                <input type="text" className="form-control" {...register(nombre)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Id Sucursal:</label>
                <input type="text" className="form-control" {...register(idSucursales)} />
            </div>
            <div className="btn-sequence">
                <button type="submit" className="btn btn-primary boton">
                    <i className="fa fa-search"> </i> Buscar
                </button>
                <button type="button" className="btn btn-primary boton" onClick={() => navigate(rutas.agregarItem)}>
                    <i className="fa fa-plus"> </i> Agregar
                </button>
            </div>
        </form>
    );
}
export { BusquedaEmpleados };