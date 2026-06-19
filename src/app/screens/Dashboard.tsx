import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Flame, Trophy, Star, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import imgRectangle from "../../imports/Dashboard/1af2086220affecd5f498aeca93f64918a91bf86.png";
import Navigation from '../components/Navigation';
import NotificationsModal from '../components/NotificationsModal';
import { useAuth } from '@/contexts/AuthContext';
import { useFirestore } from '@/contexts/FirestoreContext';
import { useCurrency } from '@/hooks/useCurrency';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userProfile, transactions, transactionsLoading } = useFirestore();
  const { formatCurrency, formatCompact } = useCurrency();
  const [activeTab, setActiveTab] = useState('all');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('All');
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const userLevel = userProfile?.level || 1;
  const currentXP = userProfile?.currentXP || 0;
  const xpToNextLevel = userProfile?.xpToNextLevel || 1000;
  const streakDays = userProfile?.streakDays || 0;
  const displayName = userProfile?.displayName || user?.displayName || 'Hero';
  const title = userProfile?.title || 'Finance Rookie';
  const balance = userProfile?.balance || 0;

  const triggerLevelUpAnimation = () => {
    setShowLevelUp(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => setShowLevelUp(false), 3000);
  };

  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    transactions.forEach(t => {
      const parts = t.date.split(' ');
      if (parts.length === 3) {
        months.add(`${parts[0].substring(0, 3)} ${parts[2]}`);
      }
    });
    return ['All', ...Array.from(months)];
  }, [transactions]);

  const monthTransactions = useMemo(() => {
    let result = transactions;
    if (selectedMonthFilter && selectedMonthFilter !== 'All') {
      const [month, year] = selectedMonthFilter.split(' ');
      result = result.filter(t => t.date.includes(month) && t.date.includes(year));
    }
    return result;
  }, [transactions, selectedMonthFilter]);

  const filteredTransactions = useMemo(() => {
    if (activeTab === 'expenses') return monthTransactions.filter(t => t.amount < 0);
    if (activeTab === 'income') return monthTransactions.filter(t => t.amount > 0);
    return monthTransactions;
  }, [monthTransactions, activeTab]);

  const groupedTransactions = useMemo(() => {
    return filteredTransactions.reduce((acc, transaction) => {
      if (!acc[transaction.date]) acc[transaction.date] = [];
      acc[transaction.date].push(transaction);
      return acc;
    }, {} as Record<string, typeof filteredTransactions>);
  }, [filteredTransactions]);

  const totalExpenses = monthTransactions.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const totalIncome = monthTransactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);

  const savedPercentage = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;
  const isPositiveSaving = savedPercentage > 0;

  return (
    <div className="bg-background relative h-full flex flex-col">
      {/* Level Up Modal */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card rounded-3xl p-8 text-center shadow-xl border border-border"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
            >
              <Trophy className="size-16 text-accent-green mx-auto mb-4" />
              <p className="font-['DM_Sans',sans-serif] font-bold text-[32px] text-accent-green mb-2">Level Up!</p>
              <p className="font-['DM_Sans',sans-serif] font-semibold text-[18px] text-foreground">You're now Level {userLevel + 1}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24 pt-8 px-6 sm:px-8 scrollbar-hide">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-5">
          <div className="flex gap-2.5 items-center">
            <div className="relative rounded-full shadow-[0px_0px_8px_2px_var(--color-accent-green)] size-10">
              <img alt="Profile" className="absolute inset-0 object-cover rounded-full size-full" src={user?.photoURL || imgRectangle} />
              <div className="absolute -bottom-1 -right-1 bg-accent-green rounded-full size-5 flex items-center justify-center border-2 border-background">
                <span className="font-['DM_Sans',sans-serif] font-bold text-[10px] text-background">{userLevel}</span>
              </div>
            </div>
            <div>
              <p className="font-['DM_Sans',sans-serif] font-medium text-[12px] text-foreground">
                {displayName}
              </p>
              <div className="flex items-center gap-1">
                <Star className="size-3 text-[#ffd700]" fill="#ffd700" />
                <span className="font-['DM_Sans',sans-serif] font-medium text-[10px] text-muted-foreground">{title}</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsNotificationsOpen(true)} className="relative p-2 rounded-full hover:bg-muted transition-colors">
            <Bell className="size-6 text-foreground" />
            <div className="absolute top-1.5 right-2 size-2 bg-accent-green rounded-full border border-background" />
          </button>
        </div>

        {/* XP Bar and Streak */}
        <motion.div className="w-full mb-5" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Zap className="size-3.5 text-accent-green" fill="var(--color-accent-green)" />
              <span className="font-['DM_Sans',sans-serif] font-semibold text-[12px] text-foreground">
                {currentXP} / {xpToNextLevel} XP
              </span>
            </div>
            <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full border border-border">
              <Flame className="size-3.5 text-[#ff6b6b]" fill="#ff6b6b" />
              <span className="font-['DM_Sans',sans-serif] font-bold text-[12px] text-[#ff6b6b]">{streakDays}</span>
              <span className="font-['DM_Sans',sans-serif] font-normal text-[10px] text-muted-foreground">day streak</span>
            </div>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden border border-border">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-green to-[#6bc98a] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentXP / xpToNextLevel) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Balance */}
        <div className="mb-6 min-w-0">
          <p className="font-['DM_Sans',sans-serif] font-semibold text-[20px] text-foreground mb-[-4px]">Balance</p>
          <p className="font-['DM_Sans',sans-serif] font-bold text-[28px] text-accent-green tracking-tight">
            {formatCompact(balance)}
          </p>
        </div>

        {/* Info Cards */}
        <div className="w-full flex flex-wrap gap-x-6 gap-y-3 mb-5">
          <div className="flex flex-col relative min-w-0">
            <p className="font-['DM_Sans',sans-serif] font-medium text-[14px] text-muted-foreground">Period</p>
            <div className="flex items-center gap-1">
              <select
                className="bg-transparent font-['DM_Sans',sans-serif] font-medium text-[18px] sm:text-[20px] text-foreground cursor-pointer outline-none appearance-none pr-6"
                value={selectedMonthFilter}
                onChange={(e) => setSelectedMonthFilter(e.target.value)}
              >
                {availableMonths.map(m => (
                  <option key={m} value={m} className="bg-card text-foreground">{m === 'All' ? 'All Time' : m}</option>
                ))}
              </select>
              <svg className="size-5 text-foreground absolute right-0 pointer-events-none" fill="none" viewBox="0 0 20 20">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-['DM_Sans',sans-serif] font-medium text-[14px] text-muted-foreground">Expenses</p>
            <p className="font-['DM_Sans',sans-serif] font-medium text-[18px] text-foreground">{formatCompact(totalExpenses)}</p>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-['DM_Sans',sans-serif] font-medium text-[14px] text-muted-foreground">Income</p>
            <p className="font-['DM_Sans',sans-serif] font-medium text-[18px] text-foreground">{formatCompact(totalIncome)}</p>
          </div>
        </div>

        {/* Hero Achievement Card */}
        <motion.div
          className="bg-card w-full rounded-xl px-4 py-5 flex gap-5 items-start shadow-md mb-5 border border-border"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex flex-col gap-1 flex-1">
            <div className="flex items-center gap-2">
              <Trophy className="size-4 text-[#ffd700]" />
              <p className="font-['DM_Sans',sans-serif] font-semibold text-[18px] text-foreground">You're a Superhero!</p>
            </div>
            <p className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-muted-foreground">
              {isPositiveSaving 
                ? `You have saved ${savedPercentage}% of your income! Keep it up!`
                : `You've spent more than you earned this month. Let's save more!`}
            </p>
            <button
              className="font-['DM_Sans',sans-serif] font-semibold text-[12px] text-accent-green mt-2.5 text-left hover:underline"
              onClick={() => navigate('/achievements')}
            >
              View Details →
            </button>
          </div>
          <div className="relative size-[90px] shrink-0">
            <svg className="size-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" className="stroke-muted" strokeWidth="8"/>
              <motion.circle cx="50" cy="50" r="40" fill="none" className="stroke-accent-green" strokeWidth="8" strokeLinecap="round"
                initial={{ strokeDasharray: "0 251.2" }}
                animate={{ strokeDasharray: `${(Math.max(0, savedPercentage) / 100) * 251.2} 251.2` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-['DM_Sans',sans-serif] font-bold text-[14px] text-foreground">{Math.max(0, savedPercentage)}%</p>
              <p className="font-['DM_Sans',sans-serif] font-semibold text-[10px] text-muted-foreground">Saved</p>
            </div>
          </div>
        </motion.div>

        {/* Transaction History Card */}
        <div className="bg-card border border-border w-full rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-5">
            <div className="flex items-end justify-between mb-6">
              <p className="font-['DM_Sans',sans-serif] font-semibold text-[14px] text-foreground">Transaction History</p>
              <button 
                onClick={() => setShowAllTransactions(!showAllTransactions)}
                className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-muted-foreground hover:text-accent-green transition-colors"
              >
                {showAllTransactions ? 'view less' : 'view all'}
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 mb-5 border-b border-border">
              {['all', 'expenses', 'income'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className="flex flex-col gap-2 items-center relative px-2">
                  <p className={`font-['DM_Sans',sans-serif] font-bold text-[14px] capitalize ${activeTab === tab ? 'text-accent-green' : 'text-muted-foreground'}`}>{tab}</p>
                  {activeTab === tab && <motion.div className="absolute -bottom-[1px] h-0.5 w-full bg-accent-green rounded-t-full" layoutId="activeTab" />}
                </button>
              ))}
            </div>

            {/* Transactions List */}
            <div className={`space-y-4 overflow-y-auto pr-2 scrollbar-hide transition-all duration-300 ${showAllTransactions ? 'max-h-[600px]' : 'max-h-[300px]'}`}>
              {Object.entries(groupedTransactions).map(([date, items]) => (
                <div key={date}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <p className="font-['DM_Sans',sans-serif] font-semibold text-[10px] text-muted-foreground">{date}</p>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="space-y-2.5">
                    {items.map((transaction) => (
                      <motion.div key={transaction.id} className="flex items-center justify-between gap-2 min-w-0"
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="bg-muted rounded-full size-10 shrink-0 flex items-center justify-center text-lg">{transaction.icon}</div>
                          <div className="min-w-0">
                            <p className="font-['DM_Sans',sans-serif] font-semibold text-[14px] text-foreground truncate">{transaction.category}</p>
                            <p className="font-['DM_Sans',sans-serif] font-medium text-[12px] text-muted-foreground truncate">{transaction.detail}</p>
                          </div>
                        </div>
                        <p className={`font-['DM_Sans',sans-serif] font-bold text-[14px] shrink-0 ${transaction.amount > 0 ? 'text-accent-green' : 'text-foreground'}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount < 0 ? '-' : ''}{formatCompact(Math.abs(transaction.amount))}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
              {!transactionsLoading && transactions.length === 0 && (
                <div className="text-center py-8">
                  <div className="bg-muted size-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="size-8 text-muted-foreground" />
                  </div>
                  <p className="font-['DM_Sans',sans-serif] text-sm text-foreground font-medium mb-1">No transactions yet.</p>
                  <p className="font-['DM_Sans',sans-serif] text-xs text-muted-foreground">Tap the + button to add one!</p>
                </div>
              )}
              {transactionsLoading && (
                <div className="flex justify-center py-8">
                  <div className="size-6 border-2 border-accent-green border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navigation />

      {/* Notifications Modal */}
      <NotificationsModal 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </div>
  );
}
