import "./App.css";
import "antd/dist/antd.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./Pages/Login";
import LogoutPage from "./Pages/Logout";
import RegisterPage from "./Pages/Register";
import CoachDashboard from "./Pages/CoachDashboard";
import PlayerDashboard from "./Pages/PlayerDashboard";
import CoachRoute from "./Routes/coachRoute";
import NotFound from "./Pages/Error/notFound";
import JoueurRoute from "./Routes/joueurRoute";
import Invitation from "./Pages/CoachDashboard/Content/MyInvitation";
import HomePage from "./Pages/HomePage";
import LoginUser from './Pages/LoginUser'
import RPlayer from "./Pages/RegisterUser";
const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path='/LoginUser' component={LoginUser}/>
        <Route path='/registerUser' component={RPlayer}/>
        <Route path="/coach/dashboard/" component={CoachDashboard} />
        <Route path="/joueur/dashboard/" component={PlayerDashboard} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/invitation/:id" component={Invitation} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
        <Redirect to="/login" />
      </Switch>
    </div>
  </Router>
);

export default App;
