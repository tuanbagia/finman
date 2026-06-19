import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Send, Sparkles, TrendingUp, Wallet, Target, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, type Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { useFirestore } from '@/contexts/FirestoreContext';
import Navigation from '../components/Navigation';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date | null;
}

export default function AIChat() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { transactions, userProfile } = useFirestore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(0);

  useEffect(() => {
    if (!user) return;

    const chatRef = collection(db, 'users', user.uid, 'chats');
    const q = query(chatRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages: Message[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text,
          sender: data.sender,
          timestamp: data.createdAt ? (data.createdAt as Timestamp).toDate() : new Date(),
        };
      });

      // Add default welcome message if empty
      if (fetchedMessages.length === 0 && !loading) {
        addDoc(chatRef, {
          text: "Hey there, Hero! 👋 I'm FinMan, your AI financial sidekick. I'm here to help you understand your finances, give you tips, and answer any money questions you have. What would you like to know?",
          sender: 'bot',
          createdAt: serverTimestamp(),
        });
      } else {
        setMessages(fetchedMessages);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [user, loading]);

  // Track which messages are "new" (only animate the latest ones)
  const newMessageStartIndex = useMemo(() => {
    const prevCount = prevMessageCountRef.current;
    prevMessageCountRef.current = messages.length;
    return prevCount;
  }, [messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: <TrendingUp className="size-[16px]" />, text: 'How can I save more?', color: 'var(--color-accent-green)' },
    { icon: <Wallet className="size-[16px]" />, text: 'Analyze my spending', color: '#6bc9ff' },
    { icon: <Target className="size-[16px]" />, text: 'Set a budget goal', color: '#ffd700' },
    { icon: <Lightbulb className="size-[16px]" />, text: 'Financial tips', color: 'var(--color-destructive)' }
  ];

  const handleSend = async () => {
    if (!inputValue.trim() || !user) return;

    const chatRef = collection(db, 'users', user.uid, 'chats');
    
    // Add User Message
    const userText = inputValue;
    setInputValue('');
    
    // Fire and forget so it appears instantly via Firestore optimistic updates
    addDoc(chatRef, {
      text: userText,
      sender: 'user',
      createdAt: serverTimestamp(),
    }).catch(console.error);

    setIsTyping(true);

    // Simulate AI thinking then respond
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const validHistory: { role: string, parts: { text: string }[] }[] = [];
      let lastRole = '';

      for (const msg of messages) {
        const role = msg.sender === 'user' ? 'user' : 'model';
        // Gemini strictly requires the first message to be 'user'
        if (validHistory.length === 0 && role === 'model') continue;
        
        if (role === lastRole) {
          // If the role is the same as the last one, append text to the previous message
          // This ensures strict alternating turns
          validHistory[validHistory.length - 1].parts[0].text += `\n\n${msg.text}`;
        } else {
          validHistory.push({ role, parts: [{ text: msg.text }] });
          lastRole = role;
        }
      }

      // Add the new message
      if (lastRole === 'user') {
        if (validHistory.length > 0) {
          validHistory[validHistory.length - 1].parts[0].text += `\n\n${userText}`;
        } else {
          validHistory.push({ role: 'user', parts: [{ text: userText }] });
        }
      } else {
        validHistory.push({ role: 'user', parts: [{ text: userText }] });
      }

      const financialContext = `
Here is the user's current financial context:
- Name: ${userProfile?.displayName || 'Hero'}
- Level: ${userProfile?.level || 1}
- Total Transactions Count: ${userProfile?.totalTransactions || 0}
- Current Savings/Balance: Rp ${userProfile?.totalSaved?.toLocaleString('id-ID') || 0}
- Active Streak: ${userProfile?.streakDays || 0} days
- Recent Transactions (up to 15): ${JSON.stringify(transactions.slice(0, 15).map(t => ({ date: t.date, type: t.amount > 0 ? 'income' : 'expense', amount: Math.abs(t.amount), category: t.category })), null, 2)}
Use this data to give highly personalized, accurate, and encouraging advice.`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: "You are FinMan, an AI financial sidekick. Keep your answers brief, friendly, encouraging, and focused strictly on personal finance. " + financialContext }]
          },
          contents: validHistory
        })
      });

      const data = await res.json();
      const botResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I'm having trouble thinking right now.";

      if (!res.ok) {
        console.error("Gemini API Error:", data);
        throw new Error("API Error");
      }

      await addDoc(chatRef, {
        text: botResponseText,
        sender: 'bot',
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Gemini API Error:", err);
      await addDoc(chatRef, {
        text: "Oops, I encountered an error connecting to my brain. Please try again later!",
        sender: 'bot',
        createdAt: serverTimestamp(),
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (text: string) => {
    setInputValue(text);
  };

  return (
    <div className="bg-background relative h-full flex flex-col max-w-2xl mx-auto pb-[78px]">
      {/* Header */}
      <div className="bg-gradient-to-b from-card to-transparent px-6 sm:px-8 pt-16 pb-5 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="p-1 hover:bg-muted rounded-full transition-all">
            <ArrowLeft className="size-[26px] text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <p className="font-['Big_Shoulders_Display',sans-serif] font-black text-[28px] text-foreground leading-normal">
              Fin<span className="font-['Big_Shoulders_Stencil_Display',sans-serif] text-accent-green">M</span>an
            </p>
            <div className="bg-accent-green rounded-full p-1.5">
              <Sparkles className="size-[14px] text-white" />
            </div>
          </div>
          <div className="w-[26px]" />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              onClick={() => handleQuickAction(action.text)}
              className="flex items-center gap-2 bg-card border border-border px-3 py-2 rounded-full whitespace-nowrap hover:scale-105 transition-all shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={{ color: action.color }}>{action.icon}</div>
              <span className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-foreground">
                {action.text}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-5 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => {
            const isNew = index >= newMessageStartIndex;
            return (
              <motion.div
                key={message.id}
                className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={isNew ? { opacity: 0, y: 12, scale: 0.97 } : false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm border ${
                    message.sender === 'user'
                      ? 'bg-accent-green text-white border-accent-green'
                      : 'bg-card text-foreground border-border'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="size-[14px] text-accent-green" />
                      <span className="font-['DM_Sans',sans-serif] font-semibold text-[10px] text-accent-green">
                        FinMan AI
                      </span>
                    </div>
                  )}
                  {message.sender === 'bot' ? (
                    <div className="font-['DM_Sans',sans-serif] font-normal text-[14px] leading-relaxed [&>p]:mb-2 last:[&>p]:mb-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-2 [&>strong]:font-bold [&>em]:italic">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="font-['DM_Sans',sans-serif] font-normal text-[14px] leading-relaxed">
                      {message.text}
                    </p>
                  )}
                  <p
                    className={`font-['DM_Sans',sans-serif] font-normal text-[10px] mt-1 ${
                      message.sender === 'user' ? 'text-white/80' : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Sending...'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="flex mb-4 justify-start"
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="max-w-[80%] rounded-2xl px-5 py-4 shadow-sm border bg-card text-foreground border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="size-[14px] text-accent-green" />
                  <span className="font-['DM_Sans',sans-serif] font-semibold text-[10px] text-accent-green">
                    FinMan AI is thinking...
                  </span>
                </div>
                <div className="flex items-center gap-1.5 h-4">
                  <motion.div className="size-2 bg-accent-green rounded-full" animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0 }} />
                  <motion.div className="size-2 bg-accent-green rounded-full" animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
                  <motion.div className="size-2 bg-accent-green rounded-full" animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-6 sm:px-8 pb-5 shrink-0">
        <div className="bg-card border border-border rounded-3xl flex items-center gap-3 px-4 py-3 shadow-sm">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask FinMan anything..."
            className="flex-1 bg-transparent font-['DM_Sans',sans-serif] font-normal text-[14px] text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            onClick={handleSend}
            className={`rounded-full p-2 transition-all ${
              inputValue.trim()
                ? 'bg-accent-green hover:scale-110 shadow-sm'
                : 'bg-muted'
            }`}
            disabled={!inputValue.trim()}
          >
            <Send className={`size-[20px] ${inputValue.trim() ? 'text-white' : 'text-muted-foreground'}`} />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
}
