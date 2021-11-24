import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
          ></img>
          <span>{currentUser}</span>
          <img
            alt="user"
            src={require("../media/logout.png").default}
            onClick={logOut}
          ></img>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
