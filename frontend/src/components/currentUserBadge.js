import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";

export const CurrentUserBadge = () => {
  const [currentUser, setcurrentUser] = useState();
  const [currentRole, setcurrentRole] = useState();
  const history = useHistory();
  useEffect(() => {
    setcurrentUser(localStorage.getItem("name"));
    setcurrentRole(localStorage.getItem("role"));
  }, []);

  const yourAccount = () => {
    currentRole === "employee"
      ? history.push("/employee")
      : history.push("/custodian");
  };

  const logOut = () => {
    history.push("/homepage");

    const removables = ["name", "email", "role"];

    removables.forEach((v) => localStorage.removeItem(v));
  };
  return (
    <>
      {currentUser !== null ? (
        <div className="badge">
          <img
            alt="user"
            src={require("../media/current-user.png").default}
            onClick={yourAccount}
            data-tip
            data-for="my-account"
            data-background-color="rgb(29, 59, 29)"
            data-type="dark"
            data-text-color="white"
          ></img>
          <ReactTooltip id="my-account" place="bottom" effect="solid">
            {"my account"}
          </ReactTooltip>
          <span>{currentUser}</span>
          <img
            alt="user"
            src={require("../media/logout.png").default}
            onClick={logOut}
            data-tip
            data-for="log-out"
            data-background-color="rgb(29, 59, 29)"
            data-type="dark"
            data-text-color="white"
          ></img>
          <ReactTooltip id="log-out" place="bottom" effect="solid">
            {"Logout"}
          </ReactTooltip>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
