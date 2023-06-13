import axios from "axios";
import { urls } from "../constantes/urls";
import { tablas } from "../constantes/tablas";

const { atributos: { id, nombre, apellido, sucursal } } = tablas.empleados;

const urlResource = urls.baseDatos + '/api/sucursales';

async function Buscar() {
    const resp = await axios.get(urlResource);

    return resp;
}

export const sucursalesService = {
    Buscar,
};