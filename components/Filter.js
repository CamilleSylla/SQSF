import axios from "axios";
import style from "../styles/filter.module.scss";
import CheckBox from "./MarketPage/Checkbox";

export default function Filter({ isChecked, setIsChecked, cat, setItem }) {
  function setFilter(e, cat) {
    // const exist = isChecked.includes({[cat]: e})

    setIsChecked({ ...isChecked, [cat]: [e.target.value] });
    
    console.log("Apres set Filter", isChecked);
  }

  function onSubmit() {
    axios
      .get(`http://localhost:3001/api/inventary/active/filters`, {
        params: {
          isChecked,
        },
      })
      .then((res) => {
        console.log("Resultat requet Back",res.data);
        setItem(res.data);
      });
  }

  return (
    <>
        <CheckBox cat={cat} isChecked={isChecked} setIsChecked={setIsChecked}/>
      {/* <div className={style.filter_container}> */}
        {/* <div> */}
          {/* <p className={style.filter_labels}>Catégories</p> */}
          {/* {cat.categories.map((cat, i) => {
            return (
              <>
                <ol key={i}>
                  <li>
                    <input
                      type="checkbox"
                      id="scales"
                      name="scales"
                      value={cat.name}
                      onClick={(e) => setFilter(e, "categorie")}
                    />
                    <label>{cat.name}</label>
                  </li>
                </ol>
              </>
            );
          })}
          <p className={style.filter_labels}>Vendeurs</p>
          {cat.vendeurs.map((vendeur) => {
            return (
              <ol>
                <li>
                  <input
                    type="checkbox"
                    id="scales"
                    name="scales"
                    value={vendeur.society}
                    onClick={(e) => setFilter(e, "vendeur")}
                  />
                  <label>{vendeur.society}</label>
                </li>
              </ol>
            );
          })}
          <p className={style.filter_labels}>Marques</p>
          {cat.brands.map((marques) => {
            return (
              <ol>
                <li>
                  <input
                    type="checkbox"
                    id="scales"
                    name="scales"
                    value={marques}
                    onClick={(e) => setFilter(e, "brand")}
                  />
                  <label>{marques}</label>
                </li>
              </ol>
            );
          })}
          <p className={style.filter_labels}>Genre</p>
          {cat.genre.map((genre) => {
            return (
              <ol>
                <li>
                  <input
                    type="checkbox"
                    id="scales"
                    name="scales"
                    value={genre}
                    onClick={(e) => setFilter(e, "genre")}
                  />
                  <label>{genre}</label>
                </li>
              </ol>
            );
          })}
        </div> */}
        {/* <button onClick={() => onSubmit()}> Valider Filtres </button>
      </div> */}
    </>
    // <>
    //   <div className={style.filter_container}>
    //
    //   <div onClick={() => onSubmit()}>Appliquer les filtres</div>
    //   </div>
    // </>
  );
}
