import React from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import { Home } from '../page/Home';
import { Master } from '../page/Master';
import { Master2 } from '../page/Master2';
import { Master3 } from '../page/Master3';
import { Master4 } from '../page/Master4';
import { Master5 } from '../page/Master5';
import { Master6 } from '../page/Master6';
import { ShowProject } from '../page/ShowProject';
import { DetailProject } from '../page/DetailProject';
import { Login } from './Login';

const Loginpage = () => (
  <Login />
);

const Homepage = () => (
  <Home />
);

const Showproject = () => (
  <ShowProject />
);

const Detailproject = ({ match }) => (
  <DetailProject id={match.params.id}/>
);

const Masterpage = () => (
  <Master />
);

const Masterpage2 = () => (
  <Master2 />
);

const Masterpage3 = () => (
  <Master3 />
);

const Masterpage4 = () => (
  <Master4 />
);

const Masterpage5 = () => (
  <Master5 />
);

const Masterpage6 = () => (
  <Master6 />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};


export class RoutePage extends React.Component {
  render(){
    return (
      <Router>
        <main role="main">
          <Route exact path="/showproject" component={Homepage} />
          <Route path="/detailproject/:id" exact component={Detailproject} />
          <PrivateRoute exact path="/" component={Showproject} />
          <Route path="/login" component={Loginpage} />
          <Route path="/master" component={Masterpage} />
          <Route path="/master2" component={Masterpage2} />
          <Route path="/master3" component={Masterpage3} />
          <Route path="/master4" component={Masterpage4} />
          <Route path="/master5" component={Masterpage5} />
          <Route path="/master6" component={Masterpage6} />
        </main>
      </Router>
    );
  }
}
