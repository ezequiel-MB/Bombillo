const Helper = require("../Helper");

class Case_3 {
  /*
   * ⬅ x
   *    ⬇
   */
  isValid(data, coord) {
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
      let withWall = Helper.findValueByKeyAndValue(coord, key);

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
}

module.exports = new Case_3();
