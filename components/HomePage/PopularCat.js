import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import style from "../../styles/homepopular.module.scss";

export default function HomePopular({ id, data }) {
  let container;
  let isDown = false;
  let startX;
  let scrollLeft;

  function Title() {
    switch (id) {
      case "categories":
        return "Les catégories populaires";
      case "vendeurs":
        return "Nos vendeurs";
      case "promotions":
        return "Les dernieres promotions";
    }
  }

  function Cards() {
    switch (id) {
      case "categories":
        return (
          <>
            {data.categories.map((item, i) => {
              return (
                <Link href={`/market/${item.name}`}>
                  <div key={i} className={style.param_cards}>
                  <div className={style.param_crad_img}>
                    <Image
                      src={item.image ? item.image : "/image.svg"}
                      alt="imagestuff"
                      layout="fill"
                      sizes="100%"
                      objectFit="cover"
                    />
                  </div>
                  <h5>{item.name}</h5>
                  <p>"item.length" produits</p>
                  {/* <p>{item.numProduct} produits</p>  */}
                </div>
                </Link>
                
              );
            })}
          </>
        );
      case "vendeurs":
        return (
          <>
            {data.vendeurs.map((vendeur, i) => {
              return (
                <Link href={`/profil/${vendeur._id}`}>
<div key={i} className={style.param_cards}>
                  <div className={style.param_vend_img}>
                    <Image
                      src={
                        vendeur.profile_picture
                          ? vendeur.profile_picture
                          : "/image.svg"
                      }
                      alt="imagestuff"
                      layout="fill"
                      sizes="100%"
                      objectFit="cover"
                    />
                  </div>
                  <h5>{vendeur.society}</h5>
                  <p>"item.length" produits</p>
                  {/* <p>{item.numProduct} produits</p>  */}
                </div>
                </Link>
                
              );
            })}
          </>
        );
    }
  }

  useEffect(() => {
    Title();
    Cards();
    container = document.getElementById(id);
    container.addEventListener("mousedown", (e) => {
      isDown = true;
      container.classList.add("active");
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
    container.addEventListener("mouseleave", () => {
      isDown = false;
      container.classList.remove("active");
    });
    container.addEventListener("mouseup", () => {
      isDown = false;
      container.classList.remove("active");
    });
    container.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      container.scrollLeft = scrollLeft - walk;
    });
  }, []);
  return (
    <div className={style.home_popular_container}>
      <h3>{Title()}</h3>
      <div className={style.param_card_container} id={id}>
        {data ? Cards() : null}
        <div className={style.param_cards}>
          <div className={style.param_crad_img}>
            <Image
              src="/image.svg"
              alt="imagestuff"
              layout="fill"
              sizes="100%"
              objectFit="cover"
            />
          </div>
          <h5>En voir +</h5>
        </div>
      </div>
    </div>
  );
}
