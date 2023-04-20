import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

// <></> Fragment :  <div>또는 <span>등에 넣기 싫을 때, 부모요소가 없고, 많은 요소들을 render할 떄 사용
// switch =  V6 이후 Routes
const AppRouter = ({ refreshUser, isLoggedIn, userObject }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObject={userObject} />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path={"/"}>
                            <Home userObject={userObject} />
                        </Route>
                        <Route exact path={"/profile"}>
                            <Profile userObject={userObject} refreshUser={refreshUser} />
                        </Route>
                        {/*<Redirect from={"*"} to={"/"} />*/}
                    </>
                ) : (
                    <>
                        <Route exact path={"/"}>
                            <Auth />
                        </Route>
                        {/*<Redirect from={"*"} to={"/"} />*/}
                    </>
                    )
                }
            </Switch>
        </Router>
    );
};

export default AppRouter;