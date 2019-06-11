import React from 'react';
import HotelDetails from './HotelDetails'
import VisitedComp from './VisitedComp'
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';

export class Hotelslist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: [],
            hotelsBackup: [],
            hotelDetails: {},
            hotelList: true,
            hotelsInCache: JSON.parse(localStorage.getItem("hotels")) || []
        }
    }

    goToHompage = () => {
        this.setState({hotelList: true, hotelDetails: {}})
    }

    fillHotelDetails = (hotel, index) => {
        let {hotelsInCache} = this.state
        if (hotelsInCache.length > 5)
            hotelsInCache.shift();
        hotel['date'] = new Date().toLocaleString();
        hotelsInCache.push(hotel)
        localStorage.setItem("hotels", JSON.stringify(hotelsInCache));
        this.setState({hotelDetails: hotel, hotelList: false, hotelsInCache})
    }

    changeHotelsList = (hotelDetails) => {
        let {hotels} = this.state;
        let newHotels = hotels.map(hotel => {
            if (hotel._id === hotelDetails._id) {
                hotel = hotelDetails
            }
            return hotel
        })
        this.setState({hotels: newHotels})
    }

    onTypeBrand = (e) => {
        const regex = new RegExp(e.target.value, 'gi')
        const {hotelsBackup} = this.state;
        const afterFilterList = hotelsBackup.filter(hotel => {
            if (hotel.details.brand.txt.match(regex)) {
                return true;
            }
            else {
                return false;
            }
        })
        this.setState({hotels: afterFilterList})
    }

    onTypeName = (e) => {
        const regex = new RegExp(e.target.value, 'gi')
        const {hotelsBackup} = this.state;
        const afterFilterList = hotelsBackup.filter(hotel => {
            if (hotel.name.match(regex)) {
                return true;
            }
            else {
                return false;
            }
        })
        this.setState({hotels: afterFilterList})
    }

    componentDidMount() {
        const {hotels} = this.state
        fetch('./hotels.json')
            .then(res => res.json())
            .then(json => {
                const x = hotels.concat(json);
                x.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));// sort by name
                this.setState({
                    hotels: x,
                    hotelsBackup: x
                })
            });
    };


    render() {
        const {hotels, hotelList, hotelDetails, hotelsInCache} = this.state;
        return <div>
            {hotelList ? <div className='hotelList'>
                    <div className='knockout'>hotels list</div>
                    <div>
                            <span className='filterField'><Input
                                onChange={(e) => this.onTypeBrand(e)}
                                placeholder="Search by Brand... "
                            /></span>
                        <span className='filterField'><Input
                            onChange={(e) => this.onTypeName(e)}
                            placeholder="Search by Name... "
                        /></span>
                    </div>
                    <div className='homePage'>
                        <div className='visitedHotels'>
                            <div className='visitedTitle'> Recently visited</div>
                            <div className='visitedComp'>
                                <VisitedComp hotelsInCache={hotelsInCache}/>
                            </div>
                        </div>
                        <div className="theList">

                            <div className='hotelsTitle'>
                                <div className='nameTitle'>Hotel Name</div>
                                <div className='imageTitle'>Hotel Image</div>
                                <div className='cityTitle'>Hotel City</div>
                                <div className='brandTitle'>Hotel Brand</div>
                                <div className='starTitle'>Star Rating</div>
                                <div className='editTitle'>Edit</div>
                            </div>
                            {hotels && hotels.map((hotel, index) => {
                                return <div className='hotelLine'>
                                    <div className='name'>{hotel.name}</div>
                                    <div className='image'><img src={hotel.images[0].url} className='imageHotel'/></div>
                                    <div className='city'>{hotel.address.city}</div>
                                    <div className='brand'> {hotel.details.brand.txt} </div>
                                    <div className='star'> {hotel.details.starRating.txt} </div>
                                    <div className='edit'><Fab color="primary" aria-label="Edit"
                                                               onClick={() => this.fillHotelDetails(hotel, index)}>
                                        <Icon>edit_icon</Icon>
                                    </Fab></div>
                                </div>
                            })}
                        </div>
                    </div>
                </div> :
                <HotelDetails hotelDetails={hotelDetails} changeHotelsList={this.changeHotelsList}
                              goToHompage={this.goToHompage}/>

            }</div>

    }
}

export default Hotelslist