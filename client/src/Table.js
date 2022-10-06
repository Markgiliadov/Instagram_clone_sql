import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableSortLabel } from "@mui/material";
import { CircularProgress } from "@mui/material";


export default function BasicTable() {
  const [sortActive, setSortActive] = useState({
    id: true,
    username: true,
    created_at: true,
  });
  const [data, setData] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const fetchData = async (id, sortingOrder) => {
    setData([]);
    console.log(sortActive, sortingOrder);
    await fetch("http://localhost:3400/sort", {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        sorting: sortingOrder,
        tableName: "users",
        orderVal: id,
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        handleLoading(() => setLoadingSpinner(false));
      });
  };
  const handleLoading = (cb) => {
    setTimeout(() => {
      cb();
    }, 400);
  };
  const handleClickSort = (e) => {
    setLoadingSpinner(true);
    console.log(sortActive);
    sortActive[e.currentTarget.id]
      ? fetchData(e.currentTarget.id, "asc")
      : fetchData(e.currentTarget.id, "desc");
  };
  return (
    <TableContainer
      component={Paper}
      style={{
        marginLeft: "1%",
        marginRight: "1%",
        width: "98%",
        backgroundColor: "rgba",
      }}
    >
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <TableSortLabel
                id="id"
                active={true}
                direction={sortActive.id ? "asc" : "desc"}
                onClick={(e) => {
                  setSortActive({
                    ...sortActive,
                    [e.currentTarget.id]: !sortActive[e.currentTarget.id],
                  });
                  handleClickSort(e);
                }}
              />
              ID
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                id="username"
                active={true}
                direction={sortActive.username ? "asc" : "desc"}
                onClick={(e) => {
                  setSortActive({
                    ...sortActive,
                    [e.currentTarget.id]: !sortActive[e.currentTarget.id],
                  });
                  handleClickSort(e);
                }}
              />
              Username
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                id="created_at"
                active={true}
                direction={sortActive.created_at ? "asc" : "desc"}
                onClick={(e) => {
                  setSortActive({
                    ...sortActive,
                    [e.currentTarget.id]: !sortActive[e.currentTarget.id],
                  });
                  handleClickSort(e);
                }}
              />
              Created at
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loadingSpinner ? (
            <CircularProgress size={90} />
          ) : (
            data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.created_at}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
