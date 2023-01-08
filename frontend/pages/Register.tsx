import React from "react";

export default function Register() {
  return (
    <div className=" bg-gradient-to-b from-stone-700 to-[#dddf00] flex items-center justify-center ">
      <div className="min-h-screen w-full  flex items-center  sm:justify-center  justify-start ">
        <div className="flex items-start   justify-start">
          <img
            src="/images/man.png"
            alt="man"
            className=" z-10 w-3/5 sm:w-full "
          />
          <div className="flex items-center flex-col justify-start ">
            <button className="sm:text-2xl text-x/l py-1 px-3 rounded-md transition-all duration-150 ease-linear hover:bg-[#bbbf00] hover:shadow-2xl  hover:shadow-[#dddf00] hover:text-stone-900 border border-dashed border-[#dddf00] text-[#dddf00]  font-slack font-extralight mt-14 mr-16">
              Register
            </button>
            <img
              src="/images/uparr.png"
              alt="uparr"
              className="w-24 mr-16 mt-24 animate-bounce hover:animate-none "
            />
          </div>
        </div>

        <h1 className="font-slack font-semibold sm:text-7xl text-5xl text-center text-stone-900 mt-auto absolute top-3/4 left-2/4 -translate-x-1/2  z-0">
          Registration in One Click
        </h1>
      </div>
    </div>
  );
}
