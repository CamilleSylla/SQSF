import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/userLog";

export default function DashboardHeader({addItem, setAddItem, item ,select, target, search }) {
  const [user, setUser] = useContext(UserContext);

  function deleteItems() {
    axios.delete(`http://localhost:3001/api/items/delete`, {
      params: {
        data: select,
      },
    }).then(res => {
      console.log("Deleted :", res);
      select.forEach(item => {
        const find = select.find(id => id == item)
        if (find) {
          const index = select.indexOf(item)
          select.splice(index, 1)
        }
      })
    })
  }

  function Action() {
    return (
      <>
        <Link href={`/dashboard/produits/modify/${target._id}`}>
          <button className="action_button orange">Modifier</button>
        </Link>
        <button className="action_button red" onClick={() => deleteItems() }>
          Supprimé
        </button>
      </>
    );
  }

  return (
    <>
      <header
        style={{
          height: "65px",
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="dashboard_action">
          <input
            type="text"
            placeholder="Recherche de produit"
            onChange={(e) => search(e.target.value)}
          />

<button className="action_button blue" onClick={() => setAddItem(!addItem) }>
          Ajouter +
        </button>
          {target ? Action() : null}
        </div>
        <div className="dashboard_header_content">
          <div
            className="dashboard_header_card"
            style={{ marginRight: "20px" }}
          >
            <p>{user.society}</p>
            <div className="nav_button" style={{ overflow: "hidden" }}>
              <Image
                // src={user.profile_picture !== undefined || null ? user.profile_picture : "/image.svg"}
                src="/image.svg"
                alt="Recherche"
                layout="fill"
                sizes="100%"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="dashboard_header_card" style={{ width: "auto" }}>
            <div className="nav_button" style={{ overflow: "hidden" }}>
              <Image
                src="/mail.svg"
                alt="Recherche"
                height="20px"
                width="20px"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
