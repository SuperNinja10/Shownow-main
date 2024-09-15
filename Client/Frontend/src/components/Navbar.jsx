import React, { useEffect } from 'react';
import { makeStyles, Toolbar,AppBar, Typography,InputBase,alpha,Badge,Avatar } from "@material-ui/core";
import { useState } from "react";
import { Search, Mail, Notifications,Cancel } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import SettingsIcon from '@material-ui/icons/Settings';
import Logout from './navigation/Logout';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import image from '../shownow.png';
import {host} from '../host';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import AllInboxIcon from '@material-ui/icons/AllInbox';

const useStyles = makeStyles((theme) =>({
        Toolbar:{
            
             display:"flex",
             justifyContent:"space-between",
            
             
        },
        logoLg:{
            
            display : "block",
            margintop:theme.spacing(1),
            [theme.breakpoints.up("sm")]:{
                display: "block",
            },
        },
        logoSm:{
            
            display : "block",
            margintop:theme.spacing(1),
            [theme.breakpoints.up("md")]:{
                display: "block",
            },
        },
        search:{
            marginLeft: theme.spacing(1),
            display: "flex",
            alignItems: "center",
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            width: "50%",
            borderRadius: theme.shape.borderRadius,
            [theme.breakpoints.down("sm")]:{
                display: (props) => (props.open ? "flex": "none"),
            },


        },
        InputBase:{
            marginLeft: theme.spacing(1),
            color: "white",
            marginLeft: theme.spacing(1),
            width: "100%"
        },
        icons:{
            display: "flex",
            alignItems: "center",
            marginLeft: theme.spacing(1),
            [theme.breakpoints.down("sm")]:{
                display: (props) => (props.open ? "none": "flex"),
            }
            
            
        },
        badge:{ 
            marginRight: theme.spacing(2)
        },
        searchButton:{
             marginRight: theme.spacing(1),
             [theme.breakpoints.up("sm")]:{
                display: "none"
            },
        },
        cancel:{
            display:"none",
            [theme.breakpoints.down("sm")]:{
                display: "flex"
            }
        },
        button:{
            marginRight:theme.spacing(2),
        },
        logo:{
            margintop:theme.spacing(1)
        }
          
}))
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const classes = useStyles({open});
    
   const history = useHistory();

   const handleRoute = (result) =>{
        history.push(result)
   }
   
   const handleProfile = (account) => {
      
      
            let name = "profile"
      
      history.push('/'+name+"/"+account);
      

    };

       const handleRouteof = (account) => {
      
      
            
      
      history.push("/"+account);
      

    };

 useEffect(async(e) => {
     
    let config = {
        headers:{
            "content-Type":"application/json"
        }
    }
    try {
        config = {
            headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
       
        const auth = await axios.get(host+"/api/auth",config);
        console.log(auth.data)
         
            let profiledata = await axios.post(host+"/api/profiles",{                
                "profileimage":auth.data.name,
              },config);
              console.log(profiledata)
        if(auth.data){
            setId(auth.data);
            
        }
 
    }   catch (error) {
     
        history.push('/login')
    }
  
   },[])

   const profile = (
        (id != null)? 
         (<div className={classes.icons} >
        <Search className={classes.searchButton} onClick={()=> setOpen(true)}/>
           <Button  onClick={()=>handleProfile(id._id)} variant="contained" color="secondary" className={classes.button} > 
                  {id.name}
           </Button>
            
            <Badge color="secondary" className={classes.badge} onClick={()=>handleRouteof('search')}>
             <EmojiPeopleIcon onClick={()=>handleRouteof('search')}/>             
             </Badge >
            <Badge color="secondary" className={classes.badge} onClick={()=>handleRouteof('myposts')}>
             <AllInboxIcon onClick={()=>handleRouteof('myposts')}/>             
             </Badge >             
            <Badge color="secondary" className={classes.badge} onClick={()=>handleRouteof('findposts')}>
             <MovieFilterIcon onClick={()=>handleRouteof('findposts')}/>             
             </Badge >

             <Logout/> 
               
               
             </div>) :
             (<div className={classes.icons} >

                 
            </div>)

   )

   return (
      <AppBar position="fixed">
          <Toolbar className={classes.Toolbar}>
             <Typography variant="h4" className={classes.logoLg} onClick={()=>handleRoute("/")}>
                 <img src={image} alt=""  style={{width:200}} className={classes.logo} />
             </Typography>

              {profile}

          </Toolbar>
      </AppBar>
   )
};

export default Navbar;