const { ROOM } = require("./constants");

class Point {
  findValueByKeyAndValue(array, key, value = ROOM.WITH_LIGHT) {
    return array.find(item => item[`${key}`] == 0 && item[`${key}`] != value);
  }

  isCorrect(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;

    if (row == 1 && column == 1) {
      /* *
       *   x ➡
       *   ⬇
       */

      let result = this.case_1(data, coord);

      this.log(
        "Caso 1 es factible: " + result + " coord: " + `${row},${column}`
      );

      return result;
    } else if (row == 1 && column != sizeColumn) {
      /**
       *   ⬅ x ➡
       *      ⬇
       *
       */
      let result = this.case_2(data, coord);
      this.log(
        "Caso 2 es factible: " + result + " coord: " + `${row},${column}`
      );
      return result;
    } else if (row == 1 && column == sizeColumn) {
      /*
       * ⬅ x
       *    ⬇
       */

      let result = this.case_3(data, coord);
      this.log("Caso 3 factible " + result + " coord: " + `${row},${column}`);
      return result;
    } else if (column == 1 && row != sizeRow) {
      /**   ⬆
       *    x ➡
       *    ⬇
       */

      let result = this.case_4(data, coord);

      this.log(
        "Caso 4 es factible: " + result + " coord: " + `${row},${column}`
      );
      return result;
    } else if (column == 1 && row == sizeRow) {
      /**
       *  ⬆
       *  x ➡
       */

      let result = this.case_5(data, coord);
      this.log(
        "Caso 5 es factible: " + result + " coord: " + `${row},${column}`
      );
      return result;
    } else if (row == sizeRow && column != sizeColumn) {
      /**
       *       ⬆
       *    ⬅ x ➡
       */

      let result = this.case_6(data, coord);
      this.log(
        "Caso 6 es factible: " + result + " coord: " + `${row},${column}`
      );
      return result;
    } else if (column == sizeColumn && row != sizeRow) {
      /**
       *    ⬆
       *  ⬅ x
       *    ⬇
       *
       */
      let result = this.case_7(data, coord);
      this.log(
        "Caso 7 es factible: " + result + " coord: " + `${row},${column}`
      );
      return result;
    } else if (row == sizeRow && column == sizeColumn) {
      //n y m son iguales (cuadratica)
      /**
       *    ⬆
       * ⬅ x
       */

      let result = this.case_8(data, coord);
      this.log(
        "Caso 8 es factible: " + result + " coord: " + `${row},${column}`
      );
      return result;
    } else {
      /**
       *     ⬆
       *  ⬅ x ➡
       *     ⬇
       */

      let result = this.case_9(data, coord);
      this.log(
        "Caso 9 es factible: " + result + " coord: " + `${row},${column}`
      );
      return result;
    }
  }

  case_1(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowed = 4;
    let isAllowed = false;

    let roomsWithOutWallToTheRight = 0;
    let toTheRight = column + 1;
    for (let index = 0; index < sizeColumn; index++) {
      let key = `${row},${toTheRight}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheRight++;
      roomsWithOutWallToTheRight++;
    }

    this.log(
      "total -> E: " + roomsWithOutWallToTheRight + " en la fila: " + row
    );

    let roomsWithOutWallToTheDown = 0;
    let toTheDown = row + 1;
    for (let index = 0; index < sizeColumn; index++) {
      let key = `${toTheDown},${column}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheDown++;
      roomsWithOutWallToTheDown++;
    }

    this.log(
      "total -> S: " + roomsWithOutWallToTheDown + " en la columna: " + column
    );

    if (
      roomsWithOutWallToTheRight + roomsWithOutWallToTheDown >=
      roomsWithLigthAllowed
    )
      isAllowed = true;

    return isAllowed;
  }

