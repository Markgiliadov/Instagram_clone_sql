import * as React from "react";
import Button from "@mui/material/Button";
// import { Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
import { NavLink, Link } from "react-router-dom";

const Comp = ({ linkName, isButton, buttonAction }) => {
  return (
    <>
      {isButton ? (
        <Button
          style={{
            marginTop: "18%",
            marginLeft: "25%",
            margin: "1%",
            width: "30px",
            paddingLeft: "45px",
            paddingRight: "55px",
            backgroundColor: "ThreeDFace",
            fontSize: "15px",
            fontFamily: "fantasy",
            borderStyle: "double",
            borderWidth: "2px",
          }}
          onClick={buttonAction}
        >
          {linkName}
        </Button>
      ) : (
        <Button
          style={{
            margin: "1%",
            width: "30%",
            padding: "25px",
            backgroundColor: "ThreeDFace",
            fontSize: "20px",
            fontFamily: "fantasy",
          }}
          component={Link}
          to={`/${linkName}`}
        >
          {linkName}
        </Button>
      )}
    </>
  );
};

export default Comp;
