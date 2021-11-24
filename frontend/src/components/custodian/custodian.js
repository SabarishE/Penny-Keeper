import { CustodianDashboard } from "./dashboard";
import { CustodianApproveFunds } from "./approve";
import { CustodianTransactionRecord } from "./transactions";

import { useState, useCallback, useEffect } from "react";

import axios from "axios";

import { CurrentUserBadge } from "../currentUserBadge";
export function Custodian() {
  const [Transaction, setTrasaction] = useState([]);
  const [custodian, setcustodian] = useState({});

  const name = localStorage.getItem("name");

  const custodianRefresh = useCallback(() => {
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
    axios
      .get("https://penny-keeper.herokuapp.com/workers/allcustodians", options)
      .then((res) => {
        console.log("all custodians received", res);
        setcustodian(res.data.data.filter((v) => v.name === name)[0]);
      })
      .catch((err) => console.log("error in getting all custodians", err));
  }, [name]);

  useEffect(() => {
    custodianRefresh();
  }, [custodianRefresh]);

  console.log("custodian data >>", custodian);
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
        setTrasaction(res.data.data);
      })
      .catch((err) => console.log("error in getting all transactions", err));
  }, []);

  return (
    <>
      <div className="custodian-container">
        <CustodianDashboard
          Transaction={Transaction}
          Refresh={Refresh}
          custodian={custodian}
        />
        <CustodianApproveFunds
          Transaction={Transaction}
          Refresh={Refresh}
          custodianRefresh={custodianRefresh}
          name={name}
          custodian={custodian}
        />

        <CustodianTransactionRecord Transaction={Transaction} />
      </div>
      <CurrentUserBadge />
    </>
  );
}
