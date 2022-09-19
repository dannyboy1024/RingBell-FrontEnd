import React, { Redirect, Component } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Badge, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../styles/Home.css"
import "../styles/Galary.css"
import Galary from '../components/Galary/Galary.jsx';
import Footer from "../components/footer.jsx";
import { HomeSection_1, HomeSection_1_5, HomeSection_2, HomeSection_3, HomeSection_4, Sponsorship} from '../components/HomeSections/HomeSections';
// import HomeSection_2 from '../components/HomeSections/HomeSection_2';

class Home extends Component {
    constructor(props) {
        super(props)
        this.galary_ref = React.createRef()
        this.sponsorship_ref = React.createRef()
        this.service_ref = React.createRef()
    }

    componentDidMount() {
        const { position } = this.props.match.params;
        console.log('position', position)
        if (position === "Galary") {
            this.galary_ref.current.scrollIntoView()
        } else if (position === "Sponsorship") {
            this.sponsorship_ref.current.scrollIntoView()
        } else if (position === "Service") {
            this.service_ref.current.scrollIntoView()
        }
    }

    componentDidUpdate() {
        const { position } = this.props.match.params;
        console.log('position', position)
        if (position === "Galary") {
            this.galary_ref.current.scrollIntoView()
        } else if (position === "Sponsorship") {
            this.sponsorship_ref.current.scrollIntoView()
        } else if (position === "Service") {
            this.service_ref.current.scrollIntoView()
        }
    }


    render() {
        return (
            <div>
                <div className="homeblock-container">

                    <div className="homeblock homeblock-1">
                        <HomeSection_1 />
                    </div>

                    <div className="homeblock homeblock-3" ref={this.service_ref}>
                        <HomeSection_3 />
                    </div>

                    <div className="homeblock homeblock-4">
                        <HomeSection_4 />
                    </div>

                    <div className="homeblock homeblock-5" id="galary-block" ref={this.galary_ref}>
                        <Galary />
                        <div ref={this.sponsorship_ref}>
                            <Sponsorship />
                        </div>
                        <div className="footer-block">
                            <Footer />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default Home;