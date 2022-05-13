import './App.css';
import React, { Component, Fragment } from 'react';
// import { Route, Switch, NavLink, HashRouter} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from "react-router-dom";
import NavBar from "./components/common_components/Navbar.jsx";
import ScrollToTop from "./components/common_components/ScrollToTop.jsx";

// Pages
// import Main from './pages/Main'
// import UserInfo from './pages/UserInfo'
import Calendar from './pages/Calendar'
import UserInfo from './components/UserInfoForms/UserInfo'
import BookingInfo from './components/UserInfoForms/BookingInfo'

import Home from './pages/Home'
import About from './pages/About'
import Disclaimer from './pages/Disclaimer';
import Login from './components/Authentication/Login';
import RegisterInfo from './components/UserInfoForms/RegisterInfo';
import RegisterSuccess from './components/Authentication/RegisterSuccess';
import RegisterFail from './components/Authentication/RegisterFail';

const renderBookingRoute = () => {
  return (window.sessionStorage.getItem('userInfo')
    ? <Route path="/UserInfo" component={BookingInfo} />
    : <Route path="/UserInfo" component={UserInfo} />);
}

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <div className="">
            <NavBar />
            <ScrollToTop />
            <Switch>
              {renderBookingRoute()}
              <Route path="/Calendar" component={Calendar} />
              <Route path="/About" component={About} />
              <Route path="/Disclaimer" component={Disclaimer} />
              <Route path="/Login" component={Login} />
              <Route path="/Register" component={RegisterInfo} />
              <Route path="/RegisterSuccess" component={RegisterSuccess} />
              <Route path="/RegisterFail" component={RegisterFail} />
              <Route path="/:position" component={Home} />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default App;
