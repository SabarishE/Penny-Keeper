import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";

export function EmployeeDashboard({ Transaction, Refresh }) {
  const [Load, setLoad] = useState(false);
  return (
    <>
      <div className="employee-dashboard">
        {/* ---employee idenntification--- */}
        <div className="employee-info">
          <EmployeeInfo Transaction={Transaction} Refresh={Refresh} />
        </div>

        {/* ---employee fund request form--- */}
        <div className="request-form">
          <div className="form-head">
            <span>Request for Fund </span>
            <span>
              {" "}
              <HashLoader color={"white"} loading={Load} size={25} />
            </span>
          </div>
          <RequestForm Refresh={Refresh} setLoad={setLoad} />
        </div>
      </div>
    </>
  );
}

function EmployeeInfo({ Transaction, Refresh }) {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  console.log("transation", Transaction);
  useEffect(() => {
    Refresh();
  }, [Refresh]);

  const pendingbill = Transaction.filter((v) => v.bill === false);
  const pendingapproval = Transaction.filter((v) => v.approved === false);

  return (
    <>
      <div className="employee-id">
        <div>
          <img
            src={require("../../media/employee128.png").default}
            alt="employee-pic"
          ></img>
        </div>
        <div className="e-details">
          <span className="e-name">{name}</span>
          <span className="e-email">{email}</span>
        </div>
      </div>
      {/* ---employee funds data--- */}
      <div className="employee-data">
        <div className="data-box">
          <div>Total Receipt</div>
          <span>{Transaction.length}</span>
        </div>
        <div className="data-box">
          <div>Pending bill submissions</div>
          <span>{pendingbill.length}</span>
        </div>
        <div className="data-box">
          {" "}
          <div>Pending Approvals </div>
          <span>{pendingapproval.length}</span>
        </div>
      </div>
    </>
  );
}

function RequestForm({ Refresh, setLoad }) {
  const [Custodians, setCustodians] = useState([]);

  useEffect(() => {
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
    // ---request to get available custodian---
    axios
      .get("https://penny-keeper.herokuapp.com/workers/allcustodians", options)
      .then((res) => {
        console.log("custodians retreived");
        setCustodians(res.data.data);
      })
      .catch((err) => console.log("error in retreiving custodians", err));
  }, []);

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required()
      .typeError("Amount must be a number")

      .positive("only positive value")
      .integer("only integer value")
      .min(1)
      .max(20),

    from: Yup.string().required("Please Enter Your Username"),
    to: Yup.string().required("Please Select Cusdodian"),
    description: Yup.string().required("Please Enter Description").max(30)
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) });

  const afterFundRequest = () => {
    toast("Fund request submitted", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    Refresh();
    setLoad(false);
  };

  const requestFundHandler = (data) => {
    console.log("request fund alert !!!", data);
    reset();
    setLoad(true);

    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };

    axios
      .post(
        "https://penny-keeper.herokuapp.com/transactions/request-fund",
        data,
        options
      )
      .then((res) => {
        console.log("fund request success", res);
        afterFundRequest();
      })
      .catch((err) => {
        console.log("error in fund request", err);
        toast("Error in fund request", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        setLoad(false);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(requestFundHandler)}>
        <div>
          <label>Amount</label>
          <input type="number" {...register("amount")} />
          {errors.amount && (
            <span className="custom-error">
              <img src={require("../../media/alert.png").default} alt="alert"></img>{" "}
              {errors.amount.message}{" "}
            </span>
          )}
        </div>
        <div>
          <label>Your Username</label>
          <input type="text" {...register("to")} />
          {errors.from && (
            <span className="custom-error">
              <img src={require("../../media/alert.png").default} alt="alert"></img>{" "}
              {errors.from.message}{" "}
            </span>
          )}
        </div>
        <div>
          <label>Custodian Name</label>
          <select {...register("from")}>
            {Custodians.map((v) => {
              return (
                <option value={v.name} key={v.name}>
                  {v.name}
                </option>
              );
            })}
          </select>
          {errors.to && (
            <span className="custom-error">
              <img src={require("../../media/alert.png").default} alt="alert"></img>{" "}
              {errors.to.message}{" "}
            </span>
          )}
        </div>
        <div>
          <label>Description</label>
          <textarea {...register("description")}></textarea>
          {errors.description && (
            <span className="custom-error">
              <img src={require("../../media/alert.png").default} alt="alert"></img>{" "}
              {errors.description.message}{" "}
            </span>
          )}
        </div>

        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
