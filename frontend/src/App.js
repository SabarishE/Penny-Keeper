import "./styles.css";
import { ProtectedRouteE } from "./protectedRoutes/employeeRoute";
import { ProtectedRouteC } from "./protectedRoutes/custodianRoute";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import { Custodian } from "./components/custodian/custodian.js";
import { Employee } from "./components/employee/employee.js";
import { Homepage } from "./components/homepage.js";

import { Forgotpwd } from "./components/auth/forgotpwd";
import { Resetpwd } from "./components/auth/resetpwd";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/homepage"  component={Homepage} />

          <ProtectedRouteE exact path="/employee" component={Employee} />
          <ProtectedRouteC exact path="/custodian" component={Custodian} />

          <Route path="/forgotpwd" component={Forgotpwd}/>
          <Route path="/resetpwd" component={Resetpwd}/>
          <Route path="*" component={Homepage}/>
        </Switch>

  

        <ToastContainer className="Toaster-Container"  style={{backgroundColor:"rgb(69, 128, 75)",color:"white"}}/>
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
        ></img>
        <span>Penny Keeper</span>

      </div>
    </div>
  );
}
