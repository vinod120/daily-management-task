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
import './events.css';

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
    const classes = useStyles()
    const [state, setState] = React.useState({
        checkedB: true,
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

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
                            <EditIcon />
                        </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader={props.time && props.time}
                       
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}

export default Events;

