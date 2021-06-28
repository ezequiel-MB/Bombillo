const { ROOM } = require("../constants");
const Helper = require("../Helper");
const { Validation } = require("../Validation");

class Case_8 extends Validation {
  //n y m son iguales (cuadratica)
  /**
   *    ⬆
   * ⬅ x
   */
  isValid(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowedMax = 4;

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
      let withWall = Helper.findValueByKey(coord, key);
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
      let withWall = Helper.findValueByKey(coord, key);
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

    let payload = {
      thereAreLightToTheUp: thereAreLightToTheUp,
      thereAreLightToTheLeft: thereAreLightToTheLeft,
      thereAreWallToTheUp: thereAreWallToTheUp,
      thereAreWallToTheLeft: thereAreWallToTheLeft,
      totalRoomsWithOutWall: totalRoomsWithOutWall,
      roomsWithLigthAllowedMa: roomsWithLigthAllowedMax
    };

    return this.toTheWestAndNorth(payload);
  }
}

module.exports = new Case_8();
