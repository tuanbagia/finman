import { useNavigate, useLocation } from 'react-router';
import { Home, Trophy, MessageCircle, User, Plus } from 'lucide-react';
import { useState } from 'react';
import AddTransactionModal from './AddTransactionModal';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAddModal, setShowAddModal] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 bg-card h-[78px] border-t border-border z-10 rounded-b-[inherit]">
        <div className="flex items-center justify-evenly max-w-lg mx-auto pt-[14px]">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex flex-col gap-[4px] items-center transition-all hover:scale-110"
          >
            <Home
              className={`size-[21px] ${isActive('/dashboard') ? 'text-accent-green' : 'text-muted-foreground'}`}
              fill={isActive('/dashboard') ? 'var(--color-accent-green)' : 'none'}
            />
            <p
              className={`font-['DM_Sans',sans-serif] font-medium text-[10px] ${
                isActive('/dashboard') ? 'text-accent-green' : 'text-muted-foreground'
              }`}
            >
              Home
            </p>
          </button>

          <button
            onClick={() => navigate('/achievements')}
            className="flex flex-col gap-[4px] items-center transition-all hover:scale-110"
          >
            <Trophy
              className={`size-[20px] ${isActive('/achievements') ? 'text-accent-green' : 'text-muted-foreground'}`}
            />
            <p
              className={`font-['DM_Sans',sans-serif] font-medium text-[10px] ${
                isActive('/achievements') ? 'text-accent-green' : 'text-muted-foreground'
              }`}
            >
              Achievement
            </p>
          </button>

          <div className="relative -mt-8">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-accent-green rounded-full size-[60px] flex items-center justify-center shadow-lg hover:scale-110 transition-all active:scale-95 border-4 border-background"
            >
              <Plus className="size-[32px] text-white" strokeWidth={3} />
            </button>
          </div>

          <button
            onClick={() => navigate('/ai-chat')}
            className="flex flex-col gap-[4px] items-center transition-all hover:scale-110"
          >
            <MessageCircle
              className={`size-[21px] ${isActive('/ai-chat') ? 'text-accent-green' : 'text-muted-foreground'}`}
            />
            <p
              className={`font-['DM_Sans',sans-serif] font-medium text-[10px] ${
                isActive('/ai-chat') ? 'text-accent-green' : 'text-muted-foreground'
              }`}
            >
              AI Chat
            </p>
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col gap-[4px] items-center transition-all hover:scale-110"
          >
            <User
              className={`size-[24px] ${isActive('/profile') ? 'text-accent-green' : 'text-muted-foreground'}`}
            />
            <p
              className={`font-['DM_Sans',sans-serif] font-medium text-[10px] ${
                isActive('/profile') ? 'text-accent-green' : 'text-muted-foreground'
              }`}
            >
              Me
            </p>
          </button>
        </div>
      </div>

      <AddTransactionModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </>
  );
}
