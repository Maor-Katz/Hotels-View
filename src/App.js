import React from 'react';
import Hotelslist from './Hotelslist'
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    render() {
        return (
            <div className='App'>
                    <div>
                        <Hotelslist />
                    </div>
            </div>
        );
    }
}

export default App