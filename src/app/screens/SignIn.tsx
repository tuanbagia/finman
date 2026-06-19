import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, error, clearError, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    clearError();
  }, []);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/dashboard', { replace: true });
    } catch {
      // error handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard', { replace: true });
    } catch {
      // error handled by AuthContext
    }
  };

  return (
    <div className="bg-background min-h-dvh flex flex-col">
      <div className="w-full max-w-sm mx-auto flex flex-col flex-1 px-8 pt-16 pb-8">
        {/* Back Button */}
        <motion.button
          className="self-start p-1 mb-4 cursor-pointer transition-all hover:scale-110 active:scale-95"
          onClick={() => navigate(-1)}
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="size-[26px] text-foreground" />
        </motion.button>

        {/* Logo */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="font-['Big_Shoulders_Display',sans-serif] font-black text-[36px] text-foreground leading-normal">
            Fin<span className="font-['Big_Shoulders_Stencil_Display',sans-serif] text-accent-green">M</span>an
          </p>
        </motion.div>

        {/* Welcome Text */}
        <motion.p
          className="font-['DM_Sans',sans-serif] font-semibold text-[24px] text-foreground text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome back, Hero!
        </motion.p>

        {/* Error Message */}
        {error && (
          <motion.div
            className="bg-destructive/20 border border-destructive/50 rounded-[8px] px-4 py-3 mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-['DM_Sans',sans-serif] font-normal text-[13px] text-destructive">{error}</p>
          </motion.div>
        )}

        {/* Email Field */}
        <motion.div
          className="flex flex-col gap-2 mb-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-foreground">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3.5 bg-transparent border border-border rounded-[4px] font-['DM_Sans',sans-serif] font-normal text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-green transition-colors"
          />
        </motion.div>

        {/* Password Field */}
        <motion.div
          className="flex flex-col gap-2 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-foreground">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
              placeholder="Enter your password"
              className="w-full px-4 py-3.5 pr-12 bg-transparent border border-border rounded-[4px] font-['DM_Sans',sans-serif] font-normal text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-green transition-colors"
            />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2" type="button">
              {showPassword ? <EyeOff className="size-[18px] text-muted-foreground" /> : <Eye className="size-[18px] text-muted-foreground" />}
            </button>
          </div>
        </motion.div>

        {/* Remember Me & Forgot Password */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" className="size-[10px] rounded-[2px] border border-border accent-accent-green" />
            <span className="font-['Outfit',sans-serif] font-normal text-muted-foreground text-[14px]">Remember Me</span>
          </label>
          <button className="font-['DM_Sans',sans-serif] font-normal text-accent-green text-[14px] hover:underline">
            Forgot Password?
          </button>
        </motion.div>

        {/* Sign In Button */}
        <motion.button
          className="bg-accent-green flex h-[48px] items-center justify-center w-full rounded-full cursor-pointer transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          onClick={handleSignIn}
          disabled={loading || !email.trim() || !password.trim()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <p className="font-['Outfit',sans-serif] font-semibold text-white text-[14px]">Signing in...</p>
            </div>
          ) : (
            <p className="font-['Outfit',sans-serif] font-semibold text-white text-[14px]">Sign in</p>
          )}
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-border" />
          <p className="font-['Outfit',sans-serif] font-normal text-foreground text-[14px]">or</p>
          <div className="flex-1 h-[1px] bg-border" />
        </div>

        {/* Google Login Button */}
        <motion.button
          className="flex gap-3 h-[48px] items-center justify-center w-full rounded-full border border-border cursor-pointer transition-all hover:bg-muted active:scale-95 shadow-sm"
          onClick={handleGoogleSignIn}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="var(--color-accent-green)"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="var(--color-accent-green)"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="var(--color-accent-green)"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="var(--color-accent-green)"/>
          </svg>
          <p className="font-['Outfit',sans-serif] font-normal text-foreground text-[14px]">Log in with Google</p>
        </motion.button>

        {/* Sign Up Link */}
        <p className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-muted-foreground text-center mt-6">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-accent-green font-semibold hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
