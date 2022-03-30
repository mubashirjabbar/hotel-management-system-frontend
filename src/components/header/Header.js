import React from "react";
import "./Header.scss";

const Header = (props) => {
  return (
    <div className="main-header">
      <div style={{ fontSize: 24, color: "white", paddingLeft: 20 }}>
        {" "}
        {props.leftHeader}
      </div>
      <div className="header-font" onClick={props.onClickLeftHeader}>
        {" "}
        {props.rightHeader}
      </div>
    </div>
  );
};

export default Header;
