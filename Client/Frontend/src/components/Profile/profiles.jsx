import React,{useEffect,useState} from 'react'
import Post from "../post";
import { Card,Avatar, Container, makeStyles,CardActions, CardActionArea, CardMedia, CardContent, Typography,Button,Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import BioData from './BioData';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { green } from '@material-ui/core/colors';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import WatchList from './watchList';
import LinearProgress from '@material-ui/core/LinearProgress';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import PublicIcon from '@material-ui/icons/Public';
import TheatersIcon from '@material-ui/icons/Theaters';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cover from './cover';
import {host} from '../../host'

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};



const useStyles = makeStyles((theme) =>({
    root: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    display:'flex',
    marginLeft:theme.spacing(5),
    [theme.breakpoints.down("xs")]:{
     
    }
  },

      root2: {
    width: '100%',
    maxWidth: 1050,
    backgroundColor: theme.palette.background.paper,
    display:'flex',
    justifyContent:'space-between',
    marginLeft:theme.spacing(5),
    [theme.breakpoints.down("xs")]:{
     flexDirection:'column',
    }
  },
    container:{
        marginBottom:theme.spacing(5),
        marginTop:theme.spacing(2),
        height:'100%',
        display:'flex',    
     },
     media:{
         height:100,
         paddingTop:'56.25%',
         [theme.breakpoints.down("sm")]:{
              height:150
         }
     },
         containerNEW:{
        marginBottom:theme.spacing(5),
        marginTop:theme.spacing(2),
        height:'100%',
        display:'flex',
        flexDirection: 'column'
        
     },
     Media:{
         height:350,
         paddingTop:'56.25%',
         [theme.breakpoints.down("sm")]:{
              height:350
         }
     },
     setup:{
        marginTop:theme.spacing(5),
     },
     numberoflines:{
          WebkitLineClamp:1
     },
       purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginLeft:theme.spacing(3)
  },
  watchlist:{
      marginTop:theme.spacing(2)
  },
  icon:{
        minWidth: '100%',
        display: "flex",
        justifyContent: "center"
  },
  iconSpace:{
      marginTop:theme.spacing(5)
  },
  profileBox:{
      width:500
  },
  biodataname:{
      marginBottom:theme.spacing(2)
  },
  buttonmargin:theme.spacing(1)
     
}))
export default function Profiles() {

    const [profileData,SetProfileData] = useState([]);
    const [name, setName] = useState();
    const [paramId, setparamId] = useState();
    const [postData,setPostData] = useState([]);
    const classes = useStyles();
    const params = useParams();
    const [details, setDetails] = useState({});
    const history = useHistory();
    const [loading,setLoading] =useState(false);
    const [id, setId] = useState();

    const verification = async()=>{
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
        const data = await axios.get(host+"/api/posts",config);
        const auth = await axios.get(host+"/api/auth",config);
        
        console.log(auth);

        console.log(data)
        if(data.data){
            setName(auth.data);
                      
        }
 
    }   catch (error) {
     
        history.push('/login')
    }
    }

         const getProfileData = async()=>{
        
                 console.log("working");
        
        try {
        console.log(params.id);
        const config = {
            headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
            
            let data = await axios.get(host+"/api/profiles/"+[params.id],config);

            
            data = data.data
            
            SetProfileData(data);
            
            
            } catch(error) {

            const err = error.response.data

            
      }

     }
  
//////////////////////ratting///////////////////////////

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

///////////////////////////////////////////////////////

      
   useEffect((e) => {
    
    getProfileData()
    verification();
    
  
   },[])
    const getdetails = async()=>{
        
             
          
             if(params.type == "movie"){
                 
                const Id = params.id;
                    
                const data = await axios.get("https://api.themoviedb.org/3/movie/"+Id+"?api_key=c92ecd56753067461e71f400f32022cf&language=en-US");
                setDetails(data.data);

             }else{
                const Id = params.id;
                    
                const data = await axios.get("https://api.themoviedb.org/3/tv/"+Id+"?api_key=c92ecd56753067461e71f400f32022cf&language=en-US");
                setDetails(data.data);

             }
    }
   
       const deletewatchlist = async(id)=>{
                 try {
        
        const config = {
            headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
            
            let data = await axios.delete(host+"/api/profiles/watchlist/"+[id],config);

            
            data = data.data
            
            SetProfileData(data);
            
            
            } catch(error) {

            const err = error.response.data

            
      }
        }
      const content = (
                (profileData.length == 0)?
                 (<div className={classes.icon}>
                      <div className={classes.iconSpace}> 
                         <SentimentVeryDissatisfiedIcon style={{ fontSize: 100 }}/>
                         <Typography variant="h5" >Not Added </Typography>
                      </div>
                 </div>):
                (<Grid container spacing={2} className={classes.setup}>                  
                 {profileData.watchlist.map(result => {
                        return ( <Grid item md={4} xs={12} sm={6} key={result._id}>
                        <Card className={classes.containerNEW} >
                            <Button classname={classes.buttonmargin} color="Secondary"  variant="contained" onClick={()=>deletewatchlist(result._id)}>Remove</Button>
                            <CardActionArea>
                                <CardMedia className={classes.Media}
                                image={"https://image.tmdb.org/t/p/original"+result.image}
                                title = {result.title}
                                />                       
                            <CardContent className={classes.numberoflines}>
                                <Typography gutterBottom variant="h5">{result.title}</Typography>
                                
                            </CardContent>              
                            </CardActionArea>

                            <CardActionArea className={classes.ratting}>
                            <div className={classes.root}>
                                <Rating
                                name="hover-feedback"
                                value={result.ratting}
                            
                                />
                                {result.ratting !== null && <Box ml={2}>{labels[hover !== -1 ? hover : result.ratting]}</Box>}
                                <Avatar className={classes.purple}>{result.ratting}</Avatar>
                            </div> 
                            
                                     
                            </CardActionArea>
                                
                        </Card>
                        
                
                        </Grid>)
                    })}
        
                 </Grid>
                )
      )
    const editdata = (
         (name != null)?
            (name._id == params.id)? (<BioData/>):(<h1></h1>)
         :
         (<h1></h1>)
    )
 
   const watchList = (
                    (name != null)?
            (name._id == params.id)? (<WatchList/>):(<h1></h1>)
         :
         (<h1></h1>)
    )

       const cover = (
                    (name != null)?
            (name._id == params.id)? (<Cover/>):(<h1></h1>)
         :
         (<h1></h1>)
    )
    
       const Nocover =(
              (profileData.coverimage == null)?
                    ( <CardActionArea>                       
                        <CardMedia
                        component="img"
                        alt="Pick your Movie/Tv Show"
                        height="500"
                        width ="2"
                        image={"https://raw.githubusercontent.com/SuperNinja10/SVG-hosting/26ee83b0fa0c63520221a7f3302c36eebd815548/place%20your%20movie%20here.svg"}                      
                        />
                     </CardActionArea>):
                     ( <CardActionArea>                       
                        <CardMedia
                        component="img"
                        alt="Pick your Movie/Tv Show"
                        height="400"
                        width ="2"
                        image={"https://image.tmdb.org/t/p/original"+profileData.coverimage}                      
                        />
                     </CardActionArea>)

         )
    return (
        <>
            <div>
            <Card className={classes.container}>
                <CardActionArea className={classes.profileBox} >
                <AccountBoxIcon style={{ fontSize: 400, color: green[500],alignContent:"center" }} color="action"/> 
                  {(profileData.length == 0)?<h1> </h1>: <Typography className={classes.biodataname} variant="h4" style={{textAlign:"center"}}>{profileData.user.name}</Typography> }                    
                </CardActionArea>              
                {Nocover}
            </Card>
            {cover}
            </div>
             <div>   
                 {editdata}            
            </div>
                  <div>
            <List className={classes.root2}>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <MovieFilterIcon color="primary"/>
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Favourite Genre" secondary={profileData.bio} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <TheatersIcon color="primary"/>
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Favourite Movie/TV " secondary={profileData.address} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <PublicIcon color="primary"/>
            </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Bio" secondary={profileData.phone} />
            </ListItem>
                    <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <PermContactCalendarIcon color="primary"/>
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Contact" secondary={profileData.status} />
            </ListItem>
            </List>
            </div>
            <div>
                {watchList}
            </div>
            <div>
                <Button   variant="contained" color="primary" className={classes.watchlist}>WatchList</Button>
            </div>
            {console.log(profileData.watchlist)}
            {content}
            
         </>         
    )
}
