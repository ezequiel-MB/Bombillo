const { ROOM, STATUS } = require("./constants");
const Helper = require("./Helper");

class Bombillo {
  distribution(data) {
    let arrays = Helper.separatedStringArraysByRegex(
      Helper.separateStringByRegex(data)
    );

    if (!this.isValidData(arrays)) {
      return Helper.process(
        STATUS.FAILED,
        "La matriz contiene un valor no permitdo."
      );
    }

    let coord = this.getCoordinatesWithValue(arrays);
    let distribution = this.putLight(coord.array);

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
    let columns = data.length;
    let rows = 0;

    data.map((array, indexArray) => {
      let position = [];
      rows += array.length;

      array.map((item, indexItem) => {
        position.push({
          [`${indexArray + 1 + "," + (indexItem + 1)}`]: item,
          hasLight: false
        });
      });

      coord.push(position);
    });

    return { array: coord, columns: columns, rows: rows / columns };
  }

  putLight(arrays) {
    arrays.map((array, row) => {
      array.map((item, column) => {
        let rowCurrent = row + 1;
        let columnCurrent = column + 1;

        let valueCurrent = item[`${rowCurrent},${columnCurrent}`];

        if (valueCurrent != ROOM.WITH_WALL) {
          let isValid = this.validatePoint({
            array: array,
            arrays: arrays,
            rowCurrent: rowCurrent,
            columnCurrent: columnCurrent
          });

          if (isValid) {
            arrays[row][column].hasLight = true;
            arrays[row][column][`${row + 1},${column + 1}`] = ROOM.WITH_LIGHT;
          }
        }
      });
    });

    return arrays;
  }

  validatePoint(data) {
    const { array, arrays, rowCurrent, columnCurrent } = data;

    let hasLightColumn = this.validateRooms(array);
    let hasLightRow = this.validateRooms(this.getColumn(arrays, columnCurrent));
    let hasLightRightDiagonal = this.validateRooms(
      this.getRightDiagonal(arrays, rowCurrent, columnCurrent)
    );
    let hasLightLeftDiagonal = this.validateRooms(
      this.getLeftDiagonal(arrays, rowCurrent, columnCurrent)
    );

    if (
      !hasLightColumn &&
      !hasLightRow &&
      !hasLightRightDiagonal &&
      !hasLightLeftDiagonal
    )
      return true;

    return false;
  }

  validateRooms(rooms) {
    let hasLight = false;

    rooms.map(item => {
      let keys = Object.keys(item);

      if (item[keys[1]]) hasLight = true;
    });

    return hasLight;
  }

  getColumn(data, position) {
    let column = [];

    data.map(arrayCurrent => {
      column.push(arrayCurrent[position - 1]);
    });

    return column;
  }

  getRightDiagonal(data, rowCurrent, columnCurrent) {
    let rightDiagonal = [];
    let hasValue = Helper.convertArrayToALevel(data);

    data.map((array, row) => {
      let key = `${rowCurrent},${columnCurrent}`;
      let isValue = Helper.findValueByKey(hasValue, key);

      if (isValue != null && isValue[key]) {
        rightDiagonal.push(isValue);
      }

      rowCurrent--;
      columnCurrent--;
    });

    return rightDiagonal;
  }

  getLeftDiagonal(data, rowCurrent, columnCurrent) {
    let leftDiagonal = [];
    let hasValue = Helper.convertArrayToALevel(data);

    data.map((array, row) => {
      let key = `${rowCurrent},${columnCurrent}`;
      let isValue = Helper.findValueByKey(hasValue, key);

      if (isValue != null && isValue[key]) {
        leftDiagonal.push(isValue);
      }

      rowCurrent--;
      columnCurrent++;
    });

    return leftDiagonal;
  }
}

module.exports = new Bombillo();
