import { CardMedia,Avatar,TextField,Card,  makeStyles,CardActions, CardActionArea, CardContent, Typography,Button,Grid } from "@material-ui/core";
import React,{useState,useEffect,useRef, useContext } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import { DetailsOutlined } from "@material-ui/icons";
import image from '../../imagepost.png';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {host} from '../../host';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DayJS from 'react-dayjs';
import moment from "moment";

const useStyles = makeStyles((theme) =>({
    container:{
        
        marginTop:theme.spacing(2),
        height:'100%',
        maxWidth:'100%',
        display:'flex',
        flexDirection: 'column'
        
     },
     media:{
         height:1,
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
        width: '100%',
        maxWidth: '100vh',
        maxWidth: '100vh',
        backgroundColor: theme.palette.background.paper,
        
    
      },
      inline: {
        display: 'inline',
      },
      Comments:{
           display:"flex",
           flexDirection:"column",
           
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
      avatarComment:{
         marginTop: theme.spacing(1.5),
         color: theme.palette.getContrastText(deepPurple[500]),
         backgroundColor: deepPurple[500],
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
      },
      orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
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
      postMargin:{
        marginTop:theme.spacing(2)
      },
      deleteButton:{
          display:'flex',
          justifyContent:'flex-end'
      },
      mypost:{
        textAlign:'center'
      },
      icon:{
        marginLeft:theme.spacing(1),
        
      },
      preview:{
        marginTop:theme.spacing(7)
      },
       date:{
        minWidth: '92%',
        textAlign:"right",
            [theme.breakpoints.down("sm")]:{
               minWidth: '80%',
        }
      },
      time:{
        minWidth: '100%',
        display:'flex',
        marginBottom:theme.spacing(2)
      },
      exatTime:{
        marginLeft:theme.spacing(0.5)
      },
      commentdate:{
        marginLeft:theme.spacing(2)
      }

}))

const Post = () => {
   let baseUrl;
   const [trend, setTrend] = useState([]);
   const [search,setSearch] =useState();

   const [loading,setLoading] =useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage,setPostsPerPage] = useState(9);
   const [Details, setDetails] = useState([])


   const classes = useStyles();
   const [postData,setPostData] = useState([]);
   const history = useHistory();
   const [createPost, setCreatePost]= useState();
   const [change,setChange] = useState(true);

   const [contentVisible, setContentState] = useState(false);
   const [selectComment,setSelectComment] = useState();
   const [name, setName] = useState();


    const toggleCardContent = (result) => {
      
        setSelectComment(result);
        setContentState(!contentVisible);

    };   

   const handleRoute = (result) =>{
      
    history.push('/'+result)
   }
   let values;
   let Comment;


      const makeLike = async(e) =>{  
       console.log(e)       

        try {

        const config = {
            headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }

        const data = await axios.put(host+"/api/posts/like/"+[e],{text: " "},config);
        console.log(data);
        
        setChange(!change);
        exampleInput.current.value = " "
       
        
       } catch (error) {
        
       }
     }

   const makeComment = async(e) =>{  
       console.log(e)       

        try {

        const config = {
            headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }

        const data = await axios.put(host+"/api/posts/comment/"+[e],{text: Comment},config);
        console.log(data);
        
        setChange(!change);
        exampleInput.current.value = " "
       
        
       } catch (error) {
        
       }
     }
      const makePost = async(e) =>{         
        e.preventDefault();
        
        try {
            
            const config = {
                headers:{
                    "content-Type":"application/json",
                    "x-auth-token": localStorage.getItem("authToken")
                }
            }
    
            const data = await axios.post(host+"/api/posts",
            {text: values,
              image: Details.image,
              shows:Details.name
             },config);
            
            setChange(!change);
            exampleInput.current.value = " "
           
            
        } catch (error) {
            
        }
   }

    const getData = async()=>{
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

        const auth = await axios.get(host+"/api/auth",config);
        

        if(auth){
            const data = await axios.post(host+"/api/posts/mypost",{
                'id':auth.data._id
            },config);
            setName(auth.data.name);
            setPostData(data.data)
        }
 
    }   catch (error) {
     
        history.push('/login')
    }
    }
   useEffect(async(e) => {
     getrequest();
     getData();
  
   },[change,search])
    
    const exampleInput = useRef();

    const handleSubmit =(e)=>{
          
    }
    const onChange = (e)=>{
        values = e.target.value

    }
    const onComments = (e)=>{
        Comment = e.target.value
    }


   let count = 0;
   //////////////////////////////////////////////////////////////////////
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





       const getdetails = async(id,type)=>{
        
             
          
             if(type == "movie"){
                 
                const Id = id;
                    
                const data = await axios.get("https://api.themoviedb.org/3/movie/"+Id+"?api_key=c92ecd56753067461e71f400f32022cf&language=en-US");
                handleClose();
                console.log(data.data)
                setDetails({
                  name: data.data.original_title,
                  image: data.data.backdrop_path
                })
                            

             }else{
                const Id = id;
                    
                const data = await axios.get("https://api.themoviedb.org/3/tv/"+Id+"?api_key=c92ecd56753067461e71f400f32022cf&language=en-US");
                handleClose();
                setDetails({
                  name: data.data.original_name,
                  image: data.data.backdrop_path
                })
                           
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

         const deletePost = async(id)=>{
                try {
        
        const config = {
            headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
            
            let data = await axios.delete(host+"/api/posts/"+[id],config);
            if(data.data){
             getData();
            }
            
            } catch(error) {

            const err = error.response.data

            
             }
         }




   const checkData =()=>{
      console.log("checkDetails: "+ Details.name);
   }

   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = trend.slice(indexOfFirstPost, indexOfLastPost);

   console.log(search);
   const changePage = ()=>{
         
    
    window.scroll(0,0);
}

  const card = (

       (Details.length == 0)?
           (<Card className={classes.preview} onClick={handleClickOpen('paper')}>
      <CardActionArea>
        
        <CardMedia
          component="img"
          alt="Pick your Movie/Tv Show"
          height="400"
          width ="2"
          image={image}
          
        />

      </CardActionArea>

    </Card>):(
      <Card className={classes.preview} onClick={handleClickOpen('paper')}>
      <CardActionArea>
        
        <CardMedia
          component="img"
          alt="Pick your Movie/Tv Show"
          height="400"
          width ="2"
          image={"https://image.tmdb.org/t/p/original"+Details.image}
          title= {Details.name}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {Details.name}
          </Typography>
        </CardContent>
      </CardActionArea>

    </Card>

    )
  )


   return (
       <>
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
       
        

         {card}

    
        <form  noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className={classes.postMargin}>
          <TextField
          id="outlined-multiline-static"
          label="What's on your mind?"
          multiline
          fullWidth
          rows={6}
          inputRef={exampleInput}   
          onChange={(e)=> onChange(e)}
          variant="outlined"
          
        />
          </div>
          <div className={classes.Button} >
        <Button variant="contained" color="primary" type="submit" onClick={(e)=> makePost(e)} >
          Post
        </Button>
         </div>
        </form>
       
        <Typography variant="h5" className={classes.mypost}>My Posts<PostAddIcon className={classes.icon}/></Typography>
        <Grid container spacing={2}>
           {postData.slice().reverse().map(result => {
               return ( 
             
            <Grid key={result._id} item md={12} xs={12} sm={6}>
                <Card className={classes.container}>
                  <Button variant="contained" color="secondary" onClick={()=>deletePost(result._id)}>Delete Post</Button>
                   <CardActionArea>                      
                     <CardContent>
                  <div className={classes.time}>
                       <div >
                            <h5 className={classes.exatTime}>{moment(result.date).fromNow()}</h5>
                            
                      </div>
                      <div className={classes.date}>
                             <h5 >{moment(result.date).format("DD MMMM YYYY")}</h5>
                             <h5>{moment(result.date).format("hh:mm A")}</h5>
                             
                      </div>
                  </div>
                     <div className={classes.avatar}>
                     <Avatar
                     alt={result.name}
                     src="/static/images/avatar/1.jpg"
                     sx={{ width: 24, height: 24 }}
                     className={classes.orange}
                     />
                    <Typography gutterBottom variant="h6" className={classes.Name}>{result.name}</Typography>
                    </div>
                    <Typography variant="body2" className={classes.Status}>{result.text}</Typography>
                    </CardContent>
                    </CardActionArea>
                     <CardActionArea >
                    <CardMedia className={classes.media}
                          image={"https://image.tmdb.org/t/p/original"+result.image}
                          title = {result.shows}
                          />  
                     </CardActionArea>

                                       
                   <CardActionArea>                      
                     <CardContent>             
                    <Typography variant="h5" className={classes.Status}>{result.shows}</Typography>
                    </CardContent>
                    </CardActionArea>

                   <CardActions>
                       <Button size="small" color="Primary" onClick={()=> makeLike(result._id)}>Likes ({result.likes.length})</Button>
                       <Button size="small" color="Primary" onClick={() => 
                         
                          (result.comments.length>0)?toggleCardContent(result._id):toggleCardContent(result._id)
                                     
                        }>Comments ({result.comments.length})</Button>
                   </CardActions>
                   {(result._id == selectComment && contentVisible == true ) ? (
                   <CardActions className={classes.Comments}>
                        {result.comments.slice(0).reverse().map(comments=>{
                              if(comments.length !== 0){
                                  return (
                                <List className={classes.root} key={comments._id}>
                                <ListItem alignItems="flex-start">
                                  <ListItemAvatar>
                                    <Avatar className={classes.purple} alt={comments.name} src="/static/images/avatar/1.jpg" />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={ 
                                    <React.Fragment>
                                        <Typography
                                          component="span"
                                          variant="h6"
                                          className={classes.inline}
                                          color="textPrimary"
                                        >
                                          {comments.name}
                                        </Typography>
                                        <Typography
                                          component="span"
                                          variant="body2"
                                          className={classes.commentdate}
                                          color="textPrimary"
                                        >
                                          {moment(comments.date).fromNow()}
                                        </Typography>
                                      </React.Fragment>}
                                    secondary={
                                      <React.Fragment>
                                        <Typography
                                          component="span"
                                          variant="body1"
                                          className={classes.inline}
                                          color="textPrimary"
                                        >
                                          {comments.text}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                  />
                                </ListItem>
                                <Divider classname={classes.dividerColor} variant="inset" component="li"/>
                                                            
                                </List> 
                                
                                )
                            } 
                        })}
                   
                        <div className={classes.CommentWrite}>
                        <Avatar className={classes.avatarComment}
                        
                          alt={name}
                          src="/static/images/avatar/1.jpg"
                          sx={{ width: 15, height: 17 }}
                          />
                        <TextField
                            id="standard-full-width"
                            label="Comment Here"
                            style={{ margin: 8 }}
                            placeholder="Write Here"
                            inputRef={exampleInput}
                            fullWidth
                            onChange={(e)=> onComments(e)}
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <Button className={classes.Button}  variant="contained" color="primary"  onClick={()=> makeComment(result._id)} >
                            Post
                          </Button>
                        </div>                        
                   </CardActions> ):null} 
                   
               </Card>
                     
            </Grid>)
           })}
       </Grid>
        {console.log(count)}
       </>
   )
};

export default Post;