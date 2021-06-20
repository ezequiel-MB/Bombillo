const Bombillo = require("./Bombillo");
const File = require("./File");

const path = "D:\\Users\\gmartinez\\Desktop\\habitaciones.txt";
const wasReaded = File.read(path);

if (!wasReaded.message) {
  throw Error(`No se puedo leer el archivo ${path}`);
}

Bombillo.distribution(wasReaded.data);
