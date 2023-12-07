CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT, 
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    admin VARCHAR(3) DEFAULT 'no', 
    token VARCHAR(255),
    date DATE,
    PRIMARY KEY (id)
);

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    productId INT, 
    productName VARCHAR(255),
    quantity INT(255),
    price INT, 
    date DATE,
    PRIMARY KEY (id)
);