import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Star, Flame, Trophy, Target, TrendingUp, Settings, ChevronRight } from 'lucide-react';
import imgRectangle from "../../imports/Dashboard/1af2086220affecd5f498aeca93f64918a91bf86.png";
import Navigation from '../components/Navigation';
import SettingsModal from '../components/SettingsModal';
import { useAuth } from '@/contexts/AuthContext';
import { useFirestore } from '@/contexts/FirestoreContext';
import { useCurrency } from '@/hooks/useCurrency';

export default function Profile() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { userProfile } = useFirestore();
  const { formatCompact } = useCurrency();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const userLevel = userProfile?.level || 1;
  const currentXP = userProfile?.currentXP || 0;
  const xpToNextLevel = userProfile?.xpToNextLevel || 1000;
  const streakDays = userProfile?.streakDays || 0;
  const totalXP = userProfile?.totalXP || 0;
  const achievementsUnlocked = userProfile?.achievementsUnlocked || 0;
  const totalAchievements = userProfile?.totalAchievements || 15;
  const displayName = userProfile?.displayName || user?.displayName || 'Hero';
  const title = userProfile?.title || 'Finance Rookie';
  const totalTransactions = userProfile?.totalTransactions || 0;
  const totalSaved = userProfile?.totalSaved || 0;
  const bestStreak = userProfile?.bestStreak || 0;
  const avatarUrl = user?.photoURL || imgRectangle;

  const stats = [
    { label: 'Total Transactions', value: totalTransactions.toString(), icon: <Target className="size-5" /> },
    { label: 'Money Saved', value: formatCompact(totalSaved), icon: <TrendingUp className="size-5" /> },
    { label: 'Achievements', value: `${achievementsUnlocked}/${totalAchievements}`, icon: <Trophy className="size-5" /> },
    { label: 'Best Streak', value: `${bestStreak} days`, icon: <Flame className="size-5" /> }
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/onboarding');
  };

  const startLevel = Math.max(1, userLevel - 1);
  const levelProgress = Array.from({ length: 5 }, (_, i) => {
    const level = startLevel + i;
    return {
      level,
      unlocked: level <= userLevel,
      current: level === userLevel
    };
  });

  return (
    <div className="bg-background relative min-h-full overflow-hidden pb-[78px]">
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-br from-accent-green to-[#6bc98a] z-0 opacity-80" />
      <div className="relative z-10">
        <div className="flex items-center justify-between px-6 sm:px-8 pt-16 mb-8">
          <button onClick={() => navigate(-1)} className="p-1 hover:scale-110 transition-all"><ArrowLeft className="size-[26px] text-white" /></button>
          <h1 className="font-['DM_Sans',sans-serif] font-bold text-[24px] text-white drop-shadow-md">Profile</h1>
          <button onClick={() => setIsSettingsOpen(true)} className="p-1 hover:scale-110 transition-all">
            <Settings className="size-[26px] text-white drop-shadow-md" />
          </button>
        </div>

        <motion.div className="mx-6 sm:mx-8 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col items-center mb-5">
            <div className="relative mb-3">
              <div className="size-[100px] rounded-full shadow-xl border-4 border-background bg-card">
                <img alt="Profile" className="size-full object-cover rounded-full" src={avatarUrl} />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background rounded-full px-4 py-1 shadow-lg border-2 border-accent-green whitespace-nowrap">
                <span className="font-['DM_Sans',sans-serif] font-bold text-base text-accent-green">Lv {userLevel}</span>
              </div>
            </div>
            <h2 className="font-['DM_Sans',sans-serif] font-bold text-[24px] text-foreground mt-2 mb-1">{displayName}</h2>
            <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
              <Star className="size-4 text-[#ffd700]" fill="#ffd700" />
              <span className="font-['DM_Sans',sans-serif] font-semibold text-[14px] text-foreground">{title}</span>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 mb-4 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['DM_Sans',sans-serif] font-semibold text-[12px] text-accent-green">Level {userLevel} Progress</span>
              <span className="font-['DM_Sans',sans-serif] font-bold text-[12px] text-foreground">{currentXP} / {xpToNextLevel} XP</span>
            </div>
            <div className="w-full h-2.5 bg-background rounded-full overflow-hidden border border-border">
              <motion.div className="h-full bg-gradient-to-r from-accent-green to-[#6bc98a]" initial={{ width: 0 }} animate={{ width: `${(currentXP / xpToNextLevel) * 100}%` }} transition={{ duration: 1.5, ease: "easeOut" }} />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-['DM_Sans',sans-serif] font-normal text-[10px] text-muted-foreground">Total XP: {totalXP.toLocaleString()}</span>
              <span className="font-['DM_Sans',sans-serif] font-normal text-[10px] text-muted-foreground">{xpToNextLevel - currentXP} XP to next level</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] rounded-xl p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <Flame className="size-8 text-white" fill="white" />
              <div>
                <p className="font-['DM_Sans',sans-serif] font-bold text-[24px] text-white">{streakDays} Days</p>
                <p className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-white/80">Current Streak</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-['DM_Sans',sans-serif] font-semibold text-[14px] text-white">Keep it up!</p>
              <p className="font-['DM_Sans',sans-serif] font-normal text-[10px] text-white/80">+50 XP daily</p>
            </div>
          </div>
        </motion.div>

        <div className="mx-6 sm:mx-8 mb-6 grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} className="bg-card rounded-xl p-4 border border-border shadow-sm min-w-0" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
              <div className="flex items-center gap-2 mb-2 text-accent-green">
                {stat.icon}
                <span className="font-['DM_Sans',sans-serif] font-semibold text-[10px] text-muted-foreground">{stat.label}</span>
              </div>
              <p className="font-['DM_Sans',sans-serif] font-bold text-[16px] sm:text-[18px] text-foreground truncate">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="mx-6 sm:mx-8 mb-6">
          <h3 className="font-['DM_Sans',sans-serif] font-semibold text-[14px] text-foreground mb-3">Level Progression</h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {levelProgress.map((item, index) => (
              <div key={item.level} className="flex items-center">
                <div className={`relative size-12 rounded-full flex items-center justify-center border-2 ${
                  item.current ? 'bg-accent-green border-accent-green shadow-lg' : item.unlocked ? 'bg-card border-accent-green' : 'bg-background border-border opacity-50'
                }`}>
                  <span className={`font-['DM_Sans',sans-serif] font-bold text-[14px] ${item.current ? 'text-background' : item.unlocked ? 'text-accent-green' : 'text-muted-foreground'}`}>{item.level}</span>
                  {item.current && <div className="absolute -top-1 -right-1 size-4 bg-[#ffd700] rounded-full flex items-center justify-center"><span className="text-[10px]">⭐</span></div>}
                </div>
                {index < levelProgress.length - 1 && <div className={`w-6 h-0.5 ${item.unlocked ? 'bg-accent-green' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Navigation />

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onLogout={handleLogout} 
      />
    </div>
  );
}
