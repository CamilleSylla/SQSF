import Image from "next/image";
import React, { useEffect } from "react";
import style from '../styles/nav.module.scss'
import Link from 'next/link'

export default function NavBar() {

   
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
            <li><Link href="/connection"><a>Connexion</a></Link></li>
            <li><Link href="/product"><a>Product</a></Link></li>
         </ul>
         </nav>
      </header>
    </>
  );
}
