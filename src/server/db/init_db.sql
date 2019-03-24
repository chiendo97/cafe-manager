DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    username VARCHAR(30),
    password VARCHAR(30),
    firstname VARCHAR(30),
    lastname VARCHAR(30)
);

INSERT INTO users (username, password, firstname, lastname)
VALUES ('t', 't', 'Chien', 'Le');

CREATE TABLE storage (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(30),
    price REAL,
    amount INTEGER
);

INSERT INTO storage (name, price, amount) 
VALUES ('Meat', 2.49, 15);
