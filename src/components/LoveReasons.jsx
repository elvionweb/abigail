import { motion } from "framer-motion";
import { useState } from "react";
import { SITE_CONFIG } from "../config";

function FlipCard({ reason, index }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const toggleFlip = () => setIsFlipped((prev) => !prev);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="h-[200px] [perspective:1000px] md:h-[220px]"
    >
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={toggleFlip}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleFlip();
          }
        }}
        aria-pressed={isFlipped}
        className="relative h-full w-full rounded-2xl"
      >
        <div
          className={`relative h-full w-full rounded-2xl will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
          style={{ transformOrigin: "center", transform: isFlipped ? "rotateY(180deg) translateZ(0)" : "rotateY(0deg) translateZ(0)" }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-gold/70 bg-romantic-dark shadow-[0_0_18px_rgba(212,175,55,0.3)] [backface-visibility:hidden] [transform:translateZ(1px)]"
            style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
          >
            <p className="font-playfair text-5xl text-gold">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-2 text-2xl">❤️</p>
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center rounded-2xl bg-cream p-5 text-center [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(1px)]"
            style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
          >
            <p className="font-playfair text-2xl italic text-[#2D2D2D]">{reason}</p>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

function LoveReasons() {
  return (
    <section id="my-love" className="px-4 py-24">
      <h2 className="text-center font-playfair text-4xl italic text-gold md:text-5xl">
        What I appreciate about you, Abigal
      </h2>
      <p className="mt-4 text-center font-body text-offwhite/80">Click each card to reveal…</p>
      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SITE_CONFIG.loveReasons.map((reason, index) => (
          <FlipCard key={reason} reason={reason} index={index} />
        ))}
      </div>
    </section>
  );
}

export default LoveReasons;
