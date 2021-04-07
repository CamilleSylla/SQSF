import Image from "next/image";
import React, { useContext } from "react";
import style from "../styles/nav.module.scss";
import Link from "next/link";
import { UserContext } from "../context/userLog";
import { CartContext } from "../context/cartContext";

export default function NavBar() {
  const [user, setUser] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext)

  const connectedUser = <Link href={user ? `/dashboard/${user.id}` : "/connection"}>
  <div className={style.nav_button}>
    <Image
      src={user ? user.profile_picture : "/log.svg"}
      alt="Recherche"
      width="20px"
      height="20px"
      objectFit="contain"
    />
  </div>
  </Link>

  return (
    <>
      <header className={style.navbar}>
        <nav>
          <div className={style.top_nav}>
          <Link href="/">
            <a>
              <Image
                src="/sqmarket.svg"
                alt="sqmarket"
                width="auto"
                height="50%"
              />
            </a>
          </Link>
          <div className={style.nav_search}>
            <select>
              <option value="produit">Produits</option>
              <option value="vendeur">Vendeur</option>
              <option value="city">Ville</option>
              <option value="click&collect">Click&Collect</option>
            </select>
            <input type="Text" placeholder="Que recherchez-vous ?"/>
            <Image
                src="/search.svg"
                alt="Recherche"
                width="20px"
                height="20px"
                objectFit="contain"
              />
          </div>
          <div className={style.nav_logs}>
            <Link href="/connection">
            {user ? connectedUser : <p> Creer un compte vendeur </p>}
            </Link>
            
          </div>
          
          </div>
          <div className={style.bottom_nav}>
            <div className={style.nav_dropdown}>
            <Image
                src="/menu_cat.svg"
                alt="Recherche"
                width="20px"
                height="20px"
                objectFit="contain"
              />
              <p>Toutes les catégories</p>
              <Image
                src="/dropdown.svg"
                alt="Recherche"
                width="10px"
                height="10px"
                objectFit="contain"
              />
            </div>
            <div className={style.nav_dropdown}>
              <p>Nos vendeurs</p>
              <Image
                src="/dropdown.svg"
                alt="Recherche"
                width="10px"
                height="10px"
                objectFit="contain"
              />
            </div>
            <div className={style.nav_dropdown}>
              <p>Promotions</p>
              <Image
                src="/dropdown.svg"
                alt="Recherche"
                width="10px"
                height="10px"
                objectFit="contain"
              />
            </div>

            <div className={style.nav_button_wrapper}>
            
            <Link  href="/panier">
            <div className={style.nav_button}>
              {cart.length > 0 ? <div className={style.notif}>{cart.length}</div> : null}
              
              <Image
                src="/bag.svg"
                alt="Recherche"
                width="20px"
                height="20px"
                objectFit="contain"
              />
            </div>
            </Link>
          </div>
          </div>

          
         
        </nav>
      </header>
    </>
  );
}
