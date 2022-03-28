import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

function createData(name, calories, fat, carbs, protein, a) {
  return { name, calories, fat, carbs, protein, a };
}

const rows = [
  createData(
    "Pearl Continental",
    41,
    923321477989,
    `100$`,
    `  03 / 20 / 2022`,
    "Available"
  ),
  createData(
    "Pearl Continental",
    27,
    923321477989,
    `125$`,
    `03 / 21 / 2022`,
    "Available"
  ),
  createData(
    "Pearl Continental",
    62,
    923321477989,
    `147$`,
    ` 03 / 22 / 2022`,
    "Not available"
  ),
  createData(
    "Pearl Continental",
    51,
    923321477989,
    `289$`,
    ` 03 / 23 / 2022`,
    "Available"
  ),
  createData(
    "Pearl Continental",
    36,
    923321477989,
    `70$`,
    `   03 / 24 / 2022`,
    "Not available"
  ),
];

export default function CustomizedTables() {
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
            <StyledTableCell align="right">Booking Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
              <StyledTableCell align="right">{row.a}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
