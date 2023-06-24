CREATE SCHEMA crudmobile;

CREATE TABLE roupas (
id INT NOT NULL AUTO_INCREMENT,
tipo VARCHAR (250) NOT NULL,
marca VARCHAR (250),
tamanho INT NOT NULL,
valorpecas_de_roupapecas_de_roupa DECIMAL (7,2) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO roupas (id, tipo, marca, tamanho, valor)
VALUES ('1', 'Salto', 'Versace', '36', '5000.00'),
('2', 'Bolsa', 'Chanel', '0', '8299.99'),
('3', 'Cinto', 'Ferragamo', '0', '3999.99');

SELECT * FROM roupas;

CREATE VIEW pecas_de_roupa AS
SELECT * FROM roupas;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'lidy123'