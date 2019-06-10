import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import SimpleTabs from "./SimpleTabs";

export class HotelDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {hotelDetails, goToHompage, changeHotelsList} = this.props
        return <div className='hotelDetails'>
            <span className='backHomepage'> <Button variant="contained" size="medium" color="primary" onClick={() => goToHompage()}>
          Back To Homepage
        </Button></span>
            <SimpleTabs hotelDetails={hotelDetails} changeHotelsList={changeHotelsList}/>
        </div>
    }
}

export default HotelDetails