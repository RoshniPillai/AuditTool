import * as React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import Pagination from "@mui/material/Pagination";
import SearchBar from "material-ui-search-bar";
import Grid from "@mui/system/Unstable_Grid";
import SearchIcon from "@mui/icons-material/Search";
import SyncIcon from "@mui/icons-material/Sync";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveIcon from '@mui/icons-material/Remove';
import DetailPanelView from "./detailPanel";
import LandingPage from "./landing";
import LoadingSpinner from "./spinner";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import dayjs, { Dayjs } from "dayjs";
import _without from "lodash/without";
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { ExportCSV } from './ExportCSV';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import ActionDetailPage from "./actionDetail";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import Popper from "@material-ui/core/Popper";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { createStyles } from "@material-ui/core/styles";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Divider from '@mui/material/Divider';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { AuditSearchCriteria, AuditClient, AuditRecords, AuditQuery } from "./serviceClient/AuditRecordService";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" sx={{ color: "#52575D", fontSize: '10px' }} />;
const checkedIcon = <CheckBoxIcon fontSize="small" sx={{ color: "#fff", fontSize: '10px' }} />;

const useStyles = makeStyles({
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
    "& .focused": {
      backgroundColor: "pink"
    },
    //set color when selected
    "& [aria-selected='true'] ": {
      backgroundColor: "#148291"
    },
    "& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon.css-714bhv-MuiAutocomplete-root .MuiOutlinedInput-root": {
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
  root: {
    height: 30,
    //width: 200,
    padding: 0,
    margin: 0,
    color: "#fff !important",
    fontSize: "12px !important",
    backgroundColor: "#3D4044 !important",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#148291 !important"
    },
    "&:selected": {
      color: "#fff",
      backgroundColor: "gray"
    }
  },
  root1: {
    backgroundColor: "#3D4044",
    background: "#3D4044",
    borderRadius: "6px",
    minWidth: "100px !important",
    paddingLeft: 8,
    fontSize: 12,
    "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedEnd.css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
      padding: 0,
    },
    "& .MuiInputAdornment-root.MuiInputAdornment-positionEnd.MuiInputAdornment-outlined.MuiInputAdornment-sizeMedium ": {
      position: "absolute",
      left: -10
    },
    "& .MuiSvgIcon-root": { color: "#ffffff", width: 15 },
    "& .MuiOutlinedInput-input": {
      color: "#ffffff",
      fontSize: 10,
      fontWeight: 400,
      lineHeight: 19,
      letterSpacing: 0,
      fontStyle: "normal",
      textAlign: "left",
      padding: "5px 0px 5px 30px"
    },
    "&.MuiInputAdornment-positionEnd": {
      color: "#ffffff"
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: 'none'
    },
  },

  /* table styling */
  table: {
    minWidth: 700
  },
  tableRow: {
    "&$selected, &$selected:hover": {
      backgroundColor: "#148291 !important"
    }
  },
  tableCell: {
    border: 0,
    borderBottom: "none",
    "$selected &": {
      color: "white"
    }
  },
  hover: {},
  selected: {}
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '20px',
  margin: '20px',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    paddingLeft: '20px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: 8,
    border: 0,
    color: theme.palette.common.white
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  padding: "0 20px",
  "&:nth-of-type(odd)": {
    backgroundColor: "#121212"
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#232425"
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

const MenuProps = {
  PaperProps: {
    sx: {
      "& .css-6hp17o-MuiList-root-MuiMenu-list": {
        padding: 0,
        borderRadius: 10,
        backgroundColor: "#3D4044"
      },
      "& .MuiList-root.MuiList-padding.MuiMenu-list": {
        padding: 0,
        width: "auto",
        background: "#3D4044",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: '8px',
      }
    }
  }
};
const CustomPopper = function (props: any) {
  const classes = useStyles();
  return <Popper {...props}
    className={classes.rootPopper}
    modifiers={{
      flip: {
        enabled: false,
      }
    }}
    popperOptions={{
      placement: 'bottom',
    }}
    placement="bottom" />;
};

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        color: "#ffffff",
        fontFamily: "Roboto",
        fontSize: 12,
        fontWeight: 400,
        lineHeight: "40px",
        letterSpacing: 0,
        textAlign: "left",
        margin: "auto 0",
        padding: 0
      }}
      {...other}
    />
  );
}
function Item1(props: BoxProps) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        m: 1,
        color: "#ffffff",
        fontFamily: "Roboto",
        fontSize: 12,
        fontWeight: 400,
        lineHeight: "19px",
        letterSpacing: 0,
        textAlign: "left",
        ...sx
      }}
      {...other}
    />
  );
}
const StackItem = styled("div")(({ theme }) => ({
  background: "transparent",
  padding: theme.spacing(1),
  textAlign: "left",
  fontSize: 12,
  color: "#fff",
  // width: 120,
}));
const SideItem = styled("div")(({ theme }) => ({
  backgroundColor: "transparent",
  textAlign: 'center',
}));
const StyledSearchBar = styled(SearchBar)`
margin: 0 auto;
width: 100px;
height: 24px;
background: pink;
`;
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  background: "#28292B",
  borderRadius: "6px",
  "&:hover": {
  },
  marginLeft: 0,
  width: "100%",
  height: 24,
  [theme.breakpoints.up("sm")]: {
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

/*for table*/
interface Data {
  date: string,
  id: number,
  eventType: string,
  entity: string,
  action: string,
  user: string
}

function createData(
  date: string,
  id: number,
  eventType: string,
  action: string,
  entity: string,
  user: string
): Data {
  return {
    date,
    id,
    eventType,
    action,
    entity,
    user
  };
}

function descendingComparator<T>(a: any, b: any, orderBy: any) {
  if (orderBy === 'dateTimeUTC') {
    return (new Date(b[orderBy]).valueOf() - new Date(a[orderBy]).valueOf());
  }
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;

}

type Order = 'asc' | 'desc';


function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof AuditRecords;
  label: string;
  numeric: boolean;
}
const headCells: readonly HeadCell[] = [
  {
    id: 'dateTimeUTC',
    numeric: false,
    disablePadding: true,
    label: 'Date',
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'asset',
    numeric: true,
    disablePadding: false,
    label: 'Event Type',
  },
  {
    id: 'changeType',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
  {
    id: 'entity',
    numeric: true,
    disablePadding: false,
    label: 'Entity',
  },
  {
    id: 'changedByID',
    numeric: true,
    disablePadding: false,
    label: 'User',
  },
];
interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof AuditRecords) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof AuditRecords) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}
const ItemStackdetail = styled("div")(({ theme }) => ({
  backgroundColor: "none",
  padding: theme.spacing(1),
  textAlign: "left",
  color: "#fff",
  fontFamily: "Roboto",
  lineHeight: "21px",
  letterSpacing: 0,
  boxShadow: 'none',
}));

