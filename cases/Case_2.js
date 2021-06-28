const { ROOM } = require("../constants");
const Helper = require("../Helper");

class Case_2 {
  /**
   *   ⬅ x ➡
   *      ⬇
   *
   */
  isValid(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowedMax = 4;
    const roomsWithLigthAllowedMin = 3;

    let isAllowed = false;

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
}

module.exports = new Case_2();
