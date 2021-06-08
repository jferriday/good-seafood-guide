import {useState} from 'react';
import {Slide, Card, CardContent, CardHeader, Divider, Typography, makeStyles, StylesProvider} from '@material-ui/core';

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
    'EN': '#ff3333',
    'CR': '#b30000',
    'EW': '#999999',
    'EX': '#999999'
}

const statusTextColours = {
    'DD': '#000000',
    'LC': '#ffffff',
    'NT': '#ffffff',
    'VU': '#000000',
    'EN': '#ffffff',
    'CR': '#ffffff',
    'EW': '#e63900',
    'EX': '#e63900'
}


function Assessment(props) {
    // species Redlist status and array of threats from MainContainer state:
    let threats;
    let status;
    
    props.data ? threats = props.data.threats : threats = null;
    props.data ? status = props.data.status : status = null;
   
    // use styles from hook for styling according to redlist status
    const useStyles = makeStyles({
        assessmentCard: props => {
            return {
                backgroundColor: statusColours[status.category],
                color: statusTextColours[status.category],
            };
        },
    })
    const classes = useStyles();

    
    console.log(props);
    if (props.data) {
    return(
        <div>
            <Slide direction="up" in={props.visible}>
                <Card style={{opacity: 0.9}}>
                    <CardHeader  
                    className={classes.assessmentCard} 
                    title={statusCodes[status.category]}
                    >
                    </CardHeader>
                    <CardContent>
                    <Typography  variant="h2" color="textPrimary">{status.common_name}</Typography>
                    <Typography variant="h4"color="textSecondary" gutterBottom>{status.scientific_name}</Typography>
                    <Typography gutterBottom variant="h5" color="textPrimary">Population Trend: {status.population_trend}</Typography>
                    <Divider />

                    <Typography variant="h5">Threats</Typography>
                        <ul>{threats.map(item => {
                            if(item.scope === "Whole (>90%)" || item.scope === "Majority (50-90%)" || item.scope === null){
                                let threatScope;
                                item.scope === "Whole (>90%)" ? threatScope = 'major-threat' : threatScope = 'majority-threat';
                            return <li className={threatScope} key={item.code}><Typography variant="body1">{item.title}</Typography></li>
                            }
                        })}</ul>
                    <Divider />
                    <Typography variant="caption">Last Assessment: {status.assessment_date}</Typography>
                    </CardContent>
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
