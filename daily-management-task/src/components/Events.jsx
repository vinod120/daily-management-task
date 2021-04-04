import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import { enGB } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import './events.css';
import { useDispatch, useSelector } from 'react-redux';
import { getData, postData, } from "../redux/actions";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";

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

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 22,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });
  
function Events(props) {
  const dispatch = useDispatch()
  const data = useSelector(state=>state.data.data)
  console.log(data, "redux data")

  // console.log(props.date && props.date)
  const check =  props.date ? format(props.date, "dd MMM yyyy", { locale: props.locale }) : "none"
  // console.log(check)

    const classes = useStyles()
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [eventTitle, setEventTitle] = useState('')
    const [eventDetails, setEventDetails] = useState('')
    useEffect(() => {
      dispatch(getData())
      var today = new Date(),
      time = today.getHours() + ':' + (today.getMinutes()<10?'0':'') + today.getMinutes();
      
      setTime(time);
      setDate(new Date())
  }, [dispatch])
    const [state, setState] = React.useState({
        checkedB: true,
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
      const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleSubmit = ()=>{
        handleClose()
        // console.log(time, format(props.date, "dd MMM yyyy", { locale: props.locale }))
        const obj ={
          time: time,
          date: format(date, "dd MMM yyyy", { locale: enGB }),
          event_title: eventTitle,
          event_details: eventDetails,
          id: uuidv4()
        }
        // console.log(obj)
        dispatch(postData(obj))
      }
    return (
        <div>
            {/* <h1>Events Page</h1> */}
            <p className={classes.date_format}>
                <strong>
                Selected date:{" "}
                {props.date ? format(props.date, "dd MMM yyyy", { locale: props.locale }) : "none"}.
                </strong>
            </p>
            <div>
                {
                  props.date && data && data
                  .filter((item)=>item.date === check)
                  .map((item)=>(
                    <div style={{margin:'10px 0px'}}>
                      <Card className={classes.root}>
                          <CardHeader
                          className={classes.subHeader}
                              avatar={
                              <IconButton aria-label="settings">
                                  <FormControlLabel
                                      control={<IOSSwitch checked={state.checkedB} onChange={handleChange} name="checkedB"/>}
                                  />
                              </IconButton>
                              }
                              action={
                              <IconButton aria-label="settings" style={{marginTop:'12px'}}>
                                  <Link to={`/edit/${item.id}`}>
                                    <EditIcon {...item.id}/>
                                  </Link>
                              </IconButton>
                              }
                              title={item.event_title}
                              subheader={item.time && item.time}
                            
                          />
                          <CardContent>
                              <Typography variant="body2" color="textSecondary" component="p">
                                {item.event_details}
                              </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                              <IconButton aria-label="add to favorites">
                                  <FavoriteIcon />
                              </IconButton>
                          </CardActions>
                        </Card>
                      </div>
                  ))
                }
                <div style={{marginTop:'20px'}}>
                    <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                        Add Event
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        // style={{border:'1px solid red'}}
                    >
                        <DialogTitle id="alert-dialog-title">{"ADD EVENT"}</DialogTitle>
                        <DialogContent style={{width:'500px'}}>
                            <div style={{display:'grid', gap:'20px', justifyContent:'center'}}>
                                <div>
                                <Input 
                                placeholder="Event Title" 
                                color="secondary" 
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
                                    <div>
                                        <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
                                    </div>
                                </div>
                                <hr style={{margin:'10px 0px'}} />
                                <strong>Event Details</strong>
                                <div>
                                <TextareaAutosize
                                    rowsMax={20}
                                    style={{width:'400px'}}
                                    aria-label="maximum height"
                                    placeholder="Maximum 4 rows"
                                    onChange={(e)=>setEventDetails(e.target.value)}
                                    />
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} variant="contained" color="secondary" autoFocus>
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default Events;

