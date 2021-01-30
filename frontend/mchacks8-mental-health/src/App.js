import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from "./pages/landing";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route component={Landing} />
                </Switch>
            </Router>
        </>

    );
}

export default App;
