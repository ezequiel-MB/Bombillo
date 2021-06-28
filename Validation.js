class Validation {
  toTheWest(data) {
    const {
      thereAreLight,
      thereAreWall,
      totalRoomsWithOutWall,
      roomsWithLigthAllowedMax
    } = data;
    let isAllowed = false;

    if (thereAreLight) {
      if (thereAreWall) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = false;
      } else {
        isAllowed = false;
      }
    } else {
      if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
      else isAllowed = false;
    }

    return isAllowed;
  }

  toTheNorth(data) {
    const {
      thereAreLight,
      thereAreWall,
      totalRoomsWithOutWall,
      roomsWithLigthAllowedMax
    } = data;
    let isAllowed = false;

    if (thereAreLight) {
      if (thereAreWall) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = true;
      } else {
        isAllowed = false;
      }
    } else {
      if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
      else isAllowed = false;
    }

    return isAllowed;
  }

  toTheWestAndNorth(data) {
    const {
      thereAreLightToTheUp,
      thereAreLightToTheLeft,
      thereAreWallToTheUp,
      thereAreWallToTheLeft,
      totalRoomsWithOutWall,
      roomsWithLigthAllowedMax
    } = data;
    let isAllowed = false;

    if (thereAreLightToTheUp && thereAreLightToTheLeft) {
      if (thereAreWallToTheUp && thereAreWallToTheLeft) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) {
          isAllowed = true;
        } else {
          isAllowed = false;
        }
      } else {
        isAllowed = false;
      }
    } else if (thereAreLightToTheUp && !thereAreLightToTheLeft) {
      if (thereAreWallToTheUp) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = false;
      } else {
        isAllowed = false;
      }
    } else if (thereAreLightToTheLeft && !thereAreLightToTheUp) {
      if (thereAreWallToTheLeft) {
        if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
        else isAllowed = false;
      } else {
        isAllowed = false;
      }
    } else {
      if (totalRoomsWithOutWall >= roomsWithLigthAllowedMax) isAllowed = true;
      else isAllowed = false;
    }

    return isAllowed;
  }
}

module.exports = { Validation };
