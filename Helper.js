class Helper {
  convertArrayToALevel(arrays) {
    return arrays.reduce((acc, current) => acc.concat(current), []);
  }

  convertArrayToObject(array) {
    return array.reduce((acc, current) => Object.assign(acc, current), {});
  }
}

module.exports = new Helper();
