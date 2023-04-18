import React, {useState} from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

// <></> Fragment :  <div>또는 <span>등에 넣기 싫을 때, 부모요소가 없고, 많은 요소들을 render할 떄 사용
// switch =  V6 이후 Routes
const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return(
        <Router>
            <Switch>
                {isLoggedIn ? (
                        <>
                            <Route exact path={"/"}>
                                <Home />
                            </Route>
                        </>
                    ) : (
                        <Route exact path={"/"}>
                            <Auth />
                        </Route>
                )}
            </Switch>
        </Router>
    )
};

export default AppRouter;