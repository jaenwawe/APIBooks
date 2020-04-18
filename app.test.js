const { query } = require("./app");
const { getUrl } = require("./app");

test("should output short query", () => {
  const argv = require("./argv");
  process.argv = ["node", "jest", "Sunday", "Dinner"];
  const text = query();
  expect(text).toBe("the+Sunday+Dinner");
});
