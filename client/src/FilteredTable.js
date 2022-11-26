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
export default function FilteredTable() {
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const [chosenTable, setChosenTable] = useState("users");
  const handleChangeFirst = (newValue) => {
    console.log(dayjs(newValue).format("YYYYMMDD"));
    setDateFirst(dayjs(newValue).format("YYYYMMDD"));
  };
  const handleChangeSecond = (newValue) => {
    console.log(dayjs("20140101").toString());
    setDateLast(dayjs(newValue).format("YYYYMMDD"));
  };
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

  useEffect(() => {
    console.log("cols: ", columnNames);
    console.log("test");

    async function asyncF() {
      await fetch("http://localhost:3400/filter", {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          sorting: "asc",
          tableName: chosenTable,
          orderVal: "username",
          colFlag: true,
        },
      })
        .then((res) => res.json())
        .then((d) => {
          console.log(d);
          setColumnNames(d);
          handleLoading(() => setLoadingSpinner(false));
        })
        .catch((err) => console.log(err));
    }
    asyncF();
  }, [chosenTable]);

  const fetchData = async (id, sortingOrder) => {
    setData([]);
    // console.log(sortActive, sortingOrder);
    await fetch("http://localhost:3400/", {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        sorting: sortingOrder,
        tableName: "users",
        orderVal: "username",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        console.log(d);
        handleLoading(() => setLoadingSpinner(false));
      });
  };
  const handleLoading = (cb) => {
    setTimeout(() => {
      cb();
    }, 400);
  };
  const handleClickFilter = async (e) => {
    e.preventDefault();
    setLoadingSpinner(true);
    await fetch("http://localhost:3400/filter", {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        sorting: "asc",
        tableName: chosenTable,
        orderVal: "username",
        colFlag: false,
        firstDate: dateFirst,
        lastDate: dateLast,
      },
    })
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        setData(d);
        handleLoading(() => setLoadingSpinner(false));
      })
      .catch((err) => console.log(err));
    // await fetch("http://localhost:3400/filter", {
    //   method: "GET",
    //   mode: "cors",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json",
    //     sorting: "asc",
    //     tableName: "users",
    //     orderVal: "username",
    //     firstDate: dateFirst,
    //     lastDate: dateLast
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((d) => {
    //     setData(d);
    //     console.log(d);
    //     handleLoading(() => setLoadingSpinner(false));
    //   });
    console.log(sortActive);
    // sortActive[e.currentTarget.id]
    // fetchData(e.currentTarget.id, "asc");
    // : fetchData(e.currentTarget.id, "desc");
  };
  let cols = [];
  // let rows = [];

  cols = (
    <>
      {columnNames.map((col) => (
        <Element colName={col.COLUMN_NAME} />
      ))}
    </>
  );
  console.log(cols, typeof columnNames);
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
            <strong style={{ color: "pink" }}>Please</strong> choose start and
            end dates. Pick table for filtering!
          </label>
        </div>
        <div
          style={{
            borderWidth: "1.5px",
            border: "solid",
            borderRadius: "10px",
            backgroundColor: "darkgray",
            display: "flex",
            padding: "2px",
          }}
        >
          <div style={{ width: "25%", alignContent: "center", margin: "1%" }}>
            <DateComp
              label="Start Date"
              value={dateFirst}
              handleChange={handleChangeFirst}
            />
          </div>
          <div style={{ width: "25%", alignContent: "center", margin: "1%" }}>
            <DateComp
              label="End Date"
              value={dateLast}
              handleChange={handleChangeSecond}
            />
          </div>
          <div style={{ width: "25%", alignContent: "center", margin: "1%" }}>
            <BasicSelect
              handleLoading={handleLoading}
              setLoadingSpinner={setLoadingSpinner}
              columnNames={columnNames}
              setColumnNames={setColumnNames}
              chosenTable={chosenTable}
              setChosenTable={setChosenTable}
              setData={setData}
              doesContainDate={true}
            />
          </div>
          {/* <div></div> */}
          <Comp
            visibility={true}
            linkName="Filter"
            isButton={true}
            buttonAction={handleClickFilter}
          />
        </div>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {cols}
              {/* <Cols colName="ID" />
            <Cols colName="Username" />
            <Cols colName="Created at" /> */}
              {/* <TableCell align="center">ID</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Created at</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingSpinner ? (
              <CircularProgress size={90} />
            ) : (
              data.map((row) => {
                console.log(Object.keys(row));
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {columnNames.map((col) => {
                      console.log("t1");
                      return <Element colName={row[col.COLUMN_NAME]} />;
                    })}

                    {/* <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.created_at}</TableCell> */}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
