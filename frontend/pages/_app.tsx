import Navbar from "../components/Navbar";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { polygonMumbai } from "wagmi/chains";

const chains = [polygonMumbai];

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "530762b977c5f45d1576eeadd3f24410" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "Slice3", chains }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="relative">
      <WagmiConfig client={wagmiClient}>
        <div>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </WagmiConfig>

      <Web3Modal
        projectId="530762b977c5f45d1576eeadd3f24410"
        ethereumClient={ethereumClient}
      />
    </div>
  );
}
