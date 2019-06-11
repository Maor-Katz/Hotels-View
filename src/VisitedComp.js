import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
        color: 'white'
    },
}));

function VisitedComp(props) {
    const classes = useStyles();

    return (
        <List>
            {props.hotelsInCache.map((hotel, index) => {
                debugger
                return <div><ListItem alignItems="flex-start" key={index}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={hotel.images[0].url}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={hotel.name}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary">
                                    <span> {hotel.date}</span>
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <Divider variant="inset" component="li"/>
                </ListItem>
                </div>
            })}
        </List>
    );
}

export default VisitedComp;
