import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Target, Zap, Clock, CheckCircle2, Circle } from 'lucide-react';
import Navigation from '../components/Navigation';

interface Challenge {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  type: 'daily' | 'weekly' | 'special';
  progress: number;
  total: number;
  completed: boolean;
  expiresIn?: string;
}

export default function Challenges() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'daily' | 'weekly' | 'special'>('all');

  const challenges: Challenge[] = [
    { id: 1, title: 'Track 5 Transactions', description: 'Add 5 transactions today', xpReward: 50, type: 'daily', progress: 3, total: 5, completed: false, expiresIn: '8h' },
    { id: 2, title: 'Morning Finance Check', description: 'Open FinMan before 10 AM', xpReward: 25, type: 'daily', progress: 1, total: 1, completed: true, expiresIn: '8h' },
    { id: 3, title: 'Budget Guardian', description: 'Stay under daily budget', xpReward: 40, type: 'daily', progress: 1, total: 1, completed: true, expiresIn: '8h' },
    { id: 4, title: 'Week Streak Master', description: 'Log in every day this week', xpReward: 150, type: 'weekly', progress: 5, total: 7, completed: false, expiresIn: '2d' },
    { id: 5, title: 'Expense Analyzer', description: 'Review all expense categories', xpReward: 100, type: 'weekly', progress: 2, total: 5, completed: false, expiresIn: '2d' },
    { id: 6, title: 'February Finance Hero', description: 'Complete 20 daily challenges this month', xpReward: 500, type: 'special', progress: 12, total: 20, completed: false },
  ];

  const filteredChallenges = activeFilter === 'all' ? challenges : challenges.filter(c => c.type === activeFilter);
  const dailyCompleted = challenges.filter(c => c.type === 'daily' && c.completed).length;
  const dailyTotal = challenges.filter(c => c.type === 'daily').length;
  const typeColors = { daily: 'var(--color-accent-green)', weekly: '#6bc9ff', special: '#ffd700' };

  return (
    <div className="bg-background relative h-full flex flex-col overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-card to-transparent h-[250px] z-0" />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 pt-16 mb-6 shrink-0">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-muted rounded-full transition-all">
          <ArrowLeft className="size-[26px] text-foreground" />
        </button>
        <h1 className="font-['DM_Sans',sans-serif] font-bold text-[24px] text-foreground">Daily Challenges</h1>
        <Target className="size-[26px] text-accent-green" />
      </div>

      {/* Scrollable container */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide relative z-10">
        <motion.div className="mx-6 sm:mx-8 mb-6 bg-gradient-to-br from-accent-green to-[#6bc98a] rounded-2xl p-5 shadow-lg" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-['DM_Sans',sans-serif] font-semibold text-[14px] text-white/90">Today's Progress</p>
              <p className="font-['DM_Sans',sans-serif] font-bold text-[32px] text-white">{dailyCompleted}/{dailyTotal}</p>
            </div>
            <div className="bg-white/20 rounded-full p-3"><Zap className="size-8 text-white" fill="white" /></div>
          </div>
          <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
            <motion.div className="h-full bg-white" initial={{ width: 0 }} animate={{ width: `${(dailyCompleted / dailyTotal) * 100}%` }} transition={{ duration: 1, delay: 0.2 }} />
          </div>
          <p className="font-['DM_Sans',sans-serif] font-medium text-[12px] text-white/90 mt-2">{dailyTotal - dailyCompleted} challenges remaining</p>
        </motion.div>

        <div className="px-6 sm:px-8 mb-5 flex gap-3 overflow-x-auto scrollbar-hide pb-2 shrink-0">
          {(['all', 'daily', 'weekly', 'special'] as const).map((filter) => (
            <button key={filter} onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full font-['DM_Sans',sans-serif] font-semibold text-[12px] capitalize whitespace-nowrap transition-all border ${activeFilter === filter ? 'bg-accent-green text-white border-accent-green shadow-sm' : 'bg-card text-muted-foreground border-border'}`}
            >{filter}</button>
          ))}
        </div>

        <div className="px-6 sm:px-8 space-y-3">
          {filteredChallenges.map((challenge, index) => (
            <motion.div key={challenge.id} className={`bg-card rounded-xl p-4 border border-border ${challenge.completed ? 'opacity-70' : 'shadow-sm'}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: challenge.completed ? 0.7 : 1, y: 0 }} transition={{ delay: index * 0.05 }}
            >
              <div className="flex gap-3">
                <div className="mt-1">
                  {challenge.completed ? <CheckCircle2 className="size-6 text-accent-green" fill="var(--color-accent-green)" /> : <Circle className="size-6 text-muted-foreground" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`font-['DM_Sans',sans-serif] font-semibold text-[14px] ${challenge.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{challenge.title}</h3>
                      <p className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-muted-foreground">{challenge.description}</p>
                    </div>
                  </div>
                  {!challenge.completed && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-['DM_Sans',sans-serif] font-medium text-[10px] text-muted-foreground">{challenge.progress}/{challenge.total}</span>
                        <span className="font-['DM_Sans',sans-serif] font-medium text-[10px] text-muted-foreground">{Math.round((challenge.progress / challenge.total) * 100)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden border border-border">
                        <motion.div className="h-full" style={{ backgroundColor: typeColors[challenge.type] }}
                          initial={{ width: 0 }} animate={{ width: `${(challenge.progress / challenge.total) * 100}%` }} transition={{ duration: 0.8, delay: index * 0.05 + 0.2 }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-['DM_Sans',sans-serif] font-bold capitalize" style={{ backgroundColor: `${typeColors[challenge.type]}20`, color: typeColors[challenge.type] }}>{challenge.type}</span>
                      {challenge.expiresIn && (
                        <div className="flex items-center gap-1 text-muted-foreground"><Clock className="size-3" /><span className="font-['DM_Sans',sans-serif] font-normal text-[10px]">{challenge.expiresIn}</span></div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="size-3.5 text-accent-green" fill="var(--color-accent-green)" />
                      <span className="font-['DM_Sans',sans-serif] font-bold text-[12px] text-accent-green">+{challenge.xpReward}</span>
                    </div>
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
