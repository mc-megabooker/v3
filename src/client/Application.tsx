
import React from 'react';
import {
    Route,
    Switch,
    BrowserRouter
  } from 'react-router-dom';
import routes from './routes';
import history from './history';

export interface IApplicationProps { }

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    return (
        <div>
            <BrowserRouter history={history}>
                <Switch>
                    {routes.map((route) => {
                        const { path } = route;
                        return <Route key={path} {...route} />
                    })}
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default Application;