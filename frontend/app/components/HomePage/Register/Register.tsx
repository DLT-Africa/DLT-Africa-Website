import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import WaitlistModal from "../WaitlistModal/WaitlistModal";

const RegisterOnline: React.FC = () => {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] =
    useState<boolean>(false);
  const [waitlistActive, setWaitlistActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWaitlistStatus = async (): Promise<void> => {
      try {
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
          }/api/v1/settings/waitlist-status`
        );
        setWaitlistActive(response.data.waitlistActive);
      } catch (error) {
        console.error("Error fetching waitlist status:", error);
        // Default to false if error occurs
        setWaitlistActive(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWaitlistStatus();
  }, []);

  return (
    <div className="bg-gray-100  flex justify-center items-center">
      <div className="max-w-screen-xl p-8 w-full pt-[57px]">
        <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-20">
          <img
            className="w-full lg:w-auto lg:max-w-[527px] h-[204px] lg:h-[344px] flex-shrink-0 rounded-[20px] "
            src="/images/hero-section.png"
            loading="lazy"
            alt="Hero section"
          />

          <div className="inline-flex flex-col justify-left gap-[18px] text-center w-full lg:w-auto lg:text-left  ">
            <div className="text-[30px] lg:text-left xl:text-left lg:text-[45px] font-semibold ">
              <span className="text-[#252A24]">Ready To Change</span>{" "}
              <span className="text-[#FC7C13]">Your Life?</span>
            </div>
            <div className="w-full   lg:max-w-[450px]  xl:w-[540px] lg:text-[20px] break-words text-wrap text-[16px] lg:text-left xl:text-left font-serif">
              Enroll in our Class and receive personalized mentoring from
              seasoned developers and product designers. Dive into interactive
              sessions, hands-on projects, and accelerate your skills from the
              comfort of your home.
            </div>

            {isLoading ? (
              <div className="w-full lg:w-[353px] flex items-center justify-center h-[55px] p-[10px] rounded-lg bg-gray-200 text-gray-500">
                Loading...
              </div>
            ) : waitlistActive ? (
              <button
                onClick={() => setIsWaitlistModalOpen(true)}
                className="w-full lg:w-[353px] flex items-center justify-center h-[55px] p-[10px] rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition duration-500 ease-in-out transform hover:-translate-y-1"
              >
                Join Waitlist
              </button>
            ) : (
              <Link href="/application" className="w-full lg:w-[353px]">
                <div className="w-full flex items-center justify-center h-[55px] p-[10px] rounded-lg border-solid border-2 border-orange-500 text-orange-500 hover:bg-orange-100 transition duration-500 ease-in-out transform hover:-translate-y-1">
                  Register
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
      />
    </div>
  );
};

const RegisterOffline: React.FC = () => {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] =
    useState<boolean>(false);
  const [waitlistActive, setWaitlistActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWaitlistStatus = async (): Promise<void> => {
      try {
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
          }/api/v1/settings/waitlist-status`
        );
        setWaitlistActive(response.data.waitlistActive);
      } catch (error) {
        console.error("Error fetching waitlist status:", error);
        setWaitlistActive(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWaitlistStatus();
  }, []);

  return (
    <div className="w-auto h-auto bg-[#186106] items-center flex justify-center overflow-hidden  ">
      <div className="flex justify-center items-center text-center relative ">
        <div className="absolute xl:left-[-400px] lg:left-[-300px] md:left-[-200px] sm:left-[-100px] left-0 top-0">
          <img
            src="Grouping162.png"
            className="w-[390px] h-[400px] ml-[-100px] "
            loading="lazy"
            alt="Background decoration"
          />
        </div>
        <div className="flex items-center flex-col gap-10">
          <h1 className="text-[#F7FCFE] font-serif text-[30px] font-semibold leading-9 tracking-[2.52px]  mt-[100px] w-[300px] xl:w-[600px] lg:w-[300px] ">
            <span>Register for our </span>
            <span className="text-orange-500 text-[30px] font-serif font-semibold leading-[60px] tracking-[2.52px]">
              Physical Class
            </span>
          </h1>

          <div className="lg:w-[900px]">
            <p className="text-[#F7FCFE] font-serif lg:text-[20px] text-[14px] opacity-75 mt-[-40px] p-5 ">
              Apply for our Physical Class and unlock personalized mentoring
              from seasoned developers and product designers. Immerse yourself
              in a vibrant environment tailored for growth. Dive into hands-on
              projects, connect with industry communities, and accelerate your
              career journey with us
            </p>
          </div>

          {isLoading ? (
            <div className="w-[200px] mt-[-15px] z-10 xl:w-[350px] lg:w-[320px] md:w-[300px] h-[55px] p-[10px] text-[16px] flex justify-center items-center gap-[10px] rounded-lg bg-gray-400 text-white mb-14">
              Loading...
            </div>
          ) : waitlistActive ? (
            <button
              onClick={() => setIsWaitlistModalOpen(true)}
              className="w-[200px] mt-[-15px] z-10 xl:w-[350px] lg:w-[320px] md:w-[300px] h-[55px] p-[10px] text-[16px] flex justify-center items-center gap-[10px] rounded-lg bg-orange-500 text-[#F7FCFE] mb-14 transition duration-500 ease-in-out transform hover:-translate-y-1"
            >
              Join Waitlist
            </button>
          ) : (
            <Link
              href="/application"
              className="w-[200px] mt-[-15px] z-10 xl:w-[350px] lg:w-[320px] md:w-[300px]"
            >
              <div className="w-full h-[55px] p-[10px] text-[16px] flex justify-center items-center gap-[10px] rounded-lg bg-orange-500 text-[#F7FCFE] mb-14 transition duration-500 ease-in-out transform hover:-translate-y-1">
                Register
              </div>
            </Link>
          )}
        </div>
        <div className="absolute xl:right-[-380px] lg:right-[-290px] md:right-[-200px] sm:right-[-200px] bottom-0 right-[-100px]">
          <img
            src="/images/Group164.png"
            alt="image"
            className="h-[300px]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
      />
    </div>
  );
};

export { RegisterOnline, RegisterOffline };
