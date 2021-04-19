import React, { useEffect } from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;




export default function CheckBox({ cat, isChecked, setIsChecked }) {
    function renderCheckboxLists(key)  {
        return cat[key].map((value, i) =>  (
         <React.Fragment key={i}>
              <Checkbox onChange={() => handleToggle(value.name || value || value.society, key)} type="checkbox" checked={handleChecked(value, key)} />
              <span key={i} >{value.name || value || value.society}</span>
         </React.Fragment>
          ));
      }
      const handleToggle = (value, key) => {
        const currentIndex = Object.keys(isChecked)
        console.log("keys", currentIndex);
        const find = currentIndex.find((filter,i) => filter === key )
        console.log("find ?", find);
        const newChecked = {...isChecked}
        console.log("new Checked", newChecked);
        if (newChecked[key] === value) {
            delete newChecked[key]
        } else {
            newChecked[key] = value
        }
        setIsChecked(newChecked)
        console.log("filter state", isChecked);
    }
    function handleChecked (value, key) {
        console.log(key);
        console.log( value || value.society|| value.name );
        console.log(isChecked[key]);
        if (isChecked[key] !== undefined) {
            if (isChecked[key] === value) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

  return (
    <div style={{ width: "40%" }}>
      {Object.keys(cat).map((key) => {
            if (cat[key] !== null) {
              return (
                <div>
                  <Collapse defaultActiveKey={["0"]}>
                    <Panel header key="1">
                      {renderCheckboxLists(key)}
                    </Panel>
                  </Collapse>
                </div>
              )
            } else {
              return null;
            }
          })}
    </div>
  );
}
