import axios from "axios";
import { useEffect, useState } from "react";
import style from "../styles/filter.module.scss";

export default function Filter() {
const [items, setItems] = useState()
         
     function SplitFilters (split) {
        let finalKeys;
        console.log(items);
        //   item.forEach(keys => {
        //    const key = Object.keys(keys)
        //    console.log(key);
        // })
    }
    
    SplitFilters()

useEffect (() => {
    axios
    .get("http://localhost:3001/api/inventary/all_filters")
    .then((res) => {
        console.log(res);
     setItems(res.data);
     console.log(items);
    })
    .catch((err) => {
      console.log(err);
    });
    SplitFilters()
}, [])



  return (
    <>
      <div className={style.filter_container}>
        <div>
          <p>Catégories</p>
        </div>
        <div>
          <p>Types</p>
        </div>
        <div>
          <p>Marques</p>
          <ol>
            <li>
              <input type="checkbox" id="scales" name="scales" />
              <label for="scales">Marque</label>
            </li>
          </ol>
        </div>
        <div>
          <p>Vendeurs</p>
          <ol>
            <li>
              <input type="checkbox" id="scales" />
              <label>Vendeur</label>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}

