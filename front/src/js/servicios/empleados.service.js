import axios from "axios";
import { urls } from "../constantes/urls";
import { tablas } from "../constantes/tablas";

const { atributos: { id, nombre, apellido, sucursal } } = tablas.empleados;

const urlResource = urls.baseDatos + '/api/empleados';

async function Buscar(nombreB, apellidoB, idSucursalB) {
    const resp = await axios.get(urlResource, {
        params: {
            [nombre]: nombreB,
            [apellido]: apellidoB,
            [sucursal]: idSucursalB,
        }
    });

    return resp;
}

async function BuscarPorId(item) {
    const resp = await axios.get(urlResource + "/" + item[id]);
    return resp;
}

async function Borrar(item) {
    await axios.delete(urlResource + "/" + item[id]);
}

async function Grabar(item) {
    if (!item[id])
        await axios.post(urlResource, item);
    else
        await axios.put(urlResource + "/" + item[id], item);
}

export const empleadosService = {
    Buscar,
    BuscarPorId,
    Borrar,
    Grabar,
};
