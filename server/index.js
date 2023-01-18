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
const uriPocoF3 = "mongodb://192.168.104.100:27017";
const uriPocoF32 = "mongodb://192.168.85.100:27017";
const uriBD = "mongodb://192.168.30.96:27017";
const client = new MongoClient(uri);
const database = client.db("my-db");
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
      console.log("\nsort : res:\n", result);
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
  });
});

app.get("/convert/getDocsByDate", async (req, response) => {
  const date = req.headers.date;
  console.log("##HEADERS##:" + JSON.stringify(req.headers));
  const collectionName = req.headers.collectionname;
  const dateFirst = req.headers.datefirst;
  const dateLast = req.headers.datelast;
  const database = client.db("my-db");
  const collection = database.collection(collectionName);
  console.log(collectionName);
  try {
    // console.log("\nGET DATA BY DATE\n");
    // await docsCursor =
    const dateTemp = dateLast;

    const dt1 = parseInt(dateFirst.substring(6, 8)) + 1;
    const mon1 = parseInt(dateFirst.substring(4, 6)) - 1;
    const yr1 = parseInt(dateFirst.substring(0, 4));

    const dt2 = parseInt(dateLast.substring(6, 8)) + 1;
    const mon2 = parseInt(dateLast.substring(4, 6)) - 1;
    const yr2 = parseInt(dateLast.substring(0, 4));
    console.log(dt1, mon1, yr1);
    const date1 = new Date(yr1, mon1, dt1);
    const date2 = new Date(yr2, mon2, dt2);

    // dateGT.setUTCDate(dateLast);
    console.log(date1, date2);
    const pipeline = [
      {
        $match: {
          created_at: {
            $gt: date1,
            $lt: date2,
            // new Date("2016-12-12")
          },
        },
      },
    ];
    console.log("BEFORE LOG:\n");
    const cursorToArrData = await collection.aggregate(pipeline).toArray();
    console.log(dateFirst, dateLast, cursorToArrData);
    response.send(cursorToArrData);
  } catch (error) {
    console.log(error);
  }
});
app.get("/convert/check_if_collection_exists", async (req, response) => {
  // console.log(req.headers);
  // if (req.headers.tablename) {
  const collectionName = req.headers.collectionname;
  const sorting = req.headers.sorting;
  const orderVal = req.headers.orderval;
  const firstDate = req.headers.firstdate;
  const lastDate = req.headers.lastdate;
  const colFlag = req.headers.colflag === "true";
  console.log("presenting\n\n\n\n\n");
  let sqlSelectQuery = "";
  const database = client.db("my-db");
  const collection = database.collection(collectionName);
  //mongo start

  try {
    let doesExist = false;
    const checkCollection = async () => {
      const d = await database
        .collection(collectionName)
        .find()
        .toArray(function (err, res) {
          console.log("\nss. is exist? " + res);
          if (res.length > 0) {
            doesExist = true;
            console.log("does exist ? ", doesExist);
          }
          response.send(doesExist);
        });
    };
    checkCollection();
  } catch (error) {
    console.log(error);
  }
});

app.get("/convert/getall", async (req, res) => {
  // console.log(req.headers);
  // if (req.headers.tablename) {
  const collectionName = req.headers.collectionname;
  const sorting = req.headers.sorting;
  const orderVal = req.headers.orderval;
  const firstDate = req.headers.firstdate;
  const lastDate = req.headers.lastdate;
  const colFlag = req.headers.colflag === "true";
  console.log("presenting\n\n\n\n\n");
  let sqlSelectQuery = "";

  //mongo start
  const database = client.db("my-db");
  const collection = database.collection(collectionName);
  try {
    const runMongo = async () =>
      await database.collection(collectionName).find({}).toArray();
    const data = await runMongo();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
app.get("/convert/deleteall", async (req, response) => {
  console.log(req.headers);
  const tableName = req.headers.tablename;
  const sorting = req.headers.sorting;
  const orderVal = req.headers.orderval;
  const firstDate = req.headers.firstdate;
  const lastDate = req.headers.lastdate;
  const colFlag = req.headers.colflag === "true";
  console.log(typeof colFlag);
  let sqlSelectQuery = "";

  // const runMongo = async (result) => {
  const database = client.db("my-db");
  const movies = database.collection(tableName);
  // const query = JSON.stringify(result[0]);
  // console.log("QUERY: " + query);
  const movie = await movies.deleteMany({});

  try {
    let doesExist = false;
    const checkCollection = async () => {
      const d = database
        .collection(tableName)
        .find({})
        .toArray(function (err, res) {
          console.log("RES:", res, "RESLL");
          if (res.length >= 0) {
            database.collection(tableName).drop((err, delOK) => {
              if (err) throw err;
              if (delOK) console.log("Collection dropped");
              response.send(true);
              // database.close();
            });
            console.log("does exist ? ", doesExist);
          } else response.send(false);
        });
    };
    checkCollection();
  } catch (error) {
    console.log(error);
  }

  // const movieDropped = await movie.console.log(movie);
  // };

  // sqlSelectQuery = `SELECT * FROM ${tableName}`;

  // con.query(sqlSelectQuery, (err, result) => {
  // if (err) throw err;
  // runMongo();
  // response.send(result);
  // });
});
app.get("/convert", async (req, res) => {
  const tableName = req.headers.tablename;
  const sorting = req.headers.sorting;
  const orderVal = req.headers.orderval;
  const firstDate = req.headers.firstdate;
  const lastDate = req.headers.lastdate;
  const colFlag = req.headers.colflag === "true";
  let sqlSelectQuery = "";

  const runMongo = async (result) => {
    const database = client.db("my-db");
    const collection = database.collection(tableName);
    const query = JSON.stringify(result[0]);
    console.log("QUERY: " + query);
    const docs = await collection.find();
    const movieArr = await docs.toArray();
    const oneStud = result[0];

    try {
      const newDocs = [];
      const ids = [];
      const cursors = [];
      // if (tableName == "users") {
      for (let i = 0; i < result.length; i++) {
        result[i]["_id"] = result[i].id;
        delete result[i].id;
        const doc = result[i];
        const query = { _id: doc._id };
      }
      await database.collection(tableName).insertMany(result);
      for (let i = 0; i < result.length; i++) {
        const doc = result[i];
        const query = { _id: doc._id };
        ids.push(query);
        cursors.push(database.collection(tableName).find(ids[i]));
      }
      cursors.forEach(async (cursor) => {
        await cursor.forEach((s) => console.log(s._id));
      });

      console.log(newDocs);
      // }
    } catch (error) {
      console.log(error);
    }

    movieArr.forEach(async (el) => {
      const d = await el;
    });
  };
  sqlSelectQuery = `SELECT * FROM ${tableName}`;
  con.query(sqlSelectQuery, (err, result) => {
    if (err) throw err;
    runMongo(result);
    res.send(result);
  });
});
app.get("/filter", async (req, res) => {
  console.log(req.headers);
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
    console.log("hello");
    sqlSelectQuery = `SELECT * FROM ${tableName} WHERE created_at BETWEEN ${firstDate.toString()} AND ${lastDate.toString()}`;
  }
  con.query(sqlSelectQuery, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
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
