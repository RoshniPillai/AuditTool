import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardTimePicker,KeyboardDateTimePicker } from "@material-ui/pickers";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DayjsUtils from "@date-io/dayjs";
import dayjs from "dayjs";

const today = dayjs();
const sevenAM = dayjs().set('hour', 19).startOf('hour');
const threePM = dayjs().set('hour', 15).startOf('hour');

export default function KeyboardDateTime() {
    const [selectedDate, handleDateChange] = React.useState(dayjs());
  return (
   <MuiPickersUtilsProvider utils={DayjsUtils}>
      <KeyboardDateTimePicker
          id="time-picker"
          label="dd"
          format="DD/MM/YY HH:mm"
          value={selectedDate}
          onChange={()=>({})}
          disableFuture={true}
          onKeyDown={(e) => {
            e.preventDefault();
         }}
        
 />
    </MuiPickersUtilsProvider>
  );
}
