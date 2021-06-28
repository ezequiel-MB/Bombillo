const { ROOM } = require("../constants");
const Helper = require("../Helper");
const { Validation } = require("../Validation");

class Case_2 extends Validation {
  /**
   *   ⬅ x ➡
   *      ⬇
   *
   */
  isValid(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowedMax = 4;
    const roomsWithLigthAllowedMin = 3;

    let roomsWithOutWallToTheRight = 0;
    let toTheRight = column + 1;
    for (let index = column; index < sizeColumn; index++) {
      let key = `${row},${toTheRight}`;
      let withWall = Helper.findValueByKeyAndValue(coord, key);

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
      let withWall = Helper.findValueByKey(coord, key);
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
      let withWall = Helper.findValueByKeyAndValue(coord, key);

      if (!withWall) {
        break;
      }
      toTheDown++;
      roomsWithOutWallToTheDown++;
    }

    let totalRoomsWithOutWall =
      roomsWithOutWallToTheRight + totalToTheLeft + roomsWithOutWallToTheDown;

    let payload = {
      thereAreLight: thereAreLight,
      thereAreWall: thereAreWall,
      totalRoomsWithOutWall: totalRoomsWithOutWall,
      roomsWithLigthAllowedMax: roomsWithLigthAllowedMax
    };

    return this.toTheWest(payload);
  }
}

module.exports = new Case_2();
