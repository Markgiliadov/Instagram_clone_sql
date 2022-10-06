let express = require("express");
let mysql = require("mysql");
const cors = require("cors");

let app = express();
app.use(cors({ origin: "*" }));
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123123",
  database: "ig_clone_db",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB!");
});

app.get("/sort", async (req, res) => {
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

app.get("/filter", async (req, res) => {
  console.log(req.headers);
  // if (req.headers.tablename) {
    const tableName = req.headers.tablename;
    const sorting = req.headers.sorting;
    const orderVal = req.headers.orderval;
    const firstDate = req.headers.firstdate;
    const lastDate = req.headers.lastdate;
    const colFlag = req.headers.colflag;
    console.log(colFlag)
    let sqlSelectQuery = ""
    if(colFlag){
      console.log('inside')
      sqlSelectQuery = `SELECT * FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = N'${}' AND TABLE_SCHEMA = "ig_clone_db";`

    }
    else{
    console.log(firstDate, lastDate)
    // let sqlSelectQuery = "";
    // if (tableName && sorting && orderVal) {
    console.log("hello");
    sqlSelectQuery = `SELECT * FROM ${tableName} WHERE created_at BETWEEN ${firstDate.toString()} AND ${lastDate.toString()}`;

    // if (req.headers.sorting == "asc")
    
  }
  con.query(sqlSelectQuery, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
    // }
  // }
});

app.listen(3400, () => {
  console.log(`Server listening port: 3400`);
});

module.exports = app;
