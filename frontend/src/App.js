import "./styles.css";
import { ProtectedRouteE } from "./protectedRoutes/employeeRoute";
import { ProtectedRouteC } from "./protectedRoutes/custodianRoute";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import { Custodian } from "./components/custodian/custodian.js";
import { Employee } from "./components/employee/employee.js";
import { HomepageOne, HomepageTwo } from "./components/homepage.js";

import { Forgotpwd } from "./components/auth/forgotpwd";
import { Resetpwd } from "./components/auth/resetpwd";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          {/* <Route path="/homepage" component={Homepage} /> */}

          <ProtectedRouteE exact path="/employee" component={Employee} />
          <ProtectedRouteC exact path="/custodian" component={Custodian} />

          {/* <Route path="/forgotpwd" component={Forgotpwd}/> */}
          <Route path="/register" component={HomepageOne} />
          <Route path="/login" component={HomepageTwo} />
          <Route path="/resetpwd" component={Resetpwd} />
          <Route path="*" component={HomepageOne} />
        </Switch>

        <ToastContainer
          transition={Slide}
          toastStyle={{
            backgroundColor: "rgb(69, 128, 75)",
            boxShadow: "0 0 4px 2px white",
            color: "white",
            fontWeight: "bold",
            width: "290px",
            fontSize: "0.8rem",
          }}
        />
      </div>
    </Router>
  );
}

function Header() {
  const history = useHistory();
  return (
    <div className="header">
      <div className="header-1">
        <img
          alt="logo"
          src={require("./media/logo.png").default}
          onClick={() => history.push("/homepage")}
          data-tip
          data-for="home"
          data-background-color="rgb(29, 59, 29)"
          data-type="dark"
          data-text-color="white"
        ></img>
        <ReactTooltip id="home" place="bottom" effect="solid">
          {"Home"}
        </ReactTooltip>
        <span>Penny Keeper</span>
      </div>
    </div>
  );
}
