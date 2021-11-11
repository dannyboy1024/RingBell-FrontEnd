import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../styles/Home.css"

class Home extends React.Component {
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
                        <h1 className="home-head-1">EMPOWERCHANGE</h1>
                        <h1 className="home-subhead-1">You tell. We listen.</h1>
                    </div>

                    <div className="homeblock homeblock-2">
                        <h1 className="home-head-2">WHO ARE WE?</h1>
                        <h1 className="home-subhead-2">Our story</h1>
                        <div className="home-p-container">
                            <p className="home-p-1">
                                Empowerchange is a registered Non-for-profit corporation since July 2017,
                                we aim to promote mental health of Chinese international students.
                            </p>
                            <p className="home-p-1">
                                We have been providing peer-support and events to help students become aware
                                of their mental wellbeing and to live a quality life. We believe that the
                                development of one’s positive mental mindset is crucial in the community.
                                We have been passionate about the creation and application of new approaches
                                to resolve the potential roots of one’s mental health issues.
                            </p>
                            <p className="home-p-1">
                                Over the last three years, we cumulatively recruited over 80 volunteer listeners
                                and provided help for over 300 students at UTSG, UTM, UTSC and Western University.
                                According to our survey, 85% of the students we helped felt that our program was
                                very effective in promoting their mental wellbeing. We typically hold 5 workshops
                                and 3 signature events every year on various topics such as emotional regulation,
                                empathy, and critical thinking, with more than 600 attendees in total.
                            </p>
                            <p className="home-p-1">
                                We care about every student’s mental wellbeing, and we want every student to have
                                a healthy mental state while studying abroad. Therefore, we act to empower change!
                            </p>
                        </div>
                    </div>

                    <div className="homeblock homeblock-3">
                        <h1 className="home-head-3">OUR SERVICE</h1>
                        <h1 className="home-head-3 home-subhead-3"><FontAwesomeIcon icon={["far", "star"]} /></h1>
                        <div className="home-p-container">
                            <p className="home-p-1">
                                Providing in-person Impact listening services to help them share their vulnerabilities
                                and connect them with on and off-campus resources
                            </p>
                        </div>
                    </div>

                    <div className="homeblock homeblock-4">
                        <h1 className="home-head-4">OUR CORE VALUES</h1>
                        <div className="home-p-container">
                            <p className="home-p-1">
                                Embracing vulnerability, mutual help and growth, careful study, and sincerity.
                            </p>
                        </div>
                    </div>

                    <div className="homeblock homeblock-3" id="galary-block" ref={this.galary_ref}>
                        <div className="row row-cols-1 row-cols-3 g-3 home-p-container" id="galary-container">
                            <div className="col">
                                <div className="card galary-card">
                                    {/* <img src="..." className="card-img-top" alt="..."> */}
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card galary-card">
                                    {/* <img src="..." className="card-img-top" alt="..."> */}
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card galary-card">
                                    {/* <img src="..." className="card-img-top" alt="..."> */}
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card galary-card">
                                    {/* <img src="..." className="card-img-top" alt="..."> */}
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card galary-card">
                                    {/* <img src="..." className="card-img-top" alt="..."> */}
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card galary-card">
                                    {/* <img src="..." className="card-img-top" alt="..."> */}
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default Home;