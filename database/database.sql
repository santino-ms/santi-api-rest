--CREATE DATABASE pruebas_santi;

USE heroku_01fec67f954047a;

--USE pruebas_santi;

CREATE TABLE game (
    id  INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(180),
    descriptions VARCHAR(255),
    image VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

RENAME TABLE game to games;

DESCRIBE games;