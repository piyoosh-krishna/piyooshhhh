import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 400); // Brief pause at 100%
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-brand-bg flex flex-col items-center justify-center text-brand-accent font-mono overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      
      <div className="relative w-full max-w-md px-8 z-10">
        <div className="flex justify-between text-[10px] md:text-xs uppercase tracking-widest mb-4">
          <span className="animate-pulse">Initializing_System...</span>
          <span>{progress}%</span>
        </div>
        
        <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-brand-accent shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        <div className="mt-8 space-y-2 text-[10px] md:text-xs text-gray-500 uppercase tracking-widest h-20">
          <p>{progress > 10 ? '> LOADING_NEURAL_NETS... [OK]' : '> LOADING_NEURAL_NETS...'}</p>
          <p>{progress > 40 ? '> ESTABLISHING_SECURE_LINK... [OK]' : progress > 10 ? '> ESTABLISHING_SECURE_LINK...' : ''}</p>
          <p>{progress > 70 ? '> DECRYPTING_PORTFOLIO_DATA... [OK]' : progress > 40 ? '> DECRYPTING_PORTFOLIO_DATA...' : ''}</p>
          <p>{progress >= 100 ? '> ACCESS_GRANTED.' : ''}</p>
        </div>
      </div>
    </motion.div>
  );
}
