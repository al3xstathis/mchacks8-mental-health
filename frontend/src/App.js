import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from "./pages/landing";
import Registration from "./pages/registration";
import Home from "./pages/home";
import Video from "./pages/video-chat";
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute.js';

function App() {
    return (
        <>
            <AuthProvider>
                <Router>
                    <Switch>
                        <Route path={'/registration'} component={Registration} />
                        <PrivateRoute path={'/home'} component={Home} />
                        <PrivateRoute path={'/video'} component={Video} />
                        <PrivateRoute component={Landing} />
                    </Switch>
                </Router>
            </AuthProvider>
        </>

    );
}

export default App;
