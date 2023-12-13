import React, {Fragment} from 'react';
import clsx from "clsx";

import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";

export default props => {
    const {
        classes,
        opus
    } = props;

    // Build the UI
    return (
        <Fragment>
            {
                opus.watermark &&
                    <div className={classes.watermark} style={{fontSize: `${300 - (opus.watermark.split("\n").length * 70)}pt`}}>
                        { opus.watermark.split("\n").reduce((acc, curr) =>
                            <Fragment>{acc}<br/>{curr.trim()}</Fragment>) }
                    </div>
            }
            <Paper elevation={(opus.scripture && 10) || 0} className={clsx(classes.opusPaper, {[classes.invisible]: !opus.scripture})}>
                <Typography paragraph>
                    {
                        opus.text
                            && opus.text.split("\n").reduce((acc, curr) =>
                                <Fragment>{acc}<br/>{curr.trim()}</Fragment>)
                    }
                    {
                        // Add some blank space at the bottom to allow for scrolling
                        !opus.scripture
                            && " ".repeat(30).split(" ").reduce(acc =>
                                <Fragment>{acc}<br/></Fragment>)
                    }
                </Typography>
            </Paper>
        </Fragment>
    );
}