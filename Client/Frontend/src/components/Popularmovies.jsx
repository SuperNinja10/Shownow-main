import { useState,useEffect } from "react";
import axios from "axios";
import { Card, Container, makeStyles,CardActions, CardActionArea, CardMedia, CardContent, Typography,Button,Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Paginate  from "./pagination/Paginate";
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {host} from '../host';
const useStyles = makeStyles((theme) =>({
    container:{
        marginBottom:theme.spacing(2),
        marginTop:theme.spacing(1),
        display:'flex',       
     },
     media:{
         
         paddingTop:'56.25%',
         [theme.breakpoints.down("sm")]:{
              height:150
         }
     },
     setup:{
         width:450,
         marginTop:theme.spacing(10),
         marginLeft:theme.spacing(2),
         marginRight:theme.spacing(3)
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
          numberoflines:{
          WebkitLineClamp:1
     },
}));
     
    


const MediaTv = () => {

   const baseUrl = "https://api.themoviedb.org/3/movie/popular?api_key=c92ecd56753067461e71f400f32022cf&language=en-US"
   const classes = useStyles();
   const [trend, setTrend] = useState([]);

   const [loading,setLoading] =useState(false);


   const history = useHistory();

   const handleRoute = (result, type) =>{
      
        history.push('/'+"details/"+result+'/'+type);
        window.location.reload(false);
   }

   const getrequest = async()=>{
          setLoading(true);
          console.log("tmdb id worked");
          const get = await axios.get(baseUrl)
          const result = get.data.results;
          console.log("tmdb id "+get);
          setTrend(result);
          setLoading(false);
         }

   useEffect(() => {
          
        getrequest();
        
   }, [])



   return (
      <> 
    <Grid container spacing={2} className={classes.setup}>
        <div className={classes.text}>
            <div className={classes.playing}>
               <PlayCircleOutlineIcon/>
            </div>
            <div>
                <Typography gutterBottom variant="h5" >Popular Movies</Typography>
            </div>
        
        </div>
        {(loading)? <h1 className={classes.setup}>  </h1> :trend.map(result => {
            return ( <Grid item md={12} xs={12} sm={12}>
            <Card className={classes.container} onClick={()=> handleRoute((result.id),("movie"))}>
                <CardActionArea className={classes.poster}>
                    <CardMedia className={classes.media}
                    style={{height:10,width:100}}
                    image={"https://image.tmdb.org/t/p/original"+result.poster_path}
                    title = {result.original_title}
                     />                                  
                </CardActionArea>
                <CardActionArea >                   
                  <CardContent className={classes.numberoflines}>
                      <Typography gutterBottom variant="h6">{result.original_title}</Typography>
                  </CardContent>              
                </CardActionArea>
            </Card>
                     
            </Grid>)
        })}
          
        
    </Grid>
    </>
  )
}
export default MediaTv;