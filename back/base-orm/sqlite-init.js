// Importacion de modulos de terceros
const db = require("aa-sqlite");

// Importacion de las constantes. Utilizadas para consistencia de la BD
const { tablas } = require("../constantes/tablas");
const { directorios } = require("../constantes/directorios");

const { empleados, sucursales, atracciones, ventasTickets, clientes } = tablas;

// Funcion generica para crear las tablas y poblarlas
async function CrearTabla(nombreTabla, sqlCreador, sqlInsertador) {
  const sql = `SELECT count(*) AS contar FROM sqlite_schema WHERE type = 'table' AND name = '${nombreTabla}'`;
  const res = await db.get(sql, []);
  const existe = (res.contar > 0);
  if (existe) return;

  await db.run(sqlCreador);
  console.log(`Tabla ${nombreTabla} Creada`);

  await db.run(sqlInsertador);
  console.log(`Datos insertados en Tabla ${nombreTabla}`);
}

// Funciones especificas para crear las tablas y poblarlas
async function CrearTablaEmpleados() {
  const { nombre, atributos } = empleados;

  const sqlEmpleadosCreator = `CREATE TABLE ${nombre} (
        ${atributos.id} INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        ${atributos.idSucursales} INTEGER NOT NULL,
        ${atributos.nombre} VARCHAR(32),
        ${atributos.apellido} VARCHAR(32),
        ${atributos.fechaIngreso} DATE,
        FOREIGN KEY (${atributos.idSucursales}) 
        REFERENCES ${sucursales.nombre} (${sucursales.atributos.id}) 
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION);`;


  const sqlEmpleadosInserter = `INSERT INTO ${nombre} values
    (1, 1, 'Marilyn', 'Monroe', '1990-05-20'),
    (2, 2, 'Emmett', 'Brown', '2012-12-12'),
    (3, 3, 'Betty', 'Boop', '1997-05-07'),
    (4, 4, 'Scooby', 'Doo', '1970-11-03'),
    (5, 5, 'Dora', 'Exploradora', '2017-03-02'),
    (6, 6, 'Bob', 'Esponja', '2000-08-02'),
    (7, 7, 'Bob', 'Patiño', '1963-11-21'),
    (8, 8, 'Optimus', 'Prime', '1987-01-02'),
    (9, 9, 'Harry', 'Postres', '2001-09-29'),
    (10, 10, 'Marty', 'McFly', '2010-07-23'),
    (11, 11, 'Homero', 'Simpson', '2001-09-29'),
    (12, 12, 'Don', 'Cangrejo', '2020-12-20')
    ; `;

  await CrearTabla(nombre, sqlEmpleadosCreator, sqlEmpleadosInserter);
}

async function CrearTablaSucursales() {
  const { nombre, atributos } = sucursales;

  const sqlSucursalesCreator = `CREATE TABLE ${nombre} (
    ${atributos.id} INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    ${atributos.direccion} VARCHAR(32),
    ${atributos.fechaApertura} DATE
    ); `;

  const sqlSucursalesInserter = `INSERT INTO ${nombre} values
    (1, 'CALLE BALTO 4313', '2000-01-19'),
    (2, 'BV. CORALINE 8911', '2005-01-31'),
    (3, 'MI VILLANO FAVORITO ESQ. MINIONS', '2008-01-12'),
    (4, 'CALLE SING 844', '2010-10-18'),
    (5, 'AVDA. EL LÓRAX 5994', '2016-05-28'),
    (6, 'BV. KUNG FU PANDA 1200', '2017-11-03'),
    (7, 'CALLE ESPANTATIBURONES 1563', '2018-08-08'),
    (8, 'CALLE SHREK 7580', '2019-01-18'),
    (9, 'BV. PRINCIPE DE EGIPTO 445', '2019-11-03'),
    (10, 'AVDA. GRINCH 5994', '2020-5-25'),
    (11, 'AVDA. GATO CON BOTAS', '2021-07-10'),
    (12, 'AVDA. NORMAN 4002', '2022-01-25'); `;

  await CrearTabla(nombre, sqlSucursalesCreator, sqlSucursalesInserter);
}

