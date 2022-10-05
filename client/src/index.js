import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Switch, Route, Link, Routes } from "react-router-dom";
import "./index.css";
import BasicTable from "./Table";
import FilteredTable from "./FilteredTable";
import GatherTable from "./GatherTable";
import Comp from "./Comp";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Comp linkName="filter" isButton={false} buttonAction={null} />
      <Comp linkName="sort" isButton={false} buttonAction={null} />
      <Comp linkName="gather" isButton={false} buttonAction={null} />
      <Routes>
        <Route path="/sort" element={<BasicTable />} />
        <Route path="/filter" element={<FilteredTable />} />
        <Route path="/gather" element={<GatherTable />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
