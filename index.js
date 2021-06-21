const path = require("path");

const Bombillo = require("./Bombillo");
const File = require("./File");
const Helper = require("./Helper");
const HTML = require("./HTML");
const PDF = require("./PDF");

const { STATUS } = require("./constants");

const dirPath = path.join(__dirname, "/results");

let version = 0;
var menuHandler;

const space = () => {
  console.log();
};

const log = msg => {
  console.log(msg);
};

function start() {
  menu();
  process.stdin.setEncoding("utf8");
  process.stdin.on("readable", checkMenu);

  function checkMenu() {
    var input = process.stdin.read();
    if (input !== null) {
      menuHandler(input.trim());
    }
  }
}

function menu() {
  const menu = `Seleccione opción:\n 1. Carga Archivo. \n 2. Salir.`;
  console.log(menu);

  menuHandler = function (input) {
    switch (input) {
      case "1":
        create();
        break;
      case "2":
        process.exit();
        break;
      default:
        menu();
    }
  };
}

function create() {
  log("ingrese ruta: ");
  //"D:\\Users\\gmartinez\\Desktop\\habitaciones.txt"

  menuHandler = function (input) {
    const wasReaded = File.read(input);

    if (wasReaded.code != STATUS.FAILED) {
      let isValid = Bombillo.distribution(wasReaded.data);
      if (isValid.code == STATUS.OK) {
        log("Generando...");

        PDF.create(
          dirPath + `/Bombillo - ${version + 1}.pdf`,
          HTML.create(isValid.data)
        ).then(wasCreate => {
          log(`El archivo ${wasCreate.data.filename} fue generado con exito.`);
          space();
          version++;
          menu();
        });
      } else {
        log(isValid.data);
        space();
        menu();
      }
    } else {
      log(`No se puedo leer el archivo ${input} intente otro vez`);
      space();
      menu();
    }
  };
}

start();
