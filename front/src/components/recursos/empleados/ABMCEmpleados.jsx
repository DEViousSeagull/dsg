import React, { useState } from 'react';

import { BusquedaEmpleados } from './BusquedaEmpleados';
import ListadoEmpleados from './ListadoEmpleados';
import { tablas } from '../../../js/constantes/tablas';
import { empleadosService } from '../../../js/servicios/empleados.service';
import { modalDialogService } from '../../../js/servicios/modalDialog.service';

const { atributos: { id, idSucursales, nombre, apellido } } = tablas.empleados;

function ABMCEmpleados() {
    const [lista, setLista] = useState(null);

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const response = await empleadosService.Buscar(data[nombre], data[apellido], data[idSucursales]);

            console.log(response.data);

            setLista(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const onDelete = async (empleado) => {

        const confirmCallback = async () => {
            try {
                console.log(`Borrando empleado de id ${empleado[id]}`);
                await empleadosService.Borrar(empleado);

                const response = await empleadosService.Buscar();

                console.log(response.data);

                setLista(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        modalDialogService.Confirm(`Esta seguro que desea borrar este registro?`,
            undefined,
            'Borrar registro',
            'Cancelar borrado',
            confirmCallback
        );
    };

    return (
        <>
            <BusquedaEmpleados onSubmit={onSubmit} />
            {lista && <ListadoEmpleados lista={lista} onDelete={onDelete} />}
        </>
    );
}

export { ABMCEmpleados };