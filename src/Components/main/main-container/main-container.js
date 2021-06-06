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
import { AppBar, Typography, Box, Container } from "@material-ui/core";

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

  return (
    <div>
    <Container maxWidth="md">
      <Box>
        <Search regionalSearch={regionalSearch} globalSearch={globalSearch} />
      </Box>
        {assessment ? <Box mt={2}><Assessment data={assessment} visible={assessmentVisibility} /></Box> : ""}
       </Container>
    </div>
  );
}

export default MainContainer;
