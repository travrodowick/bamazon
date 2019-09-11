DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(30) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("strawberry", "grocery", .25, 500),
("banana", "grocery", .75, 1000 ),
("cookie", "grocery", 3.00, 100),
("rags", "household", 13.00, 50),
("bleach", "household", 4.00, 10),
("detergent", "household", 23.00, 40),
("motor oil", "auto", 10.00, 30),
("windshield wipers", "auto", 35.00, 15),
("air freshener", "auto", 2.00, 80),
("receptacle", "home repair", 5.00, 50),
("light bulbs", "home repair", 4.00, 100),
("paint", "home repair", 35.00, 300);
