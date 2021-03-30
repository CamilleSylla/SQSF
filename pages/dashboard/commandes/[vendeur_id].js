import axios from "axios";
import DashboardMenu from "../../../components/DashboardMenu";
import style from "../../../styles/maindashboard.module.scss";

export default function Commande({ commandes }) {
  if (!commandes) {
    return (
      <>
        <h1>Vous n'avez pas encore de commandes sur votre compte</h1>
      </>
    );
  } else {
    return (
      <div className={style.dashboard_wrapper}>
        <DashboardMenu />
        <div className="main_list_container">
          <table className="list">
            <thead>
              <tr>
                <th>
                  <p>Identifiant</p>
                </th>
                <th>
                  <p>Montant</p>
                </th>
                <th>
                  <p>Date</p>
                </th>
                <th>
                  <p>Status</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((commande, i) => {
                const d = new Date(commande.date);
                return (
                  <tr key={i}>
                    <td>
                      <p>id: {commande._id}</p>
                    </td>
                    <td>
                      <p>{commande.amount}€</p>
                    </td>
                    <td>
                      <p>
                        {d.toLocaleDateString() +
                          " à " +
                          d.toLocaleTimeString()}
                      </p>
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export async function getServerSideProps({ params }) {
  const commandes = await axios
    .get(`http://localhost:3001/api/order/${params.vendeur_id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      commandes,
    },
  };
}
