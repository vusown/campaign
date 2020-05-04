import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Main from './view/main';
import "./assets/sass/main.scss";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Main} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

