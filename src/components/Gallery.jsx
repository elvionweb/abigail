import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { SITE_CONFIG } from "../config";

function Gallery() {
  const photos = useMemo(
    () =>
      SITE_CONFIG.galleryPhotoFiles.map((filename, index) => ({
        src: `/photos/${filename}`,
        caption: SITE_CONFIG.galleryCaptions[index % SITE_CONFIG.galleryCaptions.length],
      })),
    [],
  );
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [direction, setDirection] = useState(1);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () => {
    setDirection(-1);
    setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + photos.length) % photos.length));
  };
  const showNext = () => {
    setDirection(1);
    setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % photos.length));
  };

  useEffect(() => {
    const onEsc = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft" && lightboxIndex !== null) showPrev();
      if (event.key === "ArrowRight" && lightboxIndex !== null) showNext();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const opened = lightboxIndex !== null;

  return (
    <motion.section
      id="gallery"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="px-4 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-playfair text-4xl text-gold md:text-5xl">Beautiful, As always 📸</h2>
        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {photos.map((photo, index) => {
            const rotate = index % 3 === 0 ? "rotate-1" : index % 3 === 1 ? "-rotate-2" : "rotate-2";
            return (
              <motion.button
                key={photo.src}
                whileHover={{ scale: 1.05, y: -4, boxShadow: "0 20px 36px rgba(0,0,0,0.35)" }}
                onClick={() => {
                  setDirection(1);
                  setLightboxIndex(index);
                }}
                className={`mb-6 w-full break-inside-avoid rounded bg-white p-3 pb-10 text-left shadow-2xl ${rotate}`}
              >
                <img src={photo.src} alt={photo.caption} loading="lazy" className="w-full rounded object-cover" />
                <motion.p whileHover={{ y: -2 }} className="mt-3 text-center font-cursive text-2xl text-[#2D2D2D]">
                  {photo.caption}
                </motion.p>
              </motion.button>
            );
          })}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-4"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute right-4 top-4 rounded-full border border-white/30 px-3 py-1 text-xl text-white"
              aria-label="Close lightbox"
            >
              ✕
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-3 rounded-full bg-black/30 px-3 text-4xl text-white"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={photos[lightboxIndex].src}
                initial={{ opacity: 0, x: direction * 40, scale: 0.94 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction * -40, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 230, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={photos[lightboxIndex].src} alt="Lightbox" className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain" />
                <p className="mt-4 text-center font-cursive text-3xl text-cream">{photos[lightboxIndex].caption}</p>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-3 rounded-full bg-black/30 px-3 text-4xl text-white"
              aria-label="Next photo"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default Gallery;
