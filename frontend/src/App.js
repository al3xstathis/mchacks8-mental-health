import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from "./pages/landing";
import Registration from "./pages/registration";
import Home from "./pages/home";
import Video from "./pages/video-chat";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path={'/registration'} component={Registration}/>
                    <Route path={'/home'} component={Home}/>
                    <Route path={'/video'} component={Video}/>
                    <Route component={Landing} />
                </Switch>
            </Router>
        </>

    );
}

export default App;
