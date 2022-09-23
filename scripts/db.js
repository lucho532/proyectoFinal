const { sql } = require("slonik");
const {
  randEmail,
  randFullName,
  randUser,
  randVehicle,
  randPassword,
} = require("@ngneat/falso");

const create = async (db) => {
  await db.query(sql`
  DROP TABLE IF EXISTS users ;
  DROP TYPE IF EXISTS role ;
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TYPE role AS ENUM 
('admin', 'conductor', 'empleado');


  CREATE TABLE IF NOT EXISTS users (
    id uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
    dni VARCHAR(250) NOT NULL,
    nombre VARCHAR(250) NOT NULL,
    apellido VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    password TEXT NOT NULL ,
    telefono VARCHAR(250) NOT NULL,
    direccion VARCHAR(250) NOT NULL,
    barrio VARCHAR(250) NOT NULL,
    matricula VARCHAR(250)NULL,
    role role NOT NULL
  );
  
  `);
};

const populate = async (db) => {
  await db.transaction(async (tx) => {
    for await (const _ of Array.from({ length: 10 })) {
      const user = {
        dni: randUser().address.zipCode,
        nombre: randFullName(),
        apellido: randUser().lastName,
        email: randEmail(),
        password: randPassword(),
        telefono: randUser().phone,
        direccion: randUser().address.street,
        barrio: randUser().address.county,
        matricula: randVehicle(),
        role: "conductor",
      };

      await tx.query(sql`
        INSERT INTO users (
          dni, nombre, apellido, email, password, telefono, direccion,barrio, matricula,role
        ) VALUES (
         ${user.dni},
         ${user.nombre},
         ${user.apellido},
         ${user.email},
         ${user.password},
         ${user.telefono},
         ${user.direccion},
         ${user.barrio}, 
         ${user.matricula}, 
         ${user.role}
        );
      `);
    }
  });
};

const main = async () => {
  try {
    const db = await require("../configs/db");

    await create(db);
    console.info(":>creation complete");

    await populate(db);
    console.info(":>population completed");
  } catch (error) {
    console.info(":>db.error", error);
  }
};

main();
