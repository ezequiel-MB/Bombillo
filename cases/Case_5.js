const { ROOM } = require("../constants");
const Helper = require("../Helper");
const { Validation } = require("../Validation");

class Case_5 extends Validation {
  /**
   *  ⬆
   *  x ➡
   */

  isValid(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowedMax = 4;

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
      let withWall = Helper.findValueByKey(coord, key);
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
      let withWall = Helper.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheRight++;
      roomsWithOutWallToTheRight++;
    }

    let totalRoomsWithOutWall = roomsWithOutWallToTheRight + totalToTheUp;

    let payload = {
      thereAreLight: thereAreLight,
      thereAreWall: thereAreWall,
      totalRoomsWithOutWall: totalRoomsWithOutWall,
      roomsWithLigthAllowedMax: roomsWithLigthAllowedMax
    };

    return this.toTheNorth(payload);
  }
}

module.exports = new Case_5();
