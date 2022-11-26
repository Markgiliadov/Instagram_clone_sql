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

const Import = () => {
  const [chosenTable, setChosenTable] = useState("users");
  const [sortActive, setSortActive] = useState({
    id: true,
    username: true,
    created_at: true,
  });
  const [columnNames, setColumnNames] = useState([]);
  const [data, setData] = useState([]);
  const [dateFirst, setDateFirst] = useState(null);
  const [dateLast, setDateLast] = useState(null);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const [chosenTable1, setChosenTable1] = useState("users");
  const [chosenTable2, setChosenTable2] = useState("users");
  const [chosenTable3, setChosenTable3] = useState("users");
  const [joinedData, setJoinedData] = useState([]);
  const [joinedColNames, setJoinedColNames] = useState([]);
  const [columnNames1, setColumnNames1] = useState([]);
  const [columnNames2, setColumnNames2] = useState([]);
  const [paramCol1, setParamCol1] = useState("");
  const [paramCol2, setParamCol2] = useState("");
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [loadingSpinner1, setLoadingSpinner1] = useState(false);
  const [loadingSpinner2, setLoadingSpinner2] = useState(false);
  const [loadingSpinner3, setLoadingSpinner3] = useState(false);
  const [loadingFileSpinner, setLoadingFileSpinner] = useState(false);
  // useEffect(() => {
  //   async function asyncF() {
  //     await fetch("http://localhost:3400/filter", {
  //       method: "GET",
  //       mode: "cors",
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json",
  //         sorting: "asc",
  //         tableName: chosenTable1,
  //         orderVal: "username",
  //         colFlag: true,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((d) => {
  //         console.log("ASD cols: ", d);
  //         setColumnNames1(d);
  //         handleLoading(() => setLoadingSpinner1(false));
  //       })
  //       .catch((err) => console.log(err));
  //     setLoadingSpinner1(true);
  //     await fetch("http://localhost:3400/join", {
  //       method: "GET",
  //       mode: "cors",
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json",
  //         sorting: "asc",
  //         tableName1: chosenTable1,
  //         orderVal: "username",
  //         joinedFlag: false,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((d) => {
  //         // setData1(d);
  //         handleLoading(() => setLoadingSpinner1(false));
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   asyncF();
  // }, [chosenTable1]);

  useEffect(() => {
    console.log(columnNames1);
    handleLoading(() => setLoadingSpinner1(() => false));
  }, [chosenTable1]);

  const handleClickImport = async () => {
    setLoadingFileSpinner(true);
    handleLoading(() => setLoadingSpinner1(() => true));
    await fetch("http://localhost:3400/import", {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        sorting: "asc",
        tableName: chosenTable1,
        orderVal: "username",
        colFlag: true,
      },
    })
      .then((res) => res.json())
      .then((d) => {
        console.log("HELLO", d);
        // console.log("Asd", Object.keys(d[0]));
        if (d.success == "fail") {
          alert("Failed to import file!!");

          handleLoading(() => setLoadingSpinner1(() => false));
          handleLoading(
            () => {
              setLoadingFileSpinner(false);
              console.log("data start" + d + "data end");
            },
            () => console.log("done")
          );
        } else {
          alert("Imported file successfully!!!");
          setColumnNames1(Object.keys(d[0]));
          setData1(d);
          handleLoading(() => setLoadingSpinner1(false));
          console.log("done returning");
          // setLoadingFileSpinner(false);
          handleLoading(
            () => {
              setLoadingFileSpinner(false);
              console.log("data start" + d + "data end");
            },
            () => alert("Imported a file CSV successfuly!!")
          );
        }
      })
      .catch((err) => console.log(err));
  };
  const handleLoading = (cb) => {
    setTimeout(() => {
      cb();
    }, 400);
  };
  let cols1 = [];
  cols1 = (
    <>
      {columnNames1.map((col) => (
        <Element colName={col} />
      ))}
    </>
  );
  return (
    <div
      style={{
        backgroundColor: "#FF0001",
        padding: "1%",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          borderWidth: "1.5px",
          border: "solid",
          borderRadius: "10px",
          backgroundColor: "darkgray",
          display: "flex",
          padding: "10px",
          width: "68%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ width: "90%" }}>
          <div style={{ width: "90%", height: "100px", paddingRight: "10px" }}>
            <div
              style={{
                maxWidth: "100%",
                width: "100%",
                alignContent: "center",
                margin: "1%",
              }}
            >
              <BasicSelect
                handleLoading={handleLoading}
                setLoadingSpinner={setLoadingSpinner1}
                columnNames={columnNames1}
                setColumnNames={setColumnNames1}
                chosenTable={chosenTable1}
                setChosenTable={setChosenTable1}
                setData={setData1}
              />
            </div>
          </div>
          <Table
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
                data1.map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {columnNames1.map((col) => {
                        // console.log(col);
                        return <Element key={col} colName={row[col]} />;
                      })}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        <div style={{ width: "320px", marginTop: "55px" }}>
          {loadingFileSpinner ? (
            <CircularProgress size={90} />
          ) : (
            <Comp
              route=""
              visibility={true}
              linkName="Import CSV file to SQL table"
              isButton={true}
              style={{ width: "300px" }}
              buttonAction={handleClickImport}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Import;
