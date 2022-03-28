import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import Button from "@mui/material/Button";

import { useHistory } from "react-router-dom";

import DataTable from "../../components/DataTable/DataTable";
import Header from "../../components/header/Header";

const mdTheme = createTheme();

function DashboardContent() {
  const history = useHistory();
  const onPressReservation = () => {
    history.push("/addReservation");
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <div>
        <Header
          leftHeader={"Hotel Reservation System"}
          rightHeader={"Mubashir Jabbar"}
          onClickLeftHeader={() => {
            history.push("/profile");

          }}
        />
      </div>

      <div
        style={{
          marginTop: 20,
          backgroundColor: "white",
          paddingRight: 25,
          paddingLeft: 25,
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ color: "#1976d2", textDecoration: "underline" }}>
          All Reservations
        </h2>
        <div style={{ marginTop: 15 }}>
          <Button variant="contained" onClick={onPressReservation}>
            Add Reservations{" "}
          </Button>
        </div>
      </div>

      <div style={{ padding: 25 }}>
        <DataTable />
      </div>
    </ThemeProvider>
  );
}

export default function Home() {
  return <DashboardContent />;
}
