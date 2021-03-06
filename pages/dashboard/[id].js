import CreateArticle from "../../components/CreateArticle";
import DashboardMenu from "../../components/DashboardMenu";
import style from "../../styles/maindashboard.module.scss";

export default function Dashboard() {
  return (
    <>
      <div className={style.dashboard_wrapper}>
        <DashboardMenu />
        <div className={style.el_wrapper}>
          <CreateArticle />
        </div>
      </div>
    </>
  );
}
