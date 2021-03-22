import Image from "next/image";
import React, { useContext, useEffect } from "react";
import style from "../styles/nav.module.scss";
import Link from "next/link";
import { UserContext } from "../context/userLog";
import { CartContext } from "../context/cartContext";

export default function NavBar() {
  const [user, setUser] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext)

  return (
    <>
      <header className={style.navbar}>
        <nav>
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

          <ul>
            <li>
              <Link href="/">
                <a>Accueil</a>
              </Link>
            </li>
            <li>
              <Link href="/market/all">
                <a>Catalogue</a>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <a>M'enregistrer</a>
              </Link>
            </li>
          </ul>
          <div className={style.nav_button_wrapper}>
            <div className={style.nav_button}>
              <Image
                src="/search.svg"
                alt="Recherche"
                width="20px"
                height="20px"
                objectFit="contain"
              />
            </div>
            <Link href={user ? `/dashboard/${user.id}` : "/connection"}>
            <div className={style.nav_button}>
              <Image
                src={user ? "/user.svg" : "/log.svg"}
                alt="Recherche"
                width="20px"
                height="20px"
                objectFit="contain"
              />
            </div>
            </Link>
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
        </nav>
      </header>
    </>
  );
}
