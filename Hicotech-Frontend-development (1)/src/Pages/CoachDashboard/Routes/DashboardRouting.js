import { Switch } from "react-router-dom";
import AccueilPage from "../Content/Accueil";
import ManageTrainingGround from "../Content/MyTrainingGrounds/ManageTrainingGround";
import Invitations from "../Content/MyInvitation/Invitations";
import Programmes from "../Content/MyProgramme/Programmes";
import SelectDiscipline from "../Content/SelectDiscipline";
import CoachRoute from "../../../Routes/coachRoute";
import MySkills from "../Content/MySkills/MySkills";
import MyStatistic from "../Content/MyStatistics/MyStatistic";
import PayMembership from "../Content/PayMembership/PayMembership";
import PlayerInfo from "../Content/PlayerInfo/PlayerInfo";
import Players from "../Content/MyPlayers/Players";
import Défi from "../Content/Defi/Defis";
import ShowChallenges from "../Content/ManageChallenges/ShowChallenges";
import CancelSession from "../Content/CancelSession/index";
import DisplayPlayers from "../Content/MyClients/UpdatePlayer/DisplayPlayers";
import ModifyPlayer from "../Content/MyClients/UpdatePlayer/ModifyPlayer";
import SelectSession from "../Content/MySessions/SelectSession";
import Events from "../Content/event/Events";
import SessionFeedback from "../Content/SessionFeedback";
import SeanceUpdate from "../Content/Seance/seanceUpdate";
import Seances from "../Content/MySeance/Seances";

const DashboardRouting = () => (
  <Switch>
    <CoachRoute exact path="/coach/dashboard/accueil" component={AccueilPage} />
    <CoachRoute
      exact
      path="/coach/dashboard/gerer/lieuEntrainement"
      component={ManageTrainingGround}
    />
    <CoachRoute
      exact
      path="/coach/dashboard/select/discipline"
      component={SelectDiscipline}
    />
    <CoachRoute
      exact
      path="/coach/dashboard/invitations"
      component={Invitations}
    />
    <CoachRoute exact path="/coach/dashboard/myskills" component={MySkills} />
    <CoachRoute
      exact
      path="/coach/dashboard/mystatisitcs"
      component={MyStatistic}
    />
    <CoachRoute
      exact
      path="/coach/dashboard/player/info"
      component={PlayerInfo}
    />
    <CoachRoute
      exact
      path="/coach/dashboard/programmes"
      component={Programmes}
    />
    <CoachRoute exact path="/coach/dashboard/players" component={Players} />
    <CoachRoute
      exact
      path="/coach/dashboard/invitations"
      component={Invitations}
    />
    <CoachRoute
      exact
      path="/coach/dashboard/manageChallenge"
      component={ShowChallenges}
    />
    <CoachRoute exact path="/coach/dashboard/defis" component={Défi} />
    <CoachRoute
      exact
      path="/coach/dashboard/annulerSeance"
      component={CancelSession}
    />
    <CoachRoute
      exact
      path="/coach/dashboard/payer-abonnement"
      component={PayMembership}
    />
    <CoachRoute
      exact
      path="/coach/dashboard/modifyPlayers"
      component={DisplayPlayers}
    />
    <CoachRoute
      exact
      path="/coach/dashboard/modifier/profileJoueur"
      component={ModifyPlayer}
    />
    <CoachRoute
      exact
      path="/coach/dashboard/FeedbackSeance"
      component={SessionFeedback}
    />
    <CoachRoute exact path="/coach/dashboard/events" component={Events} />
    <CoachRoute
      exact
      path="/coach/dashboard/seance/:id"
      component={SeanceUpdate}
    />
    <CoachRoute exact path="/coach/dashboard/seances" component={Seances} />
    <CoachRoute
      exact
      path="/coach/dashboard/detailSeance"
      component={SelectSession}
    />
  </Switch>
);

export default DashboardRouting;
