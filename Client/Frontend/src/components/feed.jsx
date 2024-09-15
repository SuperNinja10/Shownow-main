import { Container, makeStyles,Grid } from "@material-ui/core";
import Post from "./post";
import { Tmdb_post } from "./tmdb_post";

const useStyles = makeStyles((theme) =>({
    container:{
        paddingTop:theme.spacing(10)
     }
}))
const Feed = () => {
   const classes = useStyles();

   return (
       
       <Container className={classes.container} cols={3}>
         
           <Post/>
         
        </Container>
           
           
   )
};

export default Feed;