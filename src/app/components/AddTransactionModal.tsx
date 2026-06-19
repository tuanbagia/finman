import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useFirestore } from '@/contexts/FirestoreContext';
import { useCurrency } from '@/hooks/useCurrency';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const expenseCategories = [
  { name: 'Shopping', icon: '🛒' },
  { name: 'Food', icon: '🍗' },
  { name: 'Drink', icon: '☕' },
  { name: 'Transport', icon: '🚕' },
  { name: 'Entertainment', icon: '🎬' },
  { name: 'Bills', icon: '📄' },
  { name: 'Health', icon: '💊' },
  { name: 'Other', icon: '📦' },
];

const incomeCategories = [
  { name: 'Salary', icon: '💰' },
  { name: 'Freelance', icon: '💼' },
  { name: 'Investment', icon: '📈' },
  { name: 'Gift', icon: '🎁' },
  { name: 'Other', icon: '📦' },
];

export default function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const { addTransaction } = useFirestore();
  const { symbol } = useCurrency();
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [category, setCategory] = useState('');
  const [detail, setDetail] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }));
  const [loading, setLoading] = useState(false);

  const categories = type === 'expense' ? expenseCategories : incomeCategories;
  const selectedCategory = categories.find(c => c.name === category);

  const resetForm = () => {
    setType('expense');
    setCategory('');
    setDetail('');
    setAmount('');
    setDate(new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }));
  };

  const handleSubmit = async () => {
    if (!category || !amount || !detail) return;

    setLoading(true);
    try {
      const parsedAmount = parseFloat(amount);
      await addTransaction({
        category,
        detail,
        amount: type === 'expense' ? -Math.abs(parsedAmount) : Math.abs(parsedAmount),
        icon: selectedCategory?.icon || '📦',
        date,
      });
      resetForm();
      onClose();
    } catch (err: any) {
      console.error('Failed to add transaction:', err);
      alert('Failed to add transaction: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute inset-0 z-50 flex items-end justify-center"
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
            className="relative bg-card w-full max-w-md rounded-t-[24px] p-6 pb-8 max-h-[85vh] overflow-y-auto border-t border-x border-border shadow-2xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Handle bar */}
            <div className="w-10 h-1 bg-muted-foreground rounded-full mx-auto mb-4 opacity-50" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['DM_Sans',sans-serif] font-bold text-[20px] text-foreground">
                Add Transaction
              </h2>
              <button onClick={onClose} className="p-1 hover:scale-110 transition-all">
                <X className="size-[24px] text-muted-foreground" />
              </button>
            </div>

            {/* Type Toggle */}
            <div className="flex bg-background rounded-full p-1 mb-6 border border-border">
              <button
                onClick={() => { setType('expense'); setCategory(''); }}
                className={`flex-1 py-2.5 rounded-full font-['DM_Sans',sans-serif] font-semibold text-[14px] transition-all ${
                  type === 'expense'
                    ? 'bg-destructive text-destructive-foreground shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                Expense
              </button>
              <button
                onClick={() => { setType('income'); setCategory(''); }}
                className={`flex-1 py-2.5 rounded-full font-['DM_Sans',sans-serif] font-semibold text-[14px] transition-all ${
                  type === 'income'
                    ? 'bg-accent-green text-white shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                Income
              </button>
            </div>

            {/* Category Selection */}
            <div className="mb-5">
              <label className="font-['DM_Sans',sans-serif] font-medium text-[12px] text-muted-foreground mb-2 block">
                Category
              </label>
              <div className="grid grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setCategory(cat.name)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-[12px] transition-all border ${
                      category === cat.name
                        ? 'bg-accent-green/20 border-accent-green'
                        : 'bg-background border-transparent hover:border-border'
                    }`}
                  >
                    <span className="text-[20px]">{cat.icon}</span>
                    <span className="font-['DM_Sans',sans-serif] font-medium text-[10px] text-foreground">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="font-['DM_Sans',sans-serif] font-medium text-[12px] text-muted-foreground mb-2 block">
                Description
              </label>
              <input
                type="text"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="e.g. Grocery shopping"
                className="w-full px-4 py-3 bg-background rounded-[12px] font-['DM_Sans',sans-serif] font-normal text-[14px] text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-accent-green transition-all"
              />
            </div>

            {/* Amount */}
            <div className="mb-5">
              <label className="font-['DM_Sans',sans-serif] font-medium text-[12px] text-muted-foreground mb-2 block">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-['DM_Sans',sans-serif] font-bold text-[18px] text-accent-green">
                  {symbol}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={amount ? Number(amount).toLocaleString('id-ID') : ''}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, '');
                    setAmount(rawValue);
                  }}
                  placeholder="0"
                  className="w-full pl-12 pr-4 py-3 bg-background rounded-[12px] font-['DM_Sans',sans-serif] font-bold text-[18px] text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-accent-green transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              onClick={handleSubmit}
              disabled={!category || !amount || !detail || loading}
              className={`w-full py-4 rounded-full font-['Outfit',sans-serif] font-semibold text-[16px] transition-all ${
                category && amount && detail && !loading
                  ? 'bg-accent-green text-white hover:scale-[1.02] active:scale-[0.98] shadow-md'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding...
                </div>
              ) : (
                `Add ${type === 'expense' ? 'Expense' : 'Income'}`
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
