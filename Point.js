const { ROOM } = require("./constants");

class Point {
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

    let roomsWithOutWallToTheLeft = 0;
    let toTheLeft = column - 1;

    let roomsWithWall = 0;
    let distanceFromCurrentPointToLight = 0;
    let cont = 0;
    let thereAreWall = false;
    let thereAreLight = false;
    let totalToTheLeft = 0;

    for (let index = toTheLeft; index > 0; index--) {
      let key = `${row},${toTheLeft}`;
      let withWall = this.findValueByKey(coord, key);
      let value = withWall[key];

      toTheLeft--;
      cont++;

      if (value != null && value == ROOM.WITHOUT_WALL) {
        roomsWithOutWallToTheLeft++;
        continue;
      }

      if (value != null && value == ROOM.WITH_WALL) {
        roomsWithWall++;
        if (roomsWithWall == 1) totalToTheLeft = roomsWithOutWallToTheLeft;

        break;
      }

      if (value != null && value == ROOM.WITH_LIGHT) {
        thereAreLight = true;
        distanceFromCurrentPointToLight = cont - 1;
        totalToTheLeft = roomsWithOutWallToTheLeft;

        if (roomsWithWall > 0) thereAreWall = true;

        break;
      }
    }

    if (totalToTheLeft == 0) totalToTheLeft = roomsWithOutWallToTheLeft;

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

    let totalRoomsWithOutWall =
      roomsWithOutWallToTheRight + totalToTheLeft + roomsWithOutWallToTheDown;

