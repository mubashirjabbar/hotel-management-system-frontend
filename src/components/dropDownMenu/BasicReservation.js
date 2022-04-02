import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import BasicDatePicker from "../datePicker/BasicDatePicker";
import Button from "@mui/material/Button";
import axios from "axios";
import Config from "../../config/config";

export default function BasicReservation() {
  const [selectHotal, setSelectHotal] = React.useState("");
  const [selectRoom, setSelectRoom] = React.useState("");
  const [hotals, setHotals] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);

  React.useEffect(() => {
    getAllHotals();
  }, []);

  const getAllHotals = () => {
    let tempArray = [];
    axios
      .get(Config.API_END_POINT + "hotels")
      .then((resp) => {
        resp.data.map((response) => {
          tempArray.push({
            id: response.id,
            name: response.name,
          });
        });
        setHotals(tempArray);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleChangeHotel = (event) => {
    let hotelId = event?.target?.value?.id;
    setSelectHotal(event.target.value);
    getRoomForSelectedHotel(hotelId);
  };
  const handleChangeRoom = (event) => {
    setSelectRoom(event.target.value);
  };

  const getRoomForSelectedHotel = (hotelId) => {
    let tempArray = [];
    axios
      .get(Config.API_END_POINT + `rooms/${hotelId}`)
      .then((resp) => {
        resp.data.map((response) => {
          tempArray.push({
            rommNumber: response.room_number,
          });
        });
        setRooms(tempArray);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const onPressReservation = () => {
    alert();
  };

  return (
    <div
      style={{
        height: 350,
        width: "70%",
        backgroundColor: "#F8F8F8",
        padding: 12,
        borderRadius: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "10%",
        }}
      >
        <h3 style={{ color: "#1976d2" }}>Choose hotel</h3>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "20%",
        }}
      >
        <Box style={{ width: "100%" }} sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Hotal name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectHotal}
              label="Age"
              onChange={handleChangeHotel}
            >
              {hotals.map((resp) => {
                return <MenuItem value={resp}>{resp.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "10%",
        }}
      >
        <h3 style={{ color: "#1976d2" }}>Choose room</h3>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "20%",
        }}
      >
        <Box style={{ width: "100%" }} sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Room number</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectRoom}
              label="Age"
              onChange={handleChangeRoom}
            >
              {rooms.map((resp) => {
                return <MenuItem value={resp}>{resp.rommNumber}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
      </div>

      <div
        style={{
          display: "flex",
          height: "20%",
          borderBottom: "1px solid #c6c6c6",

          marginTop: 10,
        }}
      >
        <div
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            paddingLeft: 1,
          }}
        >
          <BasicDatePicker />
        </div>
        <div style={{ width: "50%", flexDirection: "row", display: "flex" }}>
          <h4 style={{ color: "#686868", fontWeight: 200, fontSize: 17 }}>
            {" "}
            Total price:
            <span style={{ color: "#1976d2" }}>$150</span>
          </h4>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: 10,
          marginTop: 15,
        }}
      >
        <Button variant="contained" onClick={onPressReservation}>
          Confrim{" "}
        </Button>
      </div>
    </div>
  );
}
