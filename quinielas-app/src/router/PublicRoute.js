import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
    console.log(rest);
  return (
    <div>
      <Route
        {...rest}
        component={(props) =>
          !isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/adminDashboard" />
          )
        }
      />
    </div>
  );
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
