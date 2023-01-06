import Navbar from "../components/Navbar";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../context/stateContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Navbar />
      <Component {...pageProps} />
    </Layout>
  );
}
