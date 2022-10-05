let express = require("express");
let mysql = require("mysql");
const cors = require("cors");

let app = express();
app.use(cors({ origin: "*" }));
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123123",
  database: "ig_clone",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB!");
});

app.get("/", async (req, res) => {
  console.log(req.headers);
  if (req.headers.tablename) {
    const tableName = req.headers.tablename;
    const sorting = req.headers.sorting;
    const orderVal = req.headers.orderval;
    // let sqlSelectQuery = "";
    // if (tableName && sorting && orderVal) {
    console.log("hello");
    const sqlSelectQuery = `SELECT * FROM ${tableName} ORDER BY ${orderVal} ${sorting.toLocaleUpperCase()}`;

    // if (req.headers.sorting == "asc")
    con.query(sqlSelectQuery, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
    // }
  }
});

app.listen(3400, () => {
  console.log(`Server listening port: 3400`);
});

module.exports = app;