  case_2(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowedMax = 4;
    const roomsWithLigthAllowedMin = 3;
    let isAllowed = false;

    let roomsWithOutWallToTheRight = 0;
    let toTheRight = column + 1;
    for (let index = column; index < sizeColumn; index++) {
      let key = `${row},${toTheRight}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      roomsWithOutWallToTheRight++;
      toTheRight++;
    }

    this.log(
      "Total -> E: " + roomsWithOutWallToTheRight + " columna: " + column
    );

    let roomsWithOutWallToTheLeft = 0;
    let toTheLeft = column - 1;
    for (let index = toTheLeft; index > 0; index--) {
      let key = `${row},${toTheLeft}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      roomsWithOutWallToTheLeft++;
      toTheLeft--;
    }

    this.log(
      "Total -> O: " + roomsWithOutWallToTheLeft + " columna: " + column
    );

    let roomsWithOutWallToTheDown = 0;
    let toTheDown = row + 1;
    for (let index = 0; index < sizeRow; index++) {
      let key = `${toTheDown},${column}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheDown++;
      roomsWithOutWallToTheDown++;
    }

    this.log(
      "Total -> S: " + roomsWithOutWallToTheDown + " en la fila: " + row
    );

    let totalRoomsWithOutWall =
      roomsWithOutWallToTheRight +
      roomsWithOutWallToTheLeft +
      roomsWithOutWallToTheDown;
    if (
      totalRoomsWithOutWall >= roomsWithLigthAllowedMax ||
      totalRoomsWithOutWall >= roomsWithLigthAllowedMin
    )
      isAllowed = true;

    return isAllowed;
  }

  case_3(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowed = 4;
    let isAllowed = false;

    let roomsWithOutWallToTheLeft = 0;
    let toTheLeft = column - 1;
    for (let index = 0; index < sizeColumn; index++) {
      let key = `${row},${toTheLeft}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      roomsWithOutWallToTheLeft++;
      toTheLeft--;
    }

    this.log(
      "Total -> O: " + roomsWithOutWallToTheLeft + " en la fila: " + row
    );

    let roomsWithOutWallToTheDown = 0;
    let toTheDown = row + 1;
    for (let index = 0; index < sizeColumn; index++) {
      let key = `${toTheDown},${column}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheDown++;
      roomsWithOutWallToTheDown++;
    }

    this.log(
      "Total -> S: " + roomsWithOutWallToTheDown + " en la columna: " + column
    );

    if (
      roomsWithOutWallToTheLeft + roomsWithOutWallToTheDown >=
      roomsWithLigthAllowed
    )
      isAllowed = true;

    return isAllowed;
  }

  case_4(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowedMax = 4;
    const roomsWithLigthAllowedMin = 3;
    let isAllowed = false;

    let roomsWithOutWallToTheUp = 0;
    let toTheUp = row - 1;
    for (let index = toTheUp; index > 0; index--) {
      let key = `${toTheUp},${column}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      roomsWithOutWallToTheUp++;
      toTheUp--;
    }

    this.log(
      "Total -> N: " + roomsWithOutWallToTheUp + " en la columna: " + column
    );

    let roomsWithOutWallToTheDown = 0;
    let toTheDown = row + 1;
    for (let index = row; index < sizeRow; index++) {
      let key = `${toTheDown},${column}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }

      roomsWithOutWallToTheDown++;
      toTheDown++;
    }

    this.log(
      "Total -> S: " + roomsWithOutWallToTheDown + " en la columna: " + column
    );

    let roomsWithOutWallToTheRight = 0;
    let toTheRight = column + 1;
    for (let index = column; index < sizeColumn; index++) {
      let key = `${row},${toTheRight}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheRight++;
      roomsWithOutWallToTheRight++;
    }

    this.log(
      "Total -> E: " + roomsWithOutWallToTheRight + " en la fila: " + row
    );

    let totalRoomsWithOutWall =
      roomsWithOutWallToTheUp +
      roomsWithOutWallToTheDown +
      roomsWithOutWallToTheRight;

    if (
      totalRoomsWithOutWall >= roomsWithLigthAllowedMax ||
      totalRoomsWithOutWall >= roomsWithLigthAllowedMin
    )
      isAllowed = true;

    return isAllowed;
  }

  case_5(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowed = 4;
    let isAllowed = false;

    let roomsWithOutWallToTheUp = 0;
    let toTheUp = row - 1;
    for (let index = 0; index < sizeRow; index++) {
      let key = `${toTheUp},${column}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheUp--;
      roomsWithOutWallToTheUp++;
    }

    this.log("Total -> N: " + roomsWithOutWallToTheUp + " en la fila: " + row);

    let roomsWithOutWallToTheRight = 0;
    let toTheRight = column + 1;
    for (let index = column; index < sizeColumn; index++) {
      let key = `${row},${toTheRight}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheRight++;
      roomsWithOutWallToTheRight++;
    }

    this.log(
      "Total -> E: " + roomsWithOutWallToTheRight + " en la fila: " + row
    );

    if (
      roomsWithOutWallToTheRight + roomsWithOutWallToTheUp >=
      roomsWithLigthAllowed
    )
      isAllowed = true;

    return isAllowed;
  }

