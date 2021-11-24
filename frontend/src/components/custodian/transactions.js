export function CustodianTransactionRecord({ Transaction }) {
  return (
    <>
      <div className="custodian-transactions">
        <h1>Transaction record</h1>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Custodian</th>
              <th>Employee</th>
              <th>Amount($)</th>
              <th>Fund status</th>
              <th>Bill status</th>
              <th>Description</th>
            </tr>
          </thead>

          {Transaction.length < 0 ? (
            <div className="no-transactions">
              <h2>No transactions made</h2>
              <img
                alt="pending bill"
                src={require("../../media/notransaction.png").default}
              ></img>
            </div>
          ) : (
            <tbody>
              {Transaction.map((v) => {
                return (
                  <tr key={v._id}>
                    <td data-label="Id">{v._id}</td>
                    <td data-label="Date">{new Date(v.date).toDateString()}</td>
                    <td data-label="Custodian">{v.from}</td>
                    <td data-label="Employee">{v.to}</td>
                    <td data-label="Amount">{v.amount}</td>
                    <td data-label="Fund status">
                      {v.approved ? (
                        <img
                          src={require("../../media/yes.png").default}
                          alt="yes"
                        ></img>
                      ) : (
                        <img
                          src={require("../../media/no.png").default}
                          alt="yes"
                        ></img>
                      )}
                    </td>
                    <td data-label="Bill status">
                      {v.bill ? (
                        <img
                          src={require("../../media/yes.png").default}
                          alt="yes"
                        ></img>
                      ) : (
                        <img
                          src={require("../../media/no.png").default}
                          alt="yes"
                        ></img>
                      )}
                    </td>
                    <td data-label="Description">{v.description}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}
