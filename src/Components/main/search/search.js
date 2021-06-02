import React, { useState } from "react";
import { speciesSearch } from "../../api/gsgAPI";

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
  const suggestName = (e) => {
      let name = e.target.value;
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
      const region = document.getElementById("region-select").value;
      setRegion(region);
      console.log(region);
     
  }
  // functions to handle search using functions from <MainContainer /> when buttons are clicked
  const handleGlobalSearch = () => {
      globalSearch(species);
  }
  const handleRegionalSearch = () => {
      regionalSearch(species, region);
  }


  return (
    <div>
      <label htmlFor="species-search">Species or common name </label>
      <input type="text" id="species-search" value={sppSearchTerm} onChange={suggestName} />

      <ul id="species-list">
        {speciesNames
          ? speciesNames.map((suggestion, i) => {
              return (
                <li key={i}>
                  <button
                    value={suggestion}
                    className="speciesSelection"
                    onClick={handleSpeciesSelection}
                  >
                    {suggestion}
                  </button>
                </li>
              );
            })
          : ""}
      </ul>
      <label htmlFor="region-search">Region </label>
      <select name="region" id="region-select" onChange={handleRegionSelection}>
        <option value="none" selected disabled hidden>Select a region</option>
        <option value="northeastern_africa">Northeastern Africa</option>
        <option value="eastern_africa">Eastern Africa</option>
        <option value="western_africa">Western Africa</option>
        <option value="northern_africa">Northern Africa</option>
        <option value="central_africa">Central Africa</option>
        <option value="pan-africa">Pan-Africa</option>
        <option value="southern africa">Southern Africa</option>
        <option value="mediterranean">Mediterranean</option>
        <option value="europe">Europe</option>
      </select>
      <button id="regional-search" className="searchButton" onClick={handleRegionalSearch}>Regional Search</button>
      <button id="global-search" className="searchButton" onClick={handleGlobalSearch}>Global Search</button>
    </div>
  );
}

export default Search;