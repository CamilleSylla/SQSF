import { useEffect } from "react";
import NavBar from "./Nav";

export default function Layout ({children}) {
    // const urlParams = new URLSearchParams('dashboard');
    // console.log(urlParams.has('dashboard'))
    return <>
    {/* { typeof window !== "undefined" && window.location.href.indexOf("dashboard") ? null :  <NavBar/>} */}
    <NavBar/>
    {children}
    </>

}