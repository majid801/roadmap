import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, updateDoc, getDocs } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, Rocket, Target, CheckCircle, Clock, Zap, MessageSquare, Plus, ChevronRight, LogOut, User, BarChart3, Briefcase, X, ArrowRight } from 'lucide-react';
import { generateRoadmap, getAiMentorship } from '../services/ai';
import RoadmapView from './Roadmap';
import TaskList from './TaskList';

export default function Dashboard() {
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [activeRoadmap, setActiveRoadmap] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [time, setTime] = useState('2 hours/day');
  const [loading, setLoading] = useState(false);
  const [mentorshipOpen, setMentorshipOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [mentorshipResponse, setMentorshipResponse] = useState('');
  const [mentorshipLoading, setMentorshipLoading] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(collection(db, 'roadmaps'), where('userId', '==', auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRoadmaps(data);
      if (data.length > 0 && !activeRoadmap) {
        setActiveRoadmap(data[0]);
      }
    });

    return () => unsubscribe();
  }, [activeRoadmap]);

  const handleCreateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      if (roadmaps.length >= 1) {
        alert('Free plan is limited to 1 roadmap. Upgrade to Pro for unlimited access!');
        setIsCreating(false);
        return;
      }
      const roadmapData = await generateRoadmap(goal, level, time);
      await addDoc(collection(db, 'roadmaps'), {
        userId: auth.currentUser.uid,
        goal,
        level,
        time,
        ...roadmapData,
        createdAt: serverTimestamp(),
        progress: 0,
        completedTasks: []
      });
      setIsCreating(false);
      setGoal('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAskMentor = async () => {
    if (!question.trim()) return;
    setMentorshipLoading(true);
    try {
      const response = await getAiMentorship(question, activeRoadmap);
      setMentorshipResponse(response);
    } catch (err) {
      console.error(err);
    } finally {
      setMentorshipLoading(false);
    }
  };

  const handleSignOut = () => auth.signOut();

  return (
    <div className="min-h-screen bg-[#050714] text-[#e8eaf0] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0a0f1e]/50 hidden lg:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg font-display">CareerPilot <span className="text-blue-400">AI</span></span>
          </div>

          <nav className="space-y-1">
            <button 
              onClick={() => setActiveRoadmap(null)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${!activeRoadmap ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <BarChart3 className="w-4 h-4" />
              Overview
            </button>
            <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Your Roadmaps</div>
            {roadmaps.map(r => (
              <button 
                key={r.id}
                onClick={() => setActiveRoadmap(r)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeRoadmap?.id === r.id ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20' : 'text-gray-400 hover:bg-white/5'}`}
              >
                <Target className="w-4 h-4" />
                <span className="truncate">{r.goal}</span>
              </button>
            ))}
            <button 
              onClick={() => setIsCreating(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 transition-all mt-4 border border-dashed border-white/10"
            >
              <Plus className="w-4 h-4" />
              New Roadmap
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{auth.currentUser?.email?.split('@')[0]}</p>
              <p className="text-[10px] text-gray-500 truncate">{auth.currentUser?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-[#050714]/80 backdrop-blur-md z-30">
          <h2 className="text-lg font-bold font-display">
            {activeRoadmap ? activeRoadmap.goal : 'Dashboard Overview'}
          </h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMentorshipOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/10 text-blue-400 text-sm font-medium border border-blue-500/20 hover:bg-blue-600/20 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              AI Mentor
            </button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {isCreating ? (
              <motion.div 
                key="create"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6 font-display">Build your career roadmap</h3>
                <form onSubmit={handleCreateRoadmap} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">What is your career goal?</label>
                    <input 
                      type="text" 
                      required
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder="e.g. Senior AI Engineer, Full Stack Developer"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500/50 outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Current Level</label>
                      <select 
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500/50 outline-none transition-all appearance-none"
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Time per Day</label>
                      <select 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500/50 outline-none transition-all appearance-none"
                      >
                        <option>1 hour/day</option>
                        <option>2 hours/day</option>
                        <option>4 hours/day</option>
                        <option>Full-time</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="flex-1 px-6 py-4 rounded-2xl text-sm font-bold border border-white/10 hover:bg-white/5 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="flex-[2] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-6 py-4 rounded-2xl text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? 'Generating Roadmap...' : 'Generate Roadmap'}
                      <Rocket className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : activeRoadmap ? (
              <motion.div 
                key="roadmap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2 space-y-8">
                  <RoadmapView roadmap={activeRoadmap} />
                </div>
                <div className="space-y-8">
                  <TaskList roadmap={activeRoadmap} />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4 font-display">No active roadmaps</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-8">
                  Start your journey by creating your first AI-powered career roadmap.
                </p>
                <button 
                  onClick={() => setIsCreating(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-2xl text-lg font-bold text-white shadow-2xl shadow-blue-600/40 transition-all"
                >
                  Create My First Roadmap
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* AI Mentor Modal */}
      <AnimatePresence>
        {mentorshipOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMentorshipOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a0f1e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold font-display">AI Career Mentor</h4>
                    <p className="text-[10px] text-gray-500">Always active • Personalized to you</p>
                  </div>
                </div>
                <button onClick={() => setMentorshipOpen(false)} className="text-gray-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 h-[400px] overflow-y-auto space-y-4">
                {mentorshipResponse ? (
                  <div className="space-y-4">
                    <div className="flex gap-3 justify-end">
                      <div className="bg-blue-600/20 rounded-2xl rounded-tr-none px-4 py-3 text-sm text-gray-200 max-w-[80%]">
                        {question}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">AI</div>
                      <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-gray-300 max-w-[80%] whitespace-pre-wrap">
                        {mentorshipResponse}
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setMentorshipResponse('');
                        setQuestion('');
                      }}
                      className="text-xs text-blue-400 hover:underline"
                    >
                      Ask another question
                    </button>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                      <Zap className="w-8 h-8 text-blue-400" />
                    </div>
                    <p className="text-gray-400 text-sm max-w-xs">
                      Ask anything about your roadmap, technical concepts, or career advice.
                    </p>
                  </div>
                )}
              </div>

              {!mentorshipResponse && (
                <div className="p-6 border-t border-white/5">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAskMentor()}
                      placeholder="Type your question here..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-16 text-sm text-white focus:border-blue-500/50 outline-none transition-all"
                    />
                    <button 
                      onClick={handleAskMentor}
                      disabled={mentorshipLoading || !question.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-50"
                    >
                      {mentorshipLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ArrowRight className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
