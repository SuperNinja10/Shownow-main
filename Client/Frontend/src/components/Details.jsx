import React,{useEffect,useState} from 'react'
import Post from "./post";
import { Card, Container, makeStyles,CardActions, CardActionArea, CardMedia, CardContent, Typography,Button,Grid,Modal, Box } from "@material-ui/core";
import { useParams, Link } from "react-router-dom";
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
     modalStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        padding: theme.spacing(4),
        boxShadow: theme.shadows[5],
    },
}))
export default function Details() {

    const classes = useStyles();
    const params = useParams();
     const [details, setDetails] = useState({});
     const [providers, setProviders] = useState([]);
    const [open, setOpen] = useState(false);

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
    
    const getProviders = async () => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${params.id}/watch/providers?api_key=c92ecd56753067461e71f400f32022cf`
        );
        const providerData = response.data.results?.US?.flatrate || [];  // Adjust according to region
        setProviders(providerData);
        setOpen(true);  // Open the modal
    };

    const handleClose = () => setOpen(false);
console.log(details)
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
                    <Button
                        size="small"
                        color="primary"
                        onClick={getProviders}
                    >
                        Where To Watch
                    </Button>
 <Typography variant="caption" display="block">
    Streaming data provided by <a href="https://www.justwatch.com" target="_blank" rel="noopener noreferrer">JustWatch</a>
  </Typography>

                </CardActions>
            </Card>
              {/* Modal Popup */}
              <Modal open={open} onClose={handleClose}>
                <Box className={classes.modalStyle}>
                    <Typography variant="h6" gutterBottom>
                        Available Providers
                    </Typography>
                    {providers.length > 0 ? (
                        providers.map(provider => (
                            <div key={provider.provider_id} style={{ marginBottom: '10px' }}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                    alt={provider.provider_name}
                                    style={{ width: '50px', marginRight: '10px' }}
                                />
                                <Typography variant="body1">{provider.provider_name}</Typography>
                            </div>
                        ))
                    ) : (
                        <Typography variant="body2">No providers available</Typography>
                    )}
                </Box>
            </Modal>
            
            </div>
                  
    )
}
