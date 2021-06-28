const { ROOM } = require("./constants");

const Case_1 = require("./cases/Case_1");
const Case_2 = require("./cases/Case_2");
const Case_3 = require("./cases/Case_3");
const Case_4 = require("./cases/Case_4");
const Case_5 = require("./cases/Case_5");
const Case_6 = require("./cases/Case_6");
const Case_7 = require("./cases/Case_7");
const Case_8 = require("./cases/Case_8");
const Case_9 = require("./cases/Case_9");

class Point {
  isCorrect(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;

    if (row == 1 && column == 1) {
      /* *
       *   x ➡
       *   ⬇
       */

      let result = Case_1.isValid(data, coord);

      this.log("Caso 1 es valido: " + result + " coord: " + `${row},${column}`);

      return result;
    } else if (row == 1 && column != sizeColumn) {
      /**
       *   ⬅ x ➡
       *      ⬇
       *
       */
      let result = Case_2.isValid(data, coord);
      this.log("Caso 2 es valido: " + result + " coord: " + `${row},${column}`);
      return result;
    } else if (row == 1 && column == sizeColumn) {
      /*
       * ⬅ x
       *    ⬇
       */

      let result = Case_3.isValid(data, coord);
      this.log("Caso 3 factible " + result + " coord: " + `${row},${column}`);
      return result;
    } else if (column == 1 && row != sizeRow) {
      /**   ⬆
       *    x ➡
       *    ⬇
       */

      let result = Case_4.isValid(data, coord);

      this.log("Caso 4 es valido: " + result + " coord: " + `${row},${column}`);
      return result;
    } else if (column == 1 && row == sizeRow) {
      /**
       *  ⬆
       *  x ➡
       */

      let result = Case_5.isValid(data, coord);
      this.log("Caso 5 es valido: " + result + " coord: " + `${row},${column}`);
      return result;
    } else if (row == sizeRow && column != sizeColumn) {
      /**
       *       ⬆
       *    ⬅ x ➡
       */

      let result = Case_6.isValid(data, coord);
      this.log("Caso 6 es valido: " + result + " coord: " + `${row},${column}`);
      return result;
    } else if (column == sizeColumn && row != sizeRow) {
      /**
       *    ⬆
       *  ⬅ x
       *    ⬇
       *
       */
      let result = Case_7.isValid(data, coord);
      this.log("Caso 7 es valido: " + result + " coord: " + `${row},${column}`);
      return result;
    } else if (row == sizeRow && column == sizeColumn) {
      //n y m son iguales (cuadratica)
      /**
       *    ⬆
       * ⬅ x
       */

      let result = Case_8.isValid(data, coord);
      this.log("Caso 8 es valido: " + result + " coord: " + `${row},${column}`);
      return result;
    } else {
      /**
       *     ⬆
       *  ⬅ x ➡
       *     ⬇
       */

      let result = Case_9.isValid(data, coord);
      this.log("Caso 9 es valido: " + result + " coord: " + `${row},${column}`);
      return result;
    }
  }

  log(msg) {
    //console.log(msg);
  }
}

module.exports = new Point();
