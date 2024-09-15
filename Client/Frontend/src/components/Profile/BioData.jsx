import React,{useState,useEffect,useRef, useContext } from 'react'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles,Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import { useHistory,useLocation } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Select from '@material-ui/core/Select';
import BuildIcon from '@material-ui/icons/Build';
import { Phone } from '@material-ui/icons';
import {host} from '../../host';

const useStyles = makeStyles((theme) =>({

      grid:{
        marginTop:theme.spacing(8),
        height:900,
        display:'flex',
        flexDirection: 'column',
        textAlign:'center',        
        justifyContent:'center',
        backgroundColor:'rgba(0,0,30,0.4)',
        backdropFilter: "blur(6px)",
     },


     paperStyle:{

        padding :20,
        height:'90vh',
        width:500, 
        margin:"20px auto",
        
     },
     password:{
       marginTop: theme.spacing(3)
     },
     color:{
         color:"blue"
     },
     submitButton :{
        marginTop: theme.spacing(4)
     },
     typo:{
         marginTop: theme.spacing(0)
     },
        logo:{
         marginTop: theme.spacing(1)
     }
}))
const BioData = () => {
  const classes = useStyles();
  
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');



  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
   
  };

  const descriptionElementRef = React.useRef(null);

  //////////////////////////////////////////////////////////////
  
      const [fieldError,setError] = useState({                
                 name:"",
                 phone:"",
                 Phone:"",
                 Status:"",
                 address:"",
                 mechanic:"",
                 date:""});

    const [name, setname] = useState("");
    const [Address,setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [Status, setStatus] = useState("");

   const history = useHistory();
   const {state} = useLocation();

    const handleRoute = (result) =>{      
    history.push('/'+result)
   }
    
    const avatarStyle={backgroundColor:'#3F51B5'}
    const btnstyle={margin:'8px 0'}


    const exampleInput = useRef();
    const loginHandler = async(e)=>{
          
        console.log("working");
        
        try {

        const config = {
            headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }

            let data = await axios.post(host+"/api/profiles"+[e],{                
                "bio":name,
                "address":Address,
                "phone":Phone,
                "status":Status,

              },config);

             handleClose();
             window.location.reload(false);
            } catch(error) {

            const err = error.response.data

            
      }
   }



     const datapass = ()=>{
         console.log();
     }

     useEffect(async() => {
                       
                

      },[])

   return (
       <>
       <Button onClick={handleClickOpen('paper')} variant="contained" color="primary">Edit</Button>
       
           <div>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title"></DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
            <Paper elevation={12} className={classes.paperStyle}>
                <Grid align='center'>
                     <Avatar className = {classes.logo} style={avatarStyle}><BuildIcon/></Avatar>
                     <Typography className={classes.typo} variant="h4" component="h1">
                      Profile
                     </Typography>
                </Grid>

                
                   <TextField
                  
                   helperText={fieldError.name}
                   className={classes.password}
                   id="outlined-password-input"
                   label="Favourite Genre"
                   type="text"
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setname(e.target.value)}
                   fullWidth
                  />               
                   <TextField
                  
                   helperText={fieldError.name}
                   className={classes.password}
                   id="outlined-password-input"
                   label="Favourite Movie/Tv Show"
                   type="text"
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setAddress(e.target.value)}
                   fullWidth
                  />                    
                   <TextField
                  
                   helperText={fieldError.name}
                   className={classes.password}
                   id="outlined-password-input"
                   label="Bio"
                   type="text"
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setPhone(e.target.value)}
                   fullWidth
                  /> 

                                     <TextField
                  
                   helperText={fieldError.name}
                   className={classes.password}
                   id="outlined-password-input"
                   label="Contact"
                   type="text"
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setStatus(e.target.value)}
                   fullWidth
                  />                                 
                    
                       
                <Button className={classes.submitButton}color="primary" type='submit'  variant="contained"  onClick={()=> loginHandler()} fullWidth>Submit</Button>
            </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        

    </>
   )
};

export default BioData;