  case_6(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowedMax = 4;
    const roomsWithLigthAllowedMin = 3;
    let isAllowed = false;

    let roomsWithOutWallToTheUp = 0;
    let toTheUp = row - 1;
    for (let index = 0; index < sizeRow; index++) {
      let key = `${toTheUp},${column}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheUp--;
      roomsWithOutWallToTheUp++;
    }

    this.log("Total -> N: " + roomsWithOutWallToTheUp + " en la fila: " + row);

    let roomsWithOutWallToTheRight = 0;
    let toTheRight = column + 1;
    for (let index = column; index < sizeColumn; index++) {
      let key = `${row},${toTheRight}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheRight++;
      roomsWithOutWallToTheRight++;
    }

    this.log(
      "Total -> E : " + roomsWithOutWallToTheRight + " en la fila: " + row
    );

    let roomsWithOutWallToTheLeft = 0;
    let toTheLeft = column - 1;
    for (let index = toTheLeft; index > 0; index--) {
      let key = `${row},${toTheLeft}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      roomsWithOutWallToTheLeft++;
      toTheLeft--;
    }

    this.log(
      "Total -> O: " + roomsWithOutWallToTheLeft + " en la fila: " + row
    );

    let totalRoomsWithOutWall =
      roomsWithOutWallToTheUp +
      roomsWithOutWallToTheRight +
      roomsWithOutWallToTheLeft;

    if (
      totalRoomsWithOutWall >= roomsWithLigthAllowedMax ||
      totalRoomsWithOutWall >= roomsWithLigthAllowedMin
    )
      isAllowed = true;

    return isAllowed;
  }

  case_7(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowedMax = 4;
    const roomsWithLigthAllowedMin = 3;
    let isAllowed = false;

    let roomsWithOutWallToTheLeft = 0;
    let toTheLeft = column - 1;
    for (let index = toTheLeft; index > 0; index--) {
      let key = `${row},${toTheLeft}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      roomsWithOutWallToTheLeft++;
      toTheLeft--;
    }

    this.log("Total -> O " + roomsWithOutWallToTheLeft + " en la fila: " + row);

    let roomsWithOutWallToTheDown = 0;
    let toTheDown = row + 1;
    for (let index = 0; index < sizeRow; index++) {
      let key = `${toTheDown},${column}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheDown++;
      roomsWithOutWallToTheDown++;
    }

    this.log(
      "Total -> S: " + roomsWithOutWallToTheDown + " en la columna: " + column
    );

    let roomsWithOutWallToTheUp = 0;
    let toTheUp = row - 1;
    for (let index = 0; index < sizeRow; index++) {
      let key = `${toTheUp},${column}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheUp--;
      roomsWithOutWallToTheUp++;
    }

    this.log("Total -> N: " + roomsWithOutWallToTheUp + " en la fila: " + row);

    let totalRoomsWithOutWall =
      roomsWithOutWallToTheLeft +
      roomsWithOutWallToTheDown +
      roomsWithOutWallToTheUp;

    if (
      totalRoomsWithOutWall >= roomsWithLigthAllowedMax ||
      totalRoomsWithOutWall >= roomsWithLigthAllowedMin
    )
      isAllowed = true;

    return isAllowed;
  }

  case_8(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowed = 4;
    let isAllowed = false;

    let roomsWithOutWallToTheUp = 0;
    let toTheUp = row - 1;
    for (let index = 0; index < sizeRow; index++) {
      let key = `${toTheUp},${column}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheUp--;
      roomsWithOutWallToTheUp++;
    }

    this.log("Total -> N: " + roomsWithOutWallToTheUp + " en la fila: " + row);

    let roomsWithOutWallToTheLeft = 0;
    let toTheLeft = column - 1;
    for (let index = toTheLeft; index > 0; index--) {
      let key = `${row},${toTheLeft}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      roomsWithOutWallToTheLeft++;
      toTheLeft--;
    }

    this.log(
      "Total -> O: " + roomsWithOutWallToTheLeft + " en la fila: " + row
    );

    if (
      roomsWithOutWallToTheLeft + roomsWithOutWallToTheUp >=
      roomsWithLigthAllowed
    )
      isAllowed = true;

    return isAllowed;
  }

  case_9(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowedMax = 4;
    const roomsWithLigthAllowedMin = 3;
    let isAllowed = false;

    let roomsWithOutWallToTheRight = 0;
    let toTheRight = column + 1;
    for (let index = column; index < sizeColumn; index++) {
      let key = `${row},${toTheRight}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheRight++;
      roomsWithOutWallToTheRight++;
    }

    this.log(
      "Total -> E : " + roomsWithOutWallToTheRight + " en la fila: " + row
    );

    let roomsWithOutWallToTheDown = 0;
    let toTheDown = row + 1;
    for (let index = 0; index < sizeRow; index++) {
      let key = `${toTheDown},${column}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheDown++;
      roomsWithOutWallToTheDown++;
    }

    this.log(
      "Total -> S: " + roomsWithOutWallToTheDown + " en la columna: " + column
    );

    let roomsWithOutWallToTheLeft = 0;
    let toTheLeft = column - 1;
    for (let index = toTheLeft; index > 0; index--) {
      let key = `${row},${toTheLeft}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      roomsWithOutWallToTheLeft++;
      toTheLeft--;
    }

    this.log(
      "Total -> O: " + roomsWithOutWallToTheLeft + " en la fila: " + row
    );

    let roomsWithOutWallToTheUp = 0;
    let toTheUp = row - 1;
    for (let index = 0; index < sizeRow; index++) {
      let key = `${toTheUp},${column}`;
      let withWall = this.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheUp--;
      roomsWithOutWallToTheUp++;
    }

    this.log("Total -> N: " + roomsWithOutWallToTheUp + " en la fila: " + row);

    let totalRoomsWithOutWall =
      roomsWithOutWallToTheRight +
      roomsWithOutWallToTheDown +
      roomsWithOutWallToTheLeft +
      roomsWithOutWallToTheUp;

    if (
      totalRoomsWithOutWall >= roomsWithLigthAllowedMax
      //||totalRoomsWithOutWall >= roomsWithLigthAllowedMin
    )
      isAllowed = true;

    return isAllowed;
  }

  log(msg) {
    //console.log(msg);
  }
}

module.exports = new Point();
