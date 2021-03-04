import Cards from "./Cards";
import style from '../styles/carddisplayer.module.scss'

export default function CardDisplayer({data}) {
  return (
    <>
      <div className={style.carddisplayer}>
        <Cards data={data}/>
      </div>
    </>
  );
}


