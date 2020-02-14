import React, {Fragment, useEffect} from 'react';
import clsx from "clsx";

import {ThemeProvider} from "@material-ui/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import Opus from "./components/Opus";
import Silhouette from "./components/Silhouette";

export default props => {
    const {
        classes,
        theme,
        scriptures,
        songs: _songs,  // TODO: CNielsen: I just don't like this
        getLocation
    } = props;

    const now = new Date();

    // Create hooks
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [songs, setSongs] = React.useState(_songs);
    const [date, setDate] = React.useState(`${now.getDate()}`);
    const [opusReference, setOpusReference] = React.useState("");

    // Set the current opus from the url
    useEffect(() => window.onpopstate = () => setOpusReference(getLocation()));
    if(!opusReference && getLocation()) {
        setTimeout(() => setOpusReference(getLocation()));
        return <Fragment/>
    }

    // Find the appropriate data
    const year = now.getFullYear();
    const scripture = scriptures.find(scripture => scripture.date === date) || {};
    const opus = songs.find(song => song.title === opusReference) || scriptures.find(scripture => scripture.date === opusReference) || {};
    opus.title = opus.title || opus.ref;
    opus.text = opus.lyrics || opus.scripture;

    // Set up handlers
    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);
    const handleDateChange = date => () => setDate(`${((date % 24 + 24) % 24) || 24}`);
    const handleChooseOpus = reference => () => (window.location.hash = encodeURI(reference)) && handleDrawerClose();
    const toggleSungSong = song => () => {
        song.sung = song.sung === "0" ? "1" : "0";
        localStorage.setItem(song.title, song.sung);
        localStorage.setItem("datestamp", (new Date()).toISOString().split("T")[0]);
        setSongs([...songs]);   // TODO: CNielsen: I just don't like this
    };

    props = {
        ...props,
        year, date, songs, scripture, opus, drawerOpen,
        handleDrawerOpen, handleDrawerClose, handleDateChange, handleChooseOpus, toggleSungSong,
    };

    // Build the UI
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar {...props} />
                <Drawer {...props} />

                <main onClick={handleDrawerClose}
                      className={clsx(classes.content, {[classes.contentShift]: drawerOpen})} >
                    <div className={classes.drawerHeader} />
                    {
                        (!opus.text
                            && <Silhouette {...props} />)
                            || <Opus {...props} />
                    }
                </main>

            </div>
        </ThemeProvider>
    );
}