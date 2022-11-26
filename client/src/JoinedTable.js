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

const JoinedTable = ({
  columnNames,
  data,
  loadingSpinner,
  setLoadingSpinner,
}) => {
  let cols = [];
  cols = (
    <>
      {columnNames.map((col) => (
        <Element colName={col.COLUMN_NAME} />
      ))}
    </>
  );
  return (
    <div style={{ width: "100%" }}>
      <TableContainer
        component={Paper}
        style={{
          marginLeft: "1%",
          marginRight: "1%",
          width: "100%",
          borderWidth: "10px",
          border: "solid",
          borderRadius: "10px",
          padding: "5px",
          backgroundColor: "rgba",
          textAlign: "center",
        }}
      >
        {data.length ? (
          <div style={{ display: "flex" }}>
            <div style={{ alignItems: "center", width: "100%" }}>
              <div
                style={{
                  // marginLeft: "30%",
                  borderWidth: "1.5px",
                  border: "solid",
                  borderRadius: "10px",
                  backgroundColor: "darkgray",
                  display: "flex",
                  padding: "10px",
                  margin: "1.5%",
                  width: "90%",
                }}
              >
                <div
                  style={{
                    marginLeft: "25%",
                    height: "100%",
                    paddingRight: "10px",
                  }}
                >
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
                      <TableRow>{cols}</TableRow>
                    </TableHead>
                    <TableBody sx={{ height: "100px" }}>
                      {loadingSpinner ? (
                        <CircularProgress size={90} />
                      ) : data ? (
                        data.map((row) => {
                          return (
                            <TableRow
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              {columnNames.map((col, index) => {
                                return (
                                  <Element
                                    key={col.ordi}
                                    colName={row[col.COLUMN_NAME]}
                                  />
                                );
                              })}
                            </TableRow>
                          );
                        })
                      ) : (
                        <h1>No data presented</h1>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>No data presented</h1>
        )}
      </TableContainer>
    </div>
  );
};

export default JoinedTable;
