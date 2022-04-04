import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

import BasicReservation from "../../components/dropDownMenu/BasicReservation";
import Header from "../../components/header/Header";
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
