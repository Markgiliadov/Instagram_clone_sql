let express = require("express");
let mysql = require("mysql");
const cors = require("cors");

//csv parsing imports
var fastcsv = require("fast-csv");
const fs = require("fs");
let ws;

let app = express();

//mongo section
const { MongoClient } = require("mongodb");
const e = require("express");
// Replace the uri string with your connection string.
const uri = "mongodb://192.168.1.156:27017";
const uriPocoF3 = "mongodb://192.168.29.100:27017";
const client = new MongoClient(uriPocoF3);
//mongo end
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

//mongo
async function run() {
  try {
    const database = client.db("my-db");
    const movies = database.collection("students");
    // Query for a movie that has the title 'Back to the Future'
    const query = { firstName: "Sami" };
    const movie = await movies.find();
    const movieArr = await movie.toArray();
    // movie.map((element) => {
    //   console.log(element);
    // });
    movieArr.forEach(async (el) => {
      const d = await el;
      console.log(d);
    });
    // console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
//mongo-end
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

app.get("/export", async (req, response) => {
  const tableName = req.headers.tablename;
  let sqlSelectQuery = `SELECT * FROM ${tableName}`;
  con.query(sqlSelectQuery, (err, res) => {
    if (err) throw err;

    const jsonData = JSON.parse(JSON.stringify(res));
    console.log("jsonData: ", jsonData);
    ws = fs.createWriteStream(`${tableName}_fastcsv.csv`);
    // fs.writeFileSync("/", jsonData);
    fastcsv
      .write(jsonData, { headers: true })
      .on("finish", function () {
        console.log(`Write to ${tableName}_fastcsv.csv successfully!`);
      })
      .pipe(ws);
    response.send(res);
  });
});
app.get("/import", async (req, response) => {
  const tableName = req.headers.tablename;
  let sqlSelectQuery = `SELECT * FROM ${tableName}`;
  con.query(sqlSelectQuery, (err, res) => {
    if (err) throw err;

    const jsonData = JSON.parse(JSON.stringify(res));
    console.log("jsonData: ", jsonData);

    try {
      console.log(fs.existsSync(`./${tableName}_fastcsv.csv`));
      if (fs.existsSync(`./${tableName}_fastcsv.csv`)) {
        ws = fs.createReadStream(`./${tableName}_fastcsv.csv`);
        var dataArr = [];
        if (ws)
          fastcsv
            .parseFile(`./${tableName}_fastcsv.csv`, { headers: true })
            .on("data", (data) => {
              dataArr.push(data);
            })
            .on("end", () => {
              if (dataArr) response.send(dataArr);
              else response.send(null);
              console.log("what up" + JSON.stringify(dataArr) + "YOOOO");
              // > 4187
            });
      } else {
        console.log("falsess");
        response.send({ success: "fail" });
        return;
      }
      // ws = fs.createReadStream(`./${tableName}_fastcsv.csv`);
      // else response.send(null);
    } catch (err) {
      console.error(err);
    }
    // if (fs.existsSync(`./${tableName}_fastcsv.csv`))
    //   ws = fs.createReadStream(`./${tableName}_fastcsv.csv`);
    // // } catch (error) {
    // else response.send(undefined);
    // console.log(err);
    // }
    // fs.writeFileSync("/", jsonData);
    // let data = [];
    //asd

    //asd
    // if (ws)
    //   ws.pipe(fastcsv.parse({ headers: true }))
    //     .on("error", (error) => console.log(error))
    //     .on("data", (row) => data.push(row))
    //     .on("end", () => {
    //       console.log(`Write to ${tableName}_fastcsv.csv successfully!`);
    //       response.send(data);
    //     });
    // else response.send("err");
  });
});
app.get("/filter", async (req, res) => {
  console.log(req.headers);
  // if (req.headers.tablename) {
  const tableName = req.headers.tablename;
  const sorting = req.headers.sorting;
  const orderVal = req.headers.orderval;
  const firstDate = req.headers.firstdate;
  const lastDate = req.headers.lastdate;
  const colFlag = req.headers.colflag === "true";
  console.log(typeof colFlag);
  let sqlSelectQuery = "";
  if (colFlag) {
    console.log("inside");
    sqlSelectQuery = `SELECT * FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = N'${tableName}' AND TABLE_SCHEMA = "ig_clone";`;
  } else {
    console.log(firstDate, lastDate);
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

app.get("/join", async (req, res) => {
  const tableName1 = req.headers.tablename1;
  const tableName2 = req.headers.tablename2;
  const paramCol1 = req.headers.paramcol1;
  const paramCol2 = req.headers.paramcol2;
  console.log(tableName1, tableName2);
  const joinedFlag = req.headers.joinedflag;
  const sorting = req.headers.sorting;
  const orderVal = req.headers.orderval;

  let sqlSelectQuery = "";
  console.log("inside2");
  if (joinedFlag == "true") {
    sqlSelectQuery = `SELECT * FROM ${tableName1} t1 JOIN ${tableName2} t2 ON t1.${paramCol1} = t2.${paramCol2}`;
    console.log(sqlSelectQuery);
  } else if (tableName1) {
    sqlSelectQuery = `SELECT * FROM ${tableName1}`;
  } else if (tableName2) {
    sqlSelectQuery = `SELECT * FROM ${tableName2}`;
  }
  con.query(sqlSelectQuery, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3400, () => {
  console.log(`Server listening port: 3400`);
});

module.exports = app;
