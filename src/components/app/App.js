import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import connection from '../../data/connection';
import Login from '../login/login';
import UserHome from '../userHome/userHome';
import CreateAccount from '../createAccount/createAccount';
import UserInfo from '../userInfo/userInfo';
import TradeHistory from '../tradeHistory/tradeHistory';
import GiveAways from '../giveAways/giveAways';
import SearchListings from '../searchListings/searchListings';
import './App.scss';

const PublicRoute = ({ component: Component, loginStatus, ...rest }) => {
  const routeChecker = props => (loginStatus === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } } } />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, loginStatus, ...rest }) => {
  const routeChecker = props => (loginStatus === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/login', state: { from: props.location } } } />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    loginStatus: false,
    pendingUser: true,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loginStatus: true,
          pendingUser: false,
        });
      } else {
        this.setState({
          loginStatus: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <Switch>
              <PrivateRoute path='/' exact component={UserHome} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/home' component={UserHome} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/userInfo' component={UserInfo} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/tradeHistory' component={TradeHistory} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/giveaways' component={GiveAways} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/search' component={SearchListings} loginStatus={this.state.loginStatus}/>
              <PublicRoute path='/login' component={Login} loginStatus={this.state.loginStatus}/>
              <PublicRoute path='/createAccount' component={CreateAccount} loginStatus={this.state.loginStatus}/>
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
