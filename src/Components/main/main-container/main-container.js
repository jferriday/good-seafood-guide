import './maincontainer.css';
import Search from '../search/search';
import { useState } from "react";
import {
  globalAssessment,
  globalStatus,
  regionalAssessment,
  regionalStatus,
} from "../../api/gsgAPI";
import Assessment from "../../assessment/Assessment";
// Material UI Components
import { Paper, Typography, Box, Container, Grid } from "@material-ui/core";
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
            <Typography variant="h4">Search for global or regional Red List assessments</Typography>
            <Search regionalSearch={regionalSearch} globalSearch={globalSearch} />
          </Box>
          </Paper>
          <Typography variant="subtitle1">
            Red List Info gives easy access to ICUN Red List assessments for thousands of species. Search for a species or genus
            and select a region, or view global assessments.
            </Typography>
            <br/>
            <Typography variant="subtitle2">
            Assessment data is from IUCN (iucnredlist.org). Species names autocompletion comes from the Global Biodiversity Information Facility
            (gbif.org).
            </Typography>
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
