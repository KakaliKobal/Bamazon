var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    start();
  });

function start() {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res){
        if (err) throw err;
        console.log("Items for sale!\n");
        for (var i = 0; i < res.length; i++){
            console.log(
                "ID: " +
                res[i].item_id +
                " || Item: " +
                res[i].product_name +
                " || Price: $" +
                res[i].price
                );
        };
    });
    purchase();
};

function purchase() {
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "list",
                    choices: function() {
                      var choiceArray = [];
                      for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                      }
                      return choiceArray;
                    },
                    message: "What would you like to purchase?",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                          return true;
                        }
                        return false;
                    }
                },
                {
                    name: "amount",
                    type: "input",
                    message: "How many would you like?",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                          return true;
                        }
                        return false;
                    }
                } 
            ])
            .then(function(answer){
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                  if (results[i].item_id === answer.choice) {
                    chosenItem = results[i];
                  }
                }
               
            })
    })
}
