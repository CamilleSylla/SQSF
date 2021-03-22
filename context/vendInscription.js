import React, { useState, createContext } from "react";

export const vendeurInscriptionContext = createContext();

export function vendeurInscriptionProvider(props) {
  const [submit, setSubmit] = useState({
    society: "",
    email: "",
    password: "",
    siret: "",
    siege: "",
    city: "",
    cp: "",
    name: "",
    lastname: "",
  });
  return (
    <vendeurInscriptionContext.Provider value={[submit, setSubmit]}>
      {props.children}
    </vendeurInscriptionContext.Provider>
  );
}