async function CrearTablaAtracciones() {
  const { nombre, atributos } = atracciones;

  const sqlAtraccionesCreator = `CREATE TABLE ${nombre} (
    ${atributos.id} INTEGER PRIMARY KEY,
    ${atributos.nombre} TEXT,
    ${atributos.duracion} INTEGER,
    ${atributos.fechaInauguracion} DATE,
    ${atributos.idSucursales} INTEGER,
    
    FOREIGN KEY(${atributos.idSucursales}) 
    REFERENCES ${sucursales.nombre} (${sucursales.atributos.id}) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION); `;

  const sqlAtraccionesInserter = `INSERT into ${nombre} values
    (1, 'Volver al Pasado: La Aventura', 247, '2005-07-23', 1),
    (2, 'Tiburón', 583, '2012-11-16', 2),
    (3, 'E.T. Aventura', 392, '2008-02-29', 3),
    (4, 'El Encuentro con King Kong', 429, '2019-08-12', 4),
    (5, 'Terremoto: El Gran Temblor', 199, '2001-04-05', 5),
    (6, 'Parque Jurásico: El Paseo', 199, '2016-05-04', 6),
    (7, 'Hércules y Xena: Magos de la Pantalla', 512, '2014-09-30', 7),
    (8, 'Kongfrontación', 305, '2006-12-25', 8),
    (9, 'Lucy: Un Homenaje', 276, '2017-03-21', 9),
    (10, 'El Show de Acrobacias del Salvaje UltraSalvaje Oeste', 451, '2003-10-31', 10),
    (11, 'Tornado…Aguantá el Viaje', 569, '2010-06-15', 11),
    (12, 'Cazafantasmas Espectacular', 318, '2009-01-20', 12)`;

  await CrearTabla(nombre, sqlAtraccionesCreator, sqlAtraccionesInserter);
}

async function CrearTablaVentaTickets() {
  const { nombre, atributos } = ventasTickets;

  const sqlVentasTicketsCreador = `CREATE TABLE IF NOT EXISTS ${nombre}(
    ${atributos.nroTicket} INTEGER NOT NULL,
    ${atributos.idSucursales} INTEGER NOT NULL,
    ${atributos.idClientes} INTEGER NOT NULL,
    ${atributos.precio} INTEGER,
    ${atributos.fechaVenta} DATE,
    ${atributos.observacion} VARCHAR(32),

    PRIMARY KEY(${atributos.nroTicket}, ${atributos.idSucursales}),
    FOREIGN KEY (${atributos.idSucursales}) REFERENCES ${sucursales.nombre} (${sucursales.atributos.id}),
    FOREIGN KEY (${atributos.idClientes}) REFERENCES ${clientes.nombre} (${clientes.atributos.id})
    ); `;

  const sqlVentasTicketsInserter = `INSERT INTO ${nombre} values
    (1, 1, 1, 100, '2022-05-13', ''),
    (2, 2, 2, 110, '2023-08-21', 'Sin devoluciones'),
    (3, 3, 3, 100, '2022-11-30', ''),
    (4, 4, 4, 120, '2022-11-30', 'Sin devoluciones'),
    (5, 5, 5, 115, '2022-11-30', ''),
    (6, 6, 6, 200, '2022-09-05', ''),
    (7, 7, 7, 75, '2022-09-05', 'Oferta especial'),
    (8, 8, 8, 90, '2023-12-18', ''),
    (9, 9, 9, 95, '2022-02-28', ''),
    (10, 10, 10, 110, '2021-12-04', ''),
    (11, 11, 11, 115, '2022-06-08', ''),
    (12, 12, 12, 200, '2023-10-12', 'Precio mas caro por ser hora pico')
    ; `;

  await CrearTabla(nombre, sqlVentasTicketsCreador, sqlVentasTicketsInserter);

}

async function CrearTablaClientes() {
  const { nombre, atributos } = clientes;

  const sqlClientesCreador = `CREATE TABLE ${nombre} (
    ${atributos.id} INTEGER PRIMARY KEY AUTOINCREMENT, 
    ${atributos.nombre} TEXT, 
    ${atributos.apellido} TEXT, 
    ${atributos.fechaNacimiento} DATE);`

  const sqlClientesInserter = `INSERT INTO ${nombre} VALUES 
  (1,'Peter','Pan','1994-08-22'), 
  (2,'Mickey','Mouse','1986-11-04'),
  (3,'Mulan', 'Fa','2000-03-18'),
  (4,'Winnie', 'The Pooh','1979-06-10'),
  (5,'Elsa', 'Arendel','1992-01-15'),
  (6,'Hercules', 'The Tebas','1983-09-28'),
  (7,'Buz', 'Lightyear','2005-12-07'),
  (8,'Jack', 'Sparrow','1977-04-20'),
  (9,'Tiana', 'La Bouff','1998-07-31'),
  (10,'Naveen', 'Maldonia','1989-02-12'),
  (11,'Moana', 'Waialiki','2002-05-25'),
  (12,'Tinker', 'Bell','1991-10-03');`

  await CrearTabla(nombre, sqlClientesCreador, sqlClientesInserter);
}

async function CrearBaseSiNoExiste() {
  // Abrir BD. Si no existe, la crea
  await db.open(directorios.baseDeDatos);

  // Crear las tablas de la BD
  await CrearTablaVentaTickets();
  await CrearTablaClientes();
  await CrearTablaEmpleados();
  await CrearTablaSucursales();
  await CrearTablaAtracciones()

  // Cerrar la coneccion a la BD
  await db.close();
}

// Funcion top level
// Se llamara cuando se importe el modulo
CrearBaseSiNoExiste();