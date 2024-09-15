import { Grid, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Feed from "../components/feed";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";
import MediaRight from "../components/mediaRight";
import { Link } from "react-router-dom";
import Searchtmdb from "../components/search/Searchtmdb";
import Findpost from "../components/post/findpost"
import PopularMovie from "../components/Popularmovies"

const useStyles = makeStyles((theme) =>({
      right:{
          [theme.breakpoints.down("sm")]:{
             display: "none",
          }
      },
      up:{
          marginTop :theme.spacing(2),
          [theme.breakpoints.down("sm")]:{
             marginLeft: theme.spacing(1),
          }
      }

}))

const Yourpost = () => {
   const classes = useStyles();

   return (
      <div>
       
        <Grid container>
           <Grid item sm={2} >
           <Leftbar/>
           </Grid>
           <Grid item sm={7} xs={10} className={classes.up}>
              <Findpost/>
           </Grid>
           <Grid item sm={3} className={classes.right}>
            <PopularMovie/>  
           </Grid>
        </Grid>
        <Add/>
      </div>
   )
};

export default Yourpost;