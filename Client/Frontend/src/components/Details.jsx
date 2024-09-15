import React,{useEffect,useState} from 'react'
import Post from "./post";
import { Card, Container, makeStyles,CardActions, CardActionArea, CardMedia, CardContent, Typography,Button,Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Paginate from './pagination/Paginate';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>({

    container:{
        marginBottom:theme.spacing(5),
        marginTop:theme.spacing(2),
        height:'100%',
        display:'flex',
        flexDirection: 'column'        
     },
     media:{
         height:50,
         paddingTop:'56.25%',
         [theme.breakpoints.down("sm")]:{
              height:150
         }
     },
}))
export default function Details() {

    const classes = useStyles();
    const params = useParams();
     const [details, setDetails] = useState({});

    useEffect(() => {
        
        getdetails();
        
    }, [])

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

    return (
        
            <div>
            <Card className={classes.container}>
                <CardActionArea>
                    <CardMedia className={classes.media}
                    image={"https://image.tmdb.org/t/p/original"+details.backdrop_path}
                    title = {details.original_title}
                     />                       
                  <CardContent className={classes.numberoflines}>
                      <Typography gutterBottom variant="h5">{(params.type=="tv") ? details.name: details.original_title}</Typography>
                      <Typography variant="body2" >{details.overview}</Typography>
                  </CardContent>              
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="Primary">{details.status}</Button>
                    <Button size="small" color="Primary">{details.release_date}</Button>
                </CardActions>
            </Card>
            
            </div>
                  
    )
}
