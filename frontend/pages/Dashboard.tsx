import React, { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useContract, useSigner, useAccount } from "wagmi";
import { contractAddress, abi } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "../components/DashboardLayout";
export default function () {
  const { isOpen, open, close } = useWeb3Modal();
  const { data: signer, isError, isLoading } = useSigner();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const [hasRegistered, setHasRegistered] = useState<boolean>(false);

  const contract = useContract({
    address: contractAddress,
    abi,
    signerOrProvider: signer,
  });

  const connect = async () => {
    await open();
  };

  const getCreditScore = async () => {
    const res = await fetch(
      `https://api.nomis.cc/api/v1/polygon/wallet/${address}/score`
    );
    const { data } = await res.json();
    return data.score;
  };

  const register = async () => {
    try {
      let score = await getCreditScore();
      score = Math.floor(score);
      const tx = await contract?.register(score);
      await tx.wait();
      toast.success("Registration successful");
    } catch (err) {
      console.log(err, "Registration failed");
    }
  };

  const setRegistered = async () => {
    try {
      const user = await contract?.users(address);
      if (user.balance > 0) {
        setHasRegistered(true);
      }
    } catch (err) {
      console.log(err, "setRegistered");
    }
  };

  useEffect(() => {
    if (isConnected) {
      setRegistered();
    }
  }, [signer]);

  return (
    <div>
      {hasRegistered ? (
        <DashboardLayout />
      ) : (
        <div className=" bg-gradient-to-b from-stone-700 to-[#dddf00] flex items-center justify-center ">
          <div className="min-h-screen w-full  flex items-center  sm:justify-center  justify-start ">
            <div className="flex items-start   justify-start">
              <img
                src="/images/man.png"
                alt="man"
                className=" z-10 w-3/5 sm:w-full "
              />
              <div className="flex items-center flex-col justify-start ">
                {isConnected ? (
                  <button
                    className="sm:text-2xl text-x/l py-1 px-3 rounded-md transition-all duration-150 ease-linear hover:bg-[#bbbf00] hover:shadow-2xl  hover:shadow-[#dddf00] hover:text-stone-900 border border-dashed border-[#dddf00] text-[#dddf00]  font-slack font-extralight mt-14 mr-16"
                    onClick={register}
                  >
                    Register
                  </button>
                ) : (
                  <button
                    className="sm:text-2xl text-x/l py-1 px-3 rounded-md transition-all duration-150 ease-linear hover:bg-[#bbbf00] hover:shadow-2xl  hover:shadow-[#dddf00] hover:text-stone-900 border border-dashed border-[#dddf00] text-[#dddf00]  font-slack font-extralight mt-14 mr-16"
                    onClick={connect}
                  >
                    Connect
                  </button>
                )}
                <img
                  src="/images/uparr.png"
                  alt="uparr"
                  className="w-24 mr-16 mt-24 animate-bounce hover:animate-none "
                />
              </div>
            </div>

            <h1 className="font-slack font-semibold sm:text-7xl text-5xl text-center text-stone-900 mt-auto absolute top-3/4 left-2/4 -translate-x-1/2  z-0">
              {isConnected
                ? "Registration in One Click"
                : "Connect wallet to register"}
            </h1>
            <ToastContainer />
          </div>
        </div>
      )}
    </div>
  );
}
