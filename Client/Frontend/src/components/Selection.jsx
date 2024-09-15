import { Grid, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Feed from "../components/feed";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Tmdb_post from "./tmdb_post";


const useStyles = makeStyles((theme) =>({
      right:{
          [theme.breakpoints.down("sm")]:{
             display: "none",
          }
      }

}))

const Selection = () => {
   const classes = useStyles();

   return (
      <div>
       
        <Grid container>
           <Grid>
            <Tmdb_post/>
           </Grid>
        </Grid>
        <Add/>
      </div>
   )
};

export default Selection;