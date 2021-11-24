import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

import HashLoader from "react-spinners/HashLoader";
export function EmployeePendingBills({ Refresh, Transaction }) {
  // fetch for submitting bills
  const [Load, setLoad] = useState(false);

  const afterBillSubmission = () => {
    toast("Bill Submitted successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,

    });
    Refresh();
    setLoad(false);
  };

  const submitBillHandler = (e) => {
    setLoad(true);
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
    const data = { id: e.target.value };

    console.log("bill for submission alert", data);
    axios
      .patch(
        "https://penny-keeper.herokuapp.com/transactions/submit-bill",
        data,
        options
      )
      .then((res) => {
        console.log("bill submitted successfully", res);
        afterBillSubmission();
      })
      .catch((err) => {
        console.log("error in submitting bill", err);
        toast("error in submitting bill", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        setLoad(false);
      });
  };

  const pendingBills = Transaction.filter((v) => v.bill === false);

  return (
    <>
      <div className="employee-pendingbills">
        <h1>
          Pending bills{" "}
          <span>
            <HashLoader color={"green"} loading={Load} size={25} />
          </span>
        </h1>
        {pendingBills.length === 0 ? (
          <div className="no-transactions">
            <h2> No pending bills</h2>
            <img
              alt="pending bill"
              src={require("../../media/pendingbill.png").default}
            ></img>
          </div>
        ) : (
          pendingBills.map((v) => {
            return (
              <div className="pendingbills-flex" key={v._id}>
                <div className="card">
                  <div className="card-1">
                    <span>
                      <span>Transaction id :</span> {v._id}
                    </span>
                    <span>
                      <span>Fund approved by :</span> {v.from}
                    </span>
                    <span>
                      <span>Fund requested on :</span>{" "}
                      {new Date(v.date).toDateString()}
                    </span>
                    <span>
                      <span>Bill amount:</span> ${v.amount}
                    </span>
                  </div>
                  <div className="card-2">
                    <button value={v._id} onClick={submitBillHandler}>
                      Submit Bill
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
