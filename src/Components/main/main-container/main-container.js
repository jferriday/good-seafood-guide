import Search from '../search/Search';
import {useState} from 'react';
import {globalAssessment, regionalAssessment} from '../../api/gsgAPI';

function MainContainer(props){
    const [assessment, setAssessment] = useState(); // contains assessment results from IUCN
    
    // function to handle search actions from the <Search /> component

    const globalSearch = async (speciesName) => {
        const results = await globalAssessment(speciesName);
        console.log(results);
        setAssessment(results);
    };

    const regionalSearch = async (speciesName, region) => {
        const results = await regionalAssessment(speciesName, region);
        console.log(results);
        setAssessment(results);
    }
    

return(
    <div>
        <Search
        regionalSearch={regionalSearch}
        globalSearch={globalSearch} 
        />
    </div>
)
}

export default MainContainer;
