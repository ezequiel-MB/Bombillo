const Helper = require("../Helper");

class Case_1 {
  /* *
   *   x ➡
   *   ⬇
   */

  isValid(data, coord) {
    const { sizeRow, sizeColumn, row, column } = data;
    const roomsWithLigthAllowed = 4;
    let isAllowed = false;

    let roomsWithOutWallToTheRight = 0;
    let toTheRight = column + 1;
    for (let index = 0; index < sizeColumn; index++) {
      let key = `${row},${toTheRight}`;
      let withWall = Helper.findValueByKeyAndValue(coord, key);

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
      let withWall = Helper.findValueByKeyAndValue(coord, key);

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
}

module.exports = new Case_1();
