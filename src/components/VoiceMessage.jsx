import { motion } from "framer-motion";
import { Howl } from "howler";
import { useEffect, useMemo, useRef, useState } from "react";

function VoiceMessage() {
  const howlRef = useRef(null);
  const timerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [toast, setToast] = useState("");
  const particles = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);

  const createSound = () => {
    if (howlRef.current) return howlRef.current;
    const sound = new Howl({
      src: ["/voice/vna.ogg"],
      format: ["ogg"],
      html5: true,
      onload: () => setDuration(sound.duration() || 0),
      onplayerror: () => setToast("Tap to play voice message 🎙️"),
      onend: () => {
        setPlaying(false);
        setTime(0);
      },
    });
    howlRef.current = sound;
    return sound;
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      if (howlRef.current) {
        howlRef.current.stop();
        howlRef.current.unload();
        howlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    clearInterval(timerRef.current);
    if (playing && howlRef.current) {
      timerRef.current = setInterval(() => {
        setTime(howlRef.current.seek() || 0);
      }, 300);
    }
  }, [playing]);

  const toggle = () => {
    const sound = createSound();
    if (playing) {
      sound.pause();
      setPlaying(false);
    } else {
      sound.play();
      setPlaying(true);
    }
  };
  const stopAudio = () => {
    if (!howlRef.current) return;
    howlRef.current.stop();
    howlRef.current.seek(0);
    setPlaying(false);
    setTime(0);
  };
  const seekTo = (value) => {
    if (!howlRef.current) {
      createSound();
    }
    if (!howlRef.current) return;
    howlRef.current.seek(value);
    setTime(value);
  };

  const format = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${mins}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="px-4 py-20"
    >
      <h2 className="text-center font-playfair text-4xl text-gold md:text-5xl">I recorded something for you… 🎙️</h2>
      <div className="mx-auto mt-10 max-w-[480px] rounded-2xl border border-rosegold/70 bg-romantic-card p-8 text-center shadow-[0_0_40px_rgba(201,112,106,0.25)]">
        {toast && <p className="mb-2 rounded bg-romantic-dark px-3 py-2 text-sm text-offwhite">{toast}</p>}
        <p className="font-playfair text-xl italic text-offwhite">Press play… this one&apos;s just for you.</p>
        <div className="mt-8 flex justify-center gap-1">
          {Array.from({ length: 20 }).map((_, index) => (
            <span
              key={index}
              className={`h-8 w-1 rounded bg-rosegold ${playing ? "animate-waveBar" : ""}`}
              style={{ animationDelay: `${index * 0.04}s` }}
            />
          ))}
        </div>
        <div className="relative mt-8 flex justify-center">
          {playing &&
            particles.map((p) => (
              <motion.span
                key={p}
                initial={{ opacity: 0.9, x: 0, y: 0 }}
                animate={{ opacity: 0, x: (p - 6) * 8, y: -40 - p * 3 }}
                transition={{ duration: 0.6, delay: p * 0.02, repeat: Infinity, repeatDelay: 1.2 }}
                className="absolute text-sm text-blush"
              >
                ❤
              </motion.span>
            ))}
          <button onClick={toggle} className="h-20 w-20 rounded-full bg-gradient-to-br from-rosegold to-coral text-3xl text-white">
            {playing ? "❚❚" : "▶"}
          </button>
        </div>
        <p className="mt-4 font-body text-offwhite/80">
          {format(time)} / {format(duration)}
        </p>
        <input
          type="range"
          min={0}
          max={duration || 1}
          value={time}
          onChange={(e) => seekTo(Number(e.target.value))}
          className="mt-3 w-full accent-rosegold"
        />
        <button onClick={stopAudio} className="mt-3 rounded-full border border-rosegold px-4 py-1 text-sm text-offwhite">
          Stop
        </button>
      </div>
    </motion.section>
  );
}

export default VoiceMessage;
