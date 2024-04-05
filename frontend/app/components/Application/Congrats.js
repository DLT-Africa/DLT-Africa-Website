import Image from "next/image";
import Vector1 from "../../../public/Vector1.png";
import Vector2 from "../../../public/Vector2.png";
import DLT from "../../dlt.png";

const Congrats = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#FFEFD4] h-[545px] w-[1013px] rounded-[20px] flex justify-center items-center relative">
        <div className="flex flex-col text-center">
          <h1 className="text-[#FC7C13] w-[400px] text-4xl leading-[43.2px] tracking-[7%] mx-auto">
            Congratulations!!!
            <br />
          </h1>
          <div>
            <p className="w-[796px] h-[48px] opacity-75%">
              Your application has successfully been submitted, you&apos;ll get
              an email from our
              <br /> team on your next step of action.
            </p>
          </div>
          <div className="absolute left-[88px] top-[444px]">
            <Image className="h-[67px] w-[41px]" src={DLT} alt="" />
          </div>
        </div>

        <div className="w-[724.48px] h-[666.52px] top-[2px] left-[2px] Border-[2px] Rotation-[56.1°] absolute">
          <Image src={Vector2} alt="Example" />
        </div>

        <div className="w-[724.48px] h-[666.52px] top-[355.17px] left-[333.69px] Border-[2px] Rotation-[-7.47°] absolute">
          <Image src={Vector1} alt="Example" />
        </div>
      </div>
    </div>
  );
};

export default Congrats;
