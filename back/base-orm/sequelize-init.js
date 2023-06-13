// Importacion de librerias de terceros
const { Sequelize, DataTypes } = require("sequelize");

// Importacion de las constantes y tablas
const { directorios } = require("../constantes/directorios");
const { tablas } = require("../constantes/tablas");

// Creacion del modelo de datos
const sequelize = new Sequelize("sqlite:" + directorios.baseDeDatos);

// obtencion de los datos de las tablas
const { empleados, ventasTickets, clientes, sucursales, atracciones } = tablas;

// Creacion de las tablas del modelo
const Empleados = sequelize.define(empleados.nombre,
  {
    [empleados.atributos.id]: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    [empleados.atributos.idSucursales]: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    [empleados.atributos.nombre]: {
      type: DataTypes.STRING(32),
    },
    [empleados.atributos.apellido]: {
      type: DataTypes.STRING(32),
    },
    [empleados.atributos.fechaIngreso]: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    timestamps: false,
  }
);

const VentasTickets = sequelize.define(ventasTickets.nombre,
  {
    [ventasTickets.atributos.nroTicket]: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    [ventasTickets.atributos.idSucursales]: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    [ventasTickets.atributos.idClientes]: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    [ventasTickets.atributos.precio]: {
      type: DataTypes.INTEGER,
    },
    [ventasTickets.atributos.fechaVenta]: {
      type: DataTypes.DATEONLY,
    },
    [ventasTickets.atributos.observacion]: {
      type: DataTypes.STRING(32),
    },
  },
  {
    timestamps: false,
  }
);

const Clientes = sequelize.define(clientes.nombre,
  {
    [clientes.atributos.id]: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    [clientes.atributos.nombre]: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [2, 30],
          msg: "Nombre debe ser tipo carateres, entre 2 y 30 de longitud",
        },
      },
    },
    [clientes.atributos.apellido]: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Apellido es requerido",
        },
        len: {
          args: [2, 30],
          msg: "Apellido debe ser tipo carateres, entre 2 y 30 de longitud",
        },
      },
    },
    [clientes.atributos.fechaNacimiento]: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    timestamps: false,
  }
);

const Sucursales = sequelize.define
  (sucursales.nombre,
    {
      [sucursales.atributos.id]: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      [sucursales.atributos.direccion]: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Direccion es requerida",
          },
        },
      },
      [sucursales.atributos.fechaApertura]: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

const Atracciones = sequelize.define(atracciones.nombre,
  {
    [atracciones.atributos.id]: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    [atracciones.atributos.nombre]: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 50],
          msg: "Nombre debe ser tipo carateres, entre 5 y 50 de longitud",
        },
      },
      unique: {
        args: true,
        msg: "este Nombre ya existe en la tabla!",
      },
    },
    [atracciones.atributos.duracion]: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 180,
          msg: 'Duracion debe ser al menos 180'
        },
        max: {
          args: 600,
          msg: 'Duracion no debe ser mayor que 600'
        }
      }
    },
    [atracciones.atributos.fechaInauguracion]: {
      type: DataTypes.DATEONLY,
      validate: {
        noEstaEnFuturo(value) {
          if (value > new Date()) {
            throw new Error('fechaInauguracion no debe estar en el futuro');
          }
        }
      }
    },
    [atracciones.atributos.idSucursales]: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false
  }
);

// Definicion de las las FK
Atracciones.belongsTo(Sucursales, {
  foreignKey: atracciones.atributos.idSucursales,
  targetKey: sucursales.atributos.id
});

Empleados.belongsTo(Sucursales, {
  foreignKey: empleados.atributos.idSucursales,
  targetKey: sucursales.atributos.id
});

VentasTickets.belongsTo(Sucursales, {
  foreignKey: ventasTickets.atributos.idSucursales,
  targetKey: sucursales.atributos.id
});
VentasTickets.belongsTo(Clientes, {
  foreignKey: ventasTickets.atributos.idClientes,
  targetKey: clientes.atributos.id
});

module.exports = {
  Empleados,
  VentasTickets,
  Clientes,
  Sucursales,
  Atracciones
};