import Image from "next/image";
import React, { useContext, useEffect } from "react";
import style from "../styles/nav.module.scss";
import Link from "next/link";
import { UserContext } from "../context/userLog";

export default function NavBar() {
  const [user, setUser] = useContext(UserContext);

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
              <Link href="/inscription_vendeur">
                <a>Insc Vendeur</a>
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
