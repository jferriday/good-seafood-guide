import './maincontainer.css';
import Search from "../search/Search";
import { useState } from "react";
import {
  globalAssessment,
  globalStatus,
  regionalAssessment,
  regionalStatus,
} from "../../api/gsgAPI";
import Assessment from "../../assessment/Assessment";
// Material UI Components
import { Paper, AppBar, Typography, Box, Container, Grid } from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

function MainContainer(props) {
  const [assessment, setAssessment] = useState(); // contains assessment results from IUCN
  const [assessmentVisibility, setAssessmentVisibility] = useState(false);

  // function to handle search actions from the <Search /> component

  const globalSearch = async (speciesName) => {
    const results = {};
    results.threats = await globalAssessment(speciesName);
    results.status = await globalStatus(speciesName);
    console.log(results);
    setAssessment(results);
    setAssessmentVisibility(true);
  };

  const regionalSearch = async (speciesName, region) => {
    const results = {};
    results.threats = await regionalAssessment(speciesName, region);
    results.status = await regionalStatus(speciesName, region);

    console.log('Regional assessment:', results);
    setAssessment(results);
    setAssessmentVisibility(true);
  };


  // custom styling
  const useStyles = makeStyles({
    maincontainer: {
      paddingTop: '5%',
    },
    paper: {
      opacity: '0.75'
    }    
  })

  const classes = useStyles();
  return (
    <div className="main"> 
    <Container className={classes.maincontainer} maxWidth="lg">
      <Grid container spacing={5} align="center" justify="center">
        <Grid item md={6}>
          <Paper elevation={3} className={classes.paper}>
          <Box my={2} p={3}>
            <Search regionalSearch={regionalSearch} globalSearch={globalSearch} />
          </Box>
          </Paper>
      </Grid>
      <Grid item lg={6}>
        {assessment ? <Box mt={2}><Assessment data={assessment} visible={assessmentVisibility} opacity={classes.paper} /></Box> : ""}
        </Grid>
        </Grid>
       </Container>
    </div>
  );
}

export default MainContainer;
