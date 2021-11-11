import './App.css';
import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import NavBar from "./components/Navbar.jsx";

// Pages
// import Main from './pages/Main'
// import UserInfo from './pages/UserInfo'
import Calendar from './pages/Calendar'
import UserInfo from './pages/UserInfo'
import Home from './pages/Home'

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="">
        <NavBar />
          <Switch>
            {/* <Route path="/Main" component={Main} /> */}
            <Route path="/UserInfo" component={UserInfo} />
            <Route path="/Calendar" component={Calendar} />
            <Route path="/:position" component={Home} />
            <Route path="/" component={Home}/>
            
            {/* <Calendar/> */}
          </Switch>
        </div>
      </Fragment>
    )
  }
}

export default App;
