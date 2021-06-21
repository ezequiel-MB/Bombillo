const { ROOM, SYMBOL } = require("./constants");

class HTML {
  create(data) {
    return `
        <!DOCTYPE html>
        <html lang="en">
           <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
              <title>Document</title>
              <style type="text/css">
              table,td {
                border-collapse: collapse;
                border: 0.1em solid black;
              }    
              </style>
            <tbody>
              <table>
                ${this.getRowsAndColumn(data)}
              </table>
        </html>
      `;
  }

  getRowsAndColumn(data) {
    let str = "";

    data.map((array, row) => {
      str += "<tr>";
      array.map((item, column) => {
        let roomCurrent = item[`${row + 1},${column + 1}`];
        if (roomCurrent == ROOM.WITH_WALL) {
          str +=
            `<td style="background-color: black">` + SYMBOL.LIGHT + "</td>";
        } else if (roomCurrent == ROOM.WITH_LIGHT) {
          str +=
            `<td style="background-color: yellow;">` + SYMBOL.LIGHT + "</td>";
        } else {
          str +=
            `<td style="background-color: white; color:white;">` +
            SYMBOL.LIGHT +
            "</td>";
        }
      });
      str += "</tr>";
    });

    return str;
  }
}

module.exports = new HTML();
