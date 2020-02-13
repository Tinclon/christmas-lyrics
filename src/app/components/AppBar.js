import React from 'react';
import clsx from "clsx";

import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar/AppBar";
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default props => {
    const {
        classes,
        title,
        opus,
        open,
        handleDrawerOpen
    } = props;

    // Build the UI
    return (
        <AppBar
            position="fixed"
            color="default"
            className={clsx(classes.appBar, {[classes.appBarShift]: open})}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    {opus.title || title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}