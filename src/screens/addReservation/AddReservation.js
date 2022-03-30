import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import { useHistory } from "react-router-dom";

import Header from "../../components/header/Header";
import BasicReservation from "../../components/dropDownMenu/BasicReservation";
import "./AddReservation.scss";

const mdTheme = createTheme();

function UserProfileUpdate() {
  const history = useHistory();

  return (
    <ThemeProvider theme={mdTheme}>
      <div>
        <Header
          leftHeader={"New Reservation"}
          rightHeader={"Mubashir Jabbar"}
          onClickLeftHeader={() => {
            history.push("/profile");
          }}
        />
      </div>
      <div className="reservation-details">
        <h4>Reservation details</h4>
      </div>
      <div className="basic-reservation">
        <BasicReservation />
      </div>
    </ThemeProvider>
  );
}

export default function AddReservation() {
  return <UserProfileUpdate />;
}
