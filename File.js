const fs = require("fs");
const { STATUS } = require("./constants");
const Helper = require("./Helper");

class File {
  read(path, encoding = "utf-8") {
    let data = {};

    try {
      data = Helper.process(
        STATUS.OK,
        fs.readFileSync(path, { encoding: encoding })
      );
    } catch (errorCurrent) {
      data = Helper.process(STATUS.FAILED, errorCurrent);
    }
    return data;
  }
}

module.exports = new File();
