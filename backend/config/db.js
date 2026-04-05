import pkg from "pg"

const {Pool} = pkg

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "huyhd219205",
  database: "techflow_db",
  port: 5432
});

export default pool;