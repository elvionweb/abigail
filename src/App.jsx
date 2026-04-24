import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import BirthdayWish from "./components/BirthdayWish";
import CustomCursor from "./components/CustomCursor";
import FloatingHearts from "./components/FloatingHearts";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import HiddenLetter from "./components/HiddenLetter";
import LoadingSplash from "./components/LoadingSplash";
import LoveCounter from "./components/LoveCounter";
import LoveReasons from "./components/LoveReasons";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import SurpriseEnding from "./components/SurpriseEnding";
import Timeline from "./components/Timeline";
import VoiceMessage from "./components/VoiceMessage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const shown = sessionStorage.getItem("abigail-loading-seen");
    if (shown) {
      setLoading(false);
      return undefined;
    }
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("abigail-loading-seen", "yes");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <AnimatePresence>{loading && <LoadingSplash />}</AnimatePresence>
      <CustomCursor />
      <FloatingHearts />
      <Navbar />
      <Hero />
      <Timeline />
      <Gallery />
      <VoiceMessage />
      <LoveReasons />
      <HiddenLetter />
      <BirthdayWish />
      <LoveCounter />
      <SurpriseEnding />
      <Footer />
      <MusicPlayer />
    </div>
  );
}

export default App;
