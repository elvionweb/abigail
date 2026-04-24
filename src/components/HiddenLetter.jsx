import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SITE_CONFIG } from "../config";

function HiddenLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const petals = useMemo(() => Array.from({ length: 10 }, (_, i) => i), []);
  const paragraphs = SITE_CONFIG.hiddenLetter.split("\n\n").filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-romantic-deeper px-4 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div key="prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="font-playfair text-lg italic text-gold">I hid something here for you…</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsOpen(true)}
                className="mt-6 animate-glowPulse rounded-full bg-gradient-to-r from-rosegold to-coral px-10 py-4 font-body text-lg text-white"
              >
                Click to reveal something… ✨
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="relative mx-auto mt-10 w-56">
                <div className="h-28 rounded-b-2xl bg-rosegold/30" />
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: -160 }}
                  transition={{ duration: 1 }}
                  className="absolute left-0 top-0 h-20 w-full origin-top rounded-t-2xl bg-rosegold"
                />
              </div>
              <motion.article
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mx-auto mt-8 max-w-[560px] rounded-xl border-2 border-gold bg-cream p-10 text-left text-[#2D2D2D]"
              >
                {paragraphs.map((paragraph, index) => {
                  if (index === 0) {
                    return (
                      <h3 key={`${paragraph}-${index}`} className="font-cursive text-5xl">
                        {paragraph}
                      </h3>
                    );
                  }
                  if (index === paragraphs.length - 1) {
                    return (
                      <p key={`${paragraph}-${index}`} className="mt-8 font-cursive text-4xl italic text-gold">
                        {paragraph}
                      </p>
                    );
                  }
                  return (
                    <p key={`${paragraph}-${index}`} className="mt-5 font-cursive text-3xl leading-[1.9]">
                      {paragraph}
                    </p>
                  );
                })}
                <div className="mt-6 flex justify-center">
                  <svg viewBox="0 0 100 100" className="h-16 w-16">
                    <circle cx="50" cy="50" r="45" fill="#8B1A2A" />
                    <path d="M50 70 C25 54 24 32 40 30 C46 30 50 35 50 35 C50 35 54 30 60 30 C76 32 75 54 50 70" fill="#D4AF37" />
                  </svg>
                </div>
              </motion.article>
              {petals.map((p) => (
                <span
                  key={p}
                  className="pointer-events-none absolute top-0 animate-petalFall text-2xl text-blush"
                  style={{
                    left: `${(p + 1) * 9}%`,
                    animationDelay: `${(p % 5) * 0.5}s`,
                    animationDuration: `${5 + (p % 5)}s`,
                  }}
                >
                  ❀
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default HiddenLetter;
