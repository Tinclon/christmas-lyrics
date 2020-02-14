import {makeStyles} from '@material-ui/core/styles';

export default drawerWidth => makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100%'
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
    contentFill: {
        height: '100%',
        minHeight: 'calc(100vh - 180px)'
    },
    assignmentContainer: {
        padding: '10px'
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
    opusPaper: {
        margin: theme.spacing(3),
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: '16px'
    },
    invisible: {
        backgroundColor: theme.palette.grey.A400,
        paddingLeft: '0',
        paddingRight: '0',
    },
    silhouette: {
        margin: theme.spacing(3)
    },
    silhouetteImage: {
        opacity: '0.6',
        width: '100%',
        height: '100%'
    },
    watermark: {
        position: 'fixed',
        bottom: '0',
        right: '10px',
        opacity: '0.3',
        fontSize: '84pt'
    },
    family: {
        margin: '40px',
        paddingTop: '60px'
    },
    familyTree: {
        paddingTop: '40px'
    },
    newFamily: {
        cursor: 'pointer',
        color: 'black',
        fontSize: '8pt',
        textAlign: 'right'
    }
}))();