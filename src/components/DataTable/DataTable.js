import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import axios from "axios";
import Config from "../../config/config";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(name, roomName, hotalContact, bill, date, reservationId) {
//   return { name, roomName, hotalContact, bill, date, reservationId };
// }

export default function CustomizedTables() {
  const states = useSelector((state) => state);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    getAllReservations();
  }, []);

  const formatDate = (timeStamp) => {
    console.log({timeStamp});
    return new Date(timeStamp).toISOString().slice(0, 10);
  };

  const getAllReservations = () => {
    let tempArray = [];
    let id = states.userData.id;
    axios
      .get(Config.API_END_POINT + `reservation/${id}`)
      .then((resp) => {
        resp.data.map((response) => {
          console.log("response", response);
          tempArray.push({
            name: response.Hotel.name,
            roomName: response.Room.room_number,
            hotalContact: response.Hotel.contact,
            bill: response.Bill.bill_amount,
            date: formatDate(response.createdAt),
            reservationId: response.id,
          });
        });
        console.log({tempArray});
        setRows(tempArray);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Hotel Name</StyledTableCell>
            <StyledTableCell align="right">Room Name</StyledTableCell>
            <StyledTableCell align="right">Hotel Contact</StyledTableCell>
            <StyledTableCell align="right">Bill</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Reservation Id</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.roomName}</StyledTableCell>
              <StyledTableCell align="right">
                {row.hotalContact}
              </StyledTableCell>
              <StyledTableCell align="right">{`$${row.bill}`}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">
                {row.reservationId}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
