import axios from "axios";
import { useContext } from "react";
import CreateArticle from "../../components/CreateArticle";
import DashboardMenu from "../../components/DashboardMenu";
import { UserContext } from "../../context/userLog";
import style from "../../styles/maindashboard.module.scss";

export default function Dashboard() {
  const [user, setUser] = useContext(UserContext)
  return (
    <>
      <div className={style.dashboard_wrapper}>
        <DashboardMenu />
        <div className={style.el_wrapper}>
        </div>
      </div>
    </>
  );
}
