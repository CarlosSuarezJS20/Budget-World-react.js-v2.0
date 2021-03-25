import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import classes from "./NavigationItem.css";

const navigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        className={props.signUp ? props.signupClassName : classes.LoggedIn}
        to={{
          pathname: props.addNew ? props.match.url + props.link : props.link,
        }}
        exact={props.exact}
        activeClassName={classes.active}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default withRouter(navigationItem);
