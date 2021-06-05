import {useState} from 'react';
import {Slide, Card, Typography} from '@material-ui/core';

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

    const statusColours = {
        'DD': '#bfbfbf',
        'LC': '#0066ff',
        'NT': '#006666',
        'VU': '#ff9900',
        'EN': '#ff3300',
        'CR': '#b30000',
        'EW': '#999999',
        'EX': '#999999'
    }
    console.log(props);
    if (props.data) {
    return(
        <div>
            <Slide direction="up" in={props.visible}>
                <Card>
                    <Typography variant="h2" color="textPrimary">{status.common_name}</Typography><Typography variant="h4"color="textSecondary">{status.scientific_name}</Typography>
                    <span className="status">{statusCodes[status.category]}</span>
                    <Typography variant="h5" color="textPrimary">Population Trend: {status.population_trend}</Typography>
                    <Typography variant="h5">Threats</Typography>
                        <ul>{threats.map(item => {
                            if(item.scope === "Whole (>90%)" || item.scope === "Majority (50-90%)"){
                                let threatScope;
                                item.scope === "Whole (>90%)" ? threatScope = 'major-threat' : threatScope = 'majority-threat';
                            return <li className={threatScope} key={item.code}><Typography variant="body1">{item.title}</Typography></li>
                            }
                        })}</ul>
                    <Typography variant="caption">Last Assessment: {status.assessment_date}</Typography>
                </Card>
            </Slide>
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
