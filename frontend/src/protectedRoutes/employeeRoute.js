import { Route, Redirect } from "react-router-dom";

export const ProtectedRouteE = ({ component: Component, ...rest }) => {
  const current = localStorage.getItem("role");

  var Torender = Component;

  return (
    <Route
      {...rest}
      render={(props) =>
        current === "employee" ? (
          <Torender {...props} {...rest} />
        ) : (
          <Redirect to="/homepage" />
        )
      }
    />
  );
};
