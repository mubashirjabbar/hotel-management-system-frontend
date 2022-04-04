import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { useSelector} from 'react-redux';

import DataTable from "../../components/dataTable/DataTable";
import Header from "../../components/header/Header";

import "./Home.scss";

const mdTheme = createTheme();

export default function Home(props) {
  const history = useHistory();
  const states = useSelector(state => state);

  React.useEffect(() => {
    let toastText = ""
    if (props?.location?.state?.login) {
      toastText = "Successfully login"
    }
    if (props?.location?.state?.fromAddReservation) {
      toastText = "Reservation added successfully"
    }

    toast.success(toastText, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  const onPressReservation = () => {
    history.push("/addReservation");
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Header
        leftHeader={"Hotel Reservation System"}
        rightHeader={states?.userData?.name}
        onClickLeftHeader={() => {
          history.push("/profile");
        }}
      />

      <div className="all-reservations-text">
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
}

