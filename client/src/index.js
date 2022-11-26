import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Switch, Route, Link, Routes } from "react-router-dom";
import "./index.css";
import BasicTable from "./Table";
import FilteredTable from "./FilteredTable";
import JoinTable from "./JoinTable";
import Comp from "./Comp";
import MongoDB from "./MongoDB";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // const [isMongo, setIsMongo] = useState(false);

  <React.StrictMode>
    <App />
  </React.StrictMode>
);
