import * as React from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import {AuditClient, AuditQuery} from "./serviceClient/AuditService";
import Popper from "@material-ui/core/Popper";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" sx={{color:"#52575D", fontSize: '10px'}} />;
const checkedIcon = <CheckBoxIcon fontSize="small" sx={{color:"#fff", fontSize: '10px'}} />;

const useStyles = makeStyles((theme) =>
  createStyles({
    rootPopper: {
      //width: 100,
      backgroundColor: "#3D4044",
      borderRadius: 6,
      "& .MuiAutocomplete-listbox": {
        maxHeight: 100,
        transform: 'none',
        padding: 0,
        fontSize: 10,
         backgroundColor: "#3D4044",
        color: "#fff",
        "& :hover": {
          color: "#fff",
          backgroundColor: "#148291"
        },
         "& li": {
          borderRadius: 0,
          fontSize: 10,
          fontWeight: 'normal',
          padding: 0
        }
      },
      //remove black border on hover
      "& .MuiOutlinedInput-notchedOutline": {
        border: 'none',
    },
    "& .focused":{
      backgroundColor: "pink"
    },
    //set color when selected
    "& [aria-selected='true'] ":{
      backgroundColor: "#148291"
    },
    "& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon.css-714bhv-MuiAutocomplete-root .MuiOutlinedInput-root":{
      paddingRight: '15px'
    }
    },
    textfield: {
      "& .MuiInputBase-input.MuiAutocomplete-input": {
        color: "#fff", 
        fontSize: 12,
        padding: '5px !important',
      },
      "& #custom-autocomplete-label": {
      },
      "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
        color: "#fff",
        display: 'none'
      },
      "& :focus": {
        backgroundColor: 'none'
      },
    },
  })
);
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
export default function ActionDetailPage() {
  const [value, setValue] = React.useState<any[]>([]);

  const [result, setResult] = React.useState<AuditQuery>({});
  const serviceInstance = new AuditClient();
  React.useEffect(() : void => {

  serviceInstance.audit()
      .then((data) => {
        // console.log("***:",data);
        setResult(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const newResult : any = Object.values(result);
   const assetArr : any =  Object.values(newResult)[1]; 

  const fixedOptions = [assetArr]; 
 
const classes = useStyles();
  return (
  //   <Autocomplete
  //     multiple
  //     id="fixed-tags-demo"
  //     value={value}
  //     onChange={(event, newValue) => {
  //       setValue([
  //         ...newValue.filter((option) => fixedOptions.indexOf(option) === -1)
  //       ]);
  //     }}
  //     options= { assetArr !== undefined ?(assetArr) : '' }
  //     getOptionLabel={(option) => option.userName}
  //     renderOption={(props, option, { selected }) => (
  //       <li {...props}>
  //         <Checkbox
  //           icon={icon}
  //           checkedIcon={checkedIcon}
  //           style={{ marginRight: 8 }}
  //           checked={selected}
  //         />
  //         {option.userName}
  //       </li>
  //     )}
  //     renderTags={(tagValue, getTagProps) =>
  //       tagValue.map((option, index) => (
  //         <Chip
  //           label={option.userName}
  //           {...getTagProps({ index })}
  //           disabled={fixedOptions.indexOf(option) !== -1}
  //         />
  //       ))
  //     }
  //     sx={{   
  //       "& .MuiOutlinedInput-notchedOutline": {
  //       border: 'none',
  //   }
  // }}
  //     renderInput={(params) => (
  //       <TextField {...params} label="" placeholder="" />
  //     )}
  //     PopperComponent={CustomPopper} 
  //   />
    <Autocomplete
      multiple
      id=""
      options={top100Films}
      // disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}  className={selected ? 'focused' : ''}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 0 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
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

  );
}

const top100Films = [
  { title: "Created", year: 1994 },
  { title: "Update", year: 1972 },
  { title: " Delete: Part II", year: 1974 },

];
