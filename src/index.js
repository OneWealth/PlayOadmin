import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import Reducers from "./store/Reducers/Index";

import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { Route, BrowserRouter as Router } from "react-router-dom";

import AdminLogin from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import Menu from "./components/menu/menu";
import Venu from "./components/venues/venues";
import RightDashboard from "./components/rightdashboard/rightdashboard";
// import Product from "./components/product/product";
import Package from "./components/package/package";
import RightBar from "./components/rightbar/rightbar";
import Revenue from "./components/revenue/revenue";
import Profile from "./components/profile/profile";
import AddUser from "./components/adduser/adduser";
const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true,
            traceLimit: 25
        })) ||
    compose;

const store = createStore(Reducers, composeEnhancers(applyMiddleware(thunk)));

const routing = (
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={AdminLogin} />
                <Route path="/profile" component={Dashboard} />
                <Route path="/menu" component={Menu} />
                <Route path="/venu" component={Venu} />
                <Route path="/rightboard" component={RightDashboard} />
                {/* <Route path="/product" component={Product} /> */}
                <Route path="/package" component={Package} />
                <Route path="/rightbar" component={RightBar} />
                <Route path="/revenue" component={Revenue} />
                <Route path="/profilecomponent" component={Profile} />
                <Route path="/adduser" component={AddUser} />
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));

serviceWorker.unregister();
