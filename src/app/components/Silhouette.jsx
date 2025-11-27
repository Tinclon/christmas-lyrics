import React from 'react';

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import Assignment from "./Assignment";

export default props => {
    const {
        classes,
        year,
        date,
        people,
        handleNewFamily,
        showFamilyPicker,
    } = props;

    const offset = year - date;

    // Build the UI
    return (
        <div className={classes.silhouette}>
            <Container maxWidth="sm" className={classes.silhouetteImageContainer}>
                <img src={`${process.env.PUBLIC_URL}/nativity-silhouette.png`} alt="Nativity" className={`silhouetteImage ${classes.silhouetteImage}`}/>
            </Container>
            { (people.length > 2 &&
                <Container maxWidth="sm" className={classes.assignmentContainer}>
                    <Paper elevation={10} className={classes.assignmentContainer}>
                        <Box>
                            <Assignment offset={offset + 0} icon={"🪔"} text={"candle"} {...props} />
                            <Assignment offset={offset + 1} icon={"🕯️"} text={"candle"} {...props} />
                        </Box>
                        <Box>
                            <Assignment offset={offset + 2} icon={"🎵"} text={"song"} {...props} />
                            <Assignment offset={offset + 3} icon={"📖"} text={"scripture"} {...props} />
                        </Box>
                        <Box>
                            <Assignment offset={offset + 4} icon={"🙏"} text={"prayer"} {...props} />
                            <Assignment offset={offset + 5} icon={"🎶"} text={"song"} {...props} />
                        </Box>
                        { people.length > 6 &&
                            <Box>
                                <Assignment offset={offset + 6} icon={"🗓️"} text={"advent"} {...props} />
                                <Assignment offset={offset + 7} icon={" "} text={"extra"} {...props} />
                            </Box>
                        }
                        { people.length > 8 &&
                            <Box>
                                <Assignment offset={offset + 8} icon={"🕯️"} text={"candle"} {...props} />
                                <Assignment offset={offset + 9} icon={"🪔"} text={"candle"} {...props} />
                            </Box>
                        }                        
                    </Paper>
                </Container>) ||
                <div/>
            }
            {
                (showFamilyPicker &&
                    <footer className={classes.newFamily} onClick={handleNewFamily}>
                        I want a new family ...
                    </footer>
                )
            }
        </div>
    );
}
