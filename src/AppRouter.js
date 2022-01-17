import React from "react";
import { BrowserRouter as Router, Switch , Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Login from "./Login";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import SignUp from "./SignUp";

function CopyRight() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"CopyRight ⓒ "}
            fsoftwareengineer, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

class AppRouter extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/login">
                                <Login/>
                            </Route>
                            <Route path="/signup">
                                <SignUp/>
                            </Route>
                            <Route path="/">
                                <App/>
                            </Route>
                        </Switch>
                    </div>
                    <Box mt={5}>
                        <CopyRight/>
                    </Box>
                </Router>
            </div>
        );
    }
}

export default AppRouter;