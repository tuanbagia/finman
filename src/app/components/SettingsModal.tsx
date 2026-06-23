import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, X, LogOut, Globe, Github, Palette } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useFirestore } from '@/contexts/FirestoreContext';
import { useCurrency, CURRENCIES, type CurrencyType } from '@/hooks/useCurrency';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function SettingsModal({ isOpen, onClose, onLogout }: SettingsModalProps) {
  const { theme, toggleTheme } = useTheme();
  const { updateProfile } = useFirestore();
  const { currentCurrency, availableCurrencies } = useCurrency();

  const handleCurrencyChange = async (currency: CurrencyType) => {
    await updateProfile({ currency });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl overflow-hidden flex flex-col"
            style={{ maxHeight: '80vh' }}
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-['DM_Sans',sans-serif] font-bold text-[20px] text-foreground">Settings</h2>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                <X className="size-6 text-foreground" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Appearance */}
              <div>
                <h3 className="font-['DM_Sans',sans-serif] font-semibold text-[14px] text-muted-foreground mb-4 uppercase tracking-wider">Appearance</h3>
                <div className="bg-background rounded-xl border border-border overflow-hidden">
                  <div className="p-4 flex items-center justify-between border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="bg-accent-green/20 p-2 rounded-lg">
                        {theme === 'dark' ? <Moon className="size-5 text-accent-green" /> : <Sun className="size-5 text-accent-green" />}
                      </div>
                      <div>
                        <p className="font-['DM_Sans',sans-serif] font-medium text-[16px] text-foreground">Theme</p>
                        <p className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-muted-foreground capitalize">{theme} Mode</p>
                      </div>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className="relative w-12 h-6 bg-muted rounded-full border border-border"
                    >
                      <motion.div
                        className="absolute top-0.5 left-0.5 w-5 h-5 bg-accent-green rounded-full shadow-md"
                        animate={{ x: theme === 'dark' ? 24 : 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h3 className="font-['DM_Sans',sans-serif] font-semibold text-[14px] text-muted-foreground mb-4 uppercase tracking-wider">Preferences</h3>
                <div className="bg-background rounded-xl border border-border overflow-hidden">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-accent-green/20 p-2 rounded-lg">
                        <Globe className="size-5 text-accent-green" />
                      </div>
                      <div>
                        <p className="font-['DM_Sans',sans-serif] font-medium text-[16px] text-foreground">Currency</p>
                        <p className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-muted-foreground">Default display currency</p>
                      </div>
                    </div>
                    <select 
                      value={currentCurrency}
                      onChange={(e) => handleCurrencyChange(e.target.value as CurrencyType)}
                      className="bg-card border border-border rounded-lg px-3 py-1.5 font-['DM_Sans',sans-serif] font-medium text-[14px] text-foreground outline-none focus:border-accent-green"
                    >
                      {availableCurrencies.map(c => (
                        <option key={c} value={c}>{c} ({CURRENCIES[c].symbol})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* About Credits */}
              <div>
                <h3 className="font-['DM_Sans',sans-serif] font-semibold text-[14px] text-muted-foreground mb-4 uppercase tracking-wider">About</h3>
                <div className="bg-background rounded-xl border border-border overflow-hidden divide-y divide-border">
                  <a
                    href="https://github.com/tuanbagia/finman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-accent-green/20 p-2 rounded-lg">
                        <Github className="size-5 text-accent-green" />
                      </div>
                      <div>
                        <p className="font-['DM_Sans',sans-serif] font-medium text-[16px] text-foreground">Creator</p>
                        <p className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-muted-foreground">RD Triawan Subagia Soetama</p>
                      </div>
                    </div>
                    <span className="text-[12px] font-['DM_Sans',sans-serif] font-semibold text-accent-green">GitHub</span>
                  </a>

                  <a
                    href="https://www.figma.com/design/FUzAZyOI4QEi7hFwu5f48n/FinMan---Personal-Finance-Manager?node-id=1-4&t=CNRIJ4oGpyGvzmD3-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-accent-green/20 p-2 rounded-lg">
                        <Palette className="size-5 text-accent-green" />
                      </div>
                      <div>
                        <p className="font-['DM_Sans',sans-serif] font-medium text-[16px] text-foreground">UI/UX Design</p>
                        <p className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-muted-foreground">Designed by Rezky Azhar Aditya</p>
                      </div>
                    </div>
                    <span className="text-[12px] font-['DM_Sans',sans-serif] font-semibold text-accent-green">Figma</span>
                  </a>
                </div>
              </div>

              {/* Account Actions */}
              <div>
                <h3 className="font-['DM_Sans',sans-serif] font-semibold text-[14px] text-muted-foreground mb-4 uppercase tracking-wider">Account</h3>
                <button
                  onClick={onLogout}
                  className="w-full bg-background rounded-xl border border-border p-4 flex items-center justify-between hover:bg-destructive/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-destructive/20 p-2 rounded-lg group-hover:bg-destructive/30 transition-colors">
                      <LogOut className="size-5 text-destructive" />
                    </div>
                    <p className="font-['DM_Sans',sans-serif] font-medium text-[16px] text-destructive">Log Out</p>
                  </div>
                </button>
              </div>
            </div>
            <div className="pb-8" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
