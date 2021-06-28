const { ROOM } = require("./constants");

class Helper {
  process(code, data) {
    return {
      code: code,
      data: data
    };
  }

  convertArrayToALevel(arrays) {
    return arrays.reduce((acc, current) => acc.concat(current), []);
  }

  convertArrayToObject(array) {
    return array.reduce((acc, current) => Object.assign(acc, current), {});
  }

  separateStringByRegex(data, regex = /\r?\n/) {
    return data.split(regex);
  }

  findValueByKey(array, key) {
    return array.find(item => item[`${key}`]);
  }

  separatedStringArraysByRegex(data, regex = " ") {
    let array = [];

    data.map(item => {
      if (item) array.push(item.trim().split(regex));
    });

    return array;
  }

  getCurrentTime() {
    let currentTime = new Date();

    let time =
      currentTime.getHours() +
      ":" +
      currentTime.getMinutes() +
      ":" +
      currentTime.getSeconds();

    return time.toString();
  }

  findValueByKeyAndValue(array, key, value = ROOM.WITH_LIGHT) {
    return array.find(item => item[`${key}`] == 0 && item[`${key}`] != value);
  }

  findValueByKey(array, key) {
    return array.find(item => item[`${key}`]);
  }
}

module.exports = new Helper();
