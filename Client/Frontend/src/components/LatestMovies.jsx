import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Card,makeStyles,CardActionArea, CardMedia, CardContent, Typography,Button } from "@material-ui/core";
// const useStyles = makeStyles((theme) =>({
//     container:{
//         marginBottom:theme.spacing(2),
//         marginTop:theme.spacing(1),
             
//      },
//      media:{
         
//          paddingTop:'56.25%',
//          [theme.breakpoints.down("sm")]:{
//               height:150,
//               width:100%
//          }
//      },
//      setup:{
//          width:450,
//          marginTop:theme.spacing(10),
//          marginLeft:theme.spacing(2),
//          marginRight:theme.spacing(3)
//      },
//      text:{
//          display:'flex',
//          width:'100%',
//          justifyContent:'center'
//      },
//      playing:{
//          marginTop:theme.spacing(0.5),
//          marginRight:theme.spacing(0.5),
//      },
//           numberoflines:{
//           WebkitLineClamp:1
//      },
// }));

const useStyles = makeStyles((theme) => ({
    container: {
      width: 300, // Set the width of the card to 300px
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
    media: {
      height: 0, // Height set to 0 to use padding for aspect ratio
      paddingTop: '56.25%', // 16:9 aspect ratio
      [theme.breakpoints.down("sm")]: {
        height: 150,
        width: '100%' // Ensure it fills the card width
      }
    },
    setup: {
      width: 450,
      marginTop: theme.spacing(10),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(3)
    },
    text: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center'
    },
    playing: {
      marginTop: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
    numberoflines: {
      WebkitLineClamp: 1
    },
  }));
export default function LatestMovies() {
  const [open, setOpen] = useState(false);
  const[movieInfo,setMovieInfo]=useState([])
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
//   const [movies, setMovies] = useState(null)
  useEffect(()=>{
    const latestMovies = localStorage.getItem("latest-movies");
    // setMovies(latestMovies)
    fetchLatestMovies()
    setOpen(latestMovies === 'true');
  },[])
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
const fetchLatestMovies = async () => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=c92ecd56753067461e71f400f32022cf`);
      const movies = res.data.results;
      // Pick a random movie
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setMovieInfo(randomMovie);
    } catch (error) {
      console.error("Error fetching latest movies:", error);
    }
  };
  const handleRoute = (result, type) =>{
      
    history.push('/'+"details/"+result+'/'+type);
    window.location.reload(false);
    localStorage.setItem("latest-movies", 'false');
}
  const handleClose = () => {
    localStorage.setItem("latest-movies", 'false');
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Latest Movies"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Card className={classes.container} onClick={()=> handleRoute((movieInfo.id),("movie"))}>
                <CardActionArea className={classes.poster}>
                    <CardMedia className={classes.media}
                    
                    image={"https://image.tmdb.org/t/p/original"+movieInfo.poster_path}
                    title = {movieInfo.original_title}
                     />                                  
                </CardActionArea>
                <CardActionArea >                   
                  <CardContent className={classes.numberoflines}>
                      <Typography gutterBottom variant="h6">{movieInfo.original_title}</Typography>
                  </CardContent>              
                </CardActionArea>
            </Card>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}