    if (thereAreLight) {
      if (thereAreWall) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = false;
      } else {
        if (distanceFromCurrentPointToLight >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else {
      if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
      else isAllowed = false;
    }

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

    let roomsWithWall = 0;
    let distanceFromCurrentPointToLight = 0;
    let cont = 0;
    let thereAreWall = false;
    let thereAreLight = false;
    let totalToTheUp = 0;

    for (let index = toTheUp; index > 0; index--) {
      let key = `${toTheUp},${column}`;
      let withWall = this.findValueByKey(coord, key);
      let value = withWall[key];

      toTheUp--;
      cont++;

      if (value != null && value == ROOM.WITHOUT_WALL) {
        roomsWithOutWallToTheUp++;
        continue;
      }

      if (value != null && value == ROOM.WITH_WALL) {
        roomsWithWall++;

        if (roomsWithWall == 1) totalToTheUp = roomsWithOutWallToTheUp;

        break;
      }

      if (value != null && value == ROOM.WITH_LIGHT) {
        thereAreLight = true;
        distanceFromCurrentPointToLight = cont - 1;
        totalToTheUp = roomsWithOutWallToTheUp;

        if (roomsWithWall > 0) thereAreWall = true;

        break;
      }
    }

    if (totalToTheUp == 0) totalToTheUp = roomsWithOutWallToTheUp;

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

    let totalRoomsWithOutWall =
      totalToTheUp + roomsWithOutWallToTheDown + roomsWithOutWallToTheRight;

    if (thereAreLight) {
      if (thereAreWall) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = true;
      } else {
        if (distanceFromCurrentPointToLight >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else {
      if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
      else isAllowed = false;
    }

    return isAllowed;
  }

  case_5(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowedMax = 4;
    let isAllowed = false;

    let roomsWithOutWallToTheUp = 0;
    let toTheUp = row - 1;

    let roomsWithWall = 0;
    let distanceFromCurrentPointToLight = 0;
    let cont = 0;
    let thereAreWall = false;
    let thereAreLight = false;
    let totalToTheUp = 0;

    for (let index = toTheUp; index > 0; index--) {
      let key = `${toTheUp},${column}`;
      let withWall = this.findValueByKey(coord, key);
      let value = withWall[key];

      toTheUp--;
      cont++;

      if (value != null && value == ROOM.WITHOUT_WALL) {
        roomsWithOutWallToTheUp++;
        continue;
      }

      if (value != null && value == ROOM.WITH_WALL) {
        roomsWithWall++;
        if (roomsWithWall == 1) totalToTheUp = roomsWithOutWallToTheUp;

        break;
      }

      if (value != null && value == ROOM.WITH_LIGHT) {
        thereAreLight = true;
        distanceFromCurrentPointToLight = cont - 1;
        totalToTheUp = roomsWithOutWallToTheUp;

        if (roomsWithWall > 0) thereAreWall = true;

        break;
      }
    }

    if (totalToTheUp == 0) totalToTheUp = roomsWithOutWallToTheUp;

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

    let totalRoomsWithOutWall = roomsWithOutWallToTheRight + totalToTheUp;

    if (thereAreLight) {
      if (thereAreWall) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = false;
      } else {
        if (distanceFromCurrentPointToLight >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else {
      if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
      else isAllowed = false;
    }

    return isAllowed;
  }

  case_6(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowedMax = 4;
    const roomsWithLigthAllowedMin = 3;
    let isAllowed = false;

    let roomsWithOutWallToTheUp = 0;
    let toTheUp = row - 1;

    let roomsWithWallToTheUp = 0;
    let distanceFromCurrentPointToLightToUp = 0;
    let contToTheUp = 0;
    let thereAreWallToTheUp = false;
    let thereAreLightToTheUp = false;
    let totalToTheUp = 0;

    for (let index = toTheUp; index > 0; index--) {
      let key = `${toTheUp},${column}`;
      let withWall = this.findValueByKey(coord, key);
      let value = withWall[key];

      toTheUp--;
      contToTheUp++;

      if (value != null && value == ROOM.WITHOUT_WALL) {
        roomsWithOutWallToTheUp++;
        continue;
      }

      if (value != null && value == ROOM.WITH_WALL) {
        roomsWithWallToTheUp++;
        if (roomsWithWallToTheUp == 1) {
          totalToTheUp = roomsWithOutWallToTheUp;
        }

        break;
      }

      if (value != null && value == ROOM.WITH_LIGHT) {
        thereAreLightToTheUp = true;
        distanceFromCurrentPointToLightToUp = contToTheUp - 1;
        totalToTheUp = roomsWithOutWallToTheUp;
        if (roomsWithWallToTheUp > 0) thereAreWallToTheUp = true;

        break;
      }
    }

    if (totalToTheUp == 0) totalToTheUp = roomsWithOutWallToTheUp;

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

    let roomsWithOutWallToTheLeft = 0;
    let toTheLeft = column - 1;

    let roomsWithWallToTheLeft = 0;
    let distanceFromCurrentPointToLightToLeft = 0;
    let contToTheLeft = 0;
    let thereAreWallToTheLeft = false;
    let thereAreLightToTheLeft = false;
    let totalToTheLeft = 0;

    for (let index = toTheLeft; index > 0; index--) {
      let key = `${row},${toTheLeft}`;
      let withWall = this.findValueByKey(coord, key);
      let value = withWall[key];

      toTheLeft--;
      contToTheLeft++;

      if (value != null && value == ROOM.WITHOUT_WALL) {
        roomsWithOutWallToTheLeft++;
        continue;
      }

      if (value != null && value == ROOM.WITH_WALL) {
        roomsWithWallToTheLeft++;
        if (roomsWithWallToTheLeft == 1) {
          totalToTheLeft = roomsWithOutWallToTheLeft;
        }

        break;
      }

      if (value != null && value == ROOM.WITH_LIGHT) {
        thereAreLightToTheLeft = true;
        distanceFromCurrentPointToLightToLeft = contToTheLeft - 1;
        totalToTheLeft = roomsWithOutWallToTheLeft;
        if (roomsWithWallToTheLeft > 0) thereAreWallToTheLeft = true;

        break;
      }
    }

    if (totalToTheLeft == 0) totalToTheLeft = roomsWithOutWallToTheLeft;

    let totalRoomsWithOutWall =
      totalToTheUp + roomsWithOutWallToTheRight + totalToTheLeft;

    if (thereAreLightToTheUp && thereAreLightToTheLeft) {
      if (thereAreWallToTheUp && thereAreWallToTheLeft) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) {
          isAllowed = true;
        } else {
          isAllowed = false;
        }
      } else if (thereAreWallToTheUp && !thereAreWallToTheLeft) {
        if (distanceFromCurrentPointToLightToLeft >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
          else isAllowed = false;
        } else {
          isAllowed = false;
        }
      } else if (thereAreWallToTheLeft && !thereAreWallToTheUp) {
        if (distanceFromCurrentPointToLightToUp >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      } else {
        if (
          distanceFromCurrentPointToLightToUp >= roomsWithLigthAllowedMax &&
          distanceFromCurrentPointToLightToLeft >= roomsWithLigthAllowedMax
        ) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else if (thereAreLightToTheUp && !thereAreLightToTheLeft) {
      if (thereAreWallToTheUp) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = false;
      } else {
        if (distanceFromCurrentPointToLightToUp >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else if (thereAreLightToTheLeft && !thereAreLightToTheUp) {
      if (thereAreWallToTheLeft) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = false;
      } else {
        if (distanceFromCurrentPointToLightToLeft >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else {
      if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
      else isAllowed = false;
    }

    return isAllowed;
  }

  case_7(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowedMax = 4;
    const roomsWithLigthAllowedMin = 3;
    let isAllowed = false;

    let roomsWithOutWallToTheLeft = 0;
    let toTheLeft = column - 1;

    let roomsWithWallToTheLeft = 0;
    let distanceFromCurrentPointToLightToLeft = 0;
    let contToTheLeft = 0;
    let thereAreWallToTheLeft = false;
    let thereAreLightToTheLeft = false;
    let totalToTheLeft = 0;

    for (let index = toTheLeft; index > 0; index--) {
      let key = `${row},${toTheLeft}`;
      let withWall = this.findValueByKey(coord, key);
      let value = withWall[key];

      toTheLeft--;
      contToTheLeft++;

      if (value != null && value == ROOM.WITHOUT_WALL) {
        roomsWithOutWallToTheLeft++;
        continue;
      }

      if (value != null && value == ROOM.WITH_WALL) {
        roomsWithWallToTheLeft++;
        if (roomsWithWallToTheLeft == 1) {
          totalToTheLeft = roomsWithOutWallToTheLeft;
        }

        break;
      }

      if (value != null && value == ROOM.WITH_LIGHT) {
        thereAreLightToTheLeft = true;
        distanceFromCurrentPointToLightToLeft = contToTheLeft - 1;
        totalToTheLeft = roomsWithOutWallToTheLeft;
        if (roomsWithWallToTheLeft > 0) thereAreWallToTheLeft = true;

        break;
      }
    }

    if (totalToTheLeft == 0) totalToTheLeft = roomsWithOutWallToTheLeft;

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

    let roomsWithOutWallToTheUp = 0;
    let toTheUp = row - 1;

    let roomsWithWallToTheUp = 0;
    let distanceFromCurrentPointToLightToUp = 0;
    let contToTheUp = 0;
    let thereAreWallToTheUp = false;
    let thereAreLightToTheUp = false;
    let totalToTheUp = 0;

    for (let index = toTheUp; index > 0; index--) {
      let key = `${toTheUp},${column}`;
      let withWall = this.findValueByKey(coord, key);
      let value = withWall[key];

      toTheUp--;
      contToTheUp++;
      if (value != null && value == ROOM.WITHOUT_WALL) {
        roomsWithOutWallToTheUp++;
        continue;
      }

      if (value != null && value == ROOM.WITH_WALL) {
        roomsWithWallToTheUp++;
        if (roomsWithWallToTheUp == 1) {
          totalToTheUp = roomsWithOutWallToTheUp;
        }

        break;
      }

      if (value != null && value == ROOM.WITH_LIGHT) {
        thereAreLightToTheUp = true;
        distanceFromCurrentPointToLightToUp = contToTheUp - 1;
        totalToTheUp = roomsWithOutWallToTheUp;
        if (roomsWithWallToTheUp > 0) thereAreWallToTheUp = true;

        break;
      }
    }

    if (totalToTheUp == 0) totalToTheUp = roomsWithOutWallToTheUp;

    let totalRoomsWithOutWall =
      totalToTheUp + roomsWithOutWallToTheDown + totalToTheLeft;

    if (thereAreLightToTheUp && thereAreLightToTheLeft) {
      if (thereAreWallToTheUp && thereAreWallToTheLeft) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) {
          isAllowed = true;
        } else {
          isAllowed = false;
        }
      } else if (thereAreWallToTheUp && !thereAreWallToTheLeft) {
        if (distanceFromCurrentPointToLightToLeft >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
          else isAllowed = false;
        } else {
          isAllowed = false;
        }
      } else if (thereAreWallToTheLeft && !thereAreWallToTheUp) {
        if (distanceFromCurrentPointToLightToUp >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      } else {
        if (
          distanceFromCurrentPointToLightToUp >= roomsWithLigthAllowedMax &&
          distanceFromCurrentPointToLightToLeft >= roomsWithLigthAllowedMax
        ) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else if (thereAreLightToTheUp && !thereAreLightToTheLeft) {
      if (thereAreWallToTheUp) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = false;
      } else {
        if (distanceFromCurrentPointToLightToUp >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else if (thereAreLightToTheLeft && !thereAreLightToTheUp) {
      if (thereAreWallToTheLeft) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = false;
      } else {
        if (distanceFromCurrentPointToLightToLeft >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else {
      if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
      else isAllowed = false;
    }

    return isAllowed;
  }

  case_8(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowedMax = 4;
    let isAllowed = false;

    let roomsWithOutWallToTheUp = 0;
    let toTheUp = row - 1;

    let roomsWithWallToTheUp = 0;
    let distanceFromCurrentPointToLightToUp = 0;
    let contToTheUp = 0;
    let thereAreWallToTheUp = false;
    let thereAreLightToTheUp = false;
    let totalToTheUp = 0;

    for (let index = toTheUp; index > 0; index--) {
      let key = `${toTheUp},${column}`;
      let withWall = this.findValueByKey(coord, key);
      let value = withWall[key];

      toTheUp--;
      contToTheUp++;
      if (value != null && value == ROOM.WITHOUT_WALL) {
        roomsWithOutWallToTheUp++;
        continue;
      }

      if (value != null && value == ROOM.WITH_WALL) {
        roomsWithWallToTheUp++;
        if (roomsWithWallToTheUp == 1) {
          totalToTheUp = roomsWithOutWallToTheUp;
        }

        break;
      }

      if (value != null && value == ROOM.WITH_LIGHT) {
        thereAreLightToTheUp = true;
        distanceFromCurrentPointToLightToUp = contToTheUp - 1;
        totalToTheUp = roomsWithOutWallToTheUp;
        if (roomsWithWallToTheUp > 0) thereAreWallToTheUp = true;

        break;
      }
    }

    if (totalToTheUp == 0) totalToTheUp = roomsWithOutWallToTheUp;

    let roomsWithOutWallToTheLeft = 0;
    let toTheLeft = column - 1;

    let roomsWithWallToTheLeft = 0;
    let distanceFromCurrentPointToLightToLeft = 0;
    let contToTheLeft = 0;
    let thereAreWallToTheLeft = false;
    let thereAreLightToTheLeft = false;
    let totalToTheLeft = 0;

    for (let index = toTheLeft; index > 0; index--) {
      let key = `${row},${toTheLeft}`;
      let withWall = this.findValueByKey(coord, key);
      let value = withWall[key];

      toTheLeft--;

      contToTheLeft++;

      if (value != null && value == ROOM.WITHOUT_WALL) {
        roomsWithOutWallToTheLeft++;
        continue;
      }

      if (value != null && value == ROOM.WITH_WALL) {
        roomsWithWallToTheLeft++;
        if (roomsWithWallToTheLeft == 1) {
          totalToTheLeft = roomsWithOutWallToTheLeft;
        }

        break;
      }

      if (value != null && value == ROOM.WITH_LIGHT) {
        thereAreLightToTheLeft = true;
        distanceFromCurrentPointToLightToLeft = contToTheLeft - 1;
        totalToTheLeft = roomsWithOutWallToTheLeft;
        if (roomsWithWallToTheLeft > 0) thereAreWallToTheLeft = true;

        break;
      }
    }

    if (totalToTheLeft == 0) totalToTheLeft = roomsWithOutWallToTheLeft;

    let totalRoomsWithOutWall = totalToTheUp + totalToTheLeft;

    if (thereAreLightToTheUp && thereAreLightToTheLeft) {
      if (thereAreWallToTheUp && thereAreWallToTheLeft) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) {
          isAllowed = true;
        } else {
          isAllowed = false;
        }
      } else if (thereAreWallToTheUp && !thereAreWallToTheLeft) {
        if (distanceFromCurrentPointToLightToLeft >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
          else isAllowed = false;
        } else {
          isAllowed = false;
        }
      } else if (thereAreWallToTheLeft && !thereAreWallToTheUp) {
        if (distanceFromCurrentPointToLightToUp >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      } else {
        if (
          distanceFromCurrentPointToLightToUp >= roomsWithLigthAllowedMax &&
          distanceFromCurrentPointToLightToLeft >= roomsWithLigthAllowedMax
        ) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else if (thereAreLightToTheUp && !thereAreLightToTheLeft) {
      if (thereAreWallToTheUp) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = false;
      } else {
        if (distanceFromCurrentPointToLightToUp >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else if (thereAreLightToTheLeft && !thereAreLightToTheUp) {
      if (thereAreWallToTheLeft) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = false;
      } else {
        if (distanceFromCurrentPointToLightToLeft >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else {
      if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
      else isAllowed = false;
    }

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

    let roomsWithOutWallToTheLeft = 0;
    let toTheLeft = column - 1;

    let roomsWithWallToTheLeft = 0;
    let distanceFromCurrentPointToLightToLeft = 0;
    let contToTheLeft = 0;
    let thereAreWallToTheLeft = false;
    let thereAreLightToTheLeft = false;
    let totalToTheLeft = 0;

    for (let index = toTheLeft; index > 0; index--) {
      let key = `${row},${toTheLeft}`;
      let withWall = this.findValueByKey(coord, key);
      let value = withWall[key];

      toTheLeft--;
      contToTheLeft++;

      if (value != null && value == ROOM.WITHOUT_WALL) {
        roomsWithOutWallToTheLeft++;
        continue;
      }

      if (value != null && value == ROOM.WITH_WALL) {
        roomsWithWallToTheLeft++;
        if (roomsWithWallToTheLeft == 1) {
          totalToTheLeft = roomsWithOutWallToTheLeft;
        }

        break;
      }

      if (value != null && value == ROOM.WITH_LIGHT) {
        thereAreLightToTheLeft = true;
        distanceFromCurrentPointToLightToLeft = contToTheLeft - 1;
        totalToTheLeft = roomsWithOutWallToTheLeft;
        if (roomsWithWallToTheLeft > 0) thereAreWallToTheLeft = true;

        break;
      }
    }

    if (totalToTheLeft == 0) totalToTheLeft = roomsWithOutWallToTheLeft;

    let roomsWithOutWallToTheUp = 0;
    let toTheUp = row - 1;

    let roomsWithWallToTheUp = 0;
    let distanceFromCurrentPointToLightToUp = 0;
    let contToTheUp = 0;
    let thereAreWallToTheUp = false;
    let thereAreLightToTheUp = false;
    let totalToTheUp = 0;

    for (let index = toTheUp; index > 0; index--) {
      let key = `${toTheUp},${column}`;
      let withWall = this.findValueByKey(coord, key);
      let value = withWall[key];

      toTheUp--;
      contToTheUp++;

      if (value != null && value == ROOM.WITHOUT_WALL) {
        roomsWithOutWallToTheUp++;
        continue;
      }

      if (value != null && value == ROOM.WITH_WALL) {
        roomsWithWallToTheUp++;
        if (roomsWithWallToTheUp == 1) {
          totalToTheUp = roomsWithOutWallToTheUp;
        }

        break;
      }

      if (value != null && value == ROOM.WITH_LIGHT) {
        thereAreLightToTheUp = true;
        distanceFromCurrentPointToLightToUp = contToTheUp - 1;
        totalToTheUp = roomsWithOutWallToTheUp;
        if (roomsWithWallToTheUp > 0) thereAreWallToTheUp = true;

        break;
      }
    }

    if (totalToTheUp == 0) totalToTheUp = roomsWithOutWallToTheUp;

    let totalRoomsWithOutWall =
      roomsWithOutWallToTheRight +
      roomsWithOutWallToTheDown +
      totalToTheLeft +
      totalToTheUp;

    if (thereAreLightToTheUp && thereAreLightToTheLeft) {
      if (thereAreWallToTheUp && thereAreWallToTheLeft) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) {
          isAllowed = true;
        } else {
          isAllowed = false;
        }
      } else if (thereAreWallToTheUp && !thereAreWallToTheLeft) {
        if (distanceFromCurrentPointToLightToLeft >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
          else isAllowed = false;
        } else {
          isAllowed = false;
        }
      } else if (thereAreWallToTheLeft && !thereAreWallToTheUp) {
        if (distanceFromCurrentPointToLightToUp >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      } else {
        if (
          distanceFromCurrentPointToLightToUp >= roomsWithLigthAllowedMax &&
          distanceFromCurrentPointToLightToLeft >= roomsWithLigthAllowedMax
        ) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else if (thereAreLightToTheUp && !thereAreLightToTheLeft) {
      if (thereAreWallToTheUp) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = false;
      } else {
        if (distanceFromCurrentPointToLightToUp >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else if (thereAreLightToTheLeft && !thereAreLightToTheUp) {
      if (thereAreWallToTheLeft) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = false;
      } else {
        if (distanceFromCurrentPointToLightToLeft >= roomsWithLigthAllowedMax) {
          if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax)
            isAllowed = true;
        } else {
          isAllowed = false;
        }
      }
    } else {
      if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
      else isAllowed = false;
    }

    return isAllowed;
  }

  findValueByKeyAndValue(array, key, value = ROOM.WITH_LIGHT) {
    return array.find(item => item[`${key}`] == 0 && item[`${key}`] != value);
  }

  findValueByKey(array, key) {
    return array.find(item => item[`${key}`]);
  }
  log(msg) {
    //console.log(msg);
  }
}

module.exports = new Point();
