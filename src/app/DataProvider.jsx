import React from 'react';

import ChristmasLyrics from "./ChristmasLyrics";
import styles from "../tools/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import getPeople from "../data/people";
import getScriptures from "../data/scriptures";
import getSongs from "../data/songs";
import Family from "./components/Family";

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

    let props = {classes, theme};

    // Create hooks
    const [family, setFamily] = React.useState(localStorage.getItem("family"));

    if (!family) {
        // Set up handlers
        const handleSetFamily = family => () => {
            localStorage.setItem("family", family);
            setFamily(family);
        };
        props = {...props, handleSetFamily};
        return (
            <Family {...props} />
        );
    }

    // Pull in all the data
    const people = getPeople()[family];
    const scriptures = getScriptures();
    const songs = getSongs();

    // Clear the local storage if it's too old
    const now = new Date();
    const datestamp = localStorage.getItem("datestamp");
    if(!datestamp || new Date(now - 1000 * 60 * 60 * 24 * 250) > (new Date(datestamp))) {
        localStorage.clear();
        localStorage.setItem("family", family);
    }

    // Set the sung count
    songs.forEach(song => song.sung = (localStorage.getItem(song.title) || "0"));

    const getLocation = () => decodeURI(window.location.hash.split("#")[1]);
    const handleNewFamily = () => {
        localStorage.setItem("family", "");
        setFamily("");
    };

    props = {
        ...props,
        classes, theme, title, people, scriptures, songs,
        getLocation, handleNewFamily
    };

    return (
        <ChristmasLyrics {...props} />
    );
}