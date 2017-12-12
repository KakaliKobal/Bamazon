DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tonka Trucks", "Toys", 20, 34);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Board Games", "Toys", 15, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flat Screen TV", "Electronics", 1000, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Car Seat Hammock", "Pet Supplies", 64, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Malibu Barbie", "Toys", 15, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hair Brush", "Beauty Care", 8, 72);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dried Sardines", "Food", 5, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Table Lamp", "Lighting", 30, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Straight Razor", "Personal Care", 12, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gradient Rainbow Soft Wool Yarn", "Arts, Crafts, and Sewing", 13, 5);
