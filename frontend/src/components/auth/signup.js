import { useForm } from "react-hook-form";

import axios from "axios";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HttpsIcon from "@material-ui/icons/Https";
import EmailIcon from "@material-ui/icons/Email";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
export function Signup() {
  const [Load, setLoad] = useState(false);
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const afterSignup = (newuser) => {
    console.log("sign up success", newuser);
    setLoad(false);

    history.push("/login");

    toast("Registration success, Please log in ", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const signupHandler = (data, e) => {
    console.log("signup alert !!!", data);
    setLoad(true);
    e.target.reset();
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post("https://penny-keeper.herokuapp.com/workers/signup", data, options)
      .then((res) => {
        console.log("axios login signup", res);
        afterSignup(res);
      })
      .catch((err) => {
        console.log("error in axios login", err);
        toast("Error in registration", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "Toaster",
          progressClassName: "Toaster-Progress",
        });
        setLoad(false);
      });
  };

  return (
    <>
      <div className="auth-div">
        <div className="formDiv">
          REGISTER{" "}
          <span className="loader-span">
            <HashLoader color={"white"} loading={Load} size={25} />
          </span>
        </div>
        <form onSubmit={handleSubmit(signupHandler)}>
          <label>
            <span>
              <AccountBoxIcon />
            </span>
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            autoComplete="off"
            required
          ></input>
          <label>
            {" "}
            <span>
              <EmailIcon />
            </span>
            Email
          </label>
          <input
            type="email"
            {...register("email")}
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
            <span>
              <img
                src={require("../../media/role.png").default}
                alt="role"
              ></img>
            </span>
            Role
          </label>
          <select {...register("role")} required>
            <option value="employee">Employee</option>
            <option value="custodian">Custodian</option>
          </select>

          <input type="submit" value="Sign Up"></input>
        </form>
        <div className="loginFooter">
          {" "}
          <span>
            {" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Log in
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
