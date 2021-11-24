import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { useHistory } from "react-router-dom";


import HttpsIcon from "@material-ui/icons/Https";

export function Resetpwd({ popup, popupMsg, setLoading }) {
  var urlarr = window.location.href.split("/");
  const role = urlarr[urlarr.length - 3];
  const email = urlarr[urlarr.length - 2];
  const token = urlarr[urlarr.length - 1];
  const { register, handleSubmit } = useForm();
  const [Load, setLoad] = useState(false);
  const [rpLoad, setrpLoad] = useState(false);
  const [verified, setverified] = useState(false);
  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };

  // -----PASSWORD RESET REQUEST starts-----

  const history = useHistory();

  const afterResetPwd = () => {
    toast("Password changed successfully,Please log in", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "Toaster",
      progressClassName: "Toaster-Progress"
    });
    setrpLoad(false);
    history.push("/homepage");
  };

  const resetpwdHandler = (v) => {
    setrpLoad(true);

    const data = {
      pwd: v.pwd,
      confirmpwd: v.confirmpwd
    };
    console.log("reset password alert >>>", data);

    if (v.pwd !== v.confirmpwd) {
      toast("Passwords should match", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "Toaster",
        progressClassName: "Toaster-Progress"
      });
    } else {
      axios
        .post(
          `https://penny-keeper.herokuapp.com/workers/resetpwd/${role}/${email}/${token}`,
          data,
          options
        )
        .then((res) => {
          console.log("verification link sent !!!", res);
          afterResetPwd();
        })
        .catch((err) => {
          console.log("Error in forgot password request", err);
          toast("Error in forgot password request", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: "Toaster",
            progressClassName: "Toaster-Progress"
          });
          setrpLoad(false);
        });
    }
  };
  // -----PASSWORD RESET REQUEST ends-----

  // ------VERIFICATION OF LINK BEFORE PASSWORD RESET starts-----

  const afterVerification = () => {
    toast("Verification success,Please reset your password", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "Toaster",
      progressClassName: "Toaster-Progress"
    });
    setverified(true);
    setLoad(false);
  };

  const verifyLinkHandler = () => {
    setLoad(true);
    axios
      .get(
        `https://penny-keeper.herokuapp.com/workers/resetpwd/${role}/${email}/${token}`,

        options
      )
      .then((res) => {
        console.log("verification link sent !!!", res);
        afterVerification();
      })
      .catch((err) => {
        console.log("Error in verification of user", err);
        toast("Error in verification of user", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "Toaster",
          progressClassName: "Toaster-Progress"
        });
        setLoad(false);
      });
  };

  // ------VERIFICATION OF LINK BEFORE PASSWORD RESET ends-----

  return (
    <>
      <div className="password-change-container">
        {!verified ? (
          <div className="verify-div">
            <h2>
              Click to verify{" "}
              <span className="loader-span">
                <HashLoader color={"white"} loading={Load} size={25} />
              </span>
            </h2>
            <button onClick={verifyLinkHandler}>Verify</button>
          </div>
        ) : (
          <div className="auth-div">
            <div className="formDiv">
              RESET PASSWORD
              <span className="loader-span">
                <HashLoader color={"white"} loading={rpLoad} size={25} />
              </span>
            </div>
            <form onSubmit={handleSubmit(resetpwdHandler)}>
              <label>
                {" "}
                <span>
                  <HttpsIcon />
                </span>
                Password
              </label>
              <input type="password" {...register("pwd")}></input>
              <label>
                {" "}
                <span>
                  <HttpsIcon />
                </span>
                Confirm Password
              </label>
              <input type="password" {...register("confirmpwd")}></input>
              <input type="submit" value="Reset Password"></input>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
