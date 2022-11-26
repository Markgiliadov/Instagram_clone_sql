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
import JoinedTable from "./JoinedTable";
import dayjs from "dayjs";
import DateComp from "./DateComp";
import Comp from "./Comp";
import BasicSelect from "./SelectTable";
import Element from "./Element";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilteredTable() {
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

  useEffect(() => {
    async function asyncF() {
      await fetch("http://localhost:3400/filter", {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          sorting: "asc",
          tableName: chosenTable2,
          orderVal: "username",
          colFlag: true,
        },
      })
        .then((res) => res.json())
        .then((d) => {
          setColumnNames2(d);
          handleLoading(() => setLoadingSpinner1(false));
        })
        .catch((err) => console.log(err));
      setLoadingSpinner2(true);
      await fetch("http://localhost:3400/join", {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          sorting: "asc",
          tableName1: chosenTable2,
          orderVal: "username",
          joinedFlag: false,
        },
      })
        .then((res) => res.json())
        .then((d) => {
          setData2(d);
          handleLoading(() => setLoadingSpinner2(false));
        })
        .catch((err) => console.log(err));
    }
    asyncF();
  }, [chosenTable2]);
  useEffect(() => {
    async function asyncF() {
      await fetch("http://localhost:3400/filter", {
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
          setColumnNames1(d);
          handleLoading(() => setLoadingSpinner1(false));
        })
        .catch((err) => console.log(err));
      setLoadingSpinner1(true);
      await fetch("http://localhost:3400/join", {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          sorting: "asc",
          tableName1: chosenTable1,
          orderVal: "username",
          joinedFlag: false,
        },
      })
        .then((res) => res.json())
        .then((d) => {
          setData1(d);
          handleLoading(() => setLoadingSpinner1(false));
        })
        .catch((err) => console.log(err));
    }
    asyncF();
  }, [chosenTable1]);

  const handleLoading = (cb) => {
    setTimeout(() => {
      cb();
    }, 400);
  };
  const handleClickJoin = async (e) => {
    e.preventDefault();

    if (!paramCol1 || !paramCol2) alert("nOPE!");
    else {
      setLoadingSpinner3(true);
      await fetch("http://localhost:3400/join", {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          sorting: "asc",
          tableName1: chosenTable1,
          tableName2: chosenTable2,
          paramCol1: paramCol1,
          paramCol2: paramCol2,
          orderVal: "username",
          joinedFlag: true,
        },
      })
        .then((res) => res.json())
        .then((d) => {
          setJoinedColNames([...columnNames1, ...columnNames2]);
          setJoinedData(() => {
            console.log(d);
            return d;
          });

          handleLoading(() => setLoadingSpinner3(false));
        })
        .catch((err) => console.log(err));
    }
  };
  let cols1 = [];
  let cols2 = [];
  cols1 = (
    <>
      {columnNames1.map((col) => (
        <Element colName={col.COLUMN_NAME} />
      ))}
    </>
  );
  cols2 = (
    <>
      {columnNames2.map((col) => (
        <Element colName={col.COLUMN_NAME} />
      ))}
    </>
  );
  return (
    <div
      style={{
        padding: "1%",
        height: "100%",
        width: "100%",
        backgroundColor: "blue",
      }}
    >
      <TableContainer
        component={Paper}
        style={{
          marginLeft: "1%",
          marginRight: "1%",
          width: "98%",
          borderWidth: "10px",
          border: "solid",
          borderRadius: "10px",
          padding: "5px",
          backgroundColor: "rgba",
        }}
      >
        <div
          style={{
            // display: "flex",
            border: "solid",
            borderWidth: "0px",
            backgroundColor: "GrayText",
            borderTopWidth: "3px",
            padding: "0.3%",
            paddingLeft: "1%",
            paddingRight: "1%",
            borderRadius: "5px",
            marginBottom: "2px",
          }}
        >
          <label style={{ fontSize: "25px", color: "white", width: "100px" }}>
            <strong style={{ color: "pink" }}>Please</strong> choose two tables
            to join data
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "100%" }}>
            <div
              style={{
                marginLeft: "37%",
                borderWidth: "1.5px",
                border: "solid",
                borderRadius: "10px",
                backgroundColor: "darkgray",
                display: "flex",
                padding: "10px",
                margin: "1.5%",
                width: "40%",
              }}
            >
              <div
                style={{ width: "70%", alignContent: "center", margin: "1%" }}
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
              <div
                style={{
                  // display: "block",
                  width: "100%",

                  margin: "1%",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <FormControl sx={{ width: "100%" }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tables
                    </InputLabel>
                    <>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={paramCol1}
                        label="Tables"
                        onChange={(e) => {
                          e.preventDefault();
                          setParamCol1(e.target.value);
                        }}
                      >
                        {columnNames1.map((col) => (
                          <MenuItem
                            key={col.ORDINAL_POSITION}
                            value={col.COLUMN_NAME}
                          >
                            {col.COLUMN_NAME}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div style={{ height: "300px", paddingRight: "10px" }}>
              <Table
                bgcolor="lightgray"
                style={{ border: "solid", borderWidth: "1.4px" }}
                sx={{
                  minWidth: 250,
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
                            return <Element colName={row[col.COLUMN_NAME]} />;
                          })}
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div style={{ marginTop: "55px" }}>
            <Comp
              visibility={true}
              linkName="Join"
              isButton={true}
              buttonAction={handleClickJoin}
            />
          </div>
          <div style={{ width: "100%" }}>
            <div
              style={{
                marginLeft: "37%",
                borderWidth: "1.5px",
                border: "solid",
                borderRadius: "10px",
                backgroundColor: "darkgray",
                display: "flex",
                padding: "10px",
                margin: "1.5%",
                width: "40%",
              }}
            >
              <div
                style={{ width: "100%", alignContent: "center", margin: "1%" }}
              >
                <BasicSelect
                  handleLoading={handleLoading}
                  setLoadingSpinner={setLoadingSpinner2}
                  columnNames={columnNames2}
                  setColumnNames={setColumnNames2}
                  chosenTable={chosenTable2}
                  setChosenTable={setChosenTable2}
                  setData={setData2}
                />
              </div>
              <div
                style={{
                  // display: "block",
                  width: "100%",
                  alignContent: "center",
                  margin: "1%",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tables
                    </InputLabel>
                    <>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={paramCol2}
                        label="Tables"
                        onChange={(e) => {
                          e.preventDefault();
                          setParamCol2(e.target.value);
                        }}
                      >
                        {columnNames2.map((col) => (
                          <MenuItem
                            key={col.ORDINAL_POSITION}
                            value={col.COLUMN_NAME}
                          >
                            {col.COLUMN_NAME}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div style={{ height: "300px", paddingRight: "10px" }}>
              <Table
                bgcolor="lightgray"
                style={{ border: "solid", borderWidth: "1.4px" }}
                sx={{
                  minWidth: 250,
                  maxWidth: "100%",
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>{cols2}</TableRow>
                </TableHead>
                <TableBody sx={{ height: "100px" }}>
                  {loadingSpinner2 ? (
                    <CircularProgress size={90} />
                  ) : (
                    data2.map((row) => {
                      return (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          {columnNames2.map((col) => (
                            <Element colName={row[col.COLUMN_NAME]} />
                          ))}
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </TableContainer>
      <JoinedTable
        loadingSpinner={loadingSpinner3}
        setLoadingSpinner={setLoadingSpinner3}
        data={joinedData}
        columnNames={joinedColNames}
      />
    </div>
  );
}
