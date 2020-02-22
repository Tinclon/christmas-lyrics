import React from 'react';

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";

export default props => {
    const {
        classes,
        date,
        title,
        songs,
        scripture,
        drawerOpen,
        handleChooseOpus,
        handleDrawerClose,
        handleDateChange,
        toggleSungSong
    } = props;

    // Build the UI
    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={drawerOpen}
            classes={{paper: classes.drawerPaper}}
        >
            <List className={classes.list}>
                <ListSubheader className={classes.listSubHeader}>
                    <Divider />
                    <div className={classes.drawerHeader}>
                        <Button className={classes.drawerTitle}
                                onClick={handleChooseOpus("home")}>
                            {title}
                        </Button>
                        <IconButton
                            onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <div className={classes.drawerSubtitle}>
                        <IconButton
                            onClick={handleDateChange(date - 1)} >
                            <ChevronLeftIcon />
                        </IconButton>
                        <Button
                            style={{fontSize: "10px"}}
                            onClick={handleChooseOpus(scripture.date)} >
                            {(scripture.ref && `December ${date}: ${scripture.ref}`) || "See you next December!"}
                        </Button>
                        <IconButton
                            onClick={handleDateChange(date + 1)}
                            style={{float: "right"}} >
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
    );
}