import HttpsIcon from "@material-ui/icons/Https";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import { toast } from "react-toastify";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

export function Login() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [Load, setLoad] = useState(false);
  const afterLogin = (user) => {
    console.log("login success !!!", user);
    setLoad(false);
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
    localStorage.setItem("role", user.role);

    toast(`Welcome ${user.name}`, {
      position: toast.POSITION.BOTTOM_RIGHT
    });

    if (user.role === "employee") {
      return history.push("/employee");
    }
    return history.push("/custodian");
  };

  const loginHandler = (data, e) => {
    console.log("login alert", data);
    setLoad(true);
    e.target.reset();

    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };

    axios
      .post("https://penny-keeper.herokuapp.com/workers/login", data, options)
      .then((res) => {
        console.log("axios login success", res);
        afterLogin(res.data.data);
      })
      .catch((err) => {
        console.log("error in axios login", err);
        toast("Invalid credentials", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "Toaster",
          progressClassName: "Toaster-Progress"
        });
        setLoad(false);
      });
  };

  return (
    <>
      <div className="auth-div">
        <div className="formDiv">
          LOG IN{" "}
          <span className="loader-span">
            <HashLoader color={"white"} loading={Load} size={25} />
          </span>
        </div>
        <form onSubmit={handleSubmit(loginHandler)}>
          <label>
            <span>
              <AccountBoxIcon />
            </span>
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            id="email"
            autoComplete="off"
            required
          ></input>
          <label>
            <span>
              <HttpsIcon />
            </span>
            Password
          </label>
          <input type="password" {...register("password")} required></input>
          <label>
            {" "}
            <span>
              <img src={require("../../media/role.png").default} alt="role"></img>
            </span>
            Role
          </label>
          <select {...register("role")} required>
            <option value="employee">Employee</option>
            <option value="custodian">Custodian</option>
          </select>

          <input type="submit" value="Log In"></input>
        </form>
        <div className="loginFooter">
          {" "}
          <span>
            {" "}
            <Link
              to="/forgotpwd"
              style={{ textDecoration: "none", color: "white" }}
            >
              Forgot Password ?
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
