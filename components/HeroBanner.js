import Image from "next/image";
import { useEffect } from "react";
import style from "../styles/herobanner.module.scss";

export default function HeroBanner() {
  useEffect(() => {
  });

  return (
    <>
      <div className={style.carousel}>
        <div className={(style.mySlide, style.fade)}>
          <div className={style.carousel_img}>
            <Image
              src="/image.svg"
              alt="imagestuff"
              layout="fill"
              sizes="100%"
              objectFit="cover"
            />
          </div>
          <article className={style.promo}>
            <h1>Caption Test 1</h1>
            <p>Lorem ipsum</p>
            <button>J'y vais !</button>
          </article>
        </div>
        <a className={style.prev}>&#10094;</a>
        <a className={style.next}>&#10095;</a>
      </div>
    </>
  );
}
