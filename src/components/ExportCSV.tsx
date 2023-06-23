import React from 'react'
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportCSV = ({csvData , fileName}: any) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData : any, fileName : any): void => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
    <Tooltip
        title="Export to Excel"
        placement="right-start"
        componentsProps={{
            tooltip: {
            sx: {
                bgcolor: "#232425",
                color: "white"
            }
            }
        }}
        >
        <Button sx={{ p: 0 }} onClick={(e) => exportToCSV(csvData,fileName)}>
        <img src={require('./../assets/export-icon.png')} width="18px" height="16px" alt="export icon" />
        </Button>
    </Tooltip>       
    )
}