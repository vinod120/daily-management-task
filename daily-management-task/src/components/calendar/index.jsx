import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import { enGB } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './calendar.css';
import Events from '../Events';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent:'center'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  
function Calendar() {

    const classes = useStyles();
    const [date, setDate] = useState();
    const [time, setTime] = useState();

    useEffect(() => {
        var today = new Date(),
        time = today.getHours() + ':' + (today.getMinutes()<10?'0':'') + today.getMinutes();
        
        setTime(time);
        setDate(new Date())
    }, [])
    return (
        <div>
            {/* <h1>Calendar page</h1> */}
            <Paper evevation={3} style={{padding:'10px'}}>
                <div className="calendar-container">
                    <div className="date-picker">
                    <div>
                        <form className={classes.container} noValidate>
                            <TextField
                                id="time"
                                label="Time Picker"
                                type="time"
                                value={time}
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                inputProps={{
                                step: 300, // 5 min
                                }}
                                onChange={(e)=>setTime(e.target.value)}
                            />
                        </form>
                    </div>
                        <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB}/>
                    </div>
                   
                    <div style={{flex:'0.6'}}>
                        <Events date={date} locale={enGB} time={time}/>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default Calendar;
