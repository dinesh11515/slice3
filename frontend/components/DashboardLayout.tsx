import React from "react";
import { useContract, useSigner, useAccount } from "wagmi";
import { contractAddress, abi } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
export default function DashboardLayout() {
  const { data: signer, isError, isLoading } = useSigner();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const contract = useContract({
    address: contractAddress,
    abi,
    signerOrProvider: signer,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>(null);
  const [investData, setInvestData] = useState<any>(null);

  const getUserData = async () => {
    try {
      const user = await contract?.users(address);
      setUserData(user);
      const invest = await contract?.investors(address);
      setInvestData(invest);
      setLoading(false);
    } catch (err) {
      console.log(err, "getUserData");
    }
  };

  const formatBigNumber = (number: BigNumber) => {
    return ethers.utils.formatEther(number);
  };

  const borrow = async () => {
    try {
      const amount = (
        document.getElementById("borrowAmount") as HTMLInputElement
      ).value;
      const installments = (
        document.getElementById("installments") as HTMLInputElement
      ).value;
      const tx = await contract?.borrow(
        ethers.utils.parseEther(amount.toString()),
        installments
      );
      await tx.wait();
      toast.success("Borrow successful");
      getUserData();
    } catch (err) {
      console.log(err, "Borrow failed");
    }
  };

  const invest = async () => {
    try {
      const amount = (
        document.getElementById("investAmount") as HTMLInputElement
      ).value;
      const tx = await contract?.invest(
        ethers.utils.parseEther(amount.toString()),
        {
          value: ethers.utils.parseEther(amount.toString()),
        }
      );
      await tx.wait();
      toast.success("Invested successful");
      getUserData();
    } catch (err) {
      console.log(err, "Investment failed");
    }
  };

  const withdraw = async () => {
    try {
      const amount = (
        document.getElementById("withdrawAmount") as HTMLInputElement
      ).value;
      const tx = await contract?.withdraw(
        ethers.utils.parseEther(amount.toString())
      );
      await tx.wait();
      toast.success("Withdraw successful");
    } catch (err) {
      toast.warn("you can't withdraw till 30 days");
    }
  };

  const repay = async () => {
    try {
      const tx = await contract?.repay({ value: userData.instalmentAmount });
      await tx.wait();
      toast.success("Repay successful");
    } catch (err) {
      console.log(err, "Repay failed");
    }
  };

  useEffect(() => {
    if (isConnected) {
      getUserData();
    }
  }, [signer]);

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="bg-stone-900  sm:py-16 py-24 flex  flex-col items-center justify-start min-h-screen gap-8 w-full z-0">
          <div className=" w-11/12 bg-stone-800  rounded-2xl flex flex-col items-start justify-start text-white  py-3 px-6">
            <div className="flex  items-end justify-center  gap-2 ">
              <p className="sm:text-5xl text-3xl text-[#dddf00] font-slack">
                {formatBigNumber(userData.borrowedAmount)}{" "}
              </p>{" "}
              <span>:Borrowed</span>
            </div>
            <p className="mt-4 text-xs">
              Want to Borrow More ?? You still have{" "}
              {formatBigNumber(userData.balance)} Matic limit
            </p>
            <div className="flex sm:gap-8 gap-4 justify-start items-center w-full mt-8">
              <p className="text-sm sm:text-base"> Enter Amount</p>{" "}
              <input
                type="number"
                className="bg-transparent shadow-xl shadow-[#dddf00] border-none active:border-none focus:border-none focus:outline-none rounded-md p-3 sm:text-4xl text-xl text-center active:border-black w-4/6 font-slack"
                placeholder="Amount"
                id="borrowAmount"
              />
              <input
                type="number"
                className="bg-transparent shadow-xl shadow-[#dddf00] border-none active:border-none focus:border-none focus:outline-none p-3 rounded-md sm:text-2xl text-xs text-center active:border-black w-1/3 font-slack"
                placeholder="Installments"
                id="installments"
              />
            </div>
            <button
              className="sm:text-2xl text-x/l py-1 px-3 rounded-md transition-all duration-150 ease-linear hover:bg-[#bbbf00] hover:shadow-xl  hover:shadow-[#dddf00] hover:text-stone-900 border border-dashed border-[#dddf00] text-[#dddf00]  font-slack font-extralight mt-10 "
              onClick={borrow}
            >
              Borrow
            </button>
          </div>
          <div className="  w-11/12 bg-stone-800  rounded-2xl flex flex-col items-start justify-start text-white py-3 px-6 ">
            <div className="flex  items-end justify-center  gap-2 ">
              <p className="sm:text-5xl text-3xl text-[#dddf00] font-slack">
                {formatBigNumber(investData.balance)}{" "}
              </p>{" "}
              <span>:Invested</span>
            </div>
            <p className="mt-4 text-xs">Want to Invest More ??</p>
            <div className="flex gap-8 justify-start items-center w-full mt-8">
              <p className="text-sm sm:text-base"> Enter Amount</p>{" "}
              <input
                type="number"
                className="bg-transparent shadow-xl shadow-[#dddf00] border-none active:border-none focus:outline-none  rounded-md sm:text-4xl p-3 text-xl text-center active:outline-none active:border-black w-4/6 font-slack"
                placeholder="Amount"
                id="investAmount"
              />
            </div>
            <button
              className="sm:text-2xl text-x/l py-1 px-3 rounded-md transition-all duration-150 ease-linear hover:bg-[#bbbf00] hover:shadow-xl  hover:shadow-[#dddf00] hover:text-stone-900 border border-dashed border-[#dddf00] text-[#dddf00]  font-slack font-extralight mt-10 "
              onClick={invest}
            >
              Invest
            </button>
            <p className="mt-4 text-xs">Want to Withdraw ??</p>
            <div className="flex gap-8 justify-start items-center w-full mt-8">
              <p className="text-sm sm:text-base"> Enter Amount</p>{" "}
              <input
                type="number"
                className="bg-transparent shadow-xl shadow-[#dddf00] border-none active:border-none focus:outline-none  rounded-md sm:text-4xl p-3 text-xl text-center active:outline-none active:border-black w-4/6 font-slack"
                placeholder="Amount"
                id="withdrawAmount"
              />
            </div>
            <button
              className="sm:text-2xl text-x/l py-1 px-3 rounded-md transition-all duration-150 ease-linear hover:bg-[#bbbf00] hover:shadow-xl  hover:shadow-[#dddf00] hover:text-stone-900 border border-dashed border-[#dddf00] text-[#dddf00]  font-slack font-extralight mt-10 "
              onClick={withdraw}
            >
              withdraw
            </button>
          </div>

          {/* <div className=" w-11/12 bg-stone-800  rounded-2xl flex flex-col items-start justify-start text-white py-3 px-6 ">
            <div className="flex  items-end justify-center  gap-2 ">
              <p className="sm:text-5xl text-3xl text-[#dddf00] font-slack">
                $5,000{" "}
              </p>{" "}
              <span>:Withdrawn</span>
            </div>
            <p className="mt-4 text-xs">Want to Withdraw More ??</p>
            <div className="flex gap-8 justify-start items-center w-full mt-8">
              <p className="text-sm sm:text-base"> Enter Amount</p>{" "}
              <input
                type="number"
                className="bg-transparent shadow-xl shadow-[#dddf00] border-none active:border-none focus:outline-none  rounded-md sm:text-4xl p-3 text-xl text-center active:outline-none active:border-black w-4/6 font-slack"
                placeholder="Amount"
              />
            </div>
            <button className="sm:text-2xl text-x/l py-1 px-3 rounded-md transition-all duration-150 ease-linear hover:bg-[#bbbf00] hover:shadow-xl  hover:shadow-[#dddf00] hover:text-stone-900 border border-dashed border-[#dddf00] text-[#dddf00]  font-slack font-extralight mt-10 ">
              Submit
            </button>
          </div> */}
          <div className=" w-11/12 bg-stone-800  rounded-2xl flex flex-col items-start justify-start text-white py-3 px-6 ">
            <div className="flex  items-end justify-center  gap-2 ">
              <p className="sm:text-5xl text-3xl text-[#dddf00] font-slack">
                Repay:)
              </p>{" "}
            </div>
            <p className="mt-4 text-xs">Thanks for repaying the payments</p>

            <button
              className="sm:text-2xl mx-auto my-auto text-x/l py-1 px-3 rounded-md transition-all duration-150 ease-linear hover:bg-[#bbbf00] hover:shadow-xl  hover:shadow-[#dddf00] hover:text-stone-900 border border-dashed border-[#dddf00] text-[#dddf00]  font-slack font-extralight mt-10 "
              onClick={repay}
            >
              Repay
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
