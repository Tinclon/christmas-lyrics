import React, {Fragment} from 'react';

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import Assignment from "./Assignment";

export default props => {
    const {
        classes,
        year,
        date,
        handleNewFamily
    } = props;

    const offset = year + date;

    // Build the UI
    return (
        <Fragment>
            <Container maxWidth="sm">
                <img src={process.env.PUBLIC_URL + "/nativity-silhouette.png"} alt="Nativity" className={classes.silhouette}/>
            </Container>
            <Container maxWidth="sm" className={classes.assignmentContainer}>
                <Paper elevation={10} className={classes.assignmentContainer}>
                    <Box>
                        <Assignment offset={offset + 0} icon={"🕯"} text={"candle"} {...props} />
                        <Assignment offset={offset + 1} icon={"🎵"} text={"song"} {...props} />
                    </Box>
                    <Box>
                        <Assignment offset={offset + 2} icon={"📖"} text={"scripture"} {...props} />
                        <Assignment offset={offset + 3} icon={"🎵"} text={"song"} {...props} />
                    </Box>
                    <Box>
                        <Assignment offset={offset + 4} icon={"🙏"} text={"prayer"} {...props} />
                        <Assignment offset={offset + 5} icon={"🕯"} text={"candle"} {...props} />
                   </Box>
                </Paper>
            </Container>
            <div className={classes.newfamily} onClick={handleNewFamily}>
                I want a new family ...
            </div>
        </Fragment>
    );
}