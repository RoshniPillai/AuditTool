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
      backgroundColor: "#3D4044",
      borderRadius: 18,
      "& .MuiAutocomplete-listbox": {
        maxHeight: 200,
        transform: 'none',
        padding: 0,
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
export default function UserSelectBox() {
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
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        setValue([
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1)
        ]);
      }}
      options= { assetArr !== undefined ?(assetArr) : '' }
      getOptionLabel={(option) => option.userName}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
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
        <TextField {...params} label="" placeholder="" />
      )}
      PopperComponent={CustomPopper} 
    />
  );
}

