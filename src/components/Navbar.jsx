import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SITE_CONFIG } from "../config";

const links = [
  { label: "Home", href: "#home" },
  { label: "Your Story", href: "#your-story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Admire you", href: "#my-love" },
  { label: "Surprise", href: "#surprise" },
];

function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 80);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <motion.nav
      animate={{ y: visible ? 0 : -120 }}
      transition={{ duration: 0.35 }}
      className="fixed left-0 top-0 z-50 w-full border-b border-rosegold/20 bg-romantic-dark/85 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <div className="font-playfair text-lg text-gold md:text-2xl" style={{ textShadow: "0 0 10px rgba(212,175,55,0.45)" }}>
          Happy Birthday, {SITE_CONFIG.herName} 🎂
        </div>
        <div className="hidden gap-6 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="font-body text-offwhite transition-colors hover:text-blush">
              {link.label}
            </a>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle menu">
          <span className="text-2xl text-gold">☰</span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-rosegold/20 bg-romantic-dark/95 px-4 py-4 md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 font-body text-offwhite"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
