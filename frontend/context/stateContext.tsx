import { createContext, useState } from "react";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";
import { contractAddress, abi } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      const contract = new ethers.Contract(contractAddress, abi, signer);
      setContract(contract);
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

  const invest = async (amount: number) => {
    try {
      const tx = await contract.invest(
        ethers.utils.parseEther(amount.toString()),
        {
          value: ethers.utils.parseEther(amount.toString()),
        }
      );
      await tx.wait();
      toast.success("Invested successful");
    } catch (err) {
      console.log(err, "Investment failed");
    }
  };

  const withdraw = async (amount: number) => {
    try {
      const tx = await contract.withdraw(
        ethers.utils.parseEther(amount.toString())
      );
      await tx.wait();
      toast.success("Withdraw successful");
    } catch (err) {
      console.log(err, "Withdraw failed");
    }
  };

  const register = async (score: number) => {
    try {
      const tx = await contract.register(score);
      await tx.wait();
      toast.success("Registration successful");
    } catch (err) {
      console.log(err, "Registration failed");
    }
  };

  const borrow = async (amount: number, instalments: number) => {
    try {
      const tx = await contract.borrow(
        ethers.utils.parseEther(amount.toString()),
        instalments
      );
      await tx.wait();
      toast.success("Borrow successful");
    } catch (err) {
      console.log(err, "Borrow failed");
    }
  };

  const repay = async () => {
    try {
      const user = await contract.users(account);
      const tx = await contract.repay({ value: user.instalmentAmount });
      await tx.wait();
      toast.success("Repay successful");
    } catch (err) {
      console.log(err, "Repay failed");
    }
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
