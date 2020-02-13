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
import Container from "@material-ui/core/Container";
import ListSubheader from "@material-ui/core/ListSubheader";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import getScriptures from './scriptures';
import getSongs from './songs';
import getPeople from './people';

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
    },
    hidden: {
        visibility: 'hidden'
    }
}));

// Navigation
// Doesn't work very well, so I inlined the scriptures
// const _iOSDevice = !!navigator.platform.match(/iOS|iPhone|iPod|iPad/i);
// const _androidDevice = !!navigator.platform.match(/Android/i);
// const linkPrefix = _iOSDevice || _androidDevice ? "gospellibrary://content/scriptures/" : "https://www.churchofjesuschrist.org/study/scriptures/";
// const handleNavigate = scripture => () => window.open(linkPrefix + scripture.link, "_blank");

const DECEMBER = 11;

export default function ChristmasLyrics() {
    // Configure styles and theme
    const classes = useStyles();
    const theme = createMuiTheme({palette: {type: "dark"}});

    // Create hooks
    const [open, setOpen] = React.useState(false);
    const [songs, setSongs] = React.useState(getSongs());
    const [currentDate, setCurrentDate] = React.useState((new Date()).getMonth() === DECEMBER ? `${(new Date()).getDate()}` : "0");
    const [currentOpusReference, setCurrentOpusReference] = React.useState();

    // Set the current opus from the url
    useEffect(() => window.onpopstate = () => setCurrentOpusReference(decodeURI(window.location.hash.split("#")[1])));
    if(!currentOpusReference && window.location.hash.split("#")[1]) {
        setTimeout(() => setCurrentOpusReference(decodeURI(window.location.hash.split("#")[1])));
        return <Fragment/>
    }

    // Pull in all the data
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
        localStorage.setItem("peoplestamp", `${Math.floor(Math.random() * Math.floor(100))}`);
    }
    // Set the sung count
    songs.forEach(song => song.sung = (localStorage.getItem(song.title) || "0"));
    // Set the people stamp
    const peopleStamp = localStorage.getItem("peoplestamp") || Math.floor(Math.random() * Math.floor(100));
    localStorage.setItem("peoplestamp", `${peopleStamp}`);

    // Set up handlers
    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    const handleDateChange = date => () => setCurrentDate(`${date}`);
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
                            {opusTitle || appTitle}
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
                    <List dense={true} className={classes.list}>
                        <ListSubheader className={classes.listSubHeader} style={{paddingTop: "8px", paddingBottom: "8px"}}>

                            <Divider />
                            <div className={classes.drawerHeader}>
                                <Button className={classes.drawerTitle} onClick={handleChooseOpus("home")}>
                                    {appTitle}
                                </Button>
                                <IconButton onClick={handleDrawerClose}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </div>
                            <div className={classes.drawerSubtitle}>
                                <IconButton
                                    onClick={handleDateChange(parseInt(currentDate) - 1)}
                                    className={clsx({[classes.hidden]: !scripture.ref || currentDate <= 1 })} >
                                    <ChevronLeftIcon />
                                </IconButton>
                                <Button onClick={handleChooseOpus(scripture.date)} style={{fontSize: "10px"}}>
                                    {(scripture.ref && `December ${currentDate}: ${scripture.ref}`) || "See you next December!"}
                                </Button>
                                <IconButton
                                    onClick={handleDateChange(parseInt(currentDate) + 1)}
                                    style={{float: "right"}}
                                    className={clsx({[classes.hidden]: !scripture.ref || currentDate >= 24 })}>
                                    <ChevronRightIcon />
                                </IconButton>
                            </div>
                            <Divider />
                        </ListSubheader>
                        {songs.map(song => (
                            <ListItem button key={song.title} onClick={handleChooseOpus(song.title)}>
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
                        {opusText && opusText.split("\n").reduce((acc, curr) => <Fragment>{acc}<br/>{curr.trim()}</Fragment>)}
                    </Typography>
                    {!opusText &&
                        <Fragment>
                            <Container maxWidth="sm">
                                <img src={process.env.PUBLIC_URL + "/nativity-silhouette.png"} alt="Nativity" style={{width: "100%", height: "100%"}}/>
                            </Container>
                            <Container maxWidth="sm" style={{padding: "10px"}}>
                                <Paper elevation={10} style={{padding: "10px"}}>
                                    <Box>
                                        <Box className={classes.box}><span className={classes.emoji} role={"img"} aria-label={"candle"}>🕯</span><Chip className={classes.chip} label={people[(parseInt(peopleStamp) + date + 0) % people.length].name} /></Box>
                                        <Box className={classes.box}><span className={classes.emoji} role={"img"} aria-label={"song"}>🎵</span><Chip className={classes.chip} label={people[(parseInt(peopleStamp) + date + 1) % people.length].name} /></Box>
                                    </Box>
                                    <Box>
                                        <Box className={classes.box}><span className={classes.emoji} role={"img"} aria-label={"scripture"}>📖</span><Chip className={classes.chip} label={people[(parseInt(peopleStamp) + date + 2) % people.length].name} /></Box>
                                        <Box className={classes.box}><span className={classes.emoji} role={"img"} aria-label={"song"}>🎵</span><Chip className={classes.chip} label={people[(parseInt(peopleStamp) + date + 3) % people.length].name} /></Box>
                                    </Box>
                                    <Box>
                                        <Box className={classes.box} ><span className={classes.emoji} role={"img"} aria-label={"prayer"}>🙏</span><Chip className={classes.chip} label={people[(parseInt(peopleStamp) + date + 4) % people.length].name} /></Box>
                                        <Box className={classes.box} ><span className={classes.emoji} role={"img"} aria-label={"candle"}>🕯</span><Chip className={classes.chip} label={people[(parseInt(peopleStamp) + date + 5) % people.length].name} /></Box>
                                   </Box>
                                </Paper>
                            </Container>
                        </Fragment>
                    }
                </main>
            </div>
        </ThemeProvider>
    );
}