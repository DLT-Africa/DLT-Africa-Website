"use client";
import { useState, useEffect } from "react";
import WelcomeScreen from "../components/SplashScreens/WelcomeScreen";
import DestinationScreen from "../components/SplashScreens/DestinationScreen";

export default function Splash() {
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
    <div className="overflow-hidden relative w-full h-screen">
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
        className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
          currentScreen === 1 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <DestinationScreen showImage={showImage} />
      </div>
    </div>
  );
}
