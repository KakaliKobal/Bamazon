var inquirer = require("inquirer");
var mysql = require("mysql");
var objects;

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
    menu();
  });

function menu() {
    inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer){
        switch (answer.action) {
            case "View Products for Sale":
              productSearch();
              break;
    
            case "View Low Inventory":
              inventorySearch();
              break;
    
            case "Add to Inventory":
              addInventory();
              break;
    
            case "Add New Product":
              addProduct();
              break;
        }
         
    })
}

function productSearch() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.log("Items for sale!\n");
        for (var i = 0; i < res.length; i++){
            console.log(
                "ID: " +
                res[i].item_id +
                " || Item: " +
                res[i].product_name +
                " || Price: $" +
                res[i].price +
                " || In Stock: " +
                res[i].stock_quantity
                );
        };
        menu();
    });
}

function inventorySearch() {
    connection.query("Select * FROM products", function(err, res){
        if (err) throw err;
        var result;
        for (var i = 0; i < res.length; i++){
            result = res[i];
        }; 
        if (result.stock_quantity < 5) {
            console.log("Items with low inventory are:\n");
            console.log(
                "ID: " +
                result.item_id +
                " || Item: " +
                result.product_name +
                " || Price: $" +
                result.price +
                " || In Stock: " +
                result.stock_quantity
            );
        } else {
            console.log("There are no items in low stock")
        };
        menu();
    });
}

function addInventory() {
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
                    message: "What would you like to add inventory to?",
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
                    message: "How many would you like to add?",
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
                    
                  if (results[i].product_name === answer.choice) {
                    chosenItem = results[i];
                  }
                }
                var stock = chosenItem.stock_quantity += parseInt(answer.amount)
                connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                        stock_quantity: stock
                    },
                    {
                        item_id: chosenItem.item_id
                    }
                  ],
                  function(error) {
                    if (error) {
                        console.log(error);
                        throw error;   
                    }
                    console.log("Succesfully added to inventory!");
                    menu();
                  }
                );
            });
    });
};

function addProduct() {
    inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item you would like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What department does this item belong to?"
      },
      {
        name: "price",
        type: "input",
        message: "What is this items price?",
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
          message: "How many would you like to add?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
      }
    ])
    .then(function(answer) {
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.item,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.amount
          },
          function(err) {
            if (err) throw err;
            console.log("Your product was created successfully!");
            menu();
          }
        );
      });
}