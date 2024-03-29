import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link, Routes } from "react-router-dom";
import "./index.css";
import BasicTable from "./Table";
import FilteredTable from "./FilteredTable";
import JoinTable from "./JoinTable";
import Convert from "./Convert";
import Import from "./Import";
import Export from "./Export";

import Comp from "./Comp";
import MongoDB from "./MongoDB";
const App = () => {
  const [isMongo, setIsMongo] = useState(false);
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "#303030" }}>
        <div style={{ textAlign: "center" }}>
          <Comp
            style={{
              backgroundColor: "#8B0000",
              width: "270px",
              height: "70px",
            }}
            route="convert"
            linkName="Switch to MongoDB"
            isButton={true}
            buttonAction={() => setIsMongo(false)}
            visibility={isMongo}
          />
          <Comp
            style={{
              backgroundColor: "#00008B",
              width: "270px",
              height: "70px",
            }}
            route="filter"
            linkName="Switch to MySQL"
            isButton={true}
            buttonAction={() => setIsMongo(true)}
            visibility={!isMongo}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ backgroundColor: "blue" }}>
            <Comp
              route="filter"
              linkName="filter"
              isButton={false}
              buttonAction={null}
              visibility={isMongo}
            />
            <Comp
              route="sort"
              linkName="sort"
              isButton={false}
              buttonAction={null}
              visibility={isMongo}
            />
            <Comp
              route="join"
              linkName="join"
              isButton={false}
              buttonAction={null}
              visibility={isMongo}
            />
          </div>
          {isMongo ? (
            <div
              style={{
                border: "solid",
                borderRadius: "2%",
                borderWidth: "2px",
                backgroundColor: "beige",
                fontFamily: "monospace",
                fontSize: "30px",
              }}
            >
              MySQL
            </div>
          ) : null}
          <div style={{ backgroundColor: "red" }}>
            <Comp
              route="convert"
              linkName="convert"
              isButton={false}
              buttonAction={null}
              visibility={!isMongo}
            />
            <Comp
              route="import"
              linkName="import"
              isButton={false}
              buttonAction={null}
              visibility={!isMongo}
            />
            <Comp
              route="export"
              linkName="export"
              isButton={false}
              buttonAction={null}
              visibility={!isMongo}
            />
            {!isMongo ? (
              <div
                style={{
                  border: "solid",
                  borderRadius: "2%",
                  borderWidth: "2px",
                  backgroundColor: "purple",
                  fontFamily: "monospace",
                  fontSize: "30px",
                }}
              >
                Mongo
              </div>
            ) : null}
          </div>
        </div>

        {/* <div style={{ textAlign: "center" }}>
            <Comp
              route="filter"
              linkName="filter"
              isButton={false}
              buttonAction={null}
              visibility={isMongo}
            />
          </div> */}
      </div>

      <Routes>
        <Route path="/" element={<BasicTable />} />
        <Route path="/sort" element={<BasicTable />} />
        <Route path="/filter" element={<FilteredTable />} />
        <Route path="/join" element={<JoinTable />} />
        <Route path="/convert" element={<Convert />} />
        <Route path="/import" element={<Import />} />
        <Route path="/export" element={<Export />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
