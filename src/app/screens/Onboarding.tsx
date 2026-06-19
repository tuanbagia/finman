import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import imgSuperheroBro1 from "../../imports/Onboaring/6fc8b2e580987ff1a5080491a181aa0e965b6975.png";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-dvh flex flex-col overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-green rounded-full opacity-30"
            initial={{
              x: Math.random() * 400,
              y: Math.random() * 800,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [null, Math.random() * 800],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div
        className="flex justify-center pt-16 pb-4 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-['Big_Shoulders_Display',sans-serif] font-black text-[36px] text-foreground whitespace-nowrap leading-normal">
          Fin<span className="font-['Big_Shoulders_Stencil_Display',sans-serif] text-accent-green">M</span>an
        </p>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        className="w-full max-w-sm mx-auto aspect-square relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img alt="Superhero character" className="w-full h-full object-cover pointer-events-none drop-shadow-xl" src={imgSuperheroBro1} />
      </motion.div>

      {/* Content */}
      <motion.div
        className="flex flex-col gap-6 px-8 mt-4 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="font-['Outfit',sans-serif] font-medium leading-snug text-accent-green text-[20px]">
          Unleash Your Financial Superpower!
        </p>
        <p className="font-['Outfit',sans-serif] font-normal leading-relaxed text-foreground text-[16px]">
          Welcome to FinMan! your personal finance superhero. Track expenses, earn XP, unlock achievements, and level up your money management skills!
        </p>
      </motion.div>

      {/* Buttons */}
      <div className="mt-auto px-8 pb-10 flex flex-col gap-4 items-center z-10">
        <motion.button
          className="bg-accent-green flex h-[48px] items-center justify-center w-full max-w-sm rounded-full cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-lg"
          onClick={() => navigate('/signin')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="font-['Outfit',sans-serif] font-semibold text-white text-[14px]">
            Sign in
          </p>
        </motion.button>

        <motion.button
          className="flex h-[48px] items-center justify-center w-full max-w-sm rounded-full border border-accent-green cursor-pointer transition-all hover:bg-muted active:scale-95 shadow-sm"
          onClick={() => navigate('/signup')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="font-['Outfit',sans-serif] font-medium text-accent-green text-[14px]">
            I'm new, sign me up!
          </p>
        </motion.button>
      </div>
    </div>
  );
}
