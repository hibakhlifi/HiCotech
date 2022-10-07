import { useState } from "react";
import "./Dashboard.css";
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Space } from "antd";
import {
  DesktopOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  MessageOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import logo from "../../Assets/logo.png";
import DashboardRouting from "./Routes/DashboardRouting";
import authService from "../../Services/authService";

const { Header, Content, Footer, Sider } = Layout;
const Dashboard = () => {
  const location = useLocation();
  const [collapsed, setcollapsed] = useState(false);
  const history = useHistory();
  const onCollapse = (collapsed) => {
    setcollapsed(collapsed);
  };
  const userMenu = (
    <Menu>
      <Menu.Item
        data-testid="logoutBtnCoach"
        onClick={() => {
          history.push("/logout");
        }}
        key="2"
        id="logoutId"
      >
        Déconnexion
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "2em",
          }}
        >
          {!collapsed ? (
            <img
              src={logo}
              alt=""
              style={{
                width: "115px",
                height: "115px",
              }}
            />
          ) : (
            <div style={{ height: "115px" }} />
          )}
        </div>

        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <NavLink exact to="/coach/dashboard/accueil">
              Accueil
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <NavLink id="inviId" exact to="/coach/dashboard/invitations">
              Mes Invitations
            </NavLink>
          </Menu.Item>

          <Menu.Item key="3" icon={<DesktopOutlined />}>
            <NavLink
              data-testid="statistic-btn"
              exact
              to="/coach/dashboard/mystatisitcs"
            >
              Mes Statistiques
            </NavLink>
          </Menu.Item>

          <Menu.Item key="4" icon={<DesktopOutlined />}>
            <NavLink
              data-testid="skill-btn"
              exact
              to="/coach/dashboard/myskills"
            >
              Mes Compétences
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5" icon={<DesktopOutlined />}>
            <NavLink id="programmeId" exact to="/coach/dashboard/programmes">
              Mes Programmes
            </NavLink>
          </Menu.Item>
          <Menu.Item key="6" icon={<DesktopOutlined />}>
            <NavLink exact to="/coach/dashboard/players">
              Mes Joueurs
            </NavLink>
          </Menu.Item>
          <Menu.Item key="8" icon={<EnvironmentOutlined />}>
            <NavLink
              data-testid="trainingGroundMenu"
              exact
              to="/coach/dashboard/gerer/lieuEntrainement"
            >
              Lieu Entrainement
            </NavLink>
          </Menu.Item>
          <Menu.Item key="9" icon={<EnvironmentOutlined />}>
            <NavLink
              data-testid="assignChallengeMenu"
              exact
              to="/coach/dashboard/manageChallenge"
            >
              Assigner defi
            </NavLink>
          </Menu.Item>
      
          <Menu.Item key="11" icon={<DesktopOutlined />}>
            <NavLink id="defiId" exact to="/coach/dashboard/defis">
              Les Défis
            </NavLink>
          </Menu.Item>
          <Menu.Item key="12" icon={<DesktopOutlined />}>
            <NavLink
              data-testid="annulerSeanceMenu"
              exact
              to="/coach/dashboard/annulerSeance"
            >
              Annuler Séance
            </NavLink>
          </Menu.Item>
          <Menu.Item key="13" icon={<DesktopOutlined />}>
            <NavLink
              data-testid="subscription-btn"
              exact
              to="/coach/dashboard/payer-abonnement"
            >
              Mon Abonnement
            </NavLink>
          </Menu.Item>
       
          <Menu.Item key="15" icon={<MessageOutlined />}>
            <NavLink
              data-testid="feedbackSessionMenu"
              exact
              to="/coach/dashboard/FeedbackSeance"
            >
              FeedBack Séance
            </NavLink>
          </Menu.Item>
          <Menu.Item key="16" icon={<NotificationOutlined />}>
            <NavLink id="eventId" exact to="/coach/dashboard/events">
              Mes évenements
            </NavLink>
          </Menu.Item>
          <Menu.Item key="17" icon={<NotificationOutlined />}>
            <NavLink id="seanceId" exact to="/coach/dashboard/seances">
              Mes séances
            </NavLink>
          </Menu.Item>
          <Menu.Item key="18" icon={<DesktopOutlined />}>
            <NavLink exact to="/coach/dashboard/detailSeance">
              Afficher detail séance
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="header ">
          <Space align="center" style={{ float: "right" }}>
            <Dropdown overlay={userMenu} placement="bottom">
              <Avatar
                size="large"
                style={{ color: "white", backgroundColor: "#7265e6" }}
              >
                {authService.getCurrentUser()?.firstName.charAt(0)}
              </Avatar>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{location.pathname}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, height: "100%" }}
          >
            <DashboardRouting />
          </div>
        </Content>
  
      </Layout>
    </Layout>
  );
};

export default Dashboard;
