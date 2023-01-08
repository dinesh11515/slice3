import React, { ChangeEvent, useState, useRef } from "react";
import { Web3Button, Web3Modal, Web3NetworkSwitch } from "@web3modal/react";
import { useContext } from "react";
import { stateContext } from "../context/stateContext";
import UAuth from "@uauth/js";
interface MyVals {
  file: Blob | string;
  name: string;
  description: string;
  contract: string;
}

type boolset = {
  set: React.Dispatch<React.SetStateAction<any>>;
};
export default function Publish({ set }: boolset) {
  const { connectWallet, account } = useContext(stateContext);

  const formEL = useRef<HTMLFormElement>(null!);
  const tokens = process.env.NEXT_PUBLIC_TOKEN;

  const [allInfo, setAllInfo] = useState<MyVals>({
    file: "",
    name: "",
    description: "",
    contract: "",
  });
  function close(val: any) {
    set(val);
  }

  function handleInput(e: any) {
    setAllInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  const getCreditScore = async () => {
    const res = await fetch(
      `https://api.nomis.cc/api/v1/polygon/wallet/${account}/score`
    );
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="bg-gradient-to-br from-black to-zinc-700 min-h-screen w-full bg-cover bg-no-repeat flex  items-center justify-center ">
      {/* <form
        onSubmit={(e: any) => {
          e.preventDefault();

          formEL.current.reset();
          
        }}
        className="flex w-11/12 md:w-2/3 rounded-lg bg-white/30 backdrop-blur-sm flex-col items-start p-3 justify-center"
        ref={formEL}
      >
        <span onClick={()=> close(false)} className="w-full float-right">
          <img src="/images/cross1.png" alt="cross" className="absolute w-12 ml-auto cursor-pointer right-0 p-2" />
        </span>
        <h5 className="md:text-2xl text-xl mx-auto text-center w-full">
          Fill Your Details
        </h5>
        <h6 className="mt-2">File</h6>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
         
          className="file:bg-gray-600 file:border-none file:p-2 file:py-1 file:shadow-md file:shadow-gray-500 file:text-white file:px-2 file:rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-xl text-sm my-2 w-11/12 md:w-2/6"
        />

        <h6>Name</h6>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name of NFT"
          onChange={handleInput}
          className="w-11/12 text-start px-4 rounded-lg p-0.5 my-2"
        />
        <h6>Description</h6>
        <input
          placeholder="Description of NFT"
          className="w-11/12 text-start px-4 rounded-lg p-0.5 my-2"
          type="text"
          id="discription"
          name="description"
          onChange={handleInput}
        />
        <h6>Mint To...</h6>
        <input
          placeholder="Address you want to Mint"
          className="w-11/12 text-start px-4 rounded-lg p-0.5 my-2 "
          type="text"
          id="contract"
          name="contract"
          onChange={handleInput}
        />
        <button
          className="bg-gray-600 shadow-md shadow-gray-500 rounded-lg py-0.5 px-2 text-white transition-all duration-300 ease-linear mt-3 hover:bg-gray-400  mx-auto w-11/12 md:w-2/6"
          type="submit"
        >
          Submit
        </button>
      </form> */}
      <div className="flex w-11/12 md:w-2/3 rounded-lg bg-white/30 backdrop-blur-sm flex-col items-start p-3 justify-center ">
        <p>
          Connect your wallet and check your credit score of your wallet and
          register here to avail some credit
        </p>
        <button onClick={connectWallet}>Connect wallet</button>
        <Web3Button icon="show" label="Connect Wallet" balance="show" />
      </div>
    </div>
  );
}
