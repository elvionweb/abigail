import { SITE_CONFIG } from "../config";

function Footer() {
  const url = window.location.href;
  const caption = `${SITE_CONFIG.shareCaption} ${url}`;
  const wa = `https://wa.me/?text=${encodeURIComponent(caption)}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(SITE_CONFIG.shareCaption)}`;

  const copyInstagram = async () => {
    await navigator.clipboard.writeText(caption);
    alert("Copied! Paste it on Instagram 💕");
  };

  return (
    <footer className="border-t border-rosegold bg-[#1F0C12] px-4 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-playfair text-3xl text-gold">{SITE_CONFIG.herName} 💕</h3>
          <p className="mt-2 text-offwhite/80">{SITE_CONFIG.herName} © 2026</p>
        </div>
        <div className="md:text-center">
          <p className="text-sm text-offwhite/80">Built by</p>
          <a href={SITE_CONFIG.brandLink} target="_blank" rel="noreferrer" className="text-xl text-rosegold hover:underline">
            {SITE_CONFIG.brandName}
          </a>
        </div>
        <div className="md:text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Share the love 💌</p>
          <div className="mt-3 flex flex-wrap justify-start gap-2 md:justify-end">
            <a href={wa} target="_blank" rel="noreferrer" className="rounded-full bg-green-600 px-4 py-2 text-sm text-white transition hover:scale-105">🟢 WhatsApp</a>
            <a href={fb} target="_blank" rel="noreferrer" className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white transition hover:scale-105">🔵 Facebook</a>
            <button onClick={copyInstagram} className="rounded-full bg-pink-500 px-4 py-2 text-sm text-white transition hover:scale-105">📸 Instagram</button>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-rosegold/30 pt-4 text-center text-sm text-offwhite/75">
        Built with love for Abigail 🎂
      </div>
    </footer>
  );
}

export default Footer;
