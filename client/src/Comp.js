import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
// import { Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
import { NavLink, Link } from "react-router-dom";

const Comp = ({
  style,
  route,
  linkName,
  isButton,
  buttonAction,
  visibility,
}) => {
  const [finalState, setFinalState] = React.useState({});
  useEffect(() => {
    if (isButton) setFinalState({ ...buttonStyle, ...style });
    else setFinalState({ ...compStyle, ...style });
  }, []);

  let compStyle = {
    margin: "1%",
    width: "30%",
    padding: "25px",
    backgroundColor: "ThreeDFace",
    fontSize: "20px",
    fontFamily: "fantasy",
  };
  let buttonStyle = {
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
  };
  return (
    <>
      {/* {visibility ? (
        isButton ? (
          <Button style={{ ...buttonStyle, ...style }} onClick={buttonAction}>
            {linkName}
          </Button>
        ) : (
          <Button
            style={{ ...compStyle, ...style }}
            component={Link}
            to={`/${route}`}
          >
            {linkName}
          </Button>
        )
      ) : null} */}

      {visibility ? (
        !isButton ? (
          <Button
            onClick={buttonAction}
            style={finalState}
            component={Link}
            to={`/${route}`}
          >
            {linkName}
          </Button>
        ) : route ? (
          <Button
            component={Link}
            to={`/${route}`}
            onClick={buttonAction}
            style={finalState}
          >
            {linkName}
          </Button>
        ) : (
          <Button onClick={buttonAction} style={finalState}>
            {linkName}
          </Button>
        )
      ) : null}
      {/* {visibility ? (
        isButton ? (
          <Button
            component={Link}
            to={`/${route}`}
            style={{ ...compStyle, ...style }}
            onClick={buttonAction}
          >
            {linkName}
          </Button>
        ) : style ? (
          <Button
            style={{ ...compStyle, ...style }}
            component={Link}
            to={`/${route}`}
          >
            {linkName}
          </Button>
        ) : (
          <Button style={compStyle} component={Link} to={`/${route}`}>
            {linkName}
          </Button>
        )
      ) : null} */}
    </>
  );
};

export default Comp;
