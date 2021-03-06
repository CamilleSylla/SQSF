import Image from "next/image";
import React, { useContext, useEffect } from "react";
import style from '../styles/nav.module.scss'
import Link from 'next/link'
import { UserContext } from "../context/userLog";

export default function NavBar() {
   const [user, setUser] = useContext(UserContext)
   
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
            <li><Link href="/"><a>Accueil</a></Link></li>
            <li><Link href="/market"><a>Catalogue</a></Link></li>
            {user ? <li><Link href={`/dashboard/${user.id}`}><a>{user.society}</a></Link></li> : <li><Link href="/connection"><a>Connexion</a></Link></li>}
            <li><Link href="/panier"><a>Panier</a></Link></li>
            <li><Link href="/inscription_vendeur"><a>Insc Vendeur</a></Link></li>
         </ul>
         </nav>
      </header>
    </>
  );
}
