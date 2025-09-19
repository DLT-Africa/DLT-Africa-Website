"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
} from "react-icons/fa";

// Dynamic content data array
const dynamicContent = [
    {
        id: 1,
        image: "/splash/predemo.svg",
        title: "Welcome to DLT HUB",
        description: "Cohorts having their pre-demo, so we filter out the best and rebuild on their ideas."
    },
    {
        id: 2,
        image: "/splash/live-training.svg",
        title: "Welcome to DLT HUB",
        description: "Cohorts getting live training of our bootcamp from industries finest."
    },
    {
        id: 3,
        image: "/splash/morph.svg",
        title: "Welcome to DLT HUB",
        description: "DLT Community Live at the Morph Web3 event in Lagos, Nigeria."
    },
    {
        id: 4,
        image: "/splash/summer-crash.svg",
        title: "Welcome to DLT HUB",
        description: "Live sessions from our free Summer Crash bootcamp, happening every Summer."
    },
    {
        id: 5,
        image: "/splash/akure.svg",
        title: "Welcome to DLT HUB",
        description: "DLT Team members at the Federal University of Akure (FUTA) Nigeria hosting a community event for our partner."
    },
    {
        id: 6,
        image: "/splash/crossfi-mainnet.svg",
        title: "Welcome to DLT HUB",
        description: "DLT Team hosting Crossfi Mainnet Launch Party Live at our bootcamp."
    },
    {
        id: 7,
        image: "/splash/summer-winner.svg",
        title: "Welcome to DLT HUB",
        description: "Winner from one of our Free Summer Crash Bootcamp."
    },
    {
        id: 8,
        image: "/splash/live-chat.svg",
        title: "Welcome to DLT HUB",
        description: "Live chat session with Sophia Dew Dowel Lead Celo Foundation."
    },
    {
        id: 9,
        image: "/splash/friday-games.svg",
        title: "Welcome to DLT HUB",
        description: "Friday Games at DLT Africa."
    },
    {
        id: 10,
        image: "/splash/lautech.svg",
        title: "Welcome to DLT HUB",
        description: "DLT Team Live at Ladoke Akintola University of Technology (LAUTECH)"
    },
    {
        id: 11,
        image: "/splash/friday-games2.svg",
        title: "Welcome to DLT HUB",
        description: "Friday Games at DLT Africa."
    }
];

