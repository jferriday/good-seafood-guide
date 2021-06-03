function Assessment(props) {
    // species Redlist status and array of threats from MainContainer state:

    let threats;
    let status;

    props.data ? threats = props.data.threats : threats = null;
    props.data ? status = props.data.status : status = null;



    return(
        <div>

        </div>
    );
};

export default Assessment;
