import { Login } from "./auth/login";
import { Signup } from "./auth/signup";
import { CurrentUserBadge } from "./currentUserBadge";

export function Homepage({ setLoad }) {
  return (
    <>
      <div className="homepage-container">
        <div className="about">
          <div className="tag">
            Are you concerned about your petty cash flow? No more worries Penny
            Keeper is here !!!
          </div>
          <div className="why">
            <h1>WHY ?</h1>
            <p>
              Even though the cash economy is getting smaller, there is still
              often a need to reimburse employees or to quickly pay a delivery
              driver. Petty cash serves these purposes.A petty cash fund gives a
              small business the flexibility of quickly reimbursing or paying
              small expenditures without having to write a company check or use
              a company credit card . And PENNY KEEPEER is here to assist you.
            </p>
          </div>
          <div className="how">
            <h1>HOW ?</h1>
            <p>
              Register and create an account,Request the custodian and receive
              the fund , Submit the bill and complete the transaction. It is as
              simple as that. A custodian's role is to approve the
              funds,replenish the funds and make record of them with the aid of
              PENNY KEEPEER.
            </p>
          </div>
        </div>

        <div className="login-signup">
          <Login setLoad={setLoad} />
          <Signup setLoad={setLoad} />
        </div>
      </div>
      <CurrentUserBadge />
    </>
  );
}
