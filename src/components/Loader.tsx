import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useMemo } from "react";

const BOOT_LOGS = [
  "INITIALIZING_CORE_ENGINE",
  "LOADING_NEURAL_NETWORKS",
  "ESTABLISHING_ENCRYPTED_GATEWAY",
  "DECRYPTING_PORTFOLIO_ASSETS",
  "SYNCHRONIZING_UI_STREAMS",
  "SYSTEM_CHECK_COMPLETE",
  "ACCESS_GRANTED"
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(0);

  useEffect(() => {
    const duration = 4000; 
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(nextProgress);
      
      // Update logs based on progress
      const logIndex = Math.floor((nextProgress / 100) * (BOOT_LOGS.length - 1));
      setCurrentLog(logIndex);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 600);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)",
      }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-[#020202] flex flex-col items-center justify-center text-brand-accent font-mono overflow-hidden"
    >
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle, black, transparent 80%)'
        }} 
      />

      {/* Central Holographic Ring */}
      <div className="relative flex items-center justify-center mb-16 scale-75 md:scale-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute w-64 h-64 border border-brand-accent/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-56 h-56 border-2 border-dashed border-brand-accent/10 rounded-full"
        />
        
        {/* Progress Fill Ring */}
        <svg className="w-48 h-48 -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="502.6"
            strokeDashoffset={502.6 - (502.6 * progress) / 100}
            className="text-brand-accent transition-all duration-200 ease-out shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            key={progress}
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-bold tracking-tighter"
          >
            {progress}<span className="text-xl opacity-50">%</span>
          </motion.span>
        </div>
      </div>

      {/* Sequential Diagnostics */}
      <div className="relative w-full max-w-sm px-10 z-10 text-center">
        <div className="h-6 mb-2 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentLog}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-xs uppercase tracking-[0.3em] text-brand-accent font-bold"
            >
              {BOOT_LOGS[currentLog]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="h-[1px] w-full bg-brand-accent/10 relative overflow-hidden mb-6">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-brand-accent shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {/* Binary Stream Decoration */}
        <div className="flex justify-center gap-4 text-[8px] opacity-30 text-gray-400">
          <span>01101000 01101001</span>
          <span className="animate-pulse">|</span>
          <span>01101001 01100001</span>
        </div>
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-brand-accent/5 to-transparent h-[2px] w-full animate-scanline" />
    </motion.div>
  );
}
