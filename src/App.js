import './App.css';
import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";

// Pages
// import Main from './pages/Main'
// import UserInfo from './pages/UserInfo'
import Calendar from './pages/Calendar'
import UserInfo from './pages/UserInfo'

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="">
          <Switch>
            {/* <Route path="/Main" component={Main} /> */}
            <Route path="/UserInfo" component={UserInfo} />
            <Route path="/Calendar" component={Calendar} />
            
            {/* <Calendar/> */}
          </Switch>
        </div>
      </Fragment>
    )
  }
}

export default App;
