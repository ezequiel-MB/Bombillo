const { ROOM } = require("./constants");
const Helper = require("./Helper");

class Bombillo {
  distribution(data) {
    let arrays = this.getSpaceSeparatedArray(data.split(/\r?\n/));
    let coord = this.getCoordinatesWithValue(arrays);

    let d = this.dataDummy();
    //console.log(d[0][0]);
    let newArray = this.putLight(this.dataDummy());
    this.showArray(newArray);
    /*console.log(
      "Left: " + JSON.stringify(this.getLeftDiagonal(this.dataDummy(), 3, 2))
    );
    console.log(
      "Right: " + JSON.stringify(this.getRightDiagonal(this.dataDummy(), 3, 2))
    );*/
  }
  showArray(data) {
    let str = "";
    data.map((array, row) => {
      array.map((item, column) => {
        str += item[`${row + 1},${column + 1}`] + " ";
      });
      console.log(str);
      str = "";
    });
  }

  getSpaceSeparatedArray(data) {
    let array = [];

    data.map(item => {
      array.push(item.split(" "));
    });

    return array;
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

  dataDummy() {
    return [
      [
        { "1,1": "0", hasLight: false },
        { "1,2": "0", hasLight: false },
        { "1,3": "0", hasLight: false },
        { "1,4": "0", hasLight: false }
      ],
      [
        { "2,1": "1", hasLight: false },
        { "2,2": "0", hasLight: false },
        { "2,3": "0", hasLight: false },
        { "2,4": "0", hasLight: false }
      ],
      [
        { "3,1": "0", hasLight: false },
        { "3,2": "0", hasLight: false },
        { "3,3": "0", hasLight: false },
        { "3,4": "0", hasLight: false }
      ],
      [
        { "4,1": "0", hasLight: false },
        { "4,2": "0", hasLight: false },
        { "4,3": "0", hasLight: false },
        { "4,4": "0", hasLight: false }
      ]
    ];
  }

  /**
    [
    0 = [{ "1,1": "0" }, { "1,2": "0" }, { "1,3": "0" }, { "1,4": "1" }],
    1 = [{ "2,1": "0" }, { "2,2": "0" }, { "2,3": "0" }, { "2,4": "0" }],
    2 = [{ "3,1": "0" }, { "3,2": "0" }, { "3,3": "0" }, { "3,4": "0" }],
    3 = [{ "4,1": "0" }, { "4,2": "0" }, { "4,3": "0" }, { "4,4": "0" }]
    ] 
   */

  /**
   * Colocamos luz
   */
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
            arrays[row][column][`${row + 1},${column + 1}`] = "F";
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
      let isValue = this.findValue(hasValue, key);

      if (isValue != null && isValue[key]) {
        rightDiagonal.push(isValue);
      }

      rowCurrent--;
      columnCurrent--;
    });

    return rightDiagonal;
  }

  findValue(array, key) {
    return array.find(item => item[`${key}`]);
  }

  getLeftDiagonal(data, rowCurrent, columnCurrent) {
    let leftDiagonal = [];
    let hasValue = Helper.convertArrayToALevel(data);

    data.map((array, row) => {
      let key = `${rowCurrent},${columnCurrent}`;
      let isValue = this.findValue(hasValue, key);

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
