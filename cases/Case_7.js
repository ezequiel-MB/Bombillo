const { ROOM } = require("../constants");
const Helper = require("../Helper");

class Case_7 {
  /**
   *    ⬆
   *  ⬅ x
   *    ⬇
   *
   */
  isValid(data, coord) {
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
}

module.exports = new Case_7();
