import Layout from "../components/Layout";
import { CartProvider } from "../context/cartContext";
import { UserProvider } from "../context/userLog";
import { VendeurInscriptionProvider } from "../context/vendInscription";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <VendeurInscriptionProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </VendeurInscriptionProvider>
    </UserProvider>
  );
}

export default MyApp;
