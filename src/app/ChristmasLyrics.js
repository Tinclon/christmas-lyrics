import React, {Fragment, useEffect} from 'react';

import {ThemeProvider} from "@material-ui/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import styles from "../tools/styles"

import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import Opus from "./components/Opus";

import getScriptures from '../data/scriptures';
import getSongs from '../data/songs';
import getPeople from '../data/people';
import clsx from "clsx";
import Silhouette from "./components/Silhouette";

const title = "Christmas";
const drawerWidth = 330;

// Navigation
// Doesn't work very well, so I inlined the scriptures
// const _iOSDevice = !!navigator.platform.match(/iOS|iPhone|iPod|iPad/i);
// const _androidDevice = !!navigator.platform.match(/Android/i);
// const linkPrefix = _iOSDevice || _androidDevice ? "gospellibrary://content/scriptures/" : "https://www.churchofjesuschrist.org/study/scriptures/";
// const handleNavigate = scripture => () => window.open(linkPrefix + scripture.link, "_blank");

export default () => {
    // Configure styles and theme
    const classes = styles(drawerWidth);
    const theme = createMuiTheme({palette: {type: "dark"}});

    const now = new Date();

    // Create hooks
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [songs, setSongs] = React.useState(getSongs());
    const [date, setDate] = React.useState(`${now.getDate()}`);
    const [opusReference, setOpusReference] = React.useState("");

    // Set the current opus from the url
    const getLocation = () => decodeURI(window.location.hash.split("#")[1]);
    useEffect(() => window.onpopstate = () => setOpusReference(getLocation()));
    if(!opusReference && getLocation()) {
        setTimeout(() => setOpusReference(getLocation()));
        return <Fragment/>
    }

    // Pull in all the data
    const year = now.getFullYear();
    const people = getPeople();
    const scriptures = getScriptures();
    const scripture = scriptures.find(scripture => scripture.date === date) || {};
    const opus = songs.find(song => song.title === opusReference) || scriptures.find(scripture => scripture.date === opusReference) || {};
    opus.title = opus.title || opus.ref;
    opus.text = opus.lyrics || opus.scripture;

    // Clear the local storage if it's too old
    const datestamp = localStorage.getItem("datestamp");
    if(!datestamp || new Date(now - 1000 * 60 * 60 * 24 * 250) > (new Date(datestamp))) {
        localStorage.clear();
    }
    // Set the sung count
    songs.forEach(song => song.sung = (localStorage.getItem(song.title) || "0"));

    // Set up handlers
    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);
    const handleDateChange = date => () => setDate(`${((date % 24 + 24) % 24) || 24}`);
    const handleChooseOpus = reference => () => (window.location.hash = encodeURI(reference)) && handleDrawerClose();
    const toggleSungSong = song => () => {
        song.sung = song.sung === "0" ? "1" : "0";
        localStorage.setItem(song.title, song.sung);
        localStorage.setItem("datestamp", (new Date()).toISOString().split("T")[0]);
        setSongs([...songs]);
    };

    const props = {
        classes, year, date, title, people, songs, scripture, opus, drawerOpen,
        handleDrawerOpen, handleDrawerClose, handleDateChange, handleChooseOpus, toggleSungSong
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
                        !(opus.text
                            && <Silhouette {...props} />)
                            || <Opus {...props} />
                    }
                </main>

            </div>
        </ThemeProvider>
    );
}