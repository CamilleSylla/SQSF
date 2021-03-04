import NavBar from "./Nav";

export default function Layout ({children}) {

    return <>
    <NavBar/>
    {children}
    </>

}