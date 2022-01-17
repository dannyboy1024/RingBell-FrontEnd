import './App.css';
import React, { Component, Fragment } from 'react';
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/common_components/Navbar.jsx";

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


const renderBookingRoute = () => {
  return (window.sessionStorage.getItem('userInfo')
    ? <Route path="/UserInfo" component={BookingInfo} />
    : <Route path="/UserInfo" component={UserInfo} />);
}

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="">
          <NavBar />
          <Switch>
            {renderBookingRoute()}
            <Route path="/Calendar" component={Calendar} />
            <Route path="/About" component={About} />
            <Route path="/Disclaimer" component={Disclaimer} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={RegisterInfo} />
            <Route path="/RegisterSuccess" component={RegisterSuccess} />
            <Route path="/:position" component={Home} />
            <Route path="/" component={Home} />
            {/* <Calendar/> */}
          </Switch>
        </div>
      </Fragment>
    )
  }
}

export default App;
