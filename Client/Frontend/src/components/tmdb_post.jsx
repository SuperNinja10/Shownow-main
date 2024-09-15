import React from 'react';

import { useState,useEffect,createContext} from "react";
import axios from "axios";
import { Card, makeStyles,CardActions, CardActionArea, CardMedia, CardContent, Typography,Button,Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';



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
        marginRight: theme.spacing(2)
      },
     
      textField: {
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(2),
        width: '43vh',
        marginTop: theme.spacing(12),
        justifyContent: "center",
        [theme.breakpoints.up("sm")]:{
            marginLeft: theme.spacing(8),
        }
        
        
      },
      loading: {
        
            width: '100%',
            justifyContent:'center',
            '& > * + *': {
              marginTop: theme.spacing(2),
            },
      
        },

  
  box:{
        display:'flex',
        flexDirection: 'column',
      marginTop: theme.spacing(1),
      height:"100vh",
      marginLeft:theme.spacing(4),
      marginRight:theme.spacing(4),
      marginTop:theme.spacing(4)

  }
}))

 export const Tmdb_post = props => {
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
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

   let baseUrl;
   const [trend, setTrend] = useState([]);
   const [search,setSearch] =useState();

   const [loading,setLoading] =useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage,setPostsPerPage] = useState(9);
   const [Details, setDetails] = useState([])

   const history = useHistory();

   const handleRoute = () =>{
      
        console.log(Details);
        
       
   }

       const getdetails = async(id,type)=>{
        
             
          
             if(type == "movie"){
                 
                const Id = id;
                    
                const data = await axios.get("https://api.themoviedb.org/3/movie/"+Id+"?api_key=c92ecd56753067461e71f400f32022cf&language=en-US");
                setDetails(data.data);

             }else{
                const Id = id;
                    
                const data = await axios.get("https://api.themoviedb.org/3/tv/"+Id+"?api_key=c92ecd56753067461e71f400f32022cf&language=en-US");
                setDetails(data.data);

             }
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
    <div>
      <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
      <Button onClick={handleRoute()}>Check Data</Button>
    

        <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        >
            
             <div className={classes.box}>         
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
            return ( <Grid key={result.id} item md={6} xs={6} sm={6}>
             <Card className={classes.container} onClick={()=> getdetails((result.id),(result.media_type))} >
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
              </div> 
         </Dialog>
      </div>   
      </> 

   )
};

