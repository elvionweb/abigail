import { motion } from "framer-motion";
import { SITE_CONFIG } from "../config";

function BirthdayWish() {
  return (
    <section className="px-4 py-24">
      <h2 className="text-center font-playfair text-4xl text-gold md:text-5xl">
        My Birthday Wish For You, {SITE_CONFIG.herName} 🎂
      </h2>
      <motion.article
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: { staggerChildren: 0.3 } } }}
        className="relative mx-auto mt-12 max-w-[680px] border-2 border-gold bg-cream p-12 text-[#2D2D2D] shadow-[inset_0_0_28px_rgba(212,175,55,0.18)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 1px, rgba(253,246,240,1) 1px, rgba(253,246,240,1) 3px)",
        }}
      >
        <svg className="absolute left-2 top-2 h-10 w-10 text-gold" viewBox="0 0 100 100"><path d="M8 50 Q8 8 50 8 M50 8 Q92 8 92 50" stroke="currentColor" fill="none" /></svg>
        <svg className="absolute bottom-2 right-2 h-10 w-10 text-gold" viewBox="0 0 100 100"><path d="M8 50 Q8 92 50 92 M50 92 Q92 92 92 50" stroke="currentColor" fill="none" /></svg>
        {SITE_CONFIG.birthdayWish.map((line, index) => (
          <motion.p
            key={line}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ delay: index * 0.3 }}
            className="mb-4 font-body text-lg leading-relaxed"
          >
            {line}
          </motion.p>
        ))}
        <p className="mt-8 font-cursive text-5xl text-gold">wishing you nothing but good things. ❤️</p>
        <div className="mt-6 flex justify-center">
          <svg viewBox="0 0 100 100" className="h-16 w-16">
            <circle cx="50" cy="50" r="45" fill="#8B1A2A" />
            <path d="M50 70 C25 54 24 32 40 30 C46 30 50 35 50 35 C50 35 54 30 60 30 C76 32 75 54 50 70" fill="#D4AF37" />
          </svg>
        </div>
      </motion.article>
    </section>
  );
}

export default BirthdayWish;
