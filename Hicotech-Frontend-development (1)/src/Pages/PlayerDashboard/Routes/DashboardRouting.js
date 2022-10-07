import { Route, Switch } from "react-router-dom";
import Seances from "../Content/MySeance/Seances";
import MyChellenges from "../Content/MyChallenges";
import JoueurRoute from "../../../Routes/joueurRoute";
import Events from "../Content/event/Events";
import ModifyProfile from "../Content/MyProfile/ModifyProfile";

const DashboardRouting = () => (
  <Switch>
    <Route
      exact
      path="/joueur/dashboard/mesdefis"
      component={MyChellenges}
    />
    <Route  path="/joueur/dashboard/seances" component={Seances} />
    <Route  path="/joueur/dashboard/mesevents" component={Events} />
    <Route
      
      path="/joueur/dashboard/modifierProfile"
      component={ModifyProfile}
    />
  </Switch>
);

export default DashboardRouting;
