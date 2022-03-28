import React from "react";

const Header = (props) => {


  return (
    <div
      style={{
        height: 70,
        width: "100%",
        backgroundColor: "#1976d2",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: 24, color: "white", paddingLeft: 20 }}>
        {" "}
       {props.leftHeader}
      </div>
      <div
        style={{ fontSize: 20, color: "white", paddingRight: 20, cursor:'pointer'}}
        onClick={props.onClickLeftHeader}
      >
        {" "}
        {props.rightHeader}
      </div>
    </div>
  );
};

export default Header;
