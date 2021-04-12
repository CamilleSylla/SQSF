import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import style from "../styles/nav.module.scss";
import Link from "next/link";
import { UserContext } from "../context/userLog";
import { CartContext } from "../context/cartContext";
import axios from "axios";
import Router from 'next/router'

export default function NavBar() {
  const [user, setUser] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext);
  const [dropdown, setDropdown] = useState(null)
  function handleChange(value) {
    Router.push(value);
  }
  function connectedUser() {
    return (
      <>
        <Link href={user ? `/dashboard/${user.id}` : "/connection"}>
          <div className={style.nav_button}>
            {/* <Image
      src={user ? user.profile_picture : "/log.svg"}
      alt="Recherche"
      width="20px"
      height="20px"
      objectFit="contain"
    /> */}
            <p>{user.society}</p>
          </div>
        </Link>
      </>
    );
  }

  function selectOption (data, type) {
let option
    switch (type) {
      case "cat": 
      option = data.map((cat, i) => {
        return (
          <>
          <option value={cat.name}>{cat.name}</option>
          </>
        )
      })
      return option
      case "vend" : 
      option = data.map((vend, i) => {
        return (
          <>
          <option value={vend._id}>{vend.society}</option>
          </>
        )
      })
      return option
      case "brand" :
        option = data.map((cat, i) => {
          return (
            <>
            <option value={cat} >{cat}</option>
            </>
          )
        })
        return option
    }
    console.log(dropdown);
    console.log(data);
    

  }
  async function Categories () {

    const categories = await axios
    .get("http://localhost:3001/api/categorie/all")
    .then(res => setDropdown(res.data))
  } 

  useEffect(() => {
    Categories()
  },[])

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
              <input type="Text" placeholder="Que recherchez-vous ?" />
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
                {user ? connectedUser() : <p> Creer un compte vendeur </p>}
              </Link>
            </div>
          </div>
          <div className={style.bottom_nav}>
            <select className={style.nav_dropdown} onChange={event => handleChange(`/market/${event.target.value}`)}>
              <option value="all">Toutes les Catégories</option>
              {dropdown ? selectOption(dropdown.categories, "cat") : null}
            </select>
            <select className={style.nav_dropdown} onChange={event => handleChange(`/profil/${event.target.value}`)}>
            <option>Nos vendeurs</option>
            {dropdown ? selectOption(dropdown.vendeurs, "vend") : null}
              
            </select>
            <select className={style.nav_dropdown} onChange={event => handleChange(`/market/${event.target.value}`)}>
            <option>Nos marques</option>
            {dropdown ? selectOption(dropdown.brands, "brand") : null}
              
            </select>

            <div className={style.nav_button_wrapper}>
              <Link href="/panier">
                <div className={style.nav_button}>
                  {cart.length > 0 ? (
                    <div className={style.notif}>{cart.length}</div>
                  ) : null}

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
