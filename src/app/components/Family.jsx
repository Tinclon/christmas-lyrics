import React from 'react';

import {withStyles} from "@material-ui/core/styles";

import {ThemeProvider} from "@material-ui/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export default props => {
    const {
        classes,
        theme,
        handleSetFamily
    } = props;

    const StyledTreeItem = withStyles(() => ({
        '@global': {
            '.MuiTreeItem-root:focus > .MuiTreeItem-content': {
                backgroundColor: 'inherit'
            }
        },
        content: {
            '&:hover': {
                backgroundColor: 'inherit'
            }
        },
        label: {
            paddingLeft: '12px',
            paddingBottom: '4px',
            fontSize: '32pt'
        },
        group: {
            marginLeft: '12px',
            paddingLeft: '36px',
            borderLeft: `1px dashed`,
        },
    }))(props => <TreeItem {...props} />);

    // Build the UI
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />

                <Container maxWidth="sm" className={classes.family}>
                    <Typography paragraph variant="h6">
                        Choose wisely...
                    </Typography>
                    <TreeView
                        className={classes.familytree}
                        expanded={["Nielsen_pm"]}
                    >
                        <StyledTreeItem nodeId="Nielsen_pm" label="Nielsen" onClick={handleSetFamily("Nielsen_pm")} >
                            <StyledTreeItem nodeId="Creighton_sl" label="Creighton" onClick={handleSetFamily("Creighton_sl")} />
                            <StyledTreeItem nodeId="Nielsen_ck" label="Nielsen" onClick={handleSetFamily("Nielsen_ck")} />
                            <StyledTreeItem nodeId="Baker_jc" label="Baker" onClick={handleSetFamily("Baker_jc")} />
                            <StyledTreeItem nodeId="Lowry_mm" label="Lowry" onClick={handleSetFamily("Lowry_mm")} />
                        </StyledTreeItem>
                    </TreeView>
                </Container>

            </div>
        </ThemeProvider>
    );
}