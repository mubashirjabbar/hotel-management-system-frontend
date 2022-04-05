import * as React from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";

export default function BasicDatePicker(props) {
  const [date, setDate] = React.useState(null);

  let convertedDate = new Date(date).toISOString().slice(0, 10);
  props.function(convertedDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Select date"
        value={date}
        showTodayButton
        minDate={new Date()}
        onChange={(newDate) => {
          setDate(newDate);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
