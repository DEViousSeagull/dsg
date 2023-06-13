// Definicion de las tablas de la BD
// Utilizadas para mantener la consistencia

const tablas = {
    empleados: {
        nombre: 'empleados',
        atributos:
        {
            id: 'id',
            idSucursales: 'id_sucursales',
            nombre: 'nombre',
            apellido: 'apellido',
            fechaIngreso: 'fecha_ingreso',
        },
    },
    sucursales: {
        nombre: 'sucursales',
        atributos:
        {
            id: 'id',
            direccion: 'direccion',
            fechaApertura: 'fecha_apertura',
        },
    },
    atracciones: {
        nombre: 'atracciones',
        atributos:
        {
            id: 'id',
            idSucursales: 'id_sucursales',
            nombre: 'nombre',
            duracion: 'duracion',
            fechaInauguracion: 'fecha_inauguracion',
        },
    },
    ventasTickets: {
        nombre: 'ventas_tickets',
        atributos:
        {
            nroTicket: 'nro_ticket',
            idSucursales: 'id_sucursales',
            idClientes: 'id_clientes',
            precio: 'precio',
            fechaVenta: 'fecha_venta',
            observacion: 'observacion'
        },
    },
    clientes: {
        nombre: 'clientes',
        atributos:
        {
            id: 'id',
            nombre: 'nombre',
            apellido: 'apellido',
            fechaNacimiento: 'fecha_nacimiento',
        },
    }
}

module.exports = {
    tablas
}