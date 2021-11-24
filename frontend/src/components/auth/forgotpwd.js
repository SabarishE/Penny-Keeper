import { toast } from "react-toastify";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { useState } from "react";
import { useForm } from "react-hook-form";

import EmailIcon from "@material-ui/icons/Email";

export function Forgotpwd() {
  const { register, handleSubmit } = useForm();
  const [Load, setLoad] = useState(false);
  const baselink = window.location.origin + "/resetpwd";
  const afterForgotPwd = () => {
    toast("Verification link sent to email", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "Toaster",
      progressClassName: "Toaster-Progress"
    });
    setLoad(false);
  };

  const forgotpwdHandler = (v) => {
    setLoad(true);

    const data = {
      email: v.email,
      role: v.role,
      link: baselink
    };
    console.log("forgot password alert >>>", data);
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
    axios
      .post(
        "https://penny-keeper.herokuapp.com/workers/forgotpwd",
        data,
        options
      )
      .then((res) => {
        console.log("verification link sent !!!", res);
        afterForgotPwd();
      })
      .catch((err) => {
        console.log("Error in forgot password request", err);
        toast("Error in forgot password request", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "Toaster",
          progressClassName: "Toaster-Progress"
        });
        setLoad(false);
      });
  };

  return (
    <>
      <div className="password-change-container">
        <div className="auth-div">
          <div className="formDiv">
            FORGOT PASSWORD?{" "}
            <span className="loader-span">
              <HashLoader color={"white"} loading={Load} size={25} />
            </span>
            <br></br>
          </div>
          <form onSubmit={handleSubmit(forgotpwdHandler)}>
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
            <input type="submit" value="Send Email"></input>
          </form>
        </div>
      </div>
    </>
  );
}
