export const EmployeeReceipts = ({ Transaction }) => {
  return (
    <>
      <div className="employee-receipts">
        <h1>My Receipts</h1>
        <ReceiptMapping Transaction={Transaction} />
      </div>
    </>
  );
};

function ReceiptMapping({ Transaction }) {
  return (
    <div className="receipts-flex">
      {Transaction.length === 0 ? (
        <div className="no-transactions">
          <h2>No transactions made</h2>
          <img
            alt="pending bill"
            src={require("../../media/notransaction.png").default}
          ></img>
        </div>
      ) : (
        Transaction.map((v) => {
          return (
            <div className="receit" key={v._id}>
              <div className="receit-1">
                <span>Transaction Receipt</span>
              </div>
              <hr></hr>
              <div className="receit-2">
                <table>
                  <tbody>
                    <tr>
                      <th>Transaction id</th>
                      <td>{v._id}</td>
                    </tr>
                    <tr>
                      <th>Custodian</th>
                      <td>{v.from}</td>
                    </tr>
                    <tr>
                      <th>Issued on</th>
                      <td>{new Date(v.date).toDateString()}</td>
                    </tr>
                    <tr>
                      <th>Issued to</th>
                      <td>{v.to}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr></hr>
              <div className="receit-3">
                <h4>Amount: ${v.amount}</h4>
              </div>
              <div className="receit-4">
                <h4>Description:</h4>
                <p>{v.description}</p>
              </div>
              <hr></hr>
              <div className="receit-5">
                <span>Fund status</span>
                <img
                  alt="approval"
                  src={
                    v.approved
                      ? require("../../media/yes.png").default
                      : require("../../media/no.png").default
                  }
                />
              </div>
              <hr></hr>
              <div className="receit-5">
                <span>Bill status</span>
                <img
                  alt="approval"
                  src={
                    v.bill
                      ? require("../../media/yes.png").default
                      : require("../../media/no.png").default
                  }
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
