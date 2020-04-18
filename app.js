//1. npm install --save xmlhttprequest
//2. To search run node app query search terms e.g. node app query moon walk
//3.  To add to User List  run node app add #  e.g. node app add 0
//todo Unit test

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");
let words;
let myList = "./userList.txt";
let jsonList = "./ list.json";
const Http = new XMLHttpRequest();

if (process.argv[2] === "query") {
  let url = getURL();
  internet(url);
  getListFromFile();
} else if (process.argv[2] === "add") {
  addToMyList();
}

function internet(url) {
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {
    let booksObj = Http.responseText;
    createList(booksObj);
    createListFile(myList);
  };
}

function add(words) {
  for (let i = 0; i < words.items.length; i++) {
    let insert = `\n Title:      ${words.items[i].volumeInfo.title} \n Authors:    ${words.items[i].volumeInfo.authors} \n Publisher:  ${words.items[i].volumeInfo.publisher}`;
    if (i == process.argv[3]) {
      userList(insert);
    }
  }
}

function addToMyList() {
  fs.readFile("./list.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log(err);
    } else {
      words = JSON.parse(jsonString);
      //console.log(words);
      // console.log(jsonString);
      //add(jsonString); //axios

      words = JSON.parse(jsonString);
      add(words);
    }
  });
}

function printBooks(words) {
  console.log("words.items.length is " + words.items.length);
  for (let i = 0; i < words.items.length; i++) {
    console.log(`Press ${i} to save this book to your book list`);
    console.log("Title: " + words.items[i].volumeInfo.title);
    console.log("Authors: " + words.items[i].volumeInfo.authors);
    console.log("Publisher: " + words.items[i].volumeInfo.publisher);
  }
}

function getListFromFile() {
  fs.readFile("./list.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log(err);
    } else {
      words = JSON.parse(jsonString);
      printBooks(words);
    }
  });
}

function createListFile(myList) {
  fs.writeFile(myList, " ", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(myList + " created");
    }
  });
}

function createList(booksObj) {
  fs.writeFile("./list.json", booksObj, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Books entered into List.json");
    }
  });
}

function getURL() {
  let url =
    "https://www.googleapis.com/books/v1/volumes?q=" +
    query() +
    "&fields=items(volumeInfo/authors,volumeInfo/title, volumeInfo/publisher)&maxResults=5&key=AIzaSyAXwdxRzOHwF6uviyne4Vg20sXh_5Ek_Wc";
  console.log(url);
  return url;
}

function query() {
  let query = "the";
  for (let i = 3; i < process.argv.length; i++) {
    query = query + `+${process.argv[i]}`;
  }
  console.log(query);
  return query;
}

function userList(insert) {
  fs.appendFile("./userList.txt", insert, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Book entered into UserList.txt");
    }
  });
}

//const axios = require("axios");

// function addAxios(words) {
//   for (const volumeInfo in words) {
//     let insert = `\n Title:      ${volumeInfo.title} \n Authors:    ${volumeInfo.authors} \n Publisher:  ${volumeInfo.publisher}`;
//     // console.log(insert);
//     if (volumeInfo.length == process.argv[3] && process.argv[2] == "add") {
//       userList(insert);
//     }
//   }
// }

// axios
//   .get(url)
//   .then((res) => {
//     console.log(res.data.items);
//     let inner = res.data.items;
//     //console.log(inner);
//     // createList(JSON.parse(inner));
//     //console.log(JSON.stringify(inner));
//     createList(JSON.stringify(inner));
//   })
//   .catch((err) => {
//     console.log(err);
//   });
