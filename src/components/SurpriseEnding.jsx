import { motion } from "framer-motion";
import { Howl } from "howler";
import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "../config";

const SURPRISE_SONG = "/music/happy-birthday-254480.mp3";

function SurpriseEnding() {
  const [showButton, setShowButton] = useState(false);
  const [opened, setOpened] = useState(false);
  const canvasRef = useRef(null);
  const surpriseHowlRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!opened || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 120 }).map(() => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.65) * 12,
      size: Math.random() * 8 + 4,
      alpha: 1,
      color: ["#D4AF37", "#F4A7B9", "#E8856A", "#C9706A"][Math.floor(Math.random() * 4)],
      type: Math.floor(Math.random() * 3),
    }));
    let raf;
    let start = performance.now();
    const draw = (t) => {
      const elapsed = t - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.alpha *= 0.97;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        if (p.type === 0) ctx.fillRect(p.x, p.y, p.size, p.size);
        if (p.type === 1) {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2); ctx.fill();
        }
        if (p.type === 2) ctx.fillText("❤", p.x, p.y);
      });
      ctx.globalAlpha = 1;
      if (elapsed < 3000) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [opened]);

  useEffect(
    () => () => {
      if (surpriseHowlRef.current) {
        surpriseHowlRef.current.unload();
        surpriseHowlRef.current = null;
      }
    },
    [],
  );

  const playSurpriseSong = () => {
    if (!surpriseHowlRef.current) {
      surpriseHowlRef.current = new Howl({
        src: [SURPRISE_SONG],
        html5: true,
        loop: false,
        volume: 0,
      });
    }
    const howl = surpriseHowlRef.current;
    howl.stop();
    const id = howl.play();
    howl.volume(0, id);
    howl.fade(0, 0.8, 1000, id);
  };

  const handleOpenSurprise = () => {
    playSurpriseSong();
    setOpened(true);
  };

  return (
    <section id="surprise" className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24">
      <img src="/photos/ank16.jpeg" alt="surprise" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/75" />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-20" />
      <div className="relative z-30 text-center">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-playfair text-4xl text-gold md:text-6xl" style={{ textShadow: "0 0 18px rgba(212,175,55,0.5)" }}>
          Wait… I have one more surprise for you, {SITE_CONFIG.herName}. 🎁
        </motion.h2>
        {showButton && !opened && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleOpenSurprise}
            className="mt-10 animate-glowPulse rounded-full bg-gradient-to-r from-rosegold to-coral px-10 py-4 text-xl text-white"
          >
            Open Your Surprise 💝
          </motion.button>
        )}
        {opened && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10">
            <div className="mb-4 flex justify-center gap-2">{Array.from({ length: 30 }).map((_, i) => <motion.span key={i} initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: (i - 15) * 10, y: -80 + (i % 6) * 16, opacity: 0 }} transition={{ duration: 1.3, delay: i * 0.02 }} className="text-xl">❤</motion.span>)}</div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mx-auto max-w-3xl whitespace-pre-line font-playfair text-2xl text-white md:text-4xl">
              {SITE_CONFIG.surpriseMessage}
            </motion.p>
            {SITE_CONFIG.giftLink && SITE_CONFIG.giftLink !== "#" && (
              <a href={SITE_CONFIG.giftLink} target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-full bg-gold px-8 py-3 font-body text-romantic-dark">
                Open Your Gift 🎁
              </a>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default SurpriseEnding;
