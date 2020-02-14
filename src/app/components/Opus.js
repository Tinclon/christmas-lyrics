import React, {Fragment} from 'react';
import clsx from "clsx";

import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import Assignment from "./Assignment";

export default props => {
    const {
        classes,
        year,
        date,
        opus,
        drawerOpen,
        handleDrawerClose
    } = props;

    const offset = year + date;

    // Build the UI
    return (
        <main
            onClick={handleDrawerClose}
            className={clsx(classes.content, {[classes.contentShift]: drawerOpen})} >
            <div className={classes.drawerHeader} />
            <Typography paragraph>
                {
                    opus.text
                        && opus.text.split("\n").reduce((acc, curr) =>
                            <Fragment>{acc}<br/>{curr.trim()}</Fragment>)
                }
            </Typography>
            {!opus.text &&
                <Fragment>
                    <Container maxWidth="sm">
                        <img src={process.env.PUBLIC_URL + "/nativity-silhouette.png"} alt="Nativity" style={{width: "100%", height: "100%"}}/>
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
                </Fragment>
            }
        </main>
    );
}