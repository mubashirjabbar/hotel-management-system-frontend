import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import { useHistory } from "react-router-dom";

import Header from "../../components/header/Header";

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
    </ThemeProvider>
  );
}

export default function AddReservation() {
  return <UserProfileUpdate />;
}
