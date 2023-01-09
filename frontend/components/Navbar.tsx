import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Navbar() {

  const [width, setWidth] = useState<number >(200);
  const [isActive, setIsActive] = useState<boolean>(false);
  const sm: number = 648;


  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window;
      setWidth(width);
      return width
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);


  useEffect(()=>{

    function handleinitialResize() {
      const { innerWidth: width } = window;
     
      return width
    }

    setWidth(handleinitialResize())
  },[])

  
  

  return (

    <nav className="sm:w-full w-2/3   font-slack mx-auto my-1 p-0 sm:border-none border-2 border-dashed border-stone-900 bg-[#dddf00] sm:bg-transparent  sm:rounded-none rounded-xl text-black sm:text-white flex items-start  backdrop-blur-sm justify-center transition-all duration-300 ease-linear fixed z-80 top-0 left-2/4 -translate-x-1/2 float">
     
      <div className=" cursor-pointer z-80   flex items-center mt-3 mx-3 justify-center hover:scale-110 hover:bg-[#dddf00] rounded-md transition-all duration-200 ease-linear hover:text-black hover:px-2">
        <span className="font-press"><img src="/images/card3.png" alt="logo"  className="w-9 mr-2" /></span> Slice3
      </div>
      <div
        className={`h-full py-2 ml-auto z-80  flex items-center gap-6 px-2 justify-end  flex-col sm:flex-row transition-all duration-300 ease-linear`}
      >
        {width < sm    && (
          <div
            className="w-full flex z-80 items-start justify-center cursor-pointer transition-all duration-300 ease-linear p-1 rounded-full bg-[#dddf00]"
            onClick={() => setIsActive(prev => !prev)}
          >
            {!isActive  ? (
              <img src="/images/compass.png" alt="menu" width={"38"} className={`hover:rotate-45 duration-100 transition-all ease-linear`} />
            ) : (
              <img src="/images/close2.png" alt="menu" width={"38"} className={`hover:rotate-90 duration-100 transition-all ease-linear`} />
            )}
          </div>
        )}

        {isActive || width > sm ? (
          <>
            <span className="cursor-pointer hover:bg-[#dddf00]  hover:scale-110 shadow-lime-300 hover:text-zinc-800 z-80  bg-transparent  py-1 px-2 rounded-md transition-all duration-200  ease-linear  ">
            <Link href={"/"}>
             Home
            </Link>
            </span>
            <span className="cursor-pointer hover:bg-[#dddf00]  hover:scale-110 shadow-lime-300 hover:text-zinc-800 z-80  bg-transparent  py-1 px-2 rounded-md transition-all duration-200  ease-linear  ">
            <Link href={"/Dashboard"}>

             Dashboard
            </Link>
            </span>
            <span className="cursor-pointer hover:bg-[#dddf00]  hover:scale-110 shadow-lime-300 hover:text-zinc-800 z-80 bg-transparent  py-1 px-2 rounded-md transition-all duration-200  ease-linear  ">
            <Link href={"/Register"}>

             Register
            </Link>
            </span>
          
          </>
        ) : null}
      </div>
    </nav>
  );
}