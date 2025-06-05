CREATE DATABASE DB_FRAMAFOOD;
GO
USE DB_FRAMAFOOD;
GO
CREATE TABLE ROLES(-- 'ADMINISTRADOR', 'MESERA', 'CHEF', 'CAJERA'
IDROL       INT PRIMARY KEY IDENTITY(1,1)  NOT NULL,
NOMBRE      VARCHAR(50) NOT NULL
);

INSERT INTO ROLES VALUES('ADMINISTRADOR');
INSERT INTO ROLES VALUES('MESERA');
INSERT INTO ROLES VALUES('CHEF');
INSERT INTO ROLES VALUES('CAJERA');

GO
CREATE TABLE USUARIOS (
    IDUSUARIO         INT PRIMARY KEY IDENTITY(1,1),
	IDROL             INT NOT NULL,
    NOMBRE            VARCHAR(100) NOT NULL,
    USUARIOLOGIN      VARCHAR(50) NOT NULL,
    CONTRASENA        VARCHAR(255) NOT NULL, 
    ESTADO            BIT NOT NULL DEFAULT 1,
	CONSTRAINT FK_ROL_USU FOREIGN KEY(IDROL) REFERENCES ROLES(IDROL) 
);
GO

CREATE UNIQUE INDEX INU_USU_USULOGIN
ON USUARIOS (USUARIOLOGIN);

GO
CREATE TABLE MESAS (
    IDMESA          INT PRIMARY KEY IDENTITY(1,1),
    NUMERO          VARCHAR(5) NOT NULL,
	CANTIDAD_SILLA  INT NOT NULL,
    ESTADO          CHAR(3) NOT NULL, 
	CONSTRAINT CK_ESTADO_MESA CHECK (ESTADO IN('DIS','OCU','ESC'))-- 'DISPONIBLE', 'OCUPADA', ESPERA CUENTA
);
GO

CREATE UNIQUE INDEX INU_MES_NUM
ON MESAS (NUMERO);

GO
CREATE TABLE PLATOS (
    IDPLATO        INT PRIMARY KEY IDENTITY(1,1),
    NOMBRE         VARCHAR(100) NOT NULL,
    DESCRIPCION    VARCHAR(500) NOT NULL,
    PRECIO         DECIMAL(10,2) NOT NULL,
    CATEGORIA      CHAR(3)    NOT NULL,
	CONSTRAINT CK_CAT_PLAT CHECK (CATEGORIA IN('COM','BEB','POS'))-- 'COMIDA', 'BEBIDA', POSTRES
);
GO
CREATE TABLE RECETAS (
    IDRECETA      INT PRIMARY KEY IDENTITY(1,1),
    IDPLATO       INT  NOT NULL,
    INSTRUCCIONES VARCHAR(1000) NOT NULL,
	CONSTRAINT FK_REC_PLA FOREIGN KEY (IDPLATO) REFERENCES PLATOS(IDPLATO)
);
GO
CREATE TABLE PEDIDOS (
    IDPEDIDO     INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    IDMESA       INT NOT NULL,
    IDMESERA     INT NOT NULL,
    FECHAHORA    DATETIME NOT NULL DEFAULT GETDATE(),
    ESTADO       CHAR(4) NOT NULL,
	CONSTRAINT CK_PED_EST CHECK (ESTADO IN('PEND','PREP','LIST')),-- 'PENDIENTE', 'EN PREPARACIÓN', 'LISTO', ETC.
	CONSTRAINT FK_MESA_PED FOREIGN KEY (IDMESA) REFERENCES MESAS(IDMESA),
	CONSTRAINT FK_MESERA_PED FOREIGN KEY(IDMESERA) REFERENCES USUARIOS(IDUSUARIO)
);
GO
CREATE TABLE DETALLEPEDIDO (
    IDDETALLE INT PRIMARY KEY IDENTITY(1,1),
    IDPEDIDO  INT NOT NULL,
    IDPLATO   INT NOT NULL,
	IDCHEF    INT NOT NULL,
	COMENTARIO   VARCHAR(500),
	CANTIDAD     INT NOT NULL DEFAULT 0,
    ESTADO    CHAR(4) NOT NULL, 
	CONSTRAINT CK_DETPED_EST CHECK (ESTADO IN('COCI','LIST', 'ENVI')),-- 'EN COCINA', 'LISTO', Enviado por Mesera
	CONSTRAINT FK_DETPED_DET_PED  FOREIGN KEY (IDPEDIDO) REFERENCES PEDIDOS(IDPEDIDO),
	CONSTRAINT FK_MESERA_DET_PED FOREIGN KEY (IDPLATO) REFERENCES PLATOS(IDPLATO),
	CONSTRAINT FK_CHEF_DET_PED FOREIGN KEY(IDCHEF) REFERENCES USUARIOS(IDUSUARIO)
);
GO
CREATE TABLE FACTURAS (
    IDFACTURA  INT PRIMARY KEY IDENTITY(1,1),
    IDPEDIDO   INT NOT NULL,
    IDCAJERA   INT NOT NULL,
    MONTOTOTAL DECIMAL(10,2) NOT NULL,
	FECHAHORA  DATETIME NOT NULL DEFAULT GETDATE(),
    METODOPAGO CHAR(3)  NOT NULL,
	CONSTRAINT CK_FACT_METO CHECK (METODOPAGO IN('EFE','TAR')),-- 'EFECTIVO', 'TARJETA'
	CONSTRAINT FK_PED_FACT FOREIGN KEY(IDPEDIDO) REFERENCES PEDIDOS(IDPEDIDO),
	CONSTRAINT FK_FACT_CAJ FOREIGN KEY(IDCAJERA) REFERENCES USUARIOS(IDUSUARIO)
);

INSERT INTO MESAS VALUES('A1',2,'DIS');
INSERT INTO MESAS VALUES('A2',2,'DIS');
INSERT INTO MESAS VALUES('A3',2,'DIS');
INSERT INTO MESAS VALUES('A4',4,'DIS');
INSERT INTO MESAS VALUES('A5',3,'DIS');
INSERT INTO MESAS VALUES('A6',4,'DIS');
INSERT INTO MESAS VALUES('A7',5,'DIS');
INSERT INTO MESAS VALUES('A8',6,'DIS');

-- PLATOS: COMIDAS
INSERT INTO PLATOS (NOMBRE, DESCRIPCION, PRECIO, CATEGORIA) VALUES
('Pollo a la Parrilla', 'Pechuga marinada a la parrilla con vegetales.', 250.00, 'COM'),
('Spaghetti Boloñesa', 'Pasta con salsa boloñesa de carne y tomate.', 220.00, 'COM'),
('Hamburguesa Clásica', 'Hamburguesa con queso, lechuga y tomate.', 280.00, 'COM'),
('Tacos de Carne', 'Tortillas rellenas con carne, cebolla y cilantro.', 210.00, 'COM'),
('Pechuga al Ajillo', 'Pechuga salteada con ajo y especias.', 240.00, 'COM'),
('Arroz con Pollo', 'Arroz amarillo con pollo y vegetales.', 230.00, 'COM'),
('Lasagna de Carne', 'Capas de pasta con carne, salsa y queso.', 260.00, 'COM'),
('Sancocho Dominicano', 'Guiso de carnes y víveres típico.', 300.00, 'COM'),
('Pescado Frito', 'Filete de pescado empanizado y frito.', 270.00, 'COM'),
('Ensalada César', 'Lechuga, pollo, crutones y aderezo César.', 180.00, 'COM');

-- PLATOS: BEBIDAS
INSERT INTO PLATOS (NOMBRE, DESCRIPCION, PRECIO, CATEGORIA) VALUES
('Jugo Natural de Naranja', 'Jugo recién exprimido.', 80.00, 'BEB'),
('Refresco de Cola', 'Bebida gaseosa con hielo.', 60.00, 'BEB'),
('Café Espresso', 'Café negro concentrado.', 50.00, 'BEB'),
('Té Frío de Limón', 'Té negro con limón y hielo.', 65.00, 'BEB'),
('Batido de Fresa', 'Leche, fresa y azúcar.', 90.00, 'BEB'),
('Agua Mineral', 'Agua con gas servida fría.', 40.00, 'BEB'),
('Mojito Sin Alcohol', 'Lima, hierbabuena y soda.', 95.00, 'BEB'),
('Jugo de Piña', 'Piña natural licuada.', 75.00, 'BEB'),
('Malta Fría', 'Bebida de malta sin alcohol.', 70.00, 'BEB'),
('Limonada Fría', 'Jugo de limón natural con azúcar.', 70.00, 'BEB');

-- PLATOS: POSTRES
INSERT INTO PLATOS (NOMBRE, DESCRIPCION, PRECIO, CATEGORIA) VALUES
('Pastel de Chocolate', 'Bizcocho de chocolate con cobertura.', 120.00, 'POS'),
('Helado de Vainilla', 'Helado cremoso con sirope.', 100.00, 'POS'),
('Flan de Leche', 'Postre horneado a base de leche y huevo.', 110.00, 'POS'),
('Tres Leches', 'Bizcocho bañado en mezcla de tres leches.', 130.00, 'POS'),
('Brownie con Nuez', 'Bizcocho de chocolate con nueces.', 115.00, 'POS');

-- RECETAS: COMIDAS
INSERT INTO RECETAS (IDPLATO, INSTRUCCIONES) VALUES
(1, 'Marinar pollo con especias, luego asar a la parrilla hasta que esté bien cocido.'),
(2, 'Cocinar pasta. Preparar salsa con carne molida y tomate. Mezclar.'),
(3, 'Preparar carne molida. Armar hamburguesa con pan, vegetales y queso.'),
(4, 'Cocinar carne con especias. Servir en tortillas con cebolla y cilantro.'),
(5, 'Saltear ajo en aceite, añadir pechuga y cocinar a fuego medio.'),
(6, 'Cocer arroz con vegetales. Añadir pollo guisado. Servir caliente.'),
(7, 'Preparar capas de pasta con carne y salsa. Hornear con queso encima.'),
(8, 'Hervir carnes y víveres en caldero grande por 2 horas.'),
(9, 'Sazonar, empanizar y freír el pescado hasta dorar.'),
(10, 'Cortar lechuga y pollo, añadir crutones y aderezo César.');

-- RECETAS: POSTRES
INSERT INTO RECETAS (IDPLATO, INSTRUCCIONES) VALUES
(21, 'Mezclar ingredientes, hornear el pastel y añadir cobertura de chocolate.'),
(22, 'Congelar mezcla de vainilla y leche. Servir con sirope.'),
(23, 'Hornear mezcla de leche, huevos y azúcar al baño maría.'),
(24, 'Hornear bizcocho, empapar en mezcla de leches y refrigerar.'),
(25, 'Mezclar chocolate, azúcar y nueces. Hornear hasta que esté firme.');

