require("dotenv").config();

// Definicion de directorios que se utilizaran en la app
// Utilizados para mantener la consistencia

const directorioBD = process.env.base;

const directorios = {
    baseDeDatos: directorioBD
}

module.exports = {
    directorios
}


