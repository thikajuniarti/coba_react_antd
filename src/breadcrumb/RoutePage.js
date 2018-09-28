import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from '../page/Home';
import { Master } from '../page/Master';
import { Master2 } from '../page/Master2';
import { Master3 } from '../page/Master3';
import { Master4 } from '../page/Master4';
import { Master5 } from '../page/Master5';

const Homepage = () => (
  <Home />
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

export class RoutePage extends React.Component {
  render(){
    return (
      <Router>
        <main role="main">
          <Route exact path="/" component={Homepage} />
          <Route path="/master" component={Masterpage} />
          <Route path="/master2" component={Masterpage2} />
          <Route path="/master3" component={Masterpage3} />
          <Route path="/master4" component={Masterpage4} />
          <Route path="/master5" component={Masterpage5} />
        </main>
      </Router>
    );
  }
}
