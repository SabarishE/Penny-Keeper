import { toast } from "react-toastify";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { useState } from "react";
export function CustodianApproveFunds({
  Transaction,
  Refresh,
  name,
  custodianRefresh,
  custodian
}) {
  const [rLoad, setrLoad] = useState(false);
  const [aLoad, setaLoad] = useState(false);

  const pendingapproval = Transaction.filter(
    (v) => v.approved === false && v.from === name
  );

  const afterFundApproval = () => {
    toast("Fund Approved", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "Toaster",
      progressClassName: "Toaster-Progress"
    });
    Refresh();
    custodianRefresh();
    setaLoad(false);
  };

  const approveFundHandler = (e) => {
    setaLoad(true);
    console.log("fund approval alert >>>", e.target.value);
    const d = pendingapproval.filter((v) => v._id === e.target.value)[0];
    const data = {
      id: d._id,
      custodian: d.from,
      amount: d.amount
    };
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
    // console.log(data);
    axios
      .patch(
        "https://penny-keeper.herokuapp.com/transactions/approve-fund",
        data,
        options
      )
      .then((res) => {
        console.log("fund approved successfully", res);
        afterFundApproval();
      })
      .catch((err) => {
        console.log("Error in fund approval", err);
        toast("Error in fund approval", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "Toaster",
          progressClassName: "Toaster-Progress"
        });
        setaLoad(false);
      });
  };

  // -------fund replenishment request----

  const afterFundReplenishment = () => {
    toast("Fund Relenishment success", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    custodianRefresh();
    setrLoad(false);
  };

  const replenishHandler = () => {
    setrLoad(true);
    const d = custodian;
    const data = {
      name: d.name,
      remaining: custodian.fundinbox,
      replenishment: custodian.initialfund - custodian.fundinbox
    };
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };

    console.log("replenishment alert >>", data);

    axios
      .patch(
        "https://penny-keeper.herokuapp.com/workers/replenish-fund",
        data,
        options
      )
      .then((res) => {
        console.log("Fund replenishned successfully", res);
        afterFundReplenishment();
      })
      .catch((err) => {
        console.log("Error in fund replenishment", err);
        toast("Error in fund replenishment", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "Toaster",
          progressClassName: "Toaster-Progress"
        });
        setrLoad(false);
      });
  };

  return (
    <>
      <div className="custodian-pendingrequests">
        <h1>
          Fund Requests{" "}
          <span>
            {" "}
            <HashLoader color={"white"} loading={aLoad} size={25} />
          </span>
        </h1>

        {pendingapproval.length <= 0 ? (
          <div>
            <h2>
              {" "}
              No pending fund requests{" "}
              <img
                alt="pending bill"
                src={require("../../media/pendingrequest.png").default}
              ></img>
            </h2>
          </div>
        ) : (
          pendingapproval.map((v) => {
            return (
              <div className="pendingrequests-flex" key={v._id}>
                <div className="card">
                  <div className="card-1">
                    <span>
                      <span>Transaction id :</span> {v._id}
                    </span>
                    <span>
                      <span>Fund requested by :</span> {v.to}
                    </span>
                    <span>
                      <span>Fund received on :</span>{" "}
                      {new Date(v.date).toDateString()}
                    </span>
                    <span>
                      <span>Bill amount:</span> ${v.amount}
                    </span>
                  </div>
                  <div className="card-2">
                    <button value={v._id} onClick={approveFundHandler}>
                      Approve fund
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div className="replenish-fund">
          <h1>
            Replenishment{" "}
            <span>
              {" "}
              <HashLoader color={"white"} loading={rLoad} size={25} />
            </span>
          </h1>
          <h3>
            Initial fund <span>${custodian.initialfund}</span>
          </h3>
          <h3>
            Remaining fund <span>${custodian.fundinbox}</span>
          </h3>
          <button onClick={replenishHandler}>
            Replenish ${custodian.initialfund - custodian.fundinbox}
          </button>
        </div>
      </div>
    </>
  );
}
