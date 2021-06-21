const path = require("path");

const { isValidData } = require("../Bombillo");
const { read } = require("../File");
const { create } = require("../PDF");
const {
  separatedStringArraysByRegex,
  separateStringByRegex
} = require("../Helper");

const { STATUS } = require("../constants");
const { HTML } = require("../data");

const getDirPath = fileName => path.join(__dirname, fileName);

const getDataFromtFile = dirPath => {
  return separatedStringArraysByRegex(
    separateStringByRegex(read(dirPath).data)
  );
};

describe("bombillo", () => {
  test("validate to read a file", () => {
    const dirPath = getDirPath("/rooms.test.txt");

    const expected = STATUS.OK;
    const result = read(dirPath);
    expect(expected).toBe(result.code);
  });

  test("validate when a file cannot be read", () => {
    const dirPath = getDirPath("/rooms.test.txtError");

    const expected = STATUS.FAILED;
    const result = read(dirPath);
    expect(expected).toBe(result.code);
  });

  test("validate that there are 1's and 0's from the read file", () => {
    const dirPath = getDirPath("/rooms.test.txt");
    const arrays = getDataFromtFile(dirPath);

    const expected = true;
    const result = isValidData(arrays);
    expect(expected).toBe(result);
  });

  test("validate that there is neither 1 nor 0 in the read file", () => {
    const dirPath = getDirPath("/rooms-bad.test.txt");
    const arrays = getDataFromtFile(dirPath);

    const expected = false;
    const result = isValidData(arrays);
    expect(expected).toBe(result);
  });

  test("create PDF", async () => {
    const dirPath = getDirPath("/BombilloTest.pdf");
    const result = await create(dirPath, HTML());

    const expected = STATUS.OK;

    expect(expected).toBe(result.code);
  });
});
