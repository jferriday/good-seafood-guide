const dotenv = require('dotenv').config();
const endpoint = 'http://localhost:4000'
export async function speciesSearch(term) {
    // contacts the server when user is typing and returns a list of suggestions
    const response = await fetch(`${endpoint}/nameSearch?name=${term}`);
    if (response.ok) {
        console.log(response);
        const jsonResponse =  await response.json();
        // only returns names, not null entries returned from the GBIF API (server side)
        const namesArray = jsonResponse.filter(item => {
            return item !== null;
        });
        const distinctNames = [...new Set(namesArray)]
        return distinctNames;
    }else {
        return null;
    }
};

export async function globalAssessment(species) {
    const response = await fetch(encodeURI(`${endpoint}/redlist/threats/global/${species}`)); // Returns global threats
    if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse;
    }else{
        return null;
    }
}

export async function globalStatus(species) { // returns global status
    const response = await fetch(encodeURI(`${endpoint}/redlist/global/${species}`));
    if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse;
    }else{
        return null;
    }
}

export async function regionalAssessment(species, region) { // returns regional threats
    console.log(`Getting regional assessment for region ${region} and species ${species}`)
    const response = await fetch(encodeURI(`${endpoint}/redlist/threats/regional/${region}/${species}`));
    if (response.ok) {
        console.log(response);
        const jsonResponse = await response.json();
        return jsonResponse;
    }else{
        return null;
    }
};

export async function regionalStatus(species, region) { // returns regional assessment
    const response = await fetch(encodeURI(`${endpoint}/redlist/regional/${region}/${species}`));
    if(response.ok) {
        console.log(response);
        const jsonResponse = await response.json();
        return jsonResponse;
    } else {
        return null;
    }
}



