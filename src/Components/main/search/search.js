import React, {useState} from 'react';
import {speciesSearch} from '../../api/gsgAPI';


function Search() {
    const [region, setRegion] = useState();
    const [species, setSpecies] = useState();
    const [speciesNames, setSpeciesNames] = useState([]);
    
    // timeout id used to cancel timeout when user adds more keystrokes
    let timeoutId = 0;
    const suggestName = (e) => {
        let name = e.target.value;
        clearTimeout(timeoutId);

        timeoutId = setTimeout(async () => {
            let speciesArr = await speciesSearch(name);
            setSpeciesNames(speciesArr);
        }, 500);
        console.log(speciesNames);


    }
    return(
        <div>
            <label for="species-search">Species or common name </label>
            <input type="text" id="species-search" onChange={suggestName} />

            <ul id="species-list">
                {/* {speciesNames ? speciesNames.map(suggestion =>  <li>${suggestion}</li>) : ""}; */}
    
            </ul>
            <label for="region-search">Region </label>
            <select name="region" id="region-select">
                <option value="northeastern_arfrica">Northeastern Africa</option>
                <option value="eastern_africa">Eastern Africa</option>
                <option value="western_africa">Western Africa</option>
                <option value="northern_africa">Northern Africa</option>
                <option value="central_africa">Central Africa</option>
                <option value="pan-africa">Pan-Africa</option>
                <option value="southern africa">Southern Africa</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="europe">Europe</option>
            </select>
            <input type="submit" value="Regional Search" />
            <input type="submit" value="Global Search" />
        </div>
    )
} 

export default Search;

