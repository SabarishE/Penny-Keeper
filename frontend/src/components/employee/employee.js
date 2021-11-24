import { EmployeeDashboard } from "./dashboard";
import { EmployeePendingBills } from "./pendingbills";
import { EmployeeReceipts } from "./receipt.js";

import { CurrentUserBadge } from "../currentUserBadge";

import axios from "axios";

import { useState, useCallback } from "react";

export function Employee(props) {
  const [Transaction, setTrasaction] = useState([]);

  const name = localStorage.getItem("name");
  const Refresh = useCallback(() => {
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
    axios
      .get("https://penny-keeper.herokuapp.com/transactions/all", options)
      .then((res) => {
        console.log("referesh success", res);
        setTrasaction(res.data.data.filter((v) => v.to === name));
      })
      .catch((err) => console.log("error in getting all transactions", err));
  }, [name]);

  return (
    <>
      <div className="employee-container">
        <EmployeeDashboard Transaction={Transaction} Refresh={Refresh} />
        <EmployeeReceipts Transaction={Transaction} />
        <EmployeePendingBills Transaction={Transaction} Refresh={Refresh} />
      </div>
      <CurrentUserBadge />
    </>
  );
}
