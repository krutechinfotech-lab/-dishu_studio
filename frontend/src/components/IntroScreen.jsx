import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function playElegantChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
    masterGain.connect(ctx.destination);

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const start = ctx.currentTime + i * 0.25;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.3, start + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 1.2);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(start);
      osc.stop(start + 1.5);
    });

    // Soft pad layer
    const pad = ctx.createOscillator();
    const padGain = ctx.createGain();
    pad.type = "sine";
    pad.frequency.setValueAtTime(261.63, ctx.currentTime);
    padGain.gain.setValueAtTime(0, ctx.currentTime);
    padGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.5);
    padGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);
    pad.connect(padGain);
    padGain.connect(masterGain);
    pad.start(ctx.currentTime);
    pad.stop(ctx.currentTime + 3);

    setTimeout(() => ctx.close(), 4000);
  } catch (e) {
    // Audio not supported, fail silently
  }
}

export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0=logo, 1=text, 2=exit
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!hasPlayed.current) {
      hasPlayed.current = true;
      // Small delay then play sound
      const soundTimer = setTimeout(() => playElegantChime(), 300);
      const textTimer = setTimeout(() => setPhase(1), 1200);
      const exitTimer = setTimeout(() => setPhase(2), 3500);
      const doneTimer = setTimeout(() => onComplete(), 4300);

      return () => {
        clearTimeout(soundTimer);
        clearTimeout(textTimer);
        clearTimeout(exitTimer);
        clearTimeout(doneTimer);
      };
    }
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          data-testid="intro-screen"
        >
          {/* Subtle golden glow behind logo */}
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2.5, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          <div className="relative flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <img
                src="https://customer-assets.emergentagent.com/job_photo-studios/artifacts/7bmeu14v_image.png"
                alt="Dishu Studio"
                className="w-28 h-28 sm:w-36 sm:h-36"
              />
            </motion.div>

            {/* Golden divider line */}
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-8"
              initial={{ width: 0, opacity: 0 }}
              animate={phase >= 1 ? { width: 200, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* Welcome text */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <p
                className="uppercase tracking-[0.4em] text-[10px] sm:text-xs text-[#D4AF37]/70 mb-3"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Welcome to
              </p>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl text-white tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Dishu Studio
              </h1>
            </motion.div>
          </div>

          {/* Corner accents */}
          <motion.div
            className="absolute top-8 left-8 w-12 h-12 border-t border-l border-[#D4AF37]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-[#D4AF37]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
