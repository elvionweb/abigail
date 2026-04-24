import { motion } from "framer-motion";
import { SITE_CONFIG } from "../config";

function Timeline() {
  return (
    <section id="your-story" className="relative bg-romantic-dark px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-playfair text-4xl text-gold md:text-5xl">Your Story</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center font-body text-offwhite/80">
          Not every connection needs time to feel memorable even before it truly begins, some leave a quiet impression.
        </p>
        <div className="relative mt-12 sm:mt-16">
          <div className="absolute left-8 sm:left-12 top-0 h-full w-[2px] bg-gradient-to-b from-rosegold to-coral md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-12">
            {SITE_CONFIG.timelineEntries.map((entry, index) => {
              const even = index % 2 === 0;
              return (
                <motion.div
                  key={entry.date + entry.title}
                  initial={{ opacity: 0, x: even ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                  className={`relative w-full md:flex ${even ? "md:justify-start" : "md:justify-end"}`}
                >
                  <div className="absolute left-8 sm:left-12 top-8 h-4 w-4 -translate-x-1/2 rounded-full bg-rosegold shadow-[0_0_14px_rgba(201,112,106,0.8)] md:left-1/2" />
                  <img
                    src={entry.photo}
                    alt={entry.title}
                    className="absolute left-8 sm:left-12 top-0 h-16 w-16 sm:h-20 sm:w-20 -translate-x-1/2 rounded-full border-[3px] border-rosegold object-cover md:left-1/2"
                  />
                  <div className="ml-[5rem] mr-2 sm:ml-[7.5rem] sm:mr-4 rounded-xl border border-rosegold/70 bg-romantic-card p-4 sm:p-6 md:mx-0 md:w-[45%]">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gold">{entry.date}</p>
                    <h3 className="mt-1 sm:mt-2 font-playfair text-xl sm:text-2xl font-bold text-white">{entry.title}</h3>
                    <p className="mt-2 text-sm sm:text-base font-body text-offwhite/80 leading-relaxed">{entry.caption}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
