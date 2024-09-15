
import { useState,useEffect } from "react";
import axios from "axios";
import {Avatar,Card, Container, makeStyles,CardActions, CardActionArea, CardMedia, CardContent, Typography,Button,Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import purple from '@material-ui/core/colors/purple'
import Badge from '@material-ui/core/Badge';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
  import {withStyles } from '@material-ui/core/styles';
import {host} from '../../host';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 5,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

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
  
   const handleRoute = (result) =>{
    const profile = 'profiles'
    history.push('/'+profile+'/'+result)
    window.location.reload(false);
   }
    
   const classes = useStyles();
   const [trend, setTrend] = useState([]);
   const [search,setSearch] =useState();

   const [loading,setLoading] =useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage,setPostsPerPage] = useState(9);

   const history = useHistory();



   const getrequest = async()=>{

                  setLoading(true);
                try {
                const data = await axios.post(host+"/api/users/all",{
                 'name':search
                });

                console.log("Users" +data)
                if(data.data){
                  setTrend(data.data);
                  setLoading(false);
                }
        
            }   catch (error) {
            
                history.push('/search')
            }
        
        


          
          
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
          label="Search Your Friends"
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
       </div> :trend.map(row => {
            return ( <Grid item md={12} xs={12} sm={12}>
                         <List className={classes.root}>
                              <ListItem>
                              <ListItemAvatar>
                                 <Avatar>
                                          <StyledBadge
                                             overlap="circular"
                                             anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                             }}
                                             variant="dot"
                                             >
                                                <Avatar alt={row.name} src="/broken-image.jpg" className={classes.purple} />
                                             </StyledBadge>
                                    
                                 </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={row.name} secondary={row.email} />
                              
                              <Button onClick={()=>handleRoute(row._id)} >
                                 Visit Profile
                                 </Button>
                              </ListItem>
                           </List>
            
     
            </Grid>)
        })}
          
        
    </Grid>
    </>
  )
}
export default Search;