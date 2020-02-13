import React, {Fragment, useEffect} from 'react';
import clsx from 'clsx';

import {ThemeProvider} from "@material-ui/styles";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import Opus from "./components/Opus";

import getScriptures from '../data/scriptures';
import getSongs from '../data/songs';
import getPeople from '../data/people';


const appTitle = "Christmas";
const drawerWidth = 330;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    list: {
        paddingTop: '0'
    },
    listSubHeader: {
      backgroundColor: theme.palette.grey[800],
        paddingTop: '8px',
        paddingBottom: '8px'
    },
    drawerTitle: {
        width: '100%'
    },
    drawerSubtitle: {
        width: '100%'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    box: {
        display: 'inline-block',
        width: '50%'
    },
    emoji: {
        fontSize: '24pt',
        paddingRight: '12px'
    },
    chip: {
        verticalAlign: 'text-bottom'
    }
}));

// Navigation
// Doesn't work very well, so I inlined the scriptures
// const _iOSDevice = !!navigator.platform.match(/iOS|iPhone|iPod|iPad/i);
// const _androidDevice = !!navigator.platform.match(/Android/i);
// const linkPrefix = _iOSDevice || _androidDevice ? "gospellibrary://content/scriptures/" : "https://www.churchofjesuschrist.org/study/scriptures/";
// const handleNavigate = scripture => () => window.open(linkPrefix + scripture.link, "_blank");

export default () => {
    // Configure styles and theme
    const classes = useStyles();
    const theme = createMuiTheme({palette: {type: "dark"}});

    // Create hooks
    const [open, setOpen] = React.useState(false);
    const [songs, setSongs] = React.useState(getSongs());
    const [currentDate, setCurrentDate] = React.useState(`${(new Date()).getDate()}`);
    const [currentOpusReference, setCurrentOpusReference] = React.useState();

    // Set the current opus from the url
    useEffect(() => window.onpopstate = () => setCurrentOpusReference(decodeURI(window.location.hash.split("#")[1])));
    if(!currentOpusReference && window.location.hash.split("#")[1]) {
        setTimeout(() => setCurrentOpusReference(decodeURI(window.location.hash.split("#")[1])));
        return <Fragment/>
    }

    // Pull in all the data
    const year = (new Date()).getFullYear();
    const date = (new Date()).getDate();
    const people = getPeople();
    const scriptures = getScriptures();
    const scripture = (scriptures.find(scripture => scripture.date === currentDate) || {}) || {};
    const opus = songs.find(song => song.title === currentOpusReference) || scriptures.find(scripture => scripture.date === currentOpusReference) || {};
    const opusTitle = opus.title || opus.ref;
    const opusText = opus.lyrics || opus.scripture;

    // Clear the local storage if it's too old
    const datestamp = localStorage.getItem("datestamp");
    if(!datestamp || new Date((new Date()) - (1000 * 60 * 60 * 24 * 250)) > (new Date(datestamp))) {
        localStorage.clear();
    }
    // Set the sung count
    songs.forEach(song => song.sung = (localStorage.getItem(song.title) || "0"));

    // Set up handlers
    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    const handleDateChange = date => () => setCurrentDate(`${((date % 24 + 24) % 24) || 24}`);
    const handleChooseOpus = reference => () => (window.location.hash = encodeURI(reference)) && handleDrawerClose();
    const toggleSungSong = song => () => {
        song.sung = song.sung === "0" ? "1" : "0";
        localStorage.setItem(song.title, song.sung);
        localStorage.setItem("datestamp", (new Date()).toISOString().split("T")[0]);
        setSongs([...songs]);
    };

    // Build the UI
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar classes={classes} appTitle={appTitle} opusTitle={opusTitle}
                        open={open} handleDrawerOpen={handleDrawerOpen} />
                <Drawer classes={classes} open={open} currentDate={currentDate}
                        appTitle={appTitle} songs={songs} scripture={scripture}
                        handleChooseOpus={handleChooseOpus} handleDrawerClose={handleDrawerClose}
                        handleDateChange={handleDateChange} toggleSungSong={toggleSungSong} />
                <main
                    onClick={handleDrawerClose}
                    className={clsx(classes.content, {[classes.contentShift]: open})} >
                    <Opus classes={classes} year={year} date={date} people={people} opus={opusText} />
                </main>
            </div>
        </ThemeProvider>
    );
}