export default function DestinationScreen({ showImage }) {
    const router = useRouter();
    const [currentContentIndex, setCurrentContentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Auto-cycle through content every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);

            setTimeout(() => {
                setCurrentContentIndex((prevIndex) =>
                    (prevIndex + 1) % dynamicContent.length
                );
                setIsAnimating(false);
            }, 300); // Half of the transition duration
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const handleDestinationClick = (destination) => {
        // Navigate based on destination
        switch (destination) {
            case "DEV STUDIO":
                window.open("https://dlthub.io/", "_blank", "noopener,noreferrer");
                break;
            case "BOOTCAMP":
                router.push("/bootcamp");
                break;
            case "INCUBATION":
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                break;
            default:
                router.push("/bootcamp");
        }
    };

    return (
        <div className="flex md:flex-row flex-col min-h-screen md:h-screen">
            {/* Left Side - Dynamic Content */}
            <div className="overflow-hidden relative w-full h-64 sm:h-80 md:h-full md:w-1/2 lg:w-1/2 flex-shrink-0">
                <div className="relative w-full h-full">
                    <Image
                        src={dynamicContent[currentContentIndex].image}
                        alt={dynamicContent[currentContentIndex].description}
                        fill
                        className={`object-cover transition-all duration-600 ease-in-out ${isAnimating ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                            }`}
                    />

                    {/* Overlay text on image */}
                    <div className={`absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 p-3 sm:p-4 w-[85%] sm:w-[75%] md:w-[70%] bg-white rounded-lg transition-all duration-600 ease-in-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                        }`}>
                        <h2 className="mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[48px] font-bold text-black font-sfPro leading-tight">
                            {dynamicContent[currentContentIndex].title.split(' ').map((word, index) =>
                                word === 'DLT' ? (
                                    <span key={index} className="text-orange-500">{word} </span>
                                ) : (
                                    <span key={index}>{word} </span>
                                )
                            )}
                        </h2>
                        <p className="text-xs sm:text-sm md:text-sm text-gray-600 font-sfPro leading-relaxed">
                            {dynamicContent[currentContentIndex].description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Destination Selection */}
            <div className={`${showImage ? "relative" : ""} flex flex-col w-full md:w-1/2 lg:w-1/2 bg-[#F6F6F6] min-h-screen md:h-full overflow-hidden`}>
                <div className="flex flex-col flex-1 p-4 sm:p-6 md:p-8 lg:pt-24 space-y-6 sm:space-y-8 md:space-y-0 md:justify-between overflow-y-auto">
                    {/* Header */}
                    <div className="text-center flex-shrink-0">
                        <h1 className="mb-2 sm:mb-3 md:mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black font-sfPro">
                            Welcome to <span className="text-orange-500">DLT HUB</span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 font-sfPro px-2 sm:px-4 md:px-0">
                            Choose your path to Web3 excellence and join our community of innovators.
                        </p>
                    </div>

                    {/* Destination Choices */}
                    <div className="flex flex-col flex-1 md:flex-none md:justify-center">
                        <h2 className="mb-4 sm:mb-6 md:mb-8 text-lg sm:text-xl font-medium text-center text-black font-sfPro">
                            Choose a destination
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-[13px] mb-6 sm:mb-8 md:mb-0">
                            <button
                                onClick={() => handleDestinationClick("DEV STUDIO")}
                                className="flex justify-center items-center border-[1px] border-[#C54809] rounded-lg text-[#C54809] font-semibold text-sm sm:text-base md:text-lg hover:bg-[#C54809]/20 transition-all duration-300 transform hover:scale-105 font-sfPro py-3 sm:py-4 lg:h-[173px] h-12 sm:h-14 md:h-auto md:py-4"
                            >
                                DEV STUDIO
                            </button>
                            <button
                                onClick={() => handleDestinationClick("BOOTCAMP")}
                                className="flex justify-center items-center border-[1px] border-green-500 rounded-lg text-green-500 font-semibold text-sm sm:text-base md:text-lg hover:bg-green-500/20 transition-all duration-300 transform hover:scale-105 font-sfPro py-3 sm:py-4 h-12 sm:h-14 md:h-auto md:py-4"
                            >
                                BOOTCAMP
                            </button>
                            <button
                                onClick={() => handleDestinationClick("INCUBATION")}
                                className="flex justify-center items-center border-[1px] border-orange-500 rounded-lg text-orange-500 font-semibold text-sm sm:text-base md:text-lg hover:bg-orange-500/20 transition-all duration-300 transform hover:scale-105 font-sfPro py-3 sm:py-4 sm:col-span-2 md:col-span-2 lg:col-span-1 h-12 sm:h-14 md:h-auto md:py-4"
                            >
                                INCUBATION
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col space-y-6 sm:space-y-8 md:space-y-6 lg:space-y-0 lg:flex-row lg:justify-between lg:items-end flex-shrink-0">
                        {/* Social Media Icons */}
                        <div className="flex gap-4 sm:gap-5 md:gap-4 justify-center lg:justify-start">
                            <a
                                href="https://www.facebook.com/share/1C7CRtQDN31XBgVb/?mibextid=LQQJ4d"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform duration-300 hover:scale-110"
                            >
                                <FaFacebook className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-black transition-colors duration-300 hover:text-orange-500" />
                            </a>
                            <a
                                href="https://www.instagram.com/dlta_frica/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform duration-300 hover:scale-110"
                            >
                                <FaInstagram className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-black transition-colors duration-300 hover:text-orange-500" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/dlt-africa/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform duration-300 hover:scale-110"
                            >
                                <FaLinkedin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-black transition-colors duration-300 hover:text-orange-500" />
                            </a>
                            <a
                                href="https://twitter.com/dlt_africa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform duration-300 hover:scale-110"
                            >
                                <FaTwitter className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-black transition-colors duration-300 hover:text-orange-500" />
                            </a>
                            <a
                                href="https://github.com/DLT-Africa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform duration-300 hover:scale-110"
                            >
                                <FaGithub className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-black transition-colors duration-300 hover:text-orange-500" />
                            </a>
                        </div>

                        {/* Mission Statement */}
                        <div className="w-full sm:w-auto lg:w-[165px] text-center lg:text-left px-4 sm:px-0">
                            <h3 className="mb-2 text-lg sm:text-xl font-bold text-orange-500 font-sfPro">Our Mission</h3>
                            <p className="text-xs sm:text-sm text-gray-600 font-sfPro leading-relaxed">
                                To help build Web3 talents from ground zero, through full-stack and smart contract developments.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Background Image */}
                <Image
                    src="/splash/splash-image.svg"
                    alt="splash Image"
                    width={100}
                    height={100}
                    className={`transition-all duration-1000 ease-out ${showImage
                        ? "absolute w-[300px] h-[270px] sm:w-[350px] sm:h-[315px] md:w-[400px] md:h-[360px] lg:w-[429px] lg:h-[387px] bottom-[-6rem] sm:bottom-[-7rem] md:bottom-[-7.5rem] left-[-8rem] sm:left-[-9rem] md:left-[-10rem] pointer-events-none"
                        : "fixed bottom-[-1px] z-10 w-[600px] h-[540px] sm:w-[700px] sm:h-[630px] md:w-[801px] md:h-[724px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        }`}
                />
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-3 animate-in slide-in-from-right duration-300">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">Coming Soon!</p>
                        <p className="text-sm text-gray-600">Incubation program is under development</p>
                    </div>
                    <button
                        onClick={() => setShowToast(false)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}