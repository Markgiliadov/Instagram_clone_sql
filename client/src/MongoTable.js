import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableSortLabel } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { flexbox } from "@mui/system";
import dayjs from "dayjs";
import DateComp from "./DateComp";
import Comp from "./Comp";
import BasicSelect from "./SelectTable";
import Element from "./Element";

const MongoTable = ({
  isPartOfMongoPage,
  mongoColumns,
  setMongoColumns,
  data,
  chosenTable1,
  mongoData,
  setMongoData,
  dateFirst,
  dateLast,
}) => {
  // const [chosenTable, setChosenTable] = useState("users");
  const [sortActive, setSortActive] = useState({
    id: true,
    username: true,
    created_at: true,
  });

  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const [chosenTable2, setChosenTable2] = useState("users");
  const [chosenTable3, setChosenTable3] = useState("users");
  const [joinedData, setJoinedData] = useState([]);
  const [joinedColNames, setJoinedColNames] = useState([]);
  const [columnNames2, setColumnNames2] = useState([]);
  const [paramCol1, setParamCol1] = useState("");
  const [paramCol2, setParamCol2] = useState("");
  const [data2, setData2] = useState([]);
  const [loadingSpinner1, setLoadingSpinner1] = useState(false);
  const [loadingSpinner2, setLoadingSpinner2] = useState(false);
  const [loadingSpinner3, setLoadingSpinner3] = useState(false);
  const [loadingFileSpinner, setLoadingFileSpinner] = useState(false);
  const [mongoDataByDate, setMongoDataByDate] = useState([]);
  useEffect(() => {
    async function getDataByDate() {
      console.log(dateFirst, dateLast);
      const d = await fetch("http://localhost:3400/convert/getDocsByDate", {
        method: "GET",
        mode: "cors",
        headers: {
          date: value,
          collectionName: chosenTable1,
          dateFirst: dateFirst,
          dateLast: dateLast,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoadingFileSpinner(false);
          handleLoading(() => setLoadingSpinner1(() => false));
          return data;
        });
      setMongoColumns(Object.keys(d[0]));
      setMongoData(d);
      console.log(d);
      // console.log(await data.json());
    }
    async function asyncF() {
      await fetch("http://localhost:3400/convert/getall", {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          sorting: "asc",
          collectionName: chosenTable1,
          orderVal: "username",
          colFlag: true,
        },
      })
        .then((res) => res.json())
        .then((d) => {
          console.log(d);
          if (d.length === 0) {
            alert("Failed to import file!!");
            setMongoData([]);
            // setMongoColumns([]);

            handleLoading(() => setLoadingSpinner1(() => false));
            handleLoading(
              () => {
                setLoadingFileSpinner(false);
                console.log("data start" + d + "data end");
              },
              () => console.log("done")
            );
          } else {
            // alert("Got documents from collection successfully!!!");
            console.log("\n\n\ndata new: \n", d, "\nend new data\n\n");
            console.log("data1", Object.keys(d[0]));
            setMongoColumns(Object.keys(d[0]));
            setMongoData(d);
            handleLoading(() => setLoadingSpinner1(false));
            console.log("done returning");
            // setLoadingFileSpinner(false);
            handleLoading(
              () => {
                setLoadingFileSpinner(false);
                handleLoading(() => setLoadingSpinner1(() => false));
                console.log("data start" + d + "data end");
              },
              () => console.log("Imported a file CSV successfuly!!")
            );
          }
        })
        .catch((err) => console.log(err));
    }
    if (!isPartOfMongoPage) asyncF();
    else {
      getDataByDate();

      handleLoading(
        () => {
          setLoadingFileSpinner(false);
          // console.log("data start" + "data end");
        },
        () => console.log("Imported a file CSV successfuly!!")
      );
    }
  }, []);
  const handleLoading = (cb) => {
    setTimeout(() => {
      cb();
    }, 400);
  };
  let cols1 = [];
  cols1 = (
    <>
      {mongoColumns
        ? mongoColumns.map((col) => {
            // console.log(mongoColumns);
            return <Element key={col} colName={col} />;
          })
        : null}
    </>
  );
  return (
    <div>
      <Table
        bgcolor="darkred"
        style={{ border: "solid", borderWidth: "1.4px" }}
        sx={{
          width: "100%",
          minWidth: 450,
          maxWidth: "100%",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>{cols1}</TableRow>
        </TableHead>
        <TableBody sx={{ height: "100px" }}>
          {loadingSpinner1 ? (
            <CircularProgress size={90} />
          ) : (
            <>
              {mongoData.length > 0 ? (
                mongoData.map((doc) => {
                  return (
                    <TableRow
                      key={doc["_id"]}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {Object.keys(mongoData[0]).map((key) => {
                        // console.log("ASD" + JSON.stringify(doc) + "ASD");
                        return (
                          <>
                            <Element colName={doc[key]} />
                            {/* {
                            <Element
                              colName={JSON.stringify(col.COLUMN_TYPE)}
                            />
                          } */}
                          </>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <div>No data available from Mongo Database!</div>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MongoTable;
{
  /* <Table
        bgcolor="lightgray"
        style={{ border: "solid", borderWidth: "1.4px" }}
        sx={{
          width: "90%",
          minWidth: 450,
          maxWidth: "100%",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>{cols1}</TableRow>
        </TableHead>
        <TableBody sx={{ height: "100px" }}>
          {loadingSpinner1 ? (
            <CircularProgress size={90} />
          ) : (
            <>
              {/* {JSON.stringify(data1)} }
              {data1.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {columnNames1.map((col) => {
                      // console.log("ASD" + JSON.stringify(col) + "ASD");
                      return (
                        <>
                          <Element
                            colName={`Type: ${col.COLUMN_TYPE} ${JSON.stringify(
                              row[col.COLUMN_NAME]
                            )}`}
                          />
                          {/* <Element colName={JSON.stringify(col.COLUMN_TYPE)} /> }
                        </>
                      );
                    })}
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table> */
}
