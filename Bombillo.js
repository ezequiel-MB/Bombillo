const { ROOM, STATUS } = require("./constants");
const Helper = require("./Helper");
const Point = require("./Point");

class Bombillo {
  distribution(data) {
    let arrays = Helper.separatedStringArraysByRegex(
      Helper.separateStringByRegex(data)
    );

    if (!this.isValidData(arrays)) {
      return Helper.process(
        STATUS.FAILED,
        "La matriz contiene un valor no permitido."
      );
    }

    let coord = this.getCoordinatesWithValue(arrays);
    let distribution = this.putLight(coord.array, coord.rows, coord.columns);

    return Helper.process(STATUS.OK, distribution);
  }

  isValidData(data) {
    let isValid = true;

    data.map(array => {
      array.map(item => {
        if (item != ROOM.WITHOUT_WALL && item != ROOM.WITH_WALL)
          isValid = false;
      });
    });

    return isValid;
  }

  showRooms(data) {
    let str = "";
    data.map((array, row) => {
      array.map((item, column) => {
        str += item[`${row + 1},${column + 1}`] + " ";
      });
      console.log(str);
      str = "";
    });
  }

  getCoordinatesWithValue(data) {
    let coord = [];
    let rows = data.length;
    let columns = 0;

    data.map((array, indexArray) => {
      let position = [];
      columns += array.length;

      array.map((item, indexItem) => {
        position.push({
          [`${indexArray + 1 + "," + (indexItem + 1)}`]: item,
          hasLight: false
        });
      });

      coord.push(position);
    });

    return { array: coord, rows: rows, columns: columns / rows };
  }

  putLight(arrays, sizeRow, sizeColumn) {
    arrays.map((array, row) => {
      array.map((item, column) => {
        let rowCurrent = row + 1;
        let columnCurrent = column + 1;

        let valueCurrent = item[`${rowCurrent},${columnCurrent}`];

        if (valueCurrent != ROOM.WITH_WALL) {
          let coord = Helper.convertArrayToALevel(arrays);
          let isValidPut = Point.isCorrect(
            {
              sizeRow: sizeRow,
              sizeColumn: sizeColumn,
              row: rowCurrent,
              column: columnCurrent
            },
            coord
          );
          if (isValidPut) {
            arrays[row][column].hasLight = true;
            arrays[row][column][`${rowCurrent},${columnCurrent}`] =
              ROOM.WITH_LIGHT;
          }
        }
      });
    });

    return arrays;
  }
}

module.exports = new Bombillo();
