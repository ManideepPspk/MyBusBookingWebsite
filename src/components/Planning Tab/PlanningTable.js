import React from 'react';
import { makeStyles,MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const THEME = createMuiTheme({
    typography: {
     "fontFamily": `"monospace", "Helvetica", "Arial", sans-serif`,
     "fontSize": 15,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500
    }
 });
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const PlanningTable = (props) => {
    let {value:busData}=props
    const classes = useStyles();
    
    const changeIdx=(e,row)=>{
        e.preventDefault()
        sessionStorage.setItem("bus-id",row)
          let {onChild2}=props
          if(onChild2){
            let e=2
              onChild2(e)
          }
      }
    return (
        <div className="table-top">
            <h3 style = {{ fontFamily :  "Helvetica Neue",}}><u>Select Bus</u> :</h3>
            <MuiThemeProvider theme={THEME}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{backgroundColor:"orange"}}>
                                <TableCell align="center">BusType</TableCell>
                                <TableCell align="center">Travels</TableCell>
                                <TableCell align="center">Ac Type</TableCell>
                                <TableCell align="center">Depature</TableCell>
                                <TableCell align="center">Arrival&nbsp;</TableCell>
                                <TableCell align="center">Date&nbsp;</TableCell>
                                <TableCell align="center">Available&nbsp;</TableCell>
                                <TableCell align="center">Fare&nbsp;</TableCell>
                                <TableCell align="center">&nbsp;&nbsp;&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {busData.tickets.map((row) => (
                            <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.busType}
                            </TableCell>
                            <TableCell align="center">{row.travelsName} </TableCell>
                            <TableCell align="center">{row.acType}</TableCell>
                            <TableCell align="center">{row.departure}</TableCell>
                            <TableCell align="center">{row.arrival}</TableCell>
                            <TableCell align="center">{row.travelDate}</TableCell>
                            <TableCell align="center">{row.totalSeats-row.bookedSeats.length}</TableCell>
                            <TableCell align="center">{row.fare}</TableCell>
                            <TableCell align="center"><button className="btn btn-success" onClick={e=>changeIdx(e,row._id)}>View Seats</button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MuiThemeProvider>


        </div>
    );
};

export default PlanningTable;