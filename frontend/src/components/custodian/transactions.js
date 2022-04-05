import { set } from "mongoose";
import { useState, useEffect } from "react";
export function CustodianTransactionRecord({ Transaction }) {
  const [PageNumber, setPageNumber] = useState(0);

  const transactionsPerPage = 10;
  const transactionsVisited = PageNumber * transactionsPerPage;
  const totalPages = Math.ceil(Transaction.length / transactionsPerPage);

  let pagesArray = [];

  for (let i = 0; i < totalPages; i++) {
    pagesArray.push(i);
  }

  return (
    <>
      <div className="custodian-transactions">
        <h1>Transaction record</h1>
        <table className="transactions-table without-table">
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
              {Transaction.slice(
                transactionsVisited,
                transactionsVisited + transactionsPerPage
              ).map((v) => {
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

        <div className="Pagination">
          <div className="pagination-buttons">
            {/* -----previous page number button------ */}

            <button
              className="previous-button"
              onClick={() =>
                PageNumber > 0
                  ? setPageNumber(PageNumber - 1)
                  : setPageNumber(PageNumber)
              }
            >
              {"<<<"}{" "}
            </button>

            {/* ----page number buttons---- */}

            <PaginationButtons
              pagesArray={pagesArray}
              setPageNumber={setPageNumber}
            />

            {/* -----next page number button------ */}

            <button
              className="next-button"
              onClick={() =>
                PageNumber < totalPages - 1
                  ? setPageNumber(PageNumber + 1)
                  : setPageNumber(PageNumber)
              }
            >
              {">>>"}{" "}
            </button>
          </div>

          <div className="current-page-number">
            <span>PAGE : {PageNumber + 1}</span>
          </div>
        </div>
      </div>
    </>
  );
}

const PaginationButtons = ({ pagesArray, setPageNumber }) => {
  return (
    <>
      {pagesArray.map((pages) => {
        return (
          <button
            className="page-number-button"
            value={pages}
            onClick={() => {
              setPageNumber(pages);
            }}
          >
            {pages + 1}
          </button>
        );
      })}
    </>
  );
};
