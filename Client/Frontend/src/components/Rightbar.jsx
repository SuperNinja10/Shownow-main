import React,{useState, useEffect} from 'react'
import { makeStyles, Grid,Paper, Avatar, TextField, Button, Typography,Link, responsiveFontSizes } from '@material-ui/core'

import axios from 'axios';
import { useHistory } from "react-router-dom";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import purple from '@material-ui/core/colors/purple'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {host} from '../host';
import Badge from '@material-ui/core/Badge';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
  import {withStyles } from '@material-ui/core/styles';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }



const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 5,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) =>({


    root: {
    marginLeft:theme.spacing(1),
    marginLeft:theme.spacing(2),
    width: '100%',
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
    
    
  },

      purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
        text:{
         display:'flex',
         width:'100%',
         justifyContent:'center'
     },
     playing:{
         marginTop:theme.spacing(0.5),
         marginRight:theme.spacing(0.5),
     },
     margin:{
       marginTop:theme.spacing(10)
     }
}))

 

const Rightbar =()=>{

     const [rows,Setrows]= useState([]);
     const [open,setOpen] =useState({
        status:false,
        message: " ",

     })


const accent = purple.A200;
        



    useEffect(async() => {
    try {
        const data = await axios.get(host+"/api/users/all");

        if(data.data){
            Setrows(data.data);
        }
 
    }   catch (error) {
     
        
    }
  
   },[])

    const classes = useStyles();
    const history = useHistory();

   const handleRoute = (result) =>{
    const profile = 'profiles'
    history.push('/'+profile+'/'+result)
    window.location.reload(false);
   }
    
   return (
       <>
           <div className={classes.margin}>       
                <div className={classes.text}>
                    <div className={classes.playing}>
                      <GroupAddIcon/>
                    </div>
                    <div>
                        <Typography gutterBottom variant="h5" >Recenlty Joined</Typography>
                    </div>
        
                </div>
                        {rows.slice(0).reverse().map((row) => (

                           <List className={classes.root}>
                              <ListItem>
                              <ListItemAvatar>
                                 <Avatar>
                                          <StyledBadge
                                             overlap="circular"
                                             anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                             }}
                                             variant="dot"
                                             >
                                                <Avatar alt={row.name} src="/broken-image.jpg" className={classes.purple} />
                                             </StyledBadge>
                                    
                                 </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={row.name} secondary={row.email} />
                              
                              <Button onClick={()=>handleRoute(row._id)} >
                                 Visit Profile
                                 </Button>
                              </ListItem>
                           </List>
  
                          
                        ))}

                </div>

       </>
   )
                     
}
export default Rightbar; 