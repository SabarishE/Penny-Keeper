import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";
export function CustodianDashboard({
  Refresh,
  Transaction,
  custodian,
  custodianRefresh,
}) {
  useEffect(() => {
    Refresh();
  }, [Refresh, custodianRefresh]);

  const totaltransactions = Transaction.filter(
    (v) => v.from === custodian.name
  );

  const pendingbill = Transaction.filter(
    (v) => v.bill === false && v.from === custodian.name
  );
  const pendingapproval = Transaction.filter(
    (v) => v.approved === false && v.from === custodian.name
  );

  const fundinbox = custodian.fundinbox;
  const initialfund = custodian.initialfund;
  const remaining = custodian.initialfund - custodian.fundinbox;

  return (
    <div className="custodian-dashboard">
      <div className="custodian-info">
        <div className="custodian-id">
          <div>
            <img
              src={require("../../media/custodian128.png").default}
              alt="custodian-pic"
            ></img>
          </div>
          <div className="c-details">
            <span className="c-name">{custodian.name}</span>
            <span className="c-email">{custodian.email}</span>
          </div>
        </div>
        <div className="replenishment-box">
          <h3>Amount required for replenishment</h3>
          <span>${remaining}</span>
        </div>
        <div className="custodian-data">
          <div className="data-box">
            <div>Total transactions</div>
            <span>{totaltransactions.length}</span>
          </div>
          <div className="data-box">
            <div>Pending bills</div>
            <span>{pendingbill.length}</span>
          </div>
          <div className="data-box">
            {" "}
            <div>Pending Approvals</div>
            <span>{pendingapproval.length}</span>
          </div>
        </div>
      </div>

      <div className="custodian-chart" style={{ color: "yellow" }}>
        <Doughnut
          data={{
            labels: ["Initial Fund", "Remaining", "Reimbursement"],
            datasets: [
              {
                data: [initialfund, fundinbox, remaining],
                backgroundColor: [
                  "rgb(255, 238, 0)",
                  "rgb(255, 244, 92)",
                  "rgb(250, 246, 168)",
                ],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,

            legend: { display: false },
          }}
        />
      </div>
    </div>
  );
}
