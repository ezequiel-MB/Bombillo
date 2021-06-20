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
}

module.exports = new File();
