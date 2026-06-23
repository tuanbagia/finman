import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router';
import { type ReactNode } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { FirestoreProvider } from '@/contexts/FirestoreContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Onboarding from './screens/Onboarding';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import Achievements from './screens/Achievements';
import Challenges from './screens/Challenges';
import AIChat from './screens/AIChat';
import Profile from './screens/Profile';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="bg-background size-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 border-4 border-accent-green border-t-transparent rounded-full animate-spin" />
          <p className="font-['DM_Sans',sans-serif] font-medium text-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-background size-full flex items-center justify-center">
        <div className="size-10 border-4 border-accent-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/onboarding" replace />} />
      <Route path="/onboarding" element={<PublicRoute><Onboarding /></PublicRoute>} />
      <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
      <Route path="/challenges" element={<ProtectedRoute><Challenges /></ProtectedRoute>} />
      <Route path="/ai-chat" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <FirestoreProvider>
            {/* Desktop Wrapper to simulate mobile view */}
            <div className="min-h-dvh bg-black/20 flex justify-center w-full overflow-hidden flex flex-col h-dvh">
              <div className="w-full max-w-md bg-background text-foreground relative shadow-2xl h-dvh overflow-hidden flex flex-col">
                <AppRoutes />
              </div>
            </div>
          </FirestoreProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
