import { createContext, useState } from "react";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";

export const stateContext = createContext<any>("");

export default function Layout({ children }: any) {
  const [connected, setConnected] = useState<boolean>(false);
  const [provider, setProvider] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string>("");
  const networks = {
    mumbai: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: "Mumbai Testnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
  };

  function createSiweMessage(address: string, statement: string) {
    const domain = window.location.host;
    const origin = window.location.origin;
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
    });
    return message.prepareMessage();
  }

  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      if ((await signer.getChainId()) != 80001) {
        await (window as any).ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks["mumbai"],
            },
          ],
        });
      }
      const message = createSiweMessage(
        await signer.getAddress(),
        "We need you to sign this message to use the Slice3 services"
      );
      await signer.signMessage(message);
      setProvider(signer);
      setConnected(true);
      const address = await signer.getAddress();
      setAccount(address);
    } catch (err) {
      alert(err);
    }
  };
  const disconnect = async () => {
    setConnected(false);
    setProvider(null);
    setContract(null);
    setAccount("");
  };

  return (
    <stateContext.Provider
      value={{
        connected,
        provider,
        contract,
        account,
        connectWallet,
        disconnect,
      }}
    >
      {children}
    </stateContext.Provider>
  );
}
