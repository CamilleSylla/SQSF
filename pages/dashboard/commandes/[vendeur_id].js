import axios from "axios";
import DashboardMenu from "../../../components/DashboardMenu";
import style from "../../../styles/maindashboard.module.scss";
import Image from "next/image";

export default function Commande({ commandes }) {
  const orderMonth = commandes.map(commande => {
    const currentDate = new Date ()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const orderDate = new Date(commande.date)
    if (orderDate.getMonth() == currentMonth && orderDate.getFullYear() == currentYear) return commande
  })
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

        <div className={style.el_wrapper}>
          <div className="dashboard_top_cards_container">
            <div className="top_cards">
            <div className="nav_button">
            <Image
                      src="/cart.svg"
                      alt="Recherche"
                      width="20px"
                      height="20px"
                      objectFit="contain"
                    />
                  </div>
                  <h6 style={{width: "50%"}}>Nombre de commandes ce mois-ci :<br/><span style={{fontSize: "20px"}}>{orderMonth.length}</span></h6>
           
             </div>
            <div className="top_cards">
            <div className="nav_button">
            <Image
                      src="/truck.svg"
                      alt="Recherche"
                      width="20px"
                      height="20px"
                      objectFit="contain"
                    />
                  </div>
                  <h6 style={{width: "50%"}}>Commandes sans notification d'envoie :<br/><span style={{fontSize: "20px"}}>{orderMonth.length}</span></h6>
           
            </div>
            <div className="top_cards">
            <div className="nav_button">
            <Image
                      src="/shop.svg"
                      alt="Recherche"
                      width="20px"
                      height="20px"
                      objectFit="contain"
                    />
                  </div>
                  <h6 style={{width: "50%"}}>Commande Click&Collect sans récupération :<br/><span style={{fontSize: "20px"}}>{orderMonth.length}</span></h6>
           
            </div>
          </div>
          <div className={style.content_container}>
            <table className={style.list}>
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
            <div className={style.card_info_container}>
              <div className={style.card}>
                <div className={style.user}>
                  <div className="nav_button">
                    <Image
                      src="/user.svg"
                      alt="Recherche"
                      width="20px"
                      height="20px"
                      objectFit="contain"
                    />
                  </div>
                  <h6 style={{marginTop: "10px"}}>Nom de l'utilisateur</h6>
                </div>
                <p>Telephone</p>
                <p>Email</p>
              </div>
              <div className={style.card}>
              <div className={style.user}>
                  <div className="nav_button">
                    <Image
                      src="/box.svg"
                      alt="Recherche"
                      width="20px"
                      height="20px"
                      objectFit="contain"
                    />
                  </div>
                  <h6 style={{marginTop: "10px"}}>Details de livraison</h6>
                </div>
                <p>Adresse</p>
                <p>Email</p>
                <p>Email</p>
              </div>
            </div>
          </div>
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
