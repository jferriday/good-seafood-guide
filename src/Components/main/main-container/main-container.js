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
import { AppBar, Typography, Grid, Container } from "@material-ui/core";

function MainContainer(props) {
  const [assessment, setAssessment] = useState(); // contains assessment results from IUCN

  // function to handle search actions from the <Search /> component

  const globalSearch = async (speciesName) => {
    const results = {};
    results.threats = await globalAssessment(speciesName);
    results.status = await globalStatus(speciesName);
    console.log(results);
    setAssessment(results);
  };

  const regionalSearch = async (speciesName, region) => {
    const results = {};
    results.threats = await regionalAssessment(speciesName, region);
    results.status = await regionalStatus(speciesName, region);

    console.log(results);
    setAssessment(results);
  };

  return (
    <div>
    <Container maxWidth="md">
      <Search regionalSearch={regionalSearch} globalSearch={globalSearch} />

      {assessment ? <Assessment data={assessment} /> : ""}
      </Container>
    </div>
  );
}

export default MainContainer;
