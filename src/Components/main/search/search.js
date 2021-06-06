import React, { useState } from "react";
import { speciesSearch } from "../../api/gsgAPI";

import {Grid, Box, Button, TextField, InputLabel, Select, FormControl} from '@material-ui/core';
import {Autocomplete} from  '@material-ui/lab';

function Search(props) {
  const [region, setRegion] = useState();
  const [species, setSpecies] = useState();
  const [speciesNames, setSpeciesNames] = useState([]);
  const [sppSearchTerm, setSppSearchTerm] = useState("");

  // functions passed from main container to handle search functionality
  const globalSearch = props.globalSearch;
  const regionalSearch = props.regionalSearch;

  // timeout id used to cancel timeout when user adds more keystrokes
  let timeoutId = 0;
  const suggestName = (e, val) => {
    console.log('suggesting name')
      let name = val;
      setSppSearchTerm(name)
      clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      let speciesArr = await speciesSearch(name);
      setSpeciesNames(speciesArr);
    }, 500);
  };
  // sets the species in state to the selected option when clicked
  const handleSpeciesSelection = (e) => {
    setSpecies(e.target.value);
    setSppSearchTerm(e.target.value);

    console.log(`selected species ${species}`);
  };
  const handleRegionSelection = (e) => {
      const region = e.target.value;
      setRegion(region);
      console.log(region);
     
  }
  // functions to handle search using functions from <MainContainer /> when buttons are clicked
  const handleGlobalSearch = () => {
      globalSearch(sppSearchTerm);
  }
  const handleRegionalSearch = () => {
      regionalSearch(sppSearchTerm, region);
  }


  return (
    <div>
      <Grid container direction="column">    
      {/* <input type="text" id="species-search" placeholder="Enter a species or genus" value={sppSearchTerm} onChange={suggestName} /> */}
      <Box my={1}>
        <Autocomplete
        id="species-autocomplete"
        style={{width: 'auto'}}
        options={speciesNames.map(name=>name)}
        freesolo="true"
        loading={!speciesNames ? 'true' : 'false'}
        onInputChange={(event, newValue) => {
          suggestName(event, newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} id="species-search" fullWidth value={sppSearchTerm} variant="filled"
        label="Search for a species or genus" placeholder="e.g. Ursus maritimus" />
        )}
      getOptionLabel={(option) => `${option}`}
      renderOption={(option) => {
        return <h5>{option}</h5>
      }}
      />
    </Box>

    
      {/* <TextField id="species-search" color="primary" fullWidth value={sppSearchTerm} onChange={suggestName} variant="filled"
      label="Search for a species or genus" placeholder="e.g. Ursus maritimus" /> */}
      <Box mb={1} flexGrow={1}>
      <FormControl variant="filled" fullWidth={true}>
      <InputLabel htmlFor="region-search">Region:  </InputLabel>
      <Select native defaultValue='Search by Region' variant="filled" onChange={handleRegionSelection}>
        <option value="none" hidden selected >Select a region</option>
        <option value="northeastern_africa">Northeastern Africa</option>
        <option value="eastern_africa">Eastern Africa</option>
        <option value="western_africa">Western Africa</option>
        <option value="northern_africa">Northern Africa</option>
        <option value="central_africa">Central Africa</option>
        <option value="pan-africa">Pan-Africa</option>
        <option value="southern africa">Southern Africa</option>
        <option value="mediterranean">Mediterranean</option>
        <option value="europe">Europe</option>
        </Select>
        </FormControl>
        </Box>
        <Box m={1} display="flex" justifyContent="center" alignContent="flex-start">
          <Box mr={2}>
      <Button id="regional-search" color="primary" variant="outlined" onClick={handleRegionalSearch}>Regional Search</Button>
      </Box>
      <Box mr={2}>
      <Button id="global-search" color="primary" variant="outlined" onClick={handleGlobalSearch}>Global Search</Button>
      </Box>
      </Box>
    </Grid>
    </div>
  );
}

export default Search;
