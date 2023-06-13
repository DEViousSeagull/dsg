import React, { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { tablas } from "../../../js/constantes/tablas";

import { modalDialogService } from '../../../js/servicios/modalDialog.service';
import { empleadosService } from '../../../js/servicios/empleados.service';
import { sucursalesService } from '../../../js/servicios/sucursales.service';

const { atributos: { id, idSucursales, nombre, apellido, fechaIngreso } } = tablas.empleados;
const { atributos: { id: idSucursal } } = tablas.sucursales;

function RegistroEmpleado() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ values: null });
    const [idsSucursales, setIdsSucursales] = useState([]);

    useEffect(() => {
        const getIdsSucursales = async () => {
            try {
                const response = await sucursalesService.Buscar();

                const ids = response.data.map((sucursal) => sucursal[idSucursal]);

                setIdsSucursales(ids);
            } catch (err) {
                console.error(err);
            }
        };

        getIdsSucursales();
    }, []);

    const onSubmit = async (data) => {
        let modalText = 'Registro agregado correctamente.';

        try {
            await empleadosService.Grabar(data);
        }
        catch (error) {
            console.log(error);
            modalText = 'No se pudo agregar el registro.';
        }

        setTimeout(
            () => modalDialogService.Alert(
                modalText,
                undefined,
                'Aceptar',
                undefined,
                () => navigate('../')), 0);
    };

    const mapIdsSucursales = (id) => <option value={id} key={id}>{id}</option>;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
                <div className='div-subtitulo'>Registrar Empleado</div>
                <hr />
                <fieldset>
                    {/* campo idSucursal */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor={idSucursales}>
                                Id Sucursal<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                {...register(idSucursales, {
                                    required: { value: true, message: "Id Sucursal es requerida" },
                                })}
                                className={`dropdown-m ${errors?.[idSucursales] ? "is-invalid" : ""}`}
                            >
                                <option value='' />
                                {idsSucursales.map(mapIdsSucursales)}
                            </select>
                            {errors?.[idSucursales] && touchedFields[idSucursales] && (
                                <div className="invalid-feedback">
                                    {errors?.[idSucursales]?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* campo nombre */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor={nombre}>
                                Nombre<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register(nombre, {
                                    required: { value: true, message: "Nombre es requerido" },
                                    minLength: {
                                        value: 4,
                                        message: "Nombre debe tener al menos 4 caracteres",
                                    },
                                    maxLength: {
                                        value: 55,
                                        message: "Nombre debe tener como máximo 55 caracteres",
                                    },
                                })}
                                autoFocus
                                className={`form-control ${errors?.[nombre] ? "is-invalid" : ""}`}
                            />
                            {errors?.[nombre] && touchedFields[nombre] && (
                                <div className="invalid-feedback">
                                    {errors?.[nombre]?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* campo apellido */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor={apellido}>
                                Apellido<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register(apellido, {
                                    required: { value: true, message: "Apellido es requerido" },
                                    minLength: {
                                        value: 4,
                                        message: "Apellido debe tener al menos 4 caracteres",
                                    },
                                    maxLength: {
                                        value: 55,
                                        message: "Apellido debe tener como máximo 55 caracteres",
                                    },
                                })}
                                autoFocus
                                className={`form-control ${errors?.[apellido] ? "is-invalid" : ""}`}
                            />
                            {errors?.[apellido] && touchedFields[apellido] && (
                                <div className="invalid-feedback">
                                    {errors?.[apellido]?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* campo fechaIngreso */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor={fechaIngreso}>
                                Fecha Ingreso<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="date"
                                {...register(fechaIngreso, {
                                    required: { value: true, message: "Fecha Ingreso es requerida" }
                                })}
                                className={`form-control ${errors?.[fechaIngreso] ? "is-invalid" : ""}`}
                            />
                            <div className="invalid-feedback">
                                {errors?.[fechaIngreso]?.message}
                            </div>
                        </div>
                    </div>
                </fieldset>
                <hr />

                {/* Botones Grabar, Cancelar/ */}
                <div className="btn-sequence">
                    <button type="submit" className="btn btn-primary">
                        <i className="fa fa-check"></i> Grabar
                    </button>

                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate('../')}
                    >
                        <i className="fa fa-undo"></i> Cancelar
                    </button>
                </div>

                {/* texto: Revisar los datos ingresados... */}
                {!isValid && isSubmitted && (
                    <div className="row alert alert-danger mensajesAlert">
                        <i className="fa fa-exclamation-sign"></i>
                        Revisar los datos ingresados...
                    </div>
                )}
            </div>
        </form>
    );
}

export { RegistroEmpleado };