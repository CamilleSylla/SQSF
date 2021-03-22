import Layout from "../components/Layout";
import { CartProvider } from "../context/cartContext";
import { UserProvider } from "../context/userLog";
import { vendeurInscriptionProvider } from "../context/vendInscription";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <vendeurInscriptionProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </vendeurInscriptionProvider>
    </UserProvider>
  );
}

export default MyApp;
