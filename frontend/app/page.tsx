"use client";
import { useState, useEffect } from "react";
import WelcomeScreen from "./components/SplashScreens/WelcomeScreen";
import DestinationScreen from "./components/SplashScreens/DestinationScreen";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showImage, setShowImage] = useState(false);

  const handleContinue = () => {
    setCurrentScreen(1);
    // Trigger the image animation after a short delay to allow screen transition
    setTimeout(() => {
      setShowImage(true);
    }, 500);
  };

  return (
    <div className="relative w-full h-screen md:overflow-hidden">
      {/* First Screen - Welcome Screen */}
      <div
        className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
          currentScreen === 0 ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <WelcomeScreen onContinue={handleContinue} />
      </div>

      {/* Second Screen - Destination Selection */}
      <div
        className={`absolute inset-0 transition-transform duration-1000 ease-in-out overflow-y-auto md:overflow-hidden ${
          currentScreen === 1 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <DestinationScreen showImage={showImage} />
      </div>
    </div>
  );
}