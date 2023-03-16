const { HOST, USER, PASSWORD, DATABASE } = require("dotenv").config()["parsed"]
const mysql = require("mysql");

const conToDb = mysql.createConnection({
  host: HOST || "localhost",
  user: USER || "sa",
  password: PASSWORD || "123123",
  database: DATABASE || "QUANLYNHANSU"
})

conToDb.connect((err) => {
  if (err) throw err;
  console.log("Connected to mysql")
})

module.exports = conToDb