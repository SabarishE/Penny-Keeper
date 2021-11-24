import { Route, Redirect } from "react-router-dom";

export const ProtectedRouteC = ({ component: Component, ...rest }) => {
  const current = localStorage.getItem("role");

  var Torender = Component;

  return (
    <Route
      {...rest}
      render={(props) =>
        current === "custodian" ? (
          <Torender {...props} {...rest} />
        ) : (
          <Redirect to="/homepage" />
        )
      }
    />
  );
};