const Itemdetail = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "",
  padding: theme.spacing(0.5),
  borderRadius: "4px",
  textAlign: "left",
  fontFamily: "Roboto",
  fontSize: 14,
  fontWeight: 400,
  lineHeight: "19px",
  letterSpacing: 0,
  fontStyle: 'normal',
  boxShadow: 'none',
}));

export default function DetailPage(props: any) {
  //  console.log("props data",JSON.stringify(props.newResult));
  const [detailData, setDetailData] = React.useState<AuditRecords[] | any>(props.newResult);
  console.log("selected value in entity", props.defaultEntityName)
  const [rowsData, setRowsData] = React.useState<AuditRecords[]>(props.newResult);

  const theme = createTheme();

  let today = new Date().toISOString()
  let date = new Date();
  date;
  date.setDate(date.getDate() - 1);
  const [fromDate, setFromDate] = React.useState<Dayjs | null>(dayjs(date));
  const [ToDate, setToDate] = React.useState<Dayjs | null>(dayjs(today));
  // const [data, setData] = React.useState<any>(props.newResult)
  // console.log("data", data);

  /* go back to landing page */
  const [isLandingPage, setIsLandingPage] = React.useState(false);
  /* sipnner */
  const [isLoading, setIsLoading] = React.useState(false);
  /* export to excel */
  const [reportData, setReportData] = React.useState<any>([]);


  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5131/AuditRecordDetails', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // pageNumber: 1,
          // pageSize: 6,
          utcStartDateTime: props.frmdate,
          utcEndDateTime: props.tdate,
          auditRecordID: [],
          actions: [],
          users: props.defaultUserName,
          entity: props.defaultEntityName,
          assets: props.defaultEventName,   //defaultEventName
          isExportToExcel: false,
        })
      });
      const res = await response.json();
      setData(res);
    } catch (err) {

    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    const fetchData = async () => {
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
            utcStartDateTime: props.frmdate,
            utcEndDateTime: props.tdate,
            auditRecordID: [],
            actions: [],
            users: props.defaultUserName, 
            entity: props.defaultEntityName, 
            assets: props.defaultEventName, 
            isExportToExcel: true
          })
        })
        //     .then((response) => {
        //   return response.json().then(responseJson => {
        //     console.log("***",responseJson, response.headers.get('Pagination'))

        //   });
        // })
        const res = await response.json();
        console.log("response", response)
        console.log("report data from api", await res);
        setReportData(res);
        console.log("report data in state", reportData)
      } catch (err) {
      }
      return () => { // cleanup function of type : () => void
        // console.log("Cleanup")
      }
    }
    fetchData();
  }, []);



  const newArray = reportData.map((item : any) => ({
      id: item.id,
      date: item.dateTimeUTC,
      changeType : item.changeType,
      changedByType: item.changedByType,
      //eventOrActivityEntityID : item.eventOrActivityEntityID,
      //assetId : item.assetId,
      // changedByID : item.changedByID,
      entity: item.entity, 
      asset : item.asset,
      user: item.changedByID,
  }));
  

  /*on table row click */
  const [selectedID, setSelectedID] = React.useState(0);
  const [eventName, setEventName] = React.useState<string[]>([]);
  const [actionName, setActionName] = React.useState<string[]>([]);
  const [entityName, setEntityName] = React.useState<string[]>([]);


  /*for search - ID */
  const [rows, setRows] = React.useState<any[]>([]);
  const [showsearch, setShowSearch] = React.useState(false);
  const [searched, setSearched] = React.useState<string>("");

  const requestSearch = (searchedVal: string) => {
    setShowSearch(true);
    const filteredRows = props.newResult.filter((row: any) => {
      return row.friendlyID.toString().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };
  // console.log("data", rows);
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
    setShowSearch(false);
  };

  /*for sorting */
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof AuditRecords>('dateTimeUTC');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof AuditRecords,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    //API call here , response 
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
          utcStartDateTime: props.frmdate,
          utcEndDateTime: props.tdate,
          auditRecordID: [],
          actions: [],
          users: props.defaultUserName,
          entity: props.defaultEntityName,
          assets: props.defaultEventName,   //defaultEventName
          isExportToExcel: false
        })
      })
        .then((response) => {
          return response.json().then(responseJson => {
            console.log("***", responseJson, response.headers.get('Pagination'))
          });
        });
    } catch (err) {
    }
    setPage(newPage);
  };


  const isSelected = (date: string) => selected.indexOf(date) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(props.newResult, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );
  // console.log("@@@", visibleRows)


  const [result, setResult] = React.useState<AuditQuery>({});
  const [value, setValue] = React.useState<any[]>([]); //for event
  const [value1, setValue1] = React.useState<any[]>([]); //for entity
  const [value2, setValue2] = React.useState<any[]>([]); //for user
  const [data, setData] = React.useState<any>([]);

  const serviceInstance = new AuditClient();
  //  const auditInstance = new AuditRecordDetailsClient()

  React.useEffect((): void => {
    serviceInstance.audit()
      .then((data) => {
        // console.log("API response:",data);
        setResult(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const newResult: any = Object.values(result);
  const assetArr: any = Object.values(newResult)[0]; //first key
  const eventArr: any = Object.values(newResult)[2];
  const userArr: any = Object.values(newResult)[1];
  // console.log("@@", assetArr);

  const EntityOptions = [assetArr];
  let resArr: any = [];
  if (assetArr !== undefined) {
    assetArr.filter((item: any) => {
      var i = resArr.findIndex((x: any) => (x.assetName == item.assetName));
      if (i <= -1) {
        resArr.push(item);
      }
      return null;
    });
    // console.log(resArr)
  }

  //event 
  const EventOptions = [eventArr];

  let resArr1: any = [];
  if (eventArr !== undefined) {
    eventArr.filter((item: any) => {
      var i = resArr1.findIndex((x: any) => (x.eventOrActivityName == item.eventOrActivityName));
      if (i <= -1) {
        resArr1.push(item);
      }
      return null;
    });
  }
  //users
  const UserOptions = [userArr];


  const classes = useStyles();
  // const {defaultEntityName} = props ;
  return (
    <>
      <React.Fragment>
        {isLandingPage === false ? (
          <>
            {/* detail page start  */}
            <div style={{ width: "100%" }} className="detail-page">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: "16px",
                }}
              >
                <Item1
                  sx={{
                    width: "72%",
                    height: 432,
                    //width: 1168,
                    background: "#52575D"
                  }}
                >
                  <Box
                    sx={{
                      maxHeight: 939,
                      height: "100%"
                    }}
                  >
                    <div style={{ width: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            pl: 1
                          }}
                        >
                          <Item>
                            <Typography pr={2} className="subHeading" component="div">
                              Audit results
                            </Typography>
                          </Item>
                          <Item>
                            <Typography pr={1}
                              component="div"
                              sx={{
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: "19px"
                              }}
                            >
                              {showsearch === true ? (<>{rows.length} records found</>)
                                :
                                (<>{props.newResult.length} records found</>)
                              }
                            </Typography>
                          </Item>
                          <Item>
                            <div>
                              <Button
                                sx={{ p: 0 }}
                                // onClick={showSpinner}
                                disabled={isLoading}
                                onClick={handleRefresh}
                              >
                                <SyncIcon sx={{ color: "#fff" }} fontSize="small" />
                              </Button>
                            </div>
                          </Item>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row"
                          }}>
                          <Item>
                            <Button
                              type="submit"
                              size="small"
                              variant="outlined"
                              className="btn-secondary"
                              onClick={() => setIsLandingPage(!isLandingPage)}
                              startIcon={<ArrowBackIcon fontSize="small" />}
                            >
                              <Typography variant="caption">New Query</Typography>
                            </Button>

                          </Item>

                          <Item>
                            {showsearch === true ? (
                              <ExportCSV csvData={rows} fileName={"AuditRecord"} />
                            ) : (
                              <ExportCSV csvData={newArray} fileName={"AuditRecord"} />
                            )}
                          </Item>
                        </Box>
                      </Box>
                    </div>

                    <>
                      <Paper
                        square
                        sx={{
                          width: "100%",
                          overflow: "hidden",
                          borderRadius: 0,
                          backgroundColor: '#3D4044',// "#52575D",
                          minHeight: 400,
                        }}
                      >
                        <TableContainer component={Paper} >
                          <Table
                            sx={{ minWidth: 700, minHeight: 0, color: "#fff", background: "#3D4044" }}
                            aria-label="customized table"
                            size={dense ? "small" : "medium"}
                          >
                            <EnhancedTableHead
                              numSelected={selected.length}
                              order={order}
                              orderBy={orderBy}
                              onSelectAllClick={() => ({})}
                              onRequestSort={handleRequestSort}
                              rowCount={props.newResult.length}
                            />
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>
                                  <StackItem>
                                    <Stack>

                                      <Stack
                                        direction="row"
                                        spacing={0}
                                        sx={{
                                          width: 200,
                                          height: 26,
                                          bgcolor: "#28292B",
                                          borderRadius: "6px",
                                          padding: "0 !important",
                                          overflow: "hidden"
                                        }}
                                      >
                                        <Box display="flex" flex-direction="row">
                                          <MuiPickersUtilsProvider utils={DayjsUtils}>
                                            <KeyboardDateTimePicker
                                              className="datetime-wrapper"
                                              id=""
                                              label=""
                                              format="DD/MM/YY HH:mm"
                                              autoOk={true}
                                              value={props.frmdate}
                                              onChange={(newValue) => setFromDate(newValue)}
                                              disableFuture={true}
                                              keyboardIcon={<CalendarTodayOutlinedIcon />}
                                              onKeyDown={(e) => {
                                                e.preventDefault();
                                              }}
                                            />
                                          </MuiPickersUtilsProvider>
                                          {/* <RemoveIcon fontSize="small" sx={{width: '10px', paddingTop: '5px'}}/> */}
                                          <MuiPickersUtilsProvider utils={DayjsUtils}>
                                            <KeyboardDateTimePicker
                                              className="datetime-wrapper"
                                              id=""
                                              label=""
                                              format="DD/MM/YY HH:mm"
                                              autoOk={true}
                                              value={props.tdate}
                                              onChange={(newValue) => setToDate(newValue)}
                                              disableFuture={true}
                                              keyboardIcon={<CalendarTodayOutlinedIcon />}
                                              onKeyDown={(e) => {
                                                e.preventDefault();
                                              }}
                                            />
                                          </MuiPickersUtilsProvider>
                                        </Box>
                                      </Stack>
                                    </Stack>
                                  </StackItem>
                                </StyledTableCell>

                                <StyledTableCell align="left">
                                  <StackItem sx={{ position: 'relative' }}>
                                    <SearchBar className="custom-search"
                                      placeholder=""
                                      value={searched}
                                      onChange={(searchVal) => requestSearch(searchVal)}
                                      onCancelSearch={() => cancelSearch()}
                                    />
                                  </StackItem>
                                </StyledTableCell>

                                <StyledTableCell align="left">
                                  <StackItem className="select-wrapper">
                                    <Autocomplete
                                      multiple
                                      disableCloseOnSelect
                                      id=""
                                      value={props.defaultEventName}  //props.defaultEventName
                                      onChange={(event, newValue) => {
                                        setValue([
                                          ...newValue.filter((option) => EventOptions.indexOf(option) === -1)
                                        ]);
                                      }}
                                      options={resArr1 !== undefined ? (resArr1) : ''}
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
                                            label={props.defaultEventName[index]}  //props.defaultEventName
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
                                        <TextField {...params} className={classes.textfield} label="" placeholder="" />
                                      )}
                                      PopperComponent={CustomPopper}
                                    />
                                  </StackItem>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  <StackItem className="select-wrapper">
                                    <ActionDetailPage />
                                  </StackItem>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  <StackItem className="select-wrapper">
                                    <Autocomplete
                                      multiple
                                      disableCloseOnSelect
                                      id=""
                                      value={props.defaultEntityName} //
                                      //  onChange={(event, value) => console.log(value)} // prints the selected value
                                      onChange={(event, newValue) => {
                                        setValue1([
                                          ...newValue.filter((option) => EntityOptions.indexOf(option) === -1)
                                        ]);
                                      }}
                                      options={resArr !== undefined ? (resArr) : ''}
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
                                            label={props.defaultEntityName[index]}
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
                                        <TextField {...params} className={classes.textfield} label="" placeholder="" />
                                      )}
                                      PopperComponent={CustomPopper}
                                    />
                                  </StackItem>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  <StackItem className="select-wrapper">

                                    <Autocomplete
                                      multiple
                                      id=""
                                      value={props.filteredUser}
                                      onChange={(event, newValue) => {
                                        setValue2([
                                          ...newValue.filter((option) => UserOptions.indexOf(option) === -1)
                                        ]);
                                      }}
                                      options={userArr !== undefined ? userArr : ''}
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
                                            label={props.defaultUserName[index]}
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
                                        <TextField {...params} className={classes.textfield} label="" placeholder="" />
                                      )}
                                      PopperComponent={CustomPopper}
                                    />
                                  </StackItem>
                                </StyledTableCell>


                              </TableRow>
                            </TableHead>
                            {isLoading ? (<LoadingSpinner />) :
                              (
                                <>
                                  {showsearch === true ? (
                                    <TableBody sx={{ maxHeight: 120 }}>
                                      {rows.map((row): JSX.Element => (
                                        <StyledTableRow
                                          key={row.id}
                                          onClick={() => {
                                            setSelectedID(row.id);
                                            console.log(
                                              "selected row is",
                                              selectedID
                                            );
                                          }}
                                          selected={selectedID === row.id}
                                          classes={{
                                            hover: classes.hover,
                                            selected: classes.selected
                                          }}
                                          className={classes.tableRow}
                                          sx={{
                                            "&:last-child td, &:last-child th": {
                                            }
                                          }}
                                        >
                                          <StyledTableCell
                                            component="th"
                                            scope="row"
                                            sx={{ paddingLeft: '20px' }}
                                          >
                                         {dayjs(row.dateTimeUTC).format("DD/MM/YY HH:mm:ss")}
                                          </StyledTableCell>
                                          <StyledTableCell align="left">
                                            {row.friendlyID}
                                          </StyledTableCell>
                                          <StyledTableCell align="left">
                                            {row.asset}
                                          </StyledTableCell>
                                          <StyledTableCell align="left">
                                            {row.changeType}
                                          </StyledTableCell>
                                          <StyledTableCell align="left">
                                            {row.entity}
                                          </StyledTableCell>
                                          <StyledTableCell align="left">
                                            {row.changedByID}
                                          </StyledTableCell>

                                        </StyledTableRow>
                                      ))}
                                    </TableBody>

                                  ) : (<>
                                    <TableBody sx={{ maxHeight: 120 }}>
                                      {
                                        // props.newResult.map((tableData : any) => (
                                        //   <StyledTableRow
                                        //   //key={row.date}
                                        //   // onClick={() => setSelectedRow(!selectedRow)}
                                        //   //  key={row.id}
                                        //   key= {tableData.id}
                                        //   onClick={() => {
                                        //     setSelectedID(tableData.id);
                                        //     console.log(
                                        //       "selected row is",
                                        //       selectedID
                                        //     );
                                        //   }}
                                        //   selected={selectedID === tableData.id}
                                        //   classes={{
                                        //     hover: classes.hover,
                                        //     selected: classes.selected
                                        //   }}
                                        //   className={classes.tableRow}
                                        //   sx={{
                                        //     "&:last-child td, &:last-child th": {
                                        //     // border: 0
                                        //     }
                                        //   }}
                                        // >
                                        //   <StyledTableCell
                                        //     component="th"
                                        //     scope="row"
                                        //     sx={{paddingLeft: '20px'}}
                                        //   >
                                        //     {dayjs(tableData.dateTimeUTC).format("DD/MM/YY HH:mm:ss")}


                                        //   </StyledTableCell>
                                        //   <StyledTableCell align="left">
                                        //   {tableData.id}
                                        //   </StyledTableCell>
                                        //   <StyledTableCell align="left">
                                        //   {tableData.eventOrActivityName}
                                        //   </StyledTableCell>
                                        //   <StyledTableCell align="left">
                                        //   {tableData.changeType} 
                                        //   </StyledTableCell>
                                        //   <StyledTableCell align="left">
                                        //   {tableData.assetName}
                                        //   </StyledTableCell>
                                        //   <StyledTableCell align="left">
                                        //   {tableData.userName}   
                                        //   </StyledTableCell>
                                        // </StyledTableRow>
                                        //   ))
                                        visibleRows.map((tableData: any) => (
                                          <StyledTableRow
                                            key={tableData.id}
                                            onClick={() => {
                                              setSelectedID(tableData.id);
                                              console.log(
                                                "selected row is",
                                                selectedID
                                              );
                                            }}
                                            selected={selectedID === tableData.id}
                                            classes={{
                                              hover: classes.hover,
                                              selected: classes.selected
                                            }}
                                            className={classes.tableRow}
                                            sx={{
                                              "&:last-child td, &:last-child th": {
                                              }
                                            }}
                                          >
                                            <StyledTableCell
                                              component="th"
                                              scope="row"
                                              sx={{ paddingLeft: '20px' }}
                                            >
                                              {dayjs(tableData.dateTimeUTC).format("DD/MM/YY HH:mm:ss")}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                              {tableData.friendlyID}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                              {tableData.asset}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                              {tableData.changeType}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                              {tableData.entity}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                              {tableData.changedByID}
                                            </StyledTableCell>
                                          </StyledTableRow>
                                        ))
                                      }
                                      {/* {visibleRows.map((row, index)  => (
                    <StyledTableRow
                      //key={row.date}
                      // onClick={() => setSelectedRow(!selectedRow)}
                      key={row.id}
                      onClick={() => {
                        setSelectedID(row.id);
                        console.log(
                          "selected row is",
                          selectedID
                        );
                      }}
                      selected={selectedID === row.id}
                      classes={{
                        hover: classes.hover,
                        selected: classes.selected
                      }}
                      className={classes.tableRow}
                      sx={{
                        "&:last-child td, &:last-child th": {
                        // border: 0
                        }
                      }}
                    >
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{paddingLeft: '20px'}}
                      >
                        {row.dateTimeUTC} 
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.eventType}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.action}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.entity}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.user}   
                      </StyledTableCell>
                    
                    </StyledTableRow>
                  ))}  */}
                                    </TableBody></>)}

                                </>
                              )}
                          </Table>
                        </TableContainer>
                      </Paper>
                      <Box>

                        {isLoading === true ?
                          (<></>)
                          :
                          <>
                            <Box
                              sx={{
                                backgroundColor: "#3D4044",
                                "&  .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
                                  color: "#ffffff",
                                  borderRadius: 1,
                                  backgroundColor: 'transparent',
                                }
                              }}>
                              <Box p={1}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                              >
                              </Box>
                              <Box p={1}
                                display="flex"
                                justifyContent="center"
                                alignItems="center">

                                {/* <Pagination
            color="primary" 
            count={5}
            onChange={handleChangePage}
            page={page}
            size="large"
            showFirstButton 
            showLastButton
            ></Pagination>  */}

                              </Box>

                            </Box>
                          </>

                        }
                      </Box>
                    </>

                  </Box>

                </Item1>
                <Item1
                  sx={{
                    width: "28%",
                    boxSizing: "border-box",
                   // height: '432px',
                    minHeight: '371px',
                    border: "1px solid #3D4044"
                  }}
                >
                  <Paper
                    variant="outlined"
                    sx={{
                      backgroundColor: "transparent",
                      color: "#fff",
                      textAlign: "center"
                    }}
                    className="detail-panel"
                  >
                    {selectedID === 0 ? (
                      <>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          minHeight="445px" //371px
                          sx={{
                            color: "#ffffff",
                          }}
                        >
                          <Stack spacing={2}>
                            <SideItem>
                              <img src={require('./../assets/info-square.png')} width="32px" height="36px" alt="info" />
                              <Typography
                                variant="body2"
                                component="div"
                                display="block"
                                sx={{ p: 1, fontSize: 16 }}
                              >
                                Select a row to see more details
                              </Typography>
                            </SideItem>
                          </Stack>
                        </Box>

                      </>
                    ) : (
                      <>
                        {/* { selectedID} ID */}
                        <Box sx={{ width: "100%" }} p={1}>
                          {props.newResult.map((item: any) => {
                            if (item.id === selectedID) {
                              const panelData = JSON.parse(item.auditRecordDetails)
                              //  console.log(test, JSON.parse(test))
                              // console.log( JSON.parse(test).Assignment_Event)
                              return (
                                // <p>{JSON.parse(test).Assignment_Event}</p>
                                <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 2, }}>
                                  <Grid xs={12}>
                                    <Stack direction="row" spacing={1}>
                                      <ItemStackdetail>
                                        <Box sx={{
                                          width: 59,
                                          height: 59,
                                          bgcolor: "#FFAB00",
                                          borderRadius: 20,
                                          background: "#3D4044",
                                          border: "2px solid #9EA5AD"
                                        }}>
                                          <LocationOnOutlinedIcon sx={{ mt: '10px', ml: '10px' }} fontSize="large" />
                                        </Box>
                                      </ItemStackdetail>
                                      <ItemStackdetail sx={{ paddingTop: '20px' }}>
                                        <Typography sx={{ fontWeight: '400', fontSize: '12px' }} component="div">
                                          Assignment Event
                                        </Typography>
                                        <Typography sx={{ fontWeight: '500', fontSize: '16px' }} component="div">
                                          {JSON.parse(panelData).Assignment_Event}
                                        </Typography>
                                      </ItemStackdetail>
                                    </Stack>
                                  </Grid>
                                  <Grid xs={12}><Divider sx={{ mt: '4px', mb: 1, border: '1px solid #3D4044' }} /></Grid>
                                  <Grid xs={6}>
                                    <Itemdetail >Executed by</Itemdetail>
                                  </Grid>
                                  <Grid xs={6}>
                                    <Itemdetail> {JSON.parse(panelData).ChangeByType}</Itemdetail>
                                  </Grid>
                                  <Grid xs={6}>
                                    <Itemdetail sx={{ textTransform: "uppercase" }}>Circuit created</Itemdetail>
                                  </Grid>
                                  <Grid xs={6}>
                                    <Itemdetail> {JSON.parse(panelData).User_Name} <br />{dayjs(JSON.parse(panelData).DateTime_Utc).format("DD/MM/YY HH:mm:ss")}
                                      <br />  {selectedID}  </Itemdetail>
                                  </Grid>
                                  <Grid xs={12}>
                                    <Itemdetail></Itemdetail>
                                  </Grid>
                                  <Grid xs={6}>
                                    <Itemdetail sx={{ textTransform: "uppercase" }}>Material</Itemdetail>
                                  </Grid>
                                  <Grid xs={6}>
                                    <Itemdetail>{JSON.parse(panelData).Material}</Itemdetail>
                                  </Grid>
                                  <Grid xs={6}>
                                    <Itemdetail sx={{ textTransform: "uppercase" }}>Payload</Itemdetail>
                                  </Grid>
                                  <Grid xs={6}>
                                    <Itemdetail>{JSON.parse(panelData).EventName}</Itemdetail>
                                  </Grid>
                                  <Grid xs={6}>
                                    <Itemdetail sx={{ textTransform: "uppercase" }}>Source</Itemdetail>
                                  </Grid>
                                  <Grid xs={6}>
                                    <Itemdetail>{JSON.parse(panelData).Source}</Itemdetail>
                                  </Grid>
                                  <Grid xs={12} mt={2}>

                                  </Grid>
                                </Grid>
                              )
                            }
                          })}

                        </Box>
                        <div style={{
                          backgroundColor: "#3D4044",
                          padding: 8,
                        }}>
                          <Typography variant="body2" gutterBottom sx={{ fontSize: 14, textAlign: "left", pl: 2 }}>
                            USER ACTIVITY (at similar time)
                          </Typography>
                          <Accordion
                            style={{
                              backgroundColor: "#3D4044",
                              color: "#fff",
                              textAlign: "left",
                              boxShadow: 'none',
                              margin: 0
                            }}
                          >
                            <AccordionSummary
                              expandIcon={
                                <ArrowDropDownIcon fontSize="small" htmlColor="#fff" />
                              }
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography sx={{ fontWeight: '400', fontSize: '14px' }} component="div">John Smith</Typography>

                            </AccordionSummary>
                            <AccordionDetails sx={{ paddingTop: 0 }}>
                              <Grid container pl={2} spacing={0}>
                                <Grid xs={12}> <Divider sx={{ mb: 1, border: '1px solid #52575D' }} /></Grid>
                                <Grid xs={6}>
                                  <Itemdetail ><Box sx={{ textTransform: 'uppercase' }}>Previous action</Box>
                                    <Box mt={1} sx={{ width: 120, bgcolor: "#232425", borderRadius: '3px' }}> Dump destination</Box>
                                  </Itemdetail>
                                </Grid>
                                <Grid xs={6}>
                                  <Itemdetail sx={{ textAlign: 'right' }}>10:13:28 <br />1min earlier</Itemdetail>
                                </Grid>
                                <Grid xs={9}>
                                  <Itemdetail>Reset dump destination <br /> (Stockpile 23A)</Itemdetail>
                                </Grid>
                                <Grid xs={3}>
                                  <Itemdetail></Itemdetail>
                                </Grid>
                                <Grid xs={12}>
                                  <Divider sx={{ mt: 1, border: '1px solid #52575D' }} />
                                </Grid>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion
                            style={{
                              backgroundColor: "#3D4044",
                              color: "#fff",
                              textAlign: "left",
                              boxShadow: 'none',
                              margin: 0
                            }}
                          >
                            <AccordionSummary
                              expandIcon={
                                <ArrowDropDownIcon fontSize="small" htmlColor="#fff" />
                              }
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                            >
                              <Typography sx={{ fontWeight: '400', fontSize: '16px' }} component="div">Jane Lastname</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ paddingTop: 0 }}>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </>
                    )}
                  </Paper>
                </Item1>
              </Box>
            </div>
            {/* detail page end  */}
          </>
        ) : (
          <LandingPage />
        )}
      </React.Fragment>
    </>
  );
}
