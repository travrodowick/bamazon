var inquirer = require("inquirer");

start();
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userInput",
        message: "what do you want to do?",
        choices: ["view inventory", "make a purchase"]
      }

      // After the prompt, store the user's response in a variable called location.
    ])
    .then(function(response) {
      if (response.userInput === "make a purchase") {
      } else {
        console.log("oh you aint tryna make a purchase....");
      }
    });
  start();
}


function custPurchase(responseTwod) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "#### ",
        message: "what do you want?",
        choices: ["this", "that", "the other thing"]
      }
    ])
    .then(function(responseTwo) {
      console.log("response.###");
      console.log(response);
      if (response.operation === "search artist") {
        searchArtist();
      } else if (
        response.operation === "search for an artist appearing multiple times"
      ) {
        multApp();
      } else if (response.operation === "search a range") {
        itemRange();
      } else if (response.operation === "search for a song") {
        searchSong();
      }
    });