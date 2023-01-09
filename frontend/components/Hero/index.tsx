import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="text-white flex flex-col items-start justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center w-full mt-24">
        <div className="flex flex-col items-center justify-center w-full sm:mb-20 mb-10 ">
          <p className="font-slack sm:text-6xl text-4xl text-[#dddf00] ">
            The Slice3
          </p>
          <p className="sm:text-2xl text-md ">
            The decentralised way of borrowing and lending money
          </p>
          <p className="sm:w-2/6 w-2/3 text-center text-xs py-2">
            Slice3 Offers Credit based on your wallet credit score which can be
            payed back in instalments.
          </p>
        </div>
        <div className=" bg-[#333533]  w-3/6 flex items-center justify-center flex-col pt-8 rounded-md">
          <Link href={"/"}>
            <p className="sm:text-2xl text-x/l py-1 px-3 rounded-md transition-all duration-150 ease-linear hover:bg-[#bbbf00]  hover:text-stone-900 border border-dashed border-[#dddf00] text-[#dddf00]  font-slack font-extralight">
              Get Started <span>&#10621;</span>
            </p>
          </Link>
          <img src="/images/hero.png" alt="img" className="w-64" />
        </div>
      </div>

      <div className=" flex flex-col items-center justify-center w-full min-h-screen sm:p-14 p-8">
        <div className="grid sm:grid-cols-3 grid-cols-2 items-center gap-5 bg-[#dddf00] p-6 text-black rounded-lg">
          <div className="flex flex-col items-start justify-start w-full hover:shadow-xl shadow-black transition-all duration-150 ease-linear p-2 ">
            <img
              src="/images/compass.png"
              alt="img"
              className="w-12 hover:rotate-180 duration-150 transition-all ease-linear"
            />
            <p className="text-lg mb-3">Borrow</p>
            <p className="text-xs ">
              Get upto 1000$ in just one click based on your credit score of
              your wallet
            </p>
          </div>

          <div className="flex flex-col items-start justify-start w-full  hover:shadow-xl shadow-black transition-all duration-150 ease-linear p-2 ">
            <img
              src="/images/compass.png"
              alt="img"
              className="w-12 hover:rotate-180 duration-150 transition-all ease-linear"
            />
            <p className="text-lg mb-3">Pay later</p>
            <p className="text-xs ">
              You can repay across 12 months, or repay early to save interest.
            </p>
          </div>

          <div className="flex flex-col items-start justify-start w-full  hover:shadow-xl shadow-black transition-all duration-150 ease-linear p-2 ">
            <img
              src="/images/compass.png"
              alt="img"
              className="w-12 hover:rotate-180 duration-150 transition-all ease-linear"
            />
            <p className="text-lg mb-3">Lend</p>
            <p className="text-xs ">
              You can lend your money to others and earn upto 3-4 % of interest
              per month
            </p>
          </div>

          {/* <div className="flex flex-col items-start justify-start w-full  hover:shadow-xl shadow-black transition-all duration-150 ease-linear p-2 ">
            <img
              src="/images/compass.png"
              alt="img"
              className="w-12 hover:rotate-180 duration-150 transition-all ease-linear"
            />
            <p className="text-lg mb-3"> title ttl tile</p>
            <p className="text-xs ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
              recusandae illum dolor, fugit culpa minima voluptatum nihil?
              Magnam quod quo, rem, ipsam porro nostrum consectetur, aperiam
              iste accusamus aut repellat.
            </p>
          </div>

          <div className="flex flex-col items-start justify-start w-full  hover:shadow-xl shadow-black transition-all duration-150 ease-linear p-2 ">
            <img
              src="/images/compass.png"
              alt="img"
              className="w-12 hover:rotate-180 duration-150 transition-all ease-linear"
            />
            <p className="text-lg mb-3"> title ttl tile</p>
            <p className="text-xs ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
              recusandae illum dolor, fugit culpa minima voluptatum nihil?
              Magnam quod quo, rem, ipsam porro nostrum consectetur, aperiam
              iste accusamus aut repellat.
            </p>
          </div>

          <div className="flex flex-col items-start justify-start w-full  hover:shadow-xl shadow-black transition-all duration-150 ease-linear p-2 ">
            <img
              src="/images/compass.png"
              alt="img"
              className="w-12 hover:rotate-180 duration-150 transition-all ease-linear"
            />
            <p className="text-lg mb-3"> title ttl tile</p>
            <p className="text-xs ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
              recusandae illum dolor, fugit culpa minima voluptatum nihil?
              Magnam quod quo, rem, ipsam porro nostrum consectetur, aperiam
              iste accusamus aut repellat.
            </p>
          </div> */}
        </div>


        <div className=" flex  gap-8 flex-wrap items-center justify-evenly text-white sm:my-16 my-8 w-full">
          <div className="flex flex-col items-center justify-center gap-3">
            <img src="/images/coinbase.svg" alt="img" className="w-24 rounded-full" />
            <p className="text-3xl">Coinbase</p>
           

        {/* <div className=" flex  gap-8 flex-wrap items-center justify-evenly text-white sm:my-16 my-8 w-full">
          <div>
            <img src="/images/hero.png" alt="img" className="w-12" />
            <p className="text-3xl">Twitter</p>
            <p className="text-xl">20,000</p>

          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <img src="/images/poly.jpg" alt="img" className="w-24 rounded-full" />
            <p className="text-3xl">Polygon</p>
           
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <img src="/images/unstop.jpg" alt="img" className="w-24 rounded-full" />
            <p className="text-3xl">Unstopable Domain</p>
           
          </div>
        </div> */}
        <div className="flex w-full items-start justify-start flex-col ">
          <img
            src="/images/star.png"
            alt="star"
            className="w-16 sm:mt-8 mb-4 mt-4"
          />
          <p className="sm:text-4xl text-2xl text-white">
            So What You Are Waiting For???
          </p>
          <p className="sm:text-2xl text-xl text-white">
            Lets get started 
          </p>

          <Link
            href={"/"}
            className={
              "w-full flex items-center justify-center mx-auto sm:my-14 my-8"
            }
          >
            <span className="p-6 hover:animate-ping rounded-full  text-black bg-[#dddf00] text-2xl">
              &#8611;
            </span>
          </Link>
        </div>
      </div>

      <footer className="bg-stone-700 text-white grid grid-cols-2 w-full">
        <div className="flex flex-col items-start p-4 justify-start">
          <p className="text-xl">The Slice3</p>
          <p className="text-sm">The Decentralized way of making payments</p>
          <div className="flex w-1/2  gap-4 mt-2">
            <img
              className="cursor-pointer w-12"
              src="/images/twitter.png"
              alt="bg"
            />

            <img
              className="cursor-pointer"
              src="/images/github.png"
              alt="bg"
              width={40}
            />
            <img
              className="cursor-pointer w-12"
              src="/images/linkedin.png"
              alt="bg"
            />
          </div>
        </div>

        <span className=" py-2 mt-auto ml-auto mr-4  text-[#c7c7c7] text-xs">
          ©2022 Slice3. ALL COPYRIGHTS RESERVED
        </span>
      </footer>
    </div>
  );
}
