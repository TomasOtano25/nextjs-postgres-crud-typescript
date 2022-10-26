import { Pool } from "pg";

let conn: any;

if (!conn) {
  conn = new Pool({
    user: "root",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "crud_store",
  });
}

export { conn };
