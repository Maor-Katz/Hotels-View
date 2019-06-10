import React from 'react';
import InputComponent from './InputComponent';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function SimpleTabs(props) {
    const classes = useStyles();
    const {changeHotelsList} = props
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>

                    <Tab label="Details"/>
                    <Tab label="Rooms"/>

                </Tabs>
            </AppBar>
            <div> Hotel Name: {props.hotelDetails.name}</div>
            {value === 0 && <TabContainer>
                {/*<div className='hotelDetailsTitles'>*/}
                    {/*<div className='imgTitle'>Image</div>*/}
                    {/*<div className='contryTitle'>Country</div>*/}
                    {/*<div className='starTitleDetails'>Stars</div>*/}
                    {/*<div className='currencyTitle'>Currency</div>*/}
                    {/*<div className='checkInTitle'>Check-In</div>*/}
                    {/*<div className='checkOutTitle'>Check-Out</div>*/}
                    {/*<div className='numOfRoomTitle'>numberOfRooms</div>*/}
                {/*</div>*/}
                <div className='hotelDetailsPage'>
                    <div className='imgDetailsWrapper'><img className='hotelDetailsImg' src={props.hotelDetails.images[0].url}/></div>
                    <div className='contryDetails'><InputComponent field={'city'} value={props.hotelDetails.address} label='City'/></div>
                    <div className='starDetails'><InputComponent field={'txt'} value={props.hotelDetails.details.starRating} label='Star'/></div>
                    <div className='currencyDetails'><InputComponent field={'currency'} value={props.hotelDetails.details} label='Currency'/></div>
                    <div className='checkInDetails'><InputComponent field={'checkIn'} value={props.hotelDetails.details} label='Check-In'/></div>
                    <div className='checkOutDetails'><InputComponent field={'checkOut'} value={props.hotelDetails.details} label='Check-Out'/></div>
                    <div className='numOfRoomDetails'><InputComponent field={'numOfRooms'} value={props.hotelDetails.details} label='numbers of Rooms'/></div>
                </div>
                <Button variant="contained" size="medium" color="primary" onClick={() =>changeHotelsList(props.hotelDetails)}>
                    Save
                </Button>
            </TabContainer>}
            {value === 1 && <TabContainer>
                <div className='roomPage'>{props.hotelDetails.roomTypes.map(room => {
                    return <div className='room'>
                        <div>Name: {room.name}</div>
                        <div>Description: {room.description}</div>
                        <div>Number Of Beds: {room.numberOfBeds}</div>
                        <div><img className='roomImg' src={room.images[0].txt}/></div>
                    </div>
                })}</div>
            </TabContainer>}

        </div>
    );
}

export default SimpleTabs;
