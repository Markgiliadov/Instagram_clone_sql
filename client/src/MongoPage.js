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
import MongoTable from "./MongoTable";
const MongoPage = ({ columnNames, setColumnNames }) => {
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
  //   const [columnNames, setColumnNames] = useState([]);
  const [data, setData] = useState([]);
  const [mongoColumns, setMongoColumns] = useState([]);
  const [dateFirst, setDateFirst] = useState(null);
  const [dateLast, setDateLast] = useState(null);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [mongoData, setMongoData] = useState([]);
  const [loadingMongoSpinner, setLoadingMongoSpinner] = useState(false);
  const [columnNames1, setColumnNames1] = useState(false);

  useEffect(() => {
    // console.log(cols);
  }, []);

  //   useEffect(() => {
  //     async function asyncF() {
  //       await fetch("http://localhost:3400/filter", {
  //         method: "GET",
  //         mode: "cors",
  //         headers: {
  //           "Access-Control-Allow-Origin": "*",
  //           "Content-Type": "application/json",
  //           sorting: "asc",
  //           tableName: chosenTable,
  //           orderVal: "username",
  //           colFlag: true,
  //         },
  //       })
  //         .then((res) => res.json())
  //         .then((d) => {
  //           setColumnNames(d);
  //           console.log(columnNames);
  //           handleLoading(() => setLoadingSpinner(false));
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //     asyncF();
  //   }, [chosenTable]);
  const handleLoading = (cb) => {
    setTimeout(() => {
      cb();
    }, 400);
  };

  const handleClickFilter = async (e) => {
    e.preventDefault();
    setLoadingSpinner(true);
    async function getDataByDate() {
      setLoadingMongoSpinner(true);
      console.log(dateFirst, dateLast);
      console.log(chosenTable);

      const myDateFirst = dayjs(dateFirst).format("DDMMYYYY");
      const myDateLast = dayjs(dateLast).format("DDMMYYYY");
      console.log(myDateFirst, myDateLast);
      await fetch("http://localhost:3400/convert/getDocsByDate", {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          date: value,
          collectionName: chosenTable,
          dateFirst: myDateFirst,
          dateLast: myDateLast,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //   setLoadingFileSpinner(false);
          //   handleLoading(() => setLoadingSpinner1(() => false));
          if (data) {
            setMongoData(data);
            // setColumnNames(Object.keys(data[0]));
            setLoadingMongoSpinner(false);
          }
        });

      // console.log(await data.json());
    }
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
      .then(async (d) => {
        setColumnNames(d);
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
            setLoadingSpinner(false);
            setColumnNames(Object.keys(d[0]));
            handleLoading(() => setLoadingSpinner(false));
          })
          .catch((err) => console.log(err));
        handleLoading(
          () => setLoadingSpinner(false),
          () => console.log("nextcb1")
        );
      })
      .catch((err) => console.log(err));

    getDataByDate();
  };

  let cols1 = [];
  cols1 = (
    <>
      {columnNames.map((col) => {
        // console.log(col);
        <Element colName={`${col.COLUMN_NAME}(${col.COLUMN_TYPE})`} />;
      })}
    </>
  );

  return (
    <div style={{ width: "100%" }}>
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
          <strong style={{ color: "pink" }}>Please</strong> choose start and end
          dates. Pick table for filtering!
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
        <div style={{ width: "35%", alignContent: "center", margin: "1%" }}>
          <DateComp
            label="Start Date"
            value={dateFirst}
            handleChange={handleChangeFirst}
          />
        </div>
        <div style={{ width: "35%", alignContent: "center", margin: "1%" }}>
          <DateComp
            label="End Date"
            value={dateLast}
            handleChange={handleChangeSecond}
          />
        </div>
        <div style={{ width: "35%", alignContent: "center", margin: "1%" }}>
          <BasicSelect
            handleLoading={handleLoading}
            setLoadingSpinner={setLoadingSpinner}
            columnNames={columnNames}
            // setColumnNames={setColumnNames}
            chosenTable={chosenTable}
            setChosenTable={setChosenTable}
            setData={setData}
            doesContainDate={true}
          />
        </div>
        <Comp
          visibility={true}
          linkName="Filter"
          isButton={true}
          buttonAction={handleClickFilter}
        />
      </div>
      <div
        style={{
          padding: "6px",
          height: "100%",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "beige",
          display: "flex",
        }}
      >
        {/* <div style={{ width: "100%", marginRight: "10%" }}>
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
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>{cols1}</TableRow>
              </TableHead>
              <TableBody>
                {loadingSpinner ? (
                  <CircularProgress size={90} />
                ) : (
                  data.map((row) => {
                    return (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {columnNames.map((col) => {
                          return <Element colName={row[col.COLUMN_NAME]} />;
                        })}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div> */}
        <div style={{ width: "100%" }}>
          {loadingMongoSpinner ? (
            <CircularProgress size={90} />
          ) : (
            <MongoTable
              mongoColumns={mongoColumns ? mongoColumns : []}
              setMongoColumns={setMongoColumns}
              isPartOfMongoPage={true}
              // data={mongoData ? mongoData : []}
              chosenTable1={chosenTable}
              mongoData={mongoData}
              setMongoData={setMongoData}
              dateFirst={dateFirst}
              dateLast={dateLast}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MongoPage;
