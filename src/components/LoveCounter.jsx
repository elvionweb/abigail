import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SITE_CONFIG } from "../config";

function getDiff(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  if (Number.isNaN(start.getTime()) || now < start) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const cursor = new Date(start);
  let years = 0;
  let months = 0;

  while (true) {
    const candidate = new Date(cursor);
    candidate.setFullYear(candidate.getFullYear() + 1);
    if (candidate <= now) {
      years += 1;
      cursor.setFullYear(cursor.getFullYear() + 1);
    } else {
      break;
    }
  }

  while (true) {
    const candidate = new Date(cursor);
    candidate.setMonth(candidate.getMonth() + 1);
    if (candidate <= now) {
      months += 1;
      cursor.setMonth(cursor.getMonth() + 1);
    } else {
      break;
    }
  }

  let delta = now - cursor;
  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;
  const days = Math.floor(delta / day);
  delta -= days * day;
  const hours = Math.floor(delta / hour);
  delta -= hours * hour;
  const minutes = Math.floor(delta / min);
  delta -= minutes * min;
  const seconds = Math.floor(delta / sec);
  return { years, months, days, hours, minutes, seconds };
}

function LoveCounter() {
  const [diff, setDiff] = useState(getDiff(SITE_CONFIG.relationshipStartDate));
  useEffect(() => {
    let timeoutId;
    const tick = () => {
      setDiff(getDiff(SITE_CONFIG.relationshipStartDate));
      const delay = 1000 - (Date.now() % 1000);
      timeoutId = setTimeout(tick, delay);
    };
    tick();
    return () => clearTimeout(timeoutId);
  }, []);
  let cards = [
    ["Years", diff.years],
    ["Months", diff.months],
    ["Days", diff.days],
    ["Hours", diff.hours],
    ["Minutes", diff.minutes],
    ["Seconds", diff.seconds],
  ];

  if (diff.years === 0) {
    cards = cards.filter(([label]) => label !== "Years");
    if (diff.months === 0) {
      cards = cards.filter(([label]) => label !== "Months");
    }
  }

  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="px-4 py-24">
      <h2 className="text-center font-playfair text-4xl text-gold md:text-5xl">Every Second With You Counts ⏳</h2>
      <p className="mt-4 text-center tracking-[0.1em] font-body text-offwhite/70">Since {SITE_CONFIG.relationshipStartDate}</p>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-4">
        {cards.map(([label, value]) => (
          <div key={label} className="w-[150px] rounded-xl border border-rosegold bg-romantic-card p-4 text-center shadow-[0_0_20px_rgba(201,112,106,0.25)]">
            <p className="font-playfair text-4xl text-gold" style={{ textShadow: "0 0 10px rgba(212,175,55,0.4)" }}>
              {String(value).padStart(2, "0")}
            </p>
            <p className="mt-2 font-body text-xs uppercase tracking-[0.2em] text-offwhite">{label}</p>
          </div>
        ))}
      </div>
      <p className="mt-7 text-center font-playfair text-xl italic text-offwhite/80">...and every second has been worth it.</p>
    </motion.section>
  );
}

export default LoveCounter;
