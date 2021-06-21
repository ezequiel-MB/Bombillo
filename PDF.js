const pdf = require("html-pdf");
const { STATUS } = require("./constants");
const Helper = require("./Helper");

class PDF {
  create(path, contenido, options = {}) {
    return new Promise((resolve, reject) => {
      pdf.create(contenido, options).toFile(path, function (err, res) {
        if (err) return reject(Helper.process(STATUS.FAILED, err));

        return resolve(Helper.process(STATUS.OK, res));
      });
    });
  }
}

module.exports = new PDF();
