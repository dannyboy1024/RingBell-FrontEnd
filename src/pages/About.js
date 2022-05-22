import React, { Redirect, Component } from 'react';
import "../styles/About.css"
import "../styles/Home.css"
import "../styles/Galary.css"
import AboutGalary from '../components/AboutSections/AboutGalary.jsx';
import Footer from "../components/footer.jsx";
import { HomeSection_2} from '../components/HomeSections/HomeSections';

class About extends Component {
    constructor(props) {
        super(props)
        // this.galary_ref = React.createRef()
    }

    componentDidMount() {
        // const { position } = this.props.match.params;
        // if (position === "Galary") {
        //     this.galary_ref.current.scrollIntoView()
        // };
    }


    render() {
        return (    
            <div className="homeblock-container">
                <div className="homeblock homeblock-3" id="galary-block">
                    <div className="homeblock homeblock-2">
                        <HomeSection_2 />
                    </div>
                    <div className="bottom-block">
                        <h1 className="team-head-1">Our Team</h1>
                        <AboutGalary />
                    </div>
                    <div className="about-footer-block">
                        <Footer />
                    </div>
                </div>
            </div>

        );
    }
}

export default About;