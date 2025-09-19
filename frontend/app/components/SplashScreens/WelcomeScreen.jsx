"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function WelcomeScreen({ onContinue }) {
  useEffect(() => {
    // Check if we're on the client side
    if (typeof document === "undefined") {
      return;
    }

    // Prevent body scroll on mobile
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    // Cleanup function to restore scroll when component unmounts
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
        document.body.style.height = "";
        document.body.style.position = "";
        document.body.style.width = "";
      }
    };
  }, []);
  return (
    <div className="flex justify-center items-center h-screen bg-[#F6F6F6] overflow-hidden">
      <Image
        src="/splash/splash-image.svg"
        alt="DLT Hub Background"
        width={100}
        height={100}
        className="w-full h-[90%] animate-fade-in"
        priority
      />
      {/* Welcome Text */}
      <div className="absolute w-[70%] md:h-[80vh] h-[29rem] flex flex-col justify-between items-center">
        <h1 className="flex w-full text-4xl font-bold text-black opacity-0 md:text-8xl font-sfPro animate-slide-down animation-delay-300">
          Welcome
        </h1>
        <h1 className="text-4xl font-bold text-black opacity-0 md:text-8xl font-sfPro animate-slide-up animation-delay-600">
          To
        </h1>
        <div className="flex justify-end items-center w-full opacity-0 animate-slide-right animation-delay-900">
          <span className="text-4xl font-bold text-orange-500 md:text-8xl font-sfPro">
            DLT
          </span>
          <span className="ml-2 text-4xl font-bold text-black md:text-8xl font-sfPro">
            Hub
          </span>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end w-full opacity-0 animate-fade-in-up animation-delay-1200">
          <button
            onClick={onContinue}
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg transition-all duration-200 transform hover:from-orange-600 hover:to-orange-700 hover:scale-105 font-sfPro animate-pulse-subtle"
          >
            Continue
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseSubtle {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 10px 25px rgba(249, 115, 22, 0.3);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 15px 35px rgba(249, 115, 22, 0.4);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slide-down {
          animation: slideDown 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-slide-right {
          animation: slideRight 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-pulse-subtle {
          animation: pulseSubtle 3s ease-in-out infinite;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-900 {
          animation-delay: 0.9s;
        }

        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
      `}</style>
    </div>
  );
}
