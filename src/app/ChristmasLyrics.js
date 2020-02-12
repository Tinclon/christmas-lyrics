import React, {Fragment, useEffect} from 'react';
import clsx from 'clsx';

import {ThemeProvider} from "@material-ui/styles";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import getScriptures from './scriptures';
import getSongs from './songs';

const appTitle = "Christmas";
const drawerWidth = 320;
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
    hidden: {
        visibility: "hidden"
    }
}));

const _iOSDevice = !!navigator.platform.match(/iOS|iPhone|iPod|iPad/i);
const _androidDevice = !!navigator.platform.match(/Android/i);
const linkPrefix = _iOSDevice || _androidDevice ? "gospellibrary://content/scriptures/" : "https://www.churchofjesuschrist.org/study/scriptures/";

export default function ChristmasLyrics() {
    const classes = useStyles();
    const theme = createMuiTheme({palette: {type: "dark"}});

    const [open, setOpen] = React.useState(false);
    const [songs, setSongs] = React.useState(getSongs());
    const [currentDate, setCurrentDate] = React.useState((new Date()).getDate());
    const [currentSongTitle, setCurrentSongTitle] = React.useState();

    // Set the current song from the url
    useEffect(() => window.onpopstate = () => setCurrentSongTitle(decodeURI(window.location.hash.split("#")[1])));
    if(!currentSongTitle && window.location.hash.split("#")[1]) {
        setTimeout(() => setCurrentSongTitle(decodeURI(window.location.hash.split("#")[1])));
        return <Fragment/>
    }

    const scriptures = getScriptures();
    const scripture = (scriptures.find(scripture => scripture.date === currentDate) || {}) || {};
    const song = songs.find(song => song.title === currentSongTitle) || {};
    const title = song.title || "";
    const lyrics = song.lyrics || "";

    songs.forEach(song => song.sung = (localStorage.getItem(song.title) || "0"));

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    const handleDateChange = date => () => setCurrentDate(date);
    const handleNavigate = scripture => () => window.open(linkPrefix + scripture.link, "_blank");
    const handleChooseSong = title => () => (window.location.hash = encodeURI(title)) && handleDrawerClose();
    const toggleSungSong = song => () => {
        song.sung = song.sung === "0" ? "1" : "0";
        localStorage.setItem(song.title, song.sung);
        setSongs([...songs]);
    };
    const handleUnsungSongs = () => {
        songs.forEach(song => song.sung = "0");
        localStorage.clear();
        setSongs([...songs]);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
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
                            {title || appTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{paper: classes.drawerPaper}}
                >
                    <div className={classes.drawerHeader}>
                        <Button className={classes.drawerTitle} onClick={handleChooseSong("")}>
                            {appTitle}
                        </Button>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <div className={classes.drawerSubtitle}>
                        <IconButton
                            onClick={handleDateChange(currentDate - 1)}
                            className={clsx({[classes.hidden]: currentDate <= 1 })} >
                            <ChevronLeftIcon />
                        </IconButton>
                        <Button onClick={handleNavigate(scripture)} style={{fontSize: "10px"}}>
                            {`December ${currentDate}: ${scripture.ref}`}
                        </Button>
                        <IconButton
                            onClick={handleDateChange(currentDate + 1)}
                            style={{float: "right"}}
                            className={clsx({[classes.hidden]: currentDate >= 24 })}>
                            <ChevronRightIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Button onClick={handleUnsungSongs}>
                        <div>Unsing all</div>
                    </Button>
                    <Divider />
                    <List dense={true}>
                        {songs.map(song => (
                            <ListItem button key={song.title} onClick={handleChooseSong(song.title)}>
                                <ListItemText primary={song.title} />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                        onChange={toggleSungSong(song)}
                                        checked={song.sung > 0}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main
                    onClick={handleDrawerClose}
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <Typography paragraph>
                        {lyrics && lyrics.split("\n").reduce((acc, curr) => <Fragment>{acc}<br/>{curr.trim()}</Fragment>)}
                    </Typography>
                </main>
            </div>
        </ThemeProvider>
    );
}