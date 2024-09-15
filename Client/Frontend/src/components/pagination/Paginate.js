import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
      
        marginTop: theme.spacing(5),
        
        display: "flex",
        justifyContent: "center"
    },
  }));

const Paginate = ({postsPerPage, totalPosts , sendPageNumber}) => {

    const classes = useStyles()

    const pageNumbers =[];
    
     
    for(let i=1; i<= Math.ceil(totalPosts / postsPerPage); i++){

           pageNumbers.push(i);
         
    }
    
    return (
         <div className={classes.root}>
           
                         
            <Pagination count={pageNumbers.length} color="primary" onClick={(e)=> sendPageNumber(e.target.textContent)}/>
            

          </div>
    )
}
export default Paginate;