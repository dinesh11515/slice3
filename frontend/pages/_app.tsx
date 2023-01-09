import Navbar from "../components/Navbar";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../context/stateContext";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { polygonMumbai } from "wagmi/chains";

const chains = [polygonMumbai];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "530762b977c5f45d1576eeadd3f24410" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "Slice3", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);
export default function App({ Component, pageProps }: AppProps) {
  return (

    <div className="relative">
  
      <Navbar />
      <Component {...pageProps} />
    </div>

    <>
      <WagmiConfig client={wagmiClient}>
        <Layout>
          <Navbar />
          <Component {...pageProps} />
        </Layout>
      </WagmiConfig>

      <Web3Modal
        projectId="530762b977c5f45d1576eeadd3f24410"
        ethereumClient={ethereumClient}
      />
    </>

  );
}
