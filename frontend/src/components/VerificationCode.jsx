import React from "react";

const VerificationCode = () => {
  return (
    <div className="bg-[#F5F6FA] h-screen flex items-center justify-center px-[35px] md:px-0">
      <div className="w-full md:w-[80%] lg:w-[748px] h-max lg:h-[652px] bg-white shadow-md rounded-lg flex items-center justify-center flex-col py-16 lg:py-0 md:px-10 lg:px-0">
        <div className="px-[20px] lg:px-[29px] py-[20px]">
          <h1 className="text-pc_blue font-gilroy_semibold font-semibold text-[30px] md:text-[36px] leading-tight text-start md:text-center">
            Enter Verification Code
          </h1>
          <p className="font-gilroy_light font-extralight text-pc_black/70 mt-1 w-full md:w-[75%] mx-auto text-start md:text-center">
            Please enter the four digit number that was sent to
            <span> exam******@*****.com</span>
          </p>
        </div>

        <div className="px-[29px] lg:px-32 w-full mt-3 flex items-center justify-center flex-col">
          <div className="grid grid-cols-4 place-content-center place-items-center gap-3 lg:gap-7 w-max">
            <input className="rounded-lg mt-3 py-4 flex items-center justify-center border border-[#939393] w-[47px] h-[45px] font-bold" />
            <input className="rounded-lg mt-3 py-4 flex items-center justify-center border border-[#939393] w-[47px] h-[45px]" />
            <input className="rounded-lg mt-3 py-4 flex items-center justify-center border border-[#939393] w-[47px] h-[45px]" />
            <input className="rounded-lg mt-3 py-4 flex items-center justify-center border border-[#939393] w-[47px] h-[45px]" />
          </div>
          <div className="flex items-center justify-center my-4 lg:my-10 gap-3">
            <span className="text-pc_blue font-bold font-gilroy_semibold">
              00:00
            </span>{" "}
            <span>Resend</span>
          </div>
          <div className="flex items-center justify-center flex-col w-full mx-auto mt-4">
            <button className="mb-4 rounded-lg mt-3 px-6 py-4 bg-pc_orange text-white font-gilroy_semibold font-semibold hover:shadow-md hover:outline hover:outline-slate-200 transition-shadow duration-150 ease-linear capitalize w-full lg:w-[85%] mx-auto">
              Continue{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
