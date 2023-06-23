import * as React from "react";
import  { useCallback, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import dayjs, { Dayjs } from "dayjs";
import { Theme, useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { makeStyles, withStyles, createMuiTheme, createStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DetailPage from "./detail";
import _without from "lodash/without";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { DateTimePicker } from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import DateFnsUtils from "@date-io/date-fns";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import Popper from "@material-ui/core/Popper";
import {AuditClient, AuditQuery, AuditRecordDetailsClient, AuditSearchCriteria} from "./serviceClient/AuditRecordService";
const theme = createTheme();
const icon = <CheckBoxOutlineBlankIcon fontSize="small" sx={{color:"#52575D"}} />;
const checkedIcon = <CheckBoxIcon fontSize="small" sx={{color:"#fff"}} />;
const useStyles = makeStyles({
  rootPopper: {
    backgroundColor: "#3D4044",
    borderRadius: 18,
    "& .MuiAutocomplete-listbox": {
      maxHeight: 200,
      transform: 'none',
      padding: 0,
      // borderRadius: 0,
      fontSize: 14,
      backgroundColor: "#3D4044",
      color: "#fff",
      "& :hover": {
        color: "#fff",
        backgroundColor: "#148291"
      },
      "& li": {
        borderRadius: 0,
        fontSize: '16px',
        fontWeight: 'normal'
      }
    },
    //remove black border on hover
    "& .MuiOutlinedInput-notchedOutline": {
      border: 'none',
  },
  //set color when selected
  "& [aria-selected='true'] ":{
    backgroundColor: "#148291"
  },
  },
  textfield: {
    "& .MuiInputBase-input.MuiAutocomplete-input": {
      color: "#fff", 
      fontSize: 18,
      paddingLeft: '16px !important',
    },
    "& #custom-autocomplete-label": {
    },
    "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
      color: "#fff"
    }
  },
  select: {
    "& ul": {
      padding: 0
    },
    "& li": {
      fontSize: 62
    }
  },

  root: {
    height: 30,
    //width: 200,
    paddingTop: 0,
    margin: 0,
    color: "#fff !important",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "19px",

    "& ul.MuiList-root.MuiList-padding.MuiMenu-list.css-6hp17o-MuiList-root-MuiMenu-list": {},
    "& .css-6hp17o-MuiList-root-MuiMenu-list": {},
    "&:hover": {
      color: "#fff",
      backgroundColor: "#148291 !important"
    },
    "&:selected": {
      color: "#fff"
    },
    "& .css-w6qulv-MuiInputBase-root .MuiInputBase-input:focus": {}
  },
  root1: {
    outline: 'none',
    backgroundColor: "#3D4044",
    background: "#3D4044",
    borderRadius: "20px",
    width: "209px",
    minWidth: "209px !important",
    paddingLeft: 8,
    fontSize: 16,

    "& .MuiInputAdornment-root.MuiInputAdornment-positionEnd.MuiInputAdornment-outlined.MuiInputAdornment-sizeMedium ": {
      position: "absolute",
      left: 0
    },
    "& .MuiSvgIcon-root": { color: "#ffffff", width: 15 },
    "&:hover": {
    },
    "& .MuiOutlinedInput-input": {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 19,
      letterSpacing: 0,
      fontStyle: "normal",
      textAlign: "left",
      padding: "10px 20px 10px 40px",
      outline: 'none'
    },
    "&.MuiInputAdornment-positionEnd": {
      color: "#ffffff"
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: 'none'
    },
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: "25ch"
  }
});
const CustomPopper = function (props : any) {
  const classes = useStyles();
  return <Popper {...props} 
  className={classes.rootPopper}
  modifiers={{
    flip: {
        enabled: false,
    }
}}
popperOptions={{
 placement:'bottom',
}}
   placement="bottom" />;
};

export default function LandingPage() {
  const [result, setResult] = React.useState<AuditQuery>({});
  const [value, setValue] = React.useState<any[]>([]); //for event
  const [value1, setValue1] = React.useState<any[]>([]); //for entity
  const [value2, setValue2] = React.useState<any[]>([]); //for user
  const [data, setData] = React.useState<any>([]);
  const [paginationObj, setPaginationObj] = React.useState<any>({});
   const [isLandingPage, setIsLandingPage] = React.useState(true);
  const serviceInstance = new AuditClient();
  const auditInstance = new AuditRecordDetailsClient()
// console.log("****value", value)
  React.useEffect(() : void => {
    serviceInstance.audit()
        .then((data) => {
          console.log("API response:",data);
          setResult(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, []);

    const newResult : any = Object.values(result);
    const assetArr : any =  Object.values(newResult)[0]; //first key
    const eventArr : any =  Object.values(newResult)[2]; 
    const userArr : any =  Object.values(newResult)[1]; 
    const actionArr : any =  Object.values(newResult)[3];
   console.log("@@",  Object.values(newResult)[3]);    //action array
 
   const EntityOptions = [assetArr]; 
 let resArr : any = [];
 if( assetArr !== undefined){
   assetArr.filter((item: any) => {
     var i = resArr.findIndex((x : any) => (x.assetName == item.assetName));
     if (i <= -1) {
       resArr.push(item);
     }
     return null;
   });
   // console.log(resArr)
 }

//event 
const EventOptions = [eventArr]; 
let resArr1 : any = [];
if( eventArr !== undefined){
  eventArr.filter((item: any) => {
    var i = resArr1.findIndex((x : any) => (x.eventOrActivityName == item.eventOrActivityName));
    if (i <= -1) {
      resArr1.push(item);
    }
    return null;
  });
}
  //users
  const UserOptions = [userArr]; 

//get values from selct to pass to GET API
let selectedEvent = value.map(a => a.id);
let selectedEventname = value.map(a => a.eventOrActivityName)

let selectedEntity = value1.map(a => a.id);
let selectedEntityname = value1.map(a => a.assetName)

let selectedUser = value2.map(a => a.id);
let selectedUsername = value2.map(a => a.userName)

console.log("selected user" , selectedUsername)
console.log("selected entity" , selectedEntityname)
console.log("selected event" , selectedEventname)

const handleClick = async () => {
  try {
    const response = await fetch('http://localhost:5131/AuditRecordDetails', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageNumber: 1,
        pageSize: 10,
        utcStartDateTime: fromDate,
        utcEndDateTime: toDate,   
        auditRecordID: [],
        actions: [],
        users: selectedUsername, 
        entity: selectedEntityname, 
        assets: selectedEventname,    //event name
        isExportToExcel: false, 
    })
    })
    .then((response) => {
      return response.json().then(responseJson => {
        setData(responseJson)
       // setPaginationObj(response.headers.get('Pagination'))
       });
    });   
   } catch (err) {
  } 
  setIsLandingPage(!isLandingPage)
};

  const theme = useTheme();
  const classes = useStyles();

  // let today = new Date().toISOString()
  let today = new Date().toJSON()
  let date = new Date();
  date;
  date.setDate(date.getDate() - 1);


  const [fromDate, setFromDate] = React.useState<any>(date.toJSON());
  const [toDate, setToDate] = React.useState< any>(new Date().toJSON());
  const[error, setError] = React.useState<any>('')
  const[error1, setError1] = React.useState<any>('')
//   console.log("from date", fromDate);
//    console.log("to date", toDate);


const handleFromDateChange = ( value : any) => {
  console.log("**Value", new Date(value.toJSON()))
  const todayDate = new Date();
  if(new Date(value.toJSON()).getTime()  >= todayDate.getTime()){
     //alert("invalid")
    // console.log("invalid selection")
    // console.log("@@",value.toJSON())
    setError('From date should not be greater than current date')
  }
  else{
   // alert("valid")
    setFromDate(value.toJSON());
    setError('')
  }
}

const handleToDateChange = ( value : any) => {
  const fdate = new Date(fromDate)
  const tdate = new Date(value.toJSON()) 
  if(tdate.getTime() < fdate.getTime()){
    setError1('To date should not be less than current date')
  }
  else{
   // alert("valid")
    setToDate(value.toJSON());
    setError1('')
  }
}


  return (
    <React.Fragment>
      <CssBaseline />
      {isLandingPage === true ? (
        <>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              color: "#ffffff"
            }}
            className="landing-page"
          >
            <Box
              sx={{
                width: 426,
                textAlign: "left",
                marginTop: 8
              }}
            >
              <Stack spacing={2}>
                <Typography className="heading" component="div">
                  New audit query
                </Typography>
                <Typography className="title" component="div" mt={1}>
                Select a date range
                </Typography>
                <Stack direction="column">
                <Stack direction="row" className="calendar-wrapper" spacing={1} sx={{ marginTop: '0.375rem !important' }}>
                  <Stack spacing={0}>
                    <Typography pb={1} className="title" component="div">
                      From
                    </Typography>
                    <MuiPickersUtilsProvider utils={DayjsUtils}>
                      <KeyboardDateTimePicker       
                        id="time-picker"
                        label=""
                        format="DD/MM/YY HH:mm"
                       // autoOk={true}
                        value={fromDate}      
                        onChange={handleFromDateChange}       
                        disableFuture={true}
                        keyboardIcon={<CalendarTodayOutlinedIcon />}
                        onKeyDown={(e) => {
                          e.preventDefault();
                        }}   
                      />
                    </MuiPickersUtilsProvider>
                  </Stack>
                  <Stack spacing={0}>
                    <Typography pb={1} className="title" component="div">
                      To
                    </Typography>
                    <MuiPickersUtilsProvider utils={DayjsUtils}>
                      <KeyboardDateTimePicker
                        id="time-picker"
                        label=""
                        format="DD/MM/YY HH:mm"
                       // autoOk={true}
                        value={toDate}
                        onChange={handleToDateChange} 
                        disableFuture={true}
                        keyboardIcon={<CalendarTodayOutlinedIcon />}
                        onKeyDown={(e) => {
                          e.preventDefault();
                        }}
                      />
                    </MuiPickersUtilsProvider>                   
                  </Stack>                 
                </Stack>
                { error !== '' ?
                 <Typography mt={1} variant="caption" component="div" sx={{color: "red"}}>
                  {error}
                  </Typography>
                  :
                  <></>
                  }  
                  { error1 !== '' ?
                 <Typography mt={1} variant="caption" component="div" sx={{color: "red"}}>
                  {error1}
                  </Typography>
                  :
                  <></>
                  }   
                </Stack>
                
                <FormControl sx={{ m: 1, width: 426 }}>
                  <Typography mb={1}  className="title" component="div">
                  Select type of event or activity
                  </Typography>
                  <Autocomplete
                multiple
                disableCloseOnSelect
                id=""
                value={value}
                onChange={(event, newValue) => {
                  setValue([
                    ...newValue.filter((option) => EventOptions.indexOf(option) === -1)
                  ]);
                }}
                options= { resArr1 !== undefined ?(resArr1) : '' }
                getOptionLabel={(option) => option.eventOrActivityName}
                renderOption={(props, option, { selected }) => (
                  <li {...props} className={selected ? 'focused' : ''}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.eventOrActivityName}
                  </li>
                )}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      label={option.eventOrActivityName}
                      {...getTagProps({ index })}
                      disabled={EventOptions.indexOf(option) !== -1}
                    />
                  ))
                }
                sx={{   
                  "& .MuiOutlinedInput-notchedOutline": {
                  border: 'none',
              }
            }}
                renderInput={(params) => (
                  <TextField {...params}  className={classes.textfield} label="" placeholder="" />
                )}
                PopperComponent={CustomPopper}
              />
                </FormControl>
                <FormControl sx={{ m: 1, width: 426}}>
                  <Typography mb={1} className="title" component="div">
                  Select Entity or Asset
                  </Typography>
                  <Autocomplete
                multiple
                disableCloseOnSelect
                id=""
                value={value1}
              //  onChange={(event, value) => console.log(value)} // prints the selected value
                onChange={(event, newValue) => {
                  setValue1([
                    ...newValue.filter((option) => EntityOptions.indexOf(option) === -1)
                  ]);
                }}
                options= { resArr !== undefined ?(resArr) : '' }
                getOptionLabel={(option) => option.assetName}
                renderOption={(props, option, { selected }) => (
                  <li {...props} className={selected ? 'focused' : ''}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.assetName}
                  </li>
                )}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      label={option.assetName}
                      {...getTagProps({ index })}
                      disabled={EntityOptions.indexOf(option) !== -1}
                    />
                  ))
                }
                sx={{   
                  "& .MuiOutlinedInput-notchedOutline": {
                  border: 'none',
              }
            }}
                renderInput={(params) => (
                  <TextField {...params}   className={classes.textfield} label="" placeholder="" />
                )}
                PopperComponent={CustomPopper}
              />
                </FormControl>
                <FormControl sx={{ m: 1, width: 426 }}>
                  <Typography mb={1} className="title" component="div">
                  Select Users
                  </Typography>
                </FormControl>
                <Autocomplete
                multiple
                id=""
                disableCloseOnSelect
                value={value2}
                onChange={(event, newValue) => {
                  setValue2([
                    ...newValue.filter((option) => UserOptions.indexOf(option) === -1)
                  ]);
                }}
                options= { userArr !== undefined ?(userArr) : '' }
                getOptionLabel={(option) => option.userName}
                renderOption={(props, option, { selected }) => (
                  <li {...props} className={selected ? 'focused' : ''}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.userName}
                  </li>
                )}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      label={option.userName}
                      {...getTagProps({ index })}
                      disabled={UserOptions.indexOf(option) !== -1}
                    />
                  ))
                }
                sx={{   
                  "& .MuiOutlinedInput-notchedOutline": {
                  border: 'none',
              }
            }}
                renderInput={(params) => (
                  <TextField {...params}  className={classes.textfield} label="" placeholder="" />
                )}
                PopperComponent={CustomPopper}
              />
                <Box pt={2} display="flex" justifyContent="flex-end">
                  <Button
                    className="primarybtn"
                    type="submit"
                    //fullWidth
                    variant="contained"
                    sx={{
                      "&:hover": {
                        backgroundColor: "none"
                      }
                    }}
                     onClick={handleClick}
                  >
                    START QUERY
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Box>
        </>
      ) : (
        <DetailPage tdate={toDate} frmdate={fromDate} newResult={data} 
         // newPaginationData={paginationObj}         
          eventArray={eventArr}
          defaultEventName={selectedEventname} //event name          
          defaultEntityName={selectedEntityname} // entity name //
          defaultUserName={selectedUsername} //value2 ['roshni','']
          filteredUser={value2}
          // defaultEntity={selectedEntity}
          // defaultEvent={selectedEvent}
          // defaultUser={selectedUser}
         
        />
      )}
    </React.Fragment>
  );
}
