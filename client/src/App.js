import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserForm from "./components/UserForm";
import Success from "./components/Success";

//Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <section className="container">
          <Switch>
            <Route exact path="/" component={UserForm} />
            <Route exact path="/success" component={Success} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
