import React from 'react';

import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";

export default props => {
    const {
        classes,
        people,
        offset,
        icon,
        text
    } = props;

    // Build the UI
    return (
        <Box className={classes.box}>
            <span className={classes.emoji} role={"img"} aria-label={text}>{icon}</span>
            <Chip className={classes.chip} label={people[(offset) % people.length].name} />
        </Box>
    );
}