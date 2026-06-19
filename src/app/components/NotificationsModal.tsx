import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { useFirestore } from '@/contexts/FirestoreContext';
import { useCurrency } from '@/hooks/useCurrency';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const { transactions } = useFirestore();
  const { formatCurrency } = useCurrency();

  const dynamicNotifications = transactions.slice(0, 10).map((t, index) => ({
    id: t.id,
    title: t.amount > 0 ? 'Income Added' : 'Expense Recorded',
    description: `You ${t.amount > 0 ? 'received' : 'spent'} ${formatCurrency(Math.abs(t.amount))} for ${t.category}`,
    icon: t.amount > 0 ? <TrendingUp className="size-5 text-accent-green" /> : <TrendingDown className="size-5 text-[#ff6b6b]" />,
    time: t.date,
    unread: index < 3, // Just a visual mock for unread status
  }));

  const notifications = dynamicNotifications.length > 0 ? dynamicNotifications : [
    {
      id: 'welcome',
      title: 'Welcome to FinMan!',
      description: 'Start managing your finances like a hero today.',
      icon: <Zap className="size-5 text-accent-green" />,
      time: 'Just now',
      unread: true,
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-card w-full sm:w-[400px] sm:rounded-[24px] rounded-t-[24px] p-6 pb-8 max-h-[85vh] overflow-y-auto border border-border shadow-2xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Handle bar for mobile */}
            <div className="w-10 h-1 bg-muted-foreground rounded-full mx-auto mb-4 opacity-50 sm:hidden" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Bell className="size-5 text-foreground" />
                <h2 className="font-['DM_Sans',sans-serif] font-bold text-[20px] text-foreground">
                  Notifications
                </h2>
              </div>
              <button onClick={onClose} className="p-1 hover:scale-110 transition-all">
                <X className="size-[24px] text-muted-foreground" />
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex flex-col gap-3">
              {notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`flex gap-4 p-3 rounded-xl border ${notif.unread ? 'bg-muted/50 border-border' : 'bg-background border-transparent'}`}
                >
                  <div className="bg-background rounded-full size-10 shrink-0 flex items-center justify-center shadow-sm border border-border">
                    {notif.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-['DM_Sans',sans-serif] font-semibold text-[14px] text-foreground">
                        {notif.title}
                      </p>
                      {notif.unread && <div className="size-2 bg-accent-green rounded-full shrink-0 mt-1.5" />}
                    </div>
                    <p className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-muted-foreground mb-1">
                      {notif.description}
                    </p>
                    <p className="font-['DM_Sans',sans-serif] font-medium text-[10px] text-muted-foreground/60">
                      {notif.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 font-['DM_Sans',sans-serif] font-semibold text-[14px] text-accent-green hover:underline" onClick={onClose}>
              Mark all as read
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
