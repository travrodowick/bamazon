var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

//start customer interaction
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userInput",
        message: "what do you want to do?",
        choices: ["view inventory", "make a purchase"]
      }
    ])
    .then(function(response) {
      if (response.userInput === "make a purchase") {
        console.log(" oh you is tryna make a purchase?");
        custPurchase();
      } else {
        console.log(
          "oh you aint tryna make a purchase.... check out what we've got"
        );
        viewInventory();
      }
    });
}

var custPurch;

function custPurchase(response) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "purchase",
        message:
          "\n what do you want to buy? \n please enter an item ID # \n we only have 12 items at the moment"
      }
    ])
    .then(function(response) {
      var query = "SELECT * FROM products WHERE item_id = " + response.purchase;
      connection.query(query, function(err, res) {
        custPurch = res[0];
        if (custPurch.item_id === undefined) {
          console.log("go fish sucker!");
          start();
        } else {
          console.log(response.purchase);
          howMany(response);
        }
      });
    });
}

//view inventory called from start menu
function viewInventory() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, result) {
    for (var i = 0; i < result.length; i++) {
      console.log(
        "\n ----------------------" +
          "\n product:  " +
          result[i].product_name +
          "\n price:  " +
          result[i].price +
          "\n # items in stock:  " +
          result[i].stock_quantity +
          "\n------------------------"
      );
    }
    start();
  });
}

//how many called from customer purchase function
function howMany(response) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "howMany",
        message: "what do you want to buy?",
        message: "please enter a valid amount"
      }
    ])
    .then(function(responseTwo) {
      var queryTwo =
        "SELECT * FROM products WHERE item_id = " + response.purchase;
      connection.query(queryTwo, function(err, result) {
        console.log(queryTwo);
        console.log(
          "responseTwo:",
          responseTwo.howMany,
          "\n stock_quantity:  ",
          custPurch.stock_quantity
        );

        if (responseTwo.howMany <= custPurch.stock_quantity) {
          var stockUpdate = custPurch.stock_quantity - responseTwo.howMany;
          var queryThree =
            "UPDATE products SET stock_quantity = " +
            stockUpdate +
            "WHERE item_id =" +
            response.purchase;
          connection.query(queryThree, function(err, updateResults) {
            console.log("i think you just bought some");
            console.log("new stock quantity:  ", stockUpdate);
            start();
          });
        } else {
          console.log("you and i both know that wasnt gonna work");
          start();
        }
      });
    });
}
