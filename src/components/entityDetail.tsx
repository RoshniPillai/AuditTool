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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" sx={{color:"#52575D"}} />;
const checkedIcon = <CheckBoxIcon fontSize="small" sx={{color:"#fff"}} />;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: 100,
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
          borderRadius: 6,
          fontSize: 10,
          fontWeight: 'normal',
          padding: 0
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
    "& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon.css-714bhv-MuiAutocomplete-root .MuiOutlinedInput-root":{
      paddingRight: '15px'
    }
    },
    textfield: {
      "& .MuiInputBase-input.MuiAutocomplete-input": {
        color: "#fff", 
        fontSize: 12,
      },
      "& #custom-autocomplete-label": {
      },
      "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
        color: "#fff",
        display: 'none'
      }
    }
  })
);
const CustomPopper = function (props : any) {
  const classes = useStyles();
  return <Popper {...props} 
  className={classes.root}
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

export default function EntityDetailPage() {
  const [value, setValue] = React.useState<any[]>([]);

  const [result, setResult] = React.useState<AuditQuery>({});
  const serviceInstance = new AuditClient();
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
  // console.log("@@", assetArr);

  const fixedOptions = [assetArr]; 
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
const classes = useStyles();
  return (
    <>
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        setValue([
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1)
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
            disabled={fixedOptions.indexOf(option) !== -1}
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
    </>
  );
}
