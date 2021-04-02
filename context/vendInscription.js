import React, { useState, createContext } from "react";

export const VendeurInscriptionContext = createContext();

export function VendeurInscriptionProvider(props) {
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
    <VendeurInscriptionContext.Provider value={[submit, setSubmit]}>
      {props.children}
    </VendeurInscriptionContext.Provider>
  );
}
