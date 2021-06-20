const fs = require("fs");

class File {
  read(path, encoding = "utf-8") {
    let data = {};

    try {
      data = {
        message: true,
        data: fs.readFileSync(path, { encoding: encoding })
      };
    } catch (errorCurrent) {
      data = { message: false, data: errorCurrent };
    }
    return data;
  }

  d() {
    return [
      [{ "1,1": "0" }, { "1,2": "0" }, { "1,3": "0" }, { "1,4": "1" }],
      [{ "2,1": "0" }, { "2,2": "0" }, { "2,3": "0" }, { "2,4": "0" }],
      [{ "3,1": "0" }, { "3,2": "0" }, { "3,3": "0" }, { "3,4": "0" }],
      [{ "4,1": "0" }, { "4,2": "0" }, { "4,3": "0" }, { "4,4": "0" }]
    ];
  }
}

module.exports = new File();
