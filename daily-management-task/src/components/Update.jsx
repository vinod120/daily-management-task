import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getData, putData } from '../redux/actions';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { DatePickerCalendar } from "react-nice-dates";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { enGB } from "date-fns/locale";
import Button from '@material-ui/core/Button';
import { format } from "date-fns";
import { v4 as uuidv4 } from 'uuid';
import { Redirect, useHistory } from "react-router";


const useStyles = makeStyles((theme) => ({
    root: {
      width: 'auto',
      margin:'auto',
      border: '1px solid #bdbdbd'
    },
    date_format: {
        padding:'10px', 
        border:'1px solid #438cd2', 
        borderRadius:'5px', 
        color:'#438cd2',
        marginBottom:'10px'
    },
    subHeader:{
        color:'#ff4081',
    }
  }));

function Update(props) {
    const classes = useStyles()

    const {match} = props
    const id = match.params.id
    // console.log(match.params.id)
    const dispatch = useDispatch()
    const data = useSelector(state=>state.data.data)
    const item = data.find(item => item.id === id)
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [eventTitle, setEventTitle] = useState(item.eventTitle)
    const [eventDetails, setEventDetails] = useState(item.eventDetails)
    const [bool, setBool] = useState(false)
    console.log(item)
    useEffect(() => {
        dispatch(getData())
    }, [dispatch])

    const handleUpdate = ()=>{
        const obj ={
            time: time,
            date: format(date, "dd MMM yyyy", { locale: enGB }),
            event_title: eventTitle,
            event_details: eventDetails,
            id: item.id
          }
        console.log(obj)
        dispatch(putData(obj))
        setBool(true)

    }

    const handleCancel = ()=>{
            setBool(true)
    }
    
    return (
        <>
            {
                bool ? <Redirect to = '/' /> :
                <div>
                    <div>
            {/* <h1>update</h1> */}
            <div style={{display:'grid', gap:'20px', justifyContent:'center'}}>
            <div>
                    <Input 
                    placeholder="Event Title" 
                    color="secondary" 
                    // value={eventTitle || ""}
                    defaultValue={item.event_title|| ""}
                    inputProps={{ 'aria-label': 'description' }} 
                    onChange={(e)=>setEventTitle(e.target.value)}
                    />
                    </div>
                    <div>
                        <div>
                        <form className={classes.container} noValidate>
                            <TextField
                                id="time"
                                label="Time Picker"
                                type="time"
                                // value={item.time}
                                defaultValue={item.time || ""}
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
                        <div>
                            <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
                        </div>
                    </div>
                    <hr style={{margin:'10px 0px'}} />
                    <strong>Event Details</strong>
                    <div>
                    <TextareaAutosize
                        rowsMax={20}
                        style={{width:'400px', height:'100px'}}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        // value={item.event_details}
                        defaultValue={eventDetails || ""}
                        onChange={(e)=>setEventDetails(e.target.value)}
                        />
                    </div>
                </div>
                <hr />
               <div style={{display:'flex', justifyContent:'center'}}>
                <Button variant="contained" style={{marginRight:'10px'}} onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleUpdate}>
                        Update
                    </Button> 
               </div>
        </div>
                </div>
            }
        </>
    )
}

export default Update;
