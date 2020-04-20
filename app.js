//npm install --save xmlhttprequest
//npm install --save-dev jest

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");
let words;
let myList = "./userList.txt";
let jsonList = "./ list.json";
const Http = new XMLHttpRequest();
("use strict");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question("q1 Please type your query ", (answer) => {
      let search = answer.split(" ");
      console.log(`Your query is' ${query(search)}`);
      let url = getURL(search);
      internet(url);
      getListFromFile();
      resolve();
    });
  });
};

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question(
      "q2 What book number (0-4) would you like to save? ",
      (answer) => {
        addToMyList(Number(answer));
        //console.log(`Thank you for your valuable feedback: ${answer}`);
        resolve();
      }
    );
  });
};

const main = async () => {
  await question1();
  await question2();
  rl.close();
};

main();

function query(search) {
  let query = "the";
  for (let i = 0; i < search.length; i++) {
    query = query + `+${search[i]}`;
  }
  console.log(query);
  return query;
}
module.exports = query;

function internet(url) {
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {
    let booksObj = Http.responseText;
    createList(booksObj);
    createListFile(myList);
  };
}

function add(words, num) {
  for (let i = 0; i < words.items.length; i++) {
    let insert = `\n Title:      ${words.items[i].volumeInfo.title} \n Authors:    ${words.items[i].volumeInfo.authors} \n Publisher:  ${words.items[i].volumeInfo.publisher}`;
    if (i == num) {
      userList(insert);
    }
  }
}

function addToMyList(num) {
  fs.readFile("./list.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log(err);
    } else {
      words = JSON.parse(jsonString);
      //console.log(words);
      // console.log(jsonString);
      //add(jsonString); //axios

      words = JSON.parse(jsonString);
      add(words, num);
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

function getURL(search) {
  let url =
    "https://www.googleapis.com/books/v1/volumes?q=" +
    query(search) +
    "&fields=items(volumeInfo/authors,volumeInfo/title, volumeInfo/publisher)&maxResults=5&key=AIzaSyAXwdxRzOHwF6uviyne4Vg20sXh_5Ek_Wc";
  console.log(url);
  return url;
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
