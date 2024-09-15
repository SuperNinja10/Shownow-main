import { Grid, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Feed from "../components/feed";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Tmdb_post } from "../components/tmdb_post";
import AdminLeftbar from "../components/admin/AdminLeftbar";
import Users from "../components/admin/Users";


const useStyles = makeStyles((theme) =>({
      right:{
          [theme.breakpoints.down("sm")]:{
             display: "none",
          }
      },
            texting:{
         marginTop:theme.spacing(50),
      }

}))

const Adminpanel = () => {
   const classes = useStyles();

   return (
      <div>
       
        <Grid container>
           <Grid item sm={2} >
              <AdminLeftbar/>
           </Grid>
           <Grid item sm={10} xs={10}>
              <h1 className={classes.texting}>Hellow</h1>
           </Grid>
        </Grid>
        <Add/>
        
      </div>
      
   )
};

export default Adminpanel;