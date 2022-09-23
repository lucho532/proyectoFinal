DROP TABLE IF EXISTS users ; 
DROP TABLE IF EXISTS ruta ;
DROP TYPE IF EXISTS role ;

DROP EXTENSION IF EXISTS  "uuid-ossp";

CREATE TYPE role AS ENUM 
('admin', 'conductor', 'empleado');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
  dni VARCHAR(250) NOT NULL,
  nombre VARCHAR(250) NOT NULL,
  apellido VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  telefono VARCHAR(250) NOT NULL,
  direccion VARCHAR(250) NOT NULL,
  barrio VARCHAR(250) NOT NULL,
  matricula VARCHAR(250)NULL,
  role role NOT NULL
);

CREATE TABLE IF NOT EXISTS ruta (
  id uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
  dni NUMERIC(10) NOT NULL,
  nombre VARCHAR(20) NOT NULL,
  apellido VARCHAR(20) NOT NULL,
  email VARCHAR(250) NOT NULL,
  telefono NUMERIC(10) NOT NULL,
  direccion VARCHAR(20) NOT NULL,
  barrio VARCHAR(20) NOT NULL,
  matricula VARCHAR(20)  NULL
);



