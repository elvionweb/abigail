import { motion } from "framer-motion";
import { Howl } from "howler";
import { useEffect, useMemo, useRef, useState } from "react";
import { SITE_CONFIG } from "../config";

function MusicPlayer() {
  const [expanded, setExpanded] = useState(false);
  const hasPlaylist = SITE_CONFIG.playlist.length > 0;
  const initialIndex = useMemo(() => {
    if (!hasPlaylist) return 0;
    const happyBirthdayIdx = SITE_CONFIG.playlist.findIndex((song) =>
      song.file.toLowerCase().includes("happy-birthday"),
    );
    return happyBirthdayIdx >= 0 ? happyBirthdayIdx : 0;
  }, [hasPlaylist]);
  const [trackIndex, setTrackIndex] = useState(initialIndex);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [toast, setToast] = useState("");
  const soundRef = useRef(null);
  const timerRef = useRef(null);
  const autostartAttemptedRef = useRef(false);

  const stopAndUnload = () => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
      soundRef.current = null;
    }
  };

  const clearProgressLoop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (!hasPlaylist) return undefined;
    clearProgressLoop();
    stopAndUnload();
    const track = SITE_CONFIG.playlist[trackIndex];
    const sound = new Howl({
      src: [track.file],
      html5: true,
      preload: true,
      onload: () => {
        setDuration(sound.duration() || 0);
        setProgress(0);
      },
      onplay: () => {
        setPlaying(true);
        setToast("");
      },
      onpause: () => setPlaying(false),
      onstop: () => {
        setPlaying(false);
        setProgress(0);
      },
      onseek: () => setProgress(Number(sound.seek() || 0)),
      onend: () => {
        setPlaying(false);
        setProgress(0);
        setTrackIndex((prev) => (prev + 1) % SITE_CONFIG.playlist.length);
      },
      onplayerror: () => {
        setToast("Tap to play music 🎵");
        setPlaying(false);
      },
      onloaderror: () => setToast("Track failed to load. Check music files."),
    });
    soundRef.current = sound;
    if (autostartAttemptedRef.current || trackIndex !== initialIndex) {
      sound.play();
    } else {
      autostartAttemptedRef.current = true;
      const playId = sound.play();
      if (!playId) {
        setToast("Tap to play music 🎵");
      }
    }
    return () => {
      clearProgressLoop();
      stopAndUnload();
    };
  }, [trackIndex, initialIndex, hasPlaylist]);

  useEffect(() => {
    clearProgressLoop();
    if (playing && soundRef.current) {
      timerRef.current = setInterval(() => {
        setProgress(Number(soundRef.current.seek() || 0));
      }, 500);
    }
    return clearProgressLoop;
  }, [playing]);

  const format = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  const playPause = () => {
    const sound = soundRef.current;
    if (!sound) return;
    if (playing) {
      sound.pause();
      setPlaying(false);
    } else {
      const playId = sound.play();
      if (!playId) {
        setToast("Tap to play music 🎵");
      }
      setToast("");
    }
  };
  const next = () => {
    if (!hasPlaylist) return;
    setTrackIndex((prev) => (prev + 1) % SITE_CONFIG.playlist.length);
  };
  const prev = () => {
    if (!hasPlaylist) return;
    setTrackIndex((prev) => (prev - 1 + SITE_CONFIG.playlist.length) % SITE_CONFIG.playlist.length);
  };
  const seekTo = (value) => {
    if (!soundRef.current) return;
    soundRef.current.seek(value);
    setProgress(value);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {toast && <div className="mb-2 rounded bg-romantic-card px-3 py-2 text-sm text-offwhite">{toast}</div>}
      <motion.button
        animate={{
          boxShadow: playing ? "0 0 20px rgba(201,112,106,0.75)" : "0 0 0 rgba(0,0,0,0)",
          scale: playing ? [1, 1.04, 1] : 1,
        }}
        transition={playing ? { duration: 1.4, repeat: Infinity } : { duration: 0.2 }}
        onClick={() => setExpanded((prev) => !prev)}
        className="h-14 w-14 rounded-full bg-gradient-to-br from-rosegold to-coral text-2xl text-white"
      >
        ♪
      </motion.button>
      <motion.div
        initial={false}
        animate={{ width: expanded ? 320 : 0, height: expanded ? 260 : 0, opacity: expanded ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="mt-2 overflow-hidden rounded-2xl border border-rosegold bg-romantic-dark p-4"
      >
        <motion.p
          key={SITE_CONFIG.playlist[trackIndex]?.file || "no-track"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24 }}
          className="font-playfair text-lg text-gold"
        >
          {SITE_CONFIG.playlist[trackIndex]?.title || "No tracks available"}
        </motion.p>
        <input type="range" min={0} max={duration || 1} value={progress} onChange={(e) => seekTo(Number(e.target.value))} className="mt-4 w-full accent-rosegold" />
        <p className="mt-2 text-sm text-offwhite/80">{format(progress)} / {format(duration)}</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <button onClick={prev}>⏮</button>
          <button onClick={playPause} className="h-12 w-12 rounded-full bg-rosegold text-xl text-white">{playing ? "⏸" : "▶"}</button>
          <button onClick={next}>⏭</button>
        </div>
        <div className="mt-4 flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => <span key={i} className={`h-4 w-1 rounded bg-rosegold ${playing ? "animate-waveBar" : ""}`} style={{ animationDelay: `${i * 0.08}s` }} />)}
        </div>
      </motion.div>
    </div>
  );
}

export default MusicPlayer;
