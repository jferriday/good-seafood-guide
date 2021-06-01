const dotenv = require('dotenv').config();
const endpoint = 'http://localhost:4000'
export async function speciesSearch(term) {
    // contacts the server when user is typing and returns a list of suggestions
    const response = await fetch(`${endpoint}/nameSearch?name=${term}`);
    if (response.ok) {
        console.log(response);
        const jsonResponse =  await response.json();
        console.log(jsonResponse);
        // only returns names, not null entries returned from the GBIF API (server side)
        const namesArray = jsonResponse.map(item => {
            return item !== null;
        });
        return namesArray;
    }else {
        return null;
    }
};

export async function globalAssessment(species) {
    const response = await fetch(encodeURI(`${endpoint}/redlist/threats/global/${species}`));
    if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse;
    }else{
        return null;
    }
}

export async function regionalAssessment(species, region) {
    const response = await fetch(encodeURI(`${endpoint}/redlist/threats/regional/${region}/${species}`));
    if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse;
    }else{
        return null;
    }
};



