import { motion } from "framer-motion";
import { SITE_CONFIG } from "../config";

function LoadingSplash() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-romantic-dark"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1 }}
        className="font-playfair text-6xl text-gold md:text-8xl"
        style={{ textShadow: "0 0 24px rgba(212,175,55,0.6)" }}
      >
        {SITE_CONFIG.herName}
      </motion.h1>
    </motion.div>
  );
}

export default LoadingSplash;
