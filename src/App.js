import React, { Component } from "react";
import HomePage from "./components/HomePage/HomePage";
import Itemsholder from "./containers/ItemsHolder/Itemsholder";
import ItemBuilder from "./containers/ItemBuilder/ItemBuilder";
import ItemUpdate from "./containers/ItemUpdate/ItemUpdate";
import RegistrationPage from "./containers/Auth/RegistrationPage/RegistrationPage";
import MyProfile from "../src/components/MyProfilePage/MyProfilePage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";

// Routing;
import { Route, Switch } from "react-router-dom";

// Auth;
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import ScrollRestoration from "react-scroll-restoration";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ScrollRestoration />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/:previous/new-trip"
            component={() => (
              <div
                style={{
                  height: "100vh",
                  padding: "3rem",
                  textAlign: "center",
                  margin: "10rem 0",
                }}
              >
                <FontAwesomeIcon
                  icon={faCompass}
                  style={{
                    fontSize: "4rem",
                    margin: "1rem 0",
                    color: "grey",
                    opacity: "0.8",
                  }}
                />
                <h1
                  style={{
                    fontSize: "2rem",
                    margin: "1rem 0",
                    color: "grey",
                    opacity: "0.8",
                  }}
                >
                  Page under construction
                </h1>
              </div>
            )}
          />
          <Route
            path="/about-us"
            component={() => (
              <div
                style={{
                  height: "100vh",
                  padding: "3rem",
                  textAlign: "center",
                  margin: "10rem 0",
                }}
              >
                <FontAwesomeIcon
                  icon={faCompass}
                  style={{
                    fontSize: "4rem",
                    margin: "1rem 0",
                    color: "grey",
                    opacity: "0.8",
                  }}
                />
                <h1
                  style={{
                    fontSize: "2rem",
                    margin: "1rem 0",
                    color: "grey",
                    opacity: "0.8",
                  }}
                >
                  Page under construction
                </h1>
              </div>
            )}
          />
          <Route path="/:previous/update" component={ItemUpdate} />
          <Route path="/:previous/add-new" component={ItemBuilder} />
          <Route path="/logout" component={Logout} />
          <Route path="/sign-up" component={RegistrationPage} />
          <Route path="/login" component={Auth} />
          <Route path="/my-profile" component={MyProfile} />
          <Route path="/discover" component={Itemsholder} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
