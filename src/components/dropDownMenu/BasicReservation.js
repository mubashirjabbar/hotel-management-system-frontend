import * as React from "react";
import BasicDatePicker from "../datePicker/BasicDatePicker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import axios from "axios";

import Config from "../../config/config";
import "./BasicReservation.scss";

export default function BasicReservation() {
  const history = useHistory();

  const [selectHotal, setSelectHotal] = React.useState("");
  const [selectRoom, setSelectRoom] = React.useState("");
  const [hotals, setHotals] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  const [selectedHotelId, setSelectedHotelId] = React.useState("");
  const [selectedRoomId, setSelectedRoomId] = React.useState("");
  const [price, setPrice] = React.useState("0");
  const [reservationDate, setReservationDate] = React.useState(null);
  const states = useSelector((state) => state);

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
            price: response.price,
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
    setPrice(event?.target?.value?.price);
    setSelectedHotelId(hotelId);
    setSelectHotal(event.target.value);
    getRoomForSelectedHotel(hotelId);
  };
  const handleChangeRoom = (event) => {
    setSelectedRoomId(event.target.value.id);
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
            id: response.id,
          });
        });
        setRooms(tempArray);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const onPressReservation = () => {
    let { id } = states?.userData;
    if (selectedHotelId && selectedRoomId &&reservationDate) {
      axios
        .post(Config.API_END_POINT + "bills", {
          user_id: id,
          bill_data: "Bill details here",
          bill_amount: price,
        })
        .then((response) => {
          let billId = response?.data?.id;
          addReservation(id, billId);
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  };

  const addReservation = (userId, billId) => {
    axios
      .post(Config.API_END_POINT + `reservation`, {
        user_id: userId,
        room_id: selectedRoomId,
        hotel_id: selectedHotelId,
        bill_id: billId,
        reservation_date: reservationDate,
      })
      .then((resp) => {
        history.push({ pathname: "/", state: { fromAddReservation: true } });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const datePickFromChild = (date) => {
    setReservationDate(date);
  };

  return (
    <div className="main-Container">
      <div className="chooseText">
        <h3 style={{ color: "#1976d2" }}>Choose hotel</h3>
      </div>

      <div className="dropdownText">
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

      <div className="chooseText">
        <h3 style={{ color: "#1976d2" }}>Choose room</h3>
      </div>

      <div className="dropdownText">
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
        <div className="datePicker">
          <BasicDatePicker function={datePickFromChild} />
        </div>
        <div style={{ width: "50%", flexDirection: "row", display: "flex" }}>
          <h4 style={{ color: "#686868", fontWeight: 200, fontSize: 17 }}>
            {" "}
            Total price:
            <span style={{ color: "#1976d2" }}>{`$ ${price}`}</span>
          </h4>
        </div>
      </div>
      <div className="confirmButton">
        <Button variant="contained" onClick={onPressReservation}>
          Confirm{" "}
        </Button>
      </div>
    </div>
  );
}
