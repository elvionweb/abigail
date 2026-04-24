import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { SITE_CONFIG } from "../config";
import FloatingHearts from "./FloatingHearts";

const titleText = `Happy Birthday, ${SITE_CONFIG.herName} ❤️`;

function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, -400]);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let idx = 0;
    const timer = setInterval(() => {
      idx += 1;
      setTyped(titleText.slice(0, idx));
      if (idx >= titleText.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative flex h-screen items-center justify-center overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-cover bg-center"
      >
        <img src="/photos/ank.jpeg" alt={SITE_CONFIG.herName} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-romantic-dark/70 via-romantic-dark/55 to-romantic-dark/90" />
      <FloatingHearts scoped />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h1 className="font-playfair text-5xl text-gold md:text-7xl" style={{ textShadow: "0 0 20px rgba(212,175,55,0.55)" }}>
          {typed}
          {!done && <span className="animate-pulse">|</span>}
        </h1>
        {done && (
          <>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 font-playfair text-xl italic text-offwhite md:text-2xl"
            >
              {SITE_CONFIG.heroSubheading}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mx-auto mt-6 max-w-[600px] font-body text-base text-offwhite/80 md:text-lg"
            >
              {SITE_CONFIG.heroMessage}
            </motion.p>
          </>
        )}
      </div>
      <button
        onClick={() => document.querySelector("#your-story")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-gold"
        aria-label="Scroll down"
      >
        <span className="block animate-bounce text-3xl">⌄</span>
      </button>
    </section>
  );
}

export default Hero;
