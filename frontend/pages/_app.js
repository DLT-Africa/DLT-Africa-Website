import Head from "next/head";
import Layout from "../components/Layout/Layout";
import '../styles/global.css';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DLT Africa Official Website</title>
        <meta name="description" content="DLT Africa Official Website" />
        {/* <link rel="icon" href="/logo.svg" /> */}
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
