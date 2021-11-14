import React, { Redirect, Component } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Badge, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../styles/Home.css"
import "../styles/Galary.css"
import Galary from '../components/Galary/Galary.jsx';
import { HomeSection_1, HomeSection_2, HomeSection_3, HomeSection_4 } from '../components/HomeSections/HomeSections';
// import HomeSection_2 from '../components/HomeSections/HomeSection_2';

class Home extends Component {
    constructor(props) {
        super(props)
        this.galary_ref = React.createRef()
    }

    componentDidMount() {
        const { position } = this.props.match.params;
        if (position === "Galary") {
            this.galary_ref.current.scrollIntoView()
        };
    }


    render() {
        return (
            <div>
                <div className="homeblock-container">

                    <div className="homeblock homeblock-1">
                        <HomeSection_1 />
                    </div>

                    <div className="homeblock homeblock-2">
                        <HomeSection_2 />
                    </div>

                    <div className="homeblock homeblock-3">
                        <HomeSection_3 />
                    </div>

                    <div className="homeblock homeblock-4">
                        <HomeSection_4 />
                    </div>

                    <div className="homeblock homeblock-3" id="galary-block" ref={this.galary_ref}>
                        <Galary />
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;