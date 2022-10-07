import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../Services/authService";

const CoachRoute = ({ component: Component, render, ...rest }) => {
  const currentUser = auth.getCurrentUser();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser && currentUser.role === "joueur") {
          return Component ? <Component {...props} /> : render(props);
        }
        return (
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default CoachRoute;
