import Image from "next/image";
import {useState, useEffect } from "react";
import style from "../styles/herobanner.module.scss";

export default function HeroBanner() {
  const [add, setAdd] = useState(0)

  const addData = [
    {
    title: "Enjoy lots of bonuses with Classified cards",
    sub: "Earn stars when shoppinfs on the service and buy goods for them",
    img: "/image.svg"
  },
    {
    title: "222222222222Enjoy lots of bonuses with Classified cards",
    sub: "Earn stars when shoppinfs on the service and buy goods for them",
    img: "/image.svg"
  },
]

function setActiveAdd() {
  const activeBtn = document.querySelectorAll(".round_btn_container")
  document.getElementB
  console.log(activeBtn);

}
useEffect(() => {
  setActiveAdd()
}, [add])

  return (
    <>
    <div className={style.add_container}>
    <Image
              src="/image.svg"
              alt="imagestuff"
              layout="fill"
              sizes="100%"
              objectFit="cover"
            />
            <article className={style.add_content}>
              <h1>{addData[add].title}</h1>
              <p>{addData[add].sub}</p>
            </article>
      <div className={style.round_btn_container}>
        {addData.map((add, i) => {
          return <button className="active" key={i} value={i} onClick={e => setAdd(e.target.value)}></button>
        })}
      </div>
    </div>
    </>
  );
}
