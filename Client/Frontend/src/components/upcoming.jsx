
import { useState,useEffect } from "react";
import axios from "axios";
import { Card, Container, makeStyles,CardActions, CardActionArea, CardMedia, CardContent, Typography,Button,Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Paginate  from "./pagination/Paginate";
import moment from "moment";

const useStyles = makeStyles((theme) =>({
    container:{
        marginBottom:theme.spacing(5),
        marginTop:theme.spacing(2),
        height:'100%',
        display:'flex',
        flexDirection: 'column'
        
     },
     media:{
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
     pagination:{
          marginTop: theme.spacing(5),
          display: "flex",
          justifyContent: "center"
     }
     
    
}))

const Tmdb = () => {

   const baseUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=c92ecd56753067461e71f400f32022cf"
   const classes = useStyles();
   const [trend, setTrend] = useState([]);

   const [loading,setLoading] =useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage,setPostsPerPage] = useState(9);

   const history = useHistory();

   const handleRoute = (result, type) =>{
      
        history.push('details/'+result+'/'+type)
   }

   const getrequest = async()=>{
          setLoading(true);
          const get = await axios.get(baseUrl)
          const result = get.data.results;
          setTrend(result);
          setLoading(false);
         }

   useEffect(() => {
          
        getrequest();
        
   }, [])

   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = trend.slice(indexOfFirstPost, indexOfLastPost);

  
  const changePage = (number)=>{
         
         setCurrentPage(number);
         window.scroll(0,0);
  }
   return (
      <> 
    <Grid container spacing={2} className={classes.setup}>
        {(loading)? <h1 className={classes.setup}> Loading </h1> :trend.map(result => {
            return ( <Grid item md={4} xs={12} sm={6}>
             <Card className={classes.container} onClick={()=> handleRoute((result.id),("movie"))} >
                <CardActionArea>
                    <CardMedia className={classes.media}
                    image={"https://image.tmdb.org/t/p/original"+result.poster_path}
                    title = {result.original_title}
                     />                       
                  <CardContent className={classes.numberoflines}>
                      <Typography gutterBottom variant="h5">{(result.media_type=="tv") ? result.name: result.original_title}</Typography>
                      <Typography variant="body2" >{result.overview}</Typography>
                  </CardContent>              
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="Primary">Release Date</Button>
                    <Button size="small" color="Secondary">{result.release_date}</Button>
                </CardActions>
            </Card>
            
     
            </Grid>)
        })}
          
        
    </Grid>

    </>
  )
}
export default Tmdb;