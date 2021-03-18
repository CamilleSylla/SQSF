import Layout from "../components/Layout";
import { UserProvider } from "../context/userLog";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
