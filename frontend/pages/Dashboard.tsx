import React from "react";

export default function Dashboard() {
  return (
    <div className="bg-stone-900  sm:py-16 py-24 flex  flex-col items-center justify-start min-h-screen gap-8 w-full z-0">
      <div className="  w-11/12 bg-stone-800  rounded-2xl flex flex-col items-start justify-start text-white py-3 px-6 ">
        <div className="flex  items-end justify-center  gap-2 ">
          <p className="sm:text-5xl text-3xl text-[#dddf00] font-slack">
            $80,000{" "}
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
          />
        </div>
        <button className="sm:text-2xl text-x/l py-1 px-3 rounded-md transition-all duration-150 ease-linear hover:bg-[#bbbf00] hover:shadow-xl  hover:shadow-[#dddf00] hover:text-stone-900 border border-dashed border-[#dddf00] text-[#dddf00]  font-slack font-extralight mt-10 ">
          Submit
        </button>
      </div>
      <div className=" w-11/12 bg-stone-800  rounded-2xl flex flex-col items-start justify-start text-white  py-3 px-6">
        <div className="flex  items-end justify-center  gap-2 ">
          <p className="sm:text-5xl text-3xl text-[#dddf00] font-slack">
            $20,000{" "}
          </p>{" "}
          <span>:Borrowed</span>
        </div>
        <p className="mt-4 text-xs">Want to Borrow More ??</p>
        <div className="flex sm:gap-8 gap-4 justify-start items-center w-full mt-8">
          <p className="text-sm sm:text-base"> Enter Amount</p>{" "}
          <input
            type="number"
            className="bg-transparent shadow-xl shadow-[#dddf00] border-none active:border-none focus:border-none focus:outline-none rounded-md p-3 sm:text-4xl text-xl text-center active:border-black w-4/6 font-slack"
            placeholder="Amount"
          />
          <input
            type="number"
            className="bg-transparent shadow-xl shadow-[#dddf00] border-none active:border-none focus:border-none focus:outline-none p-3 rounded-md sm:text-2xl text-xs text-center active:border-black w-1/3 font-slack"
            placeholder="Installments"
          />
        </div>
        <button className="sm:text-2xl text-x/l py-1 px-3 rounded-md transition-all duration-150 ease-linear hover:bg-[#bbbf00] hover:shadow-xl  hover:shadow-[#dddf00] hover:text-stone-900 border border-dashed border-[#dddf00] text-[#dddf00]  font-slack font-extralight mt-10 ">
          Submit
        </button>
      </div>
      <div className=" w-11/12 bg-stone-800  rounded-2xl flex flex-col items-start justify-start text-white py-3 px-6 ">
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
      </div>
      <div className=" w-11/12 bg-stone-800  rounded-2xl flex flex-col items-start justify-start text-white py-3 px-6 ">
        <div className="flex  items-end justify-center  gap-2 ">
          <p className="sm:text-5xl text-3xl text-[#dddf00] font-slack">
            Repay:)
          </p>{" "}
        </div>
        <p className="mt-4 text-xs">Thanks for repaying the payments</p>

        <button className="sm:text-2xl mx-auto my-auto text-x/l py-1 px-3 rounded-md transition-all duration-150 ease-linear hover:bg-[#bbbf00] hover:shadow-xl  hover:shadow-[#dddf00] hover:text-stone-900 border border-dashed border-[#dddf00] text-[#dddf00]  font-slack font-extralight mt-10 ">
          Repay
        </button>
      </div>
    </div>
  );
}
