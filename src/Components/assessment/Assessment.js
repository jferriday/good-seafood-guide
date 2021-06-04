import {useEffect} from 'react';

function Assessment(props) {
    // species Redlist status and array of threats from MainContainer state:
    
    let threats;
    let status;
    
    props.data ? threats = props.data.threats : threats = null;
    props.data ? status = props.data.status : status = null;


    const statusCodes = {
        'DD': 'Data Deficient',
        'LC': 'Least Concern',
        'NT': 'Near Threatened',
        'VU': 'Vulnerable',
        'EN': 'Endangered',
        'CR': 'Critically Endangered',
        'EW': 'Extinct In The Wild',
        'EX': 'Extinct'
    }
    console.log(props);
    if (props.data) {
    return(
        <div>
            <h2>{status.common_name}</h2><dfn>{status.scientific_name}</dfn>
            <span className="status">{statusCodes[status.category]}</span>
            <h3>Population Trend: {status.population_trend}</h3>
            <h3>Threats</h3>
                <ul>{threats.map(item => {
                    if(item.scope === "Whole (>90%)" || item.scope === "Majority (50-90%)"){
                        let threatScope;
                        item.scope === "Whole (>90%)" ? threatScope = 'major-threat' : threatScope = 'majority-threat';
                    return <li className={threatScope} key={item.code}>{item.title}</li>
                    }
                })}</ul>
            <h4>Last Assessment: {status.assessment_date}</h4>
        </div>
    );
    } else if(!props.data) {
        return(
            <div>
            </div>
        )
    }
};

export default Assessment;
