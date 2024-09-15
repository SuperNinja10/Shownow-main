
import { useState,useEffect } from "react";
import axios from "axios";
import { Card, Container, makeStyles,CardActions, CardActionArea, CardMedia, CardContent, Typography,Button,Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';


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
     },
     root: {
         borderRadius:15,
        background: 'white',
        position: '-webkit-sticky',
        position: 'sticky',
        top: 5,
        bottom: 5, 
        paddingBottom: '30px',
        zIndex: 5,
        display: 'flex',
        flexWrap: 'wrap',
      },
     
      textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
        width: '100vh',
        marginTop: theme.spacing(12),
        justifyContent: "center",
        [theme.breakpoints.up("sm")]:{
            marginLeft: theme.spacing(8),
        }
        
        
      },
      loading: {
        
        width: '100%',
        justifyContent:'center',
        marginLeft:theme.spacing(5),
        marginRight:theme.spacing(5),
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
  
    }
     
    
}))

const Search = () => {

   let baseUrl;
   const classes = useStyles();
   const [trend, setTrend] = useState([]);
   const [search,setSearch] =useState();

   const [loading,setLoading] =useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage,setPostsPerPage] = useState(9);

   const history = useHistory();

   const handleRoute = (result, type) =>{
      
        history.push('details/'+result+'/'+type)
   }

   const getrequest = async()=>{
        
         
          setLoading(true);
          
          

            (search ==null || search == "")? baseUrl="https://api.themoviedb.org/3/trending/all/day": baseUrl = "https://api.themoviedb.org/3/search/multi"

          const get =  await axios.get(baseUrl, {
              params:{
                api_key:"c92ecd56753067461e71f400f32022cf",
                language:"en-US",
                page:1,
                include_adult:false,
                query: search
              }
          })
          const result = get.data.results;
          setTrend(result);
          setLoading(false);

          
          
         }

   useEffect(() => {
          
        getrequest();
        
   }, [search])

   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = trend.slice(indexOfFirstPost, indexOfLastPost);

   console.log(search);
   const changePage = ()=>{
         
    
    window.scroll(0,0);
}

   return (
      <> 
      <div className={classes.root}>
      <TextField
          id="outlined-full-width"
          label="Movies & Tv Shows"
          className={classes.textField}
          placeholder="Search"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={
              (e)=> {setSearch(e.target.value)
              changePage();
            }
        }
        />
      </div>
    <Grid container spacing={2} className={classes.setup}>
        {(loading)? <div className={classes.loading}>
      <LinearProgress />
      <LinearProgress color="secondary" />
       </div> :trend.map(result => {
            return ( <Grid item md={4} xs={12} sm={6}>
             <Card className={classes.container} onClick={()=> handleRoute((result.id),(result.media_type))} >
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
                    <Button size="small" color="Primary">Like</Button>
                    <Button size="small" color="Primary">Share</Button>
                </CardActions>
            </Card>
            
     
            </Grid>)
        })}
          
        
    </Grid>
    </>
  )
}
export default Search;