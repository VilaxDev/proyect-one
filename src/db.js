import { createPool } from "mysql2/promise";

import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from "./config.js";

let host = DB_HOST;
let user = DB_USER;
let password = DB_PASSWORD;
let database = DB_NAME;
let port = DB_PORT;

if (process.env.DATABASE_URL) {
  try {
    const url = new URL(process.env.DATABASE_URL);
    host = url.hostname || host;
    port = url.port || port;
    user = url.username || user;
    password = url.password || password;
    database = url.pathname ? url.pathname.slice(1) : database;
  } catch (err) {
    // invalid URL — fall back to individual env vars
  }
}

export const pool = createPool({
  host,
  user,
  password,
  database,
  port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
