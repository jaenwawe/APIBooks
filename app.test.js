const query = require("./app");

test("should output short query", () => {
  const text = ["Sunday", "Dinner"];
  expect(query(text)).toBe("the+Sunday+Dinner");
});
