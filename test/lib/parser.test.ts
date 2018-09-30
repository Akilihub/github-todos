import "jest";
import parseData from "../../src/lib/parser";

const data = {
    "type": "file",
    "encoding": "base64",
    "size": 5362,
    "name": "README.md",
    "path": "README.md",
    "content": `//TODO: @aleku399 look into why this was causing bars not to show`,
};

describe("parsed data tests", () => {
    it.only("should return modified parsed data", () => {
      const _data = parseData(data);
      expect(_data).toMatchSnapshot();
    });
});

