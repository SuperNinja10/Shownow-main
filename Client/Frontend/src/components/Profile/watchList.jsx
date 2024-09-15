import React,{useState,useEffect,useRef, useContext } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Card, makeStyles,Grid,Paper, Avatar, TextField, Button, Typography,Link,CardMedia ,CardActions, CardActionArea, CardContent,} from '@material-ui/core'
import { useHistory,useLocation } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Select from '@material-ui/core/Select';
import BuildIcon from '@material-ui/icons/Build';
import { Phone } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
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
    container:{
        
        marginTop:theme.spacing(2),
        height:'100%',
        display:'flex',
        flexDirection: 'column'
        
     },
      containernew:{
        
        marginTop:theme.spacing(2),
        height:'50%',
        display:'flex',
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        alignItems:"center",
        justifyContent:"space-between",
          [theme.breakpoints.down("sm")]:{
               display:'flex',
               flexDirection: 'column'
         }
        
     },
     media:{
         height:1,
         paddingTop:'56.25%',
         
         [theme.breakpoints.down("sm")]:{
              height:150
         }
     },
       Media1:{
         height:400,
         width:500,
         paddingTop:'56.25%',
         [theme.breakpoints.down("sm")]:{
              height:150
         }
     },
     Button:{
         marginTop:theme.spacing(2),
         display:'flex',
         flexDirection: 'row',
         justifyContent:'right'
     },
     avatar:{
         display:'flex',
         
         
     },
     Name:{
         marginTop:5,
         marginLeft:5,
         
     },
     Status:{
         marginTop:theme.spacing(2),
     },
      root: {
        width: 200,
        height:100,
        display: 'flex',
        alignItems: 'center',
      },
      inline: {
        display: 'inline',
      },
      Comments:{
           display:"flex",
           flexDirection:"column",
           marginLeft:theme.spacing(2),
      },
      dividerColor: {
       Color: 'blue',
      },
      CommentWrite:{
        
          display: 'flex',
          width: '100%',
          maxWidth: '100vh',
          backgroundColor: theme.palette.background.paper,
          
        
      },


      
    
      Container:{
        
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
     pagination:{
          marginTop: theme.spacing(5),
          display: "flex",
          justifyContent: "center"
     },
     root1: {
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
        ratting:{
          display:"flex",
          alignItems:"center"

        },
          fab: {
          margin: theme.spacing(2),
        },
        absolute: {
          position: 'absolute',
          bottom: theme.spacing(2),
          right: theme.spacing(3),
        },
        tooltip:{
          textAlign:'center'
         
        },
        start:{
        minWidth: '100%',
        display: "flex",
        justifyContent: "center"
        }
}))




const WatchList = () => {
  const classes = useStyles();
  const [Details, setDetails] = useState([]);
  const [trend, setTrend] = useState([]);
  const [search,setSearch] =useState();
  const [open, setOpen] = React.useState(false);
  const [loading,setLoading] =useState(false);
  const [scroll, setScroll] = React.useState('paper');
  
//////////////////////ratting///////////////////////////

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

///////////////////////////////////////////////////////





  let baseUrl;


   const changePage = ()=>{
         
    
    window.scroll(0,0);
}
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

            let data = await axios.put(host+"/api/profiles/watchlist"+[e],{                
                "title":Details.name,
                "image":Details.image,
                "ratting":value,
                
                "tmdb":Details.type,

              },config);
              handleClose();
              window.location.reload(false);
            } catch(error) {

            const err = error.response.data 
           }
   }



       const getdetails = async(id,type)=>{
        
             
             console.log("DATA CHECKING "+ Details);  
             if(type == "movie"){
                 
                const Id = id;
                    
                const data = await axios.get("https://api.themoviedb.org/3/movie/"+Id+"?api_key=c92ecd56753067461e71f400f32022cf&language=en-US");
                handleClose();
                console.log(data.data)
                setDetails(()=> {
                 return ({
                  name: data.data.original_title,
                  image: data.data.poster_path,
                  tmdbid:id,
                  tmdbtype:type
                  })

                } )
                  console.log("DATA CHECKING "+ Details);          

             }else{
                const Id = id;
                    
                const data = await axios.get("https://api.themoviedb.org/3/tv/"+Id+"?api_key=c92ecd56753067461e71f400f32022cf&language=en-US");
                handleClose();
                setDetails({
                  name: data.data.original_name,
                  image: data.data.poster_path,
                  tmdbid:id,
                  tmdbtype:type
                })
                  console.log("DATA CHECKING "+ Details);           
                console.log(data.data)
  

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

     useEffect(async() => {
                console.log("Details "+Details);      
                getrequest();

      },[search])

      const detailpage = (
              <div> <Card className={classes.containernew}  >
                <CardActionArea>
                    <CardMedia className={classes.Media1}
                    image={"https://image.tmdb.org/t/p/original"+Details.image}
                    title = {Details.name}
                     />                       
                  <CardContent className={classes.numberoflines}>
                      <Typography gutterBottom variant="h5">{Details.name}</Typography>
                      
                  </CardContent> 
         
                </CardActionArea>


            <CardActionArea className={classes.ratting}>
              <div className={classes.root}>
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                />
                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
              </div> 
              <Button onClick={()=> loginHandler()} variant="contained" color="primary">Submit</Button>         
                </CardActionArea>
               
            </Card>
        </div>
      )

   return (
       <>
        <div className={classes.start}>
                <Tooltip title="Add" aria-label="add" onClick={handleClickOpen('paper')}className={classes.tooltip}>
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
        </div>

       
      <div>
        <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        >
            
             <div className={classes.box}>         
      <div className={classes.root1}>
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
             <Card className={classes.Container} onClick={()=> getdetails((result.id),(result.media_type))} >
                <CardActionArea>
                    <CardMedia className={classes.Media}
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
       {(Details.length === 0)? <h1></h1> : detailpage}
 
    </>
   )
};

export default WatchList;