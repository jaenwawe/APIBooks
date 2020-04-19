const query = require("./app");
const getURL = require("./app");

test("should output short query", () => {
  const text = ["Sunday", "Dinner"];
  expect(query(text)).toBe("the+Sunday+Dinner");
});

// test("should output url", () => {
//   const text = ["sunday", "dinner"];
//   expect(getURL(text)).toBe(
//     "https://www.googleapis.com/books/v1/volumes?q=the+sunday+dinner&fields=items(volumeInfo/authors,volumeInfo/title, volumeInfo/publisher)&maxResults=5&key=AIzaSyAXwdxRzOHwF6uviyne4Vg20sXh_5Ek_Wc"
//   );
// });
