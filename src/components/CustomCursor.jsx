import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function isTouchDevice() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const hidden = useMemo(() => (typeof window === "undefined" ? true : isTouchDevice()), []);

  useEffect(() => {
    if (hidden) {
      return undefined;
    }
    const onMove = (event) => setPos({ x: event.clientX, y: event.clientY });
    const onDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 160);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
    };
  }, [hidden]);

  if (hidden) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed z-[10001] select-none text-lg"
      animate={{
        x: pos.x - 10,
        y: pos.y - 10,
        scale: clicked ? 1.25 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      ❤️
    </motion.div>
  );
}

export default CustomCursor;
