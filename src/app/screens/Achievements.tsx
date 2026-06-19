import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, Target, TrendingDown, Calendar, Wallet, Award, Lock } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useFirestore } from '@/contexts/FirestoreContext';
import { useCurrency } from '@/hooks/useCurrency';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  total: number;
  xpReward: number;
  unlocked: boolean;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export default function Achievements() {
  const navigate = useNavigate();
  const { userProfile } = useFirestore();
  const { formatCurrency } = useCurrency();

  const achievements: Achievement[] = useMemo(() => {
    const totalTx = userProfile?.totalTransactions || 0;
    const streak = userProfile?.streakDays || 0;
    const totalSaved = userProfile?.totalSaved || 0;
    const level = userProfile?.level || 1;

    return [
      { 
        id: 1, title: 'First Step Hero', description: 'Track your first transaction', 
        icon: <Trophy className="size-6" />, 
        progress: Math.min(totalTx, 1), total: 1, xpReward: 50, 
        unlocked: totalTx >= 1, tier: 'bronze' 
      },
      { 
        id: 2, title: 'Week Warrior', description: 'Maintain a 7-day streak', 
        icon: <Calendar className="size-6" />, 
        progress: Math.min(streak, 7), total: 7, xpReward: 100, 
        unlocked: streak >= 7, tier: 'silver' 
      },
      { 
        id: 3, title: 'Budget Master', description: 'Maintain a positive balance', 
        icon: <Target className="size-6" />, 
        progress: totalSaved > 0 ? 1 : 0, total: 1, xpReward: 200, 
        unlocked: totalSaved > 0, tier: 'gold' 
      },
      { 
        id: 4, title: 'Savings Champion', description: `Save ${formatCurrency(500000)} in total`, 
        icon: <Wallet className="size-6" />, 
        progress: Math.min(totalSaved, 500000), total: 500000, xpReward: 150, 
        unlocked: totalSaved >= 500000, tier: 'gold' 
      },
      { 
        id: 5, title: 'Expense Destroyer', description: 'Record 20 expenses', 
        icon: <TrendingDown className="size-6" />, 
        progress: Math.min(totalTx, 20), total: 20, xpReward: 300, 
        unlocked: totalTx >= 20, tier: 'platinum' 
      },
      { 
        id: 6, title: 'Finance Legend', description: 'Reach level 10', 
        icon: <Award className="size-6" />, 
        progress: Math.min(level, 10), total: 10, xpReward: 500, 
        unlocked: level >= 10, tier: 'platinum' 
      },
    ];
  }, [userProfile, formatCurrency]);

  const tierColors = { bronze: '#cd7f32', silver: '#c0c0c0', gold: '#ffd700', platinum: '#e5e4e2' };
  const tierGradients = { bronze: 'from-[#cd7f32] to-[#a0653c]', silver: 'from-[#c0c0c0] to-[#a0a0a0]', gold: 'from-[#ffd700] to-[#ffa500]', platinum: 'from-[#e5e4e2] to-[#b0b0b0]' };
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="bg-background relative min-h-full overflow-hidden pb-[78px]">
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-card to-transparent h-[200px] z-0" />
      <div className="relative z-10">
        <div className="flex items-center justify-between px-6 sm:px-8 pt-16 mb-6">
          <button onClick={() => navigate(-1)} className="p-1 hover:bg-muted rounded-full transition-all"><ArrowLeft className="size-[26px] text-foreground" /></button>
          <h1 className="font-['DM_Sans',sans-serif] font-bold text-[24px] text-foreground">Achievements</h1>
          <div className="w-[26px]" />
        </div>

        <motion.div className="mx-6 sm:mx-8 mb-8 bg-gradient-to-br from-accent-green to-[#6bc98a] rounded-2xl p-5 shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-['DM_Sans',sans-serif] font-semibold text-[14px] text-white/90">Total Progress</p>
              <p className="font-['DM_Sans',sans-serif] font-bold text-[32px] text-white">{unlockedCount}/{achievements.length}</p>
            </div>
            <Trophy className="size-12 text-white/80" />
          </div>
          <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
            <motion.div className="h-full bg-white" initial={{ width: 0 }} animate={{ width: `${(unlockedCount / achievements.length) * 100}%` }} transition={{ duration: 1, delay: 0.3 }} />
          </div>
        </motion.div>

        <div className="px-6 sm:px-8 pb-24 space-y-4 max-h-[calc(100vh-350px)] overflow-y-auto scrollbar-hide">
          {achievements.map((achievement, index) => (
            <motion.div key={achievement.id} className={`bg-card rounded-xl p-4 border border-border ${achievement.unlocked ? 'shadow-md' : 'opacity-60'}`}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: achievement.unlocked ? 1 : 0.6, x: 0 }} transition={{ delay: index * 0.1 }}
            >
              <div className="flex gap-4">
                <div className={`relative size-14 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br ${tierGradients[achievement.tier]} ${!achievement.unlocked && 'grayscale'}`}>
                  {achievement.unlocked ? <div className="text-white shadow-sm">{achievement.icon}</div> : <Lock className="size-6 text-white/80" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-['DM_Sans',sans-serif] font-semibold text-[14px] text-foreground">{achievement.title}</h3>
                      <p className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-muted-foreground">{achievement.description}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-accent-green/20 px-2 py-1 rounded-full shrink-0 ml-2">
                      <span className="font-['DM_Sans',sans-serif] font-bold text-[12px] text-accent-green">+{achievement.xpReward}</span>
                      <span className="font-['DM_Sans',sans-serif] font-normal text-[10px] text-accent-green">XP</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-['DM_Sans',sans-serif] font-medium text-[10px] text-muted-foreground">Progress</span>
                      <span className="font-['DM_Sans',sans-serif] font-medium text-[10px] text-muted-foreground">
                        {achievement.total > 1000 ? `${(achievement.progress/1000).toFixed(0)}k/${(achievement.total/1000).toFixed(0)}k` : `${achievement.progress}/${achievement.total}`}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden border border-border">
                      <motion.div className={`h-full bg-gradient-to-r ${tierGradients[achievement.tier]}`}
                        initial={{ width: 0 }} animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }} transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-['DM_Sans',sans-serif] font-bold capitalize" style={{ backgroundColor: `${tierColors[achievement.tier]}20`, color: tierColors[achievement.tier] }}>{achievement.tier}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
}
