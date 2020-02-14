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
            <div className={classes.watermark}>
                {
                    opus.watermark
                        && opus.watermark.split("\n").reduce((acc, curr) =>
                         <Fragment>{acc}<br/>{curr.trim()}</Fragment>)
                }
            </div>
            <Paper elevation={(opus.scripture && 10) || 0} className={clsx(classes.opusPaper, {[classes.invisible]: !opus.scripture})}>
                <Typography paragraph>
                    {
                        opus.text
                            && opus.text.split("\n").reduce((acc, curr) =>
                                <Fragment>{acc}<br/>{curr.trim()}</Fragment>)
                    }
                </Typography>
            </Paper>
        </Fragment>
    );
}