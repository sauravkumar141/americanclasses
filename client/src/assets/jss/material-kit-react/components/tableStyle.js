import {TableCell,TableRow,} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  const styles ={
    table: {
      minWidth: 700,
      marginTop: "15px"
    },
    toolbar: {
      justifyContent: "space-between",
      backgroundColor: "#c8fdfd",
      background: "linear-gradient(-14deg, black, rgb(31 234 18 / 33%))"
    }
  };

  export {styles, StyledTableRow,StyledTableCell}