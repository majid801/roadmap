import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Rocket, CheckCircle, Star, ArrowRight, Menu, X, Terminal, Layout, Briefcase, FileText, BarChart3, ShieldCheck, Twitter, Linkedin, Zap } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050714] text-[#e8eaf0] font-sans selection:bg-blue-500/30">
      {/* Urgency Strip */}
      <div className="relative z-50 bg-gradient-to-r from-blue-900/60 to-purple-900/60 border-b border-purple-500/20 py-2 text-center text-sm">
        <span className="text-yellow-400 font-semibold">🔥 Limited Offer:</span>
        <span className="text-gray-300 ml-2">Get 3 months Pro free when you sign up before April 30th.</span>
        <a href="#pricing" className="ml-3 text-blue-400 underline underline-offset-2 font-semibold hover:text-blue-300">Claim now →</a>
      </div>

      {/* Navbar */}
      <nav className={cn(
        "fixed top-8 left-0 right-0 z-40 px-4 transition-all duration-300",
        isScrolled ? "top-4" : "top-8"
      )}>
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-3 flex items-center justify-between transition-all",
            isScrolled && "bg-[#050714]/90 border-white/5"
          )}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
                <Layout className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight font-display">CareerPilot <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI</span></span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#how" className="hover:text-white transition-colors">How it Works</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden md:block px-4 py-2 rounded-xl text-sm font-medium text-blue-300 border border-blue-500/30 hover:bg-blue-500/10 transition-all">Log in</button>
              <button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-5 py-2 rounded-xl text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5"
              >
                Get Started Free
              </button>
              <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl mt-2 px-6 py-4 md:hidden"
            >
              <div className="flex flex-col gap-4 text-sm font-medium text-gray-300">
                <a href="#features" className="hover:text-white" onClick={() => setIsMenuOpen(false)}>Features</a>
                <a href="#how" className="hover:text-white" onClick={() => setIsMenuOpen(false)}>How it Works</a>
                <a href="#pricing" className="hover:text-white" onClick={() => setIsMenuOpen(false)}>Pricing</a>
                <a href="#testimonials" className="hover:text-white" onClick={() => setIsMenuOpen(false)}>Reviews</a>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute top-[100px] right-[-100px] w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-[-100px] left-[30%] w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full animate-pulse delay-1000" />

        <div className="max-w-6xl mx-auto px-4 w-full text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full text-sm mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            <span className="text-green-400 font-semibold">10,000+ learners</span>
            <span className="text-gray-500">got job-ready with CareerPilot AI</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6 font-display"
          >
            Stop watching tutorials.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">Start building your career.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 font-light"
          >
            CareerPilot AI gives you a <span className="text-blue-300 font-medium">personalized roadmap</span>, daily tasks, and AI guidance to go from <strong className="text-white">confused beginner → job-ready professional</strong> — in weeks, not years.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-2xl text-lg font-bold text-white shadow-2xl shadow-blue-600/40 transition-all hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Get Your Free AI Roadmap
            </button>
            <a href="#demo" className="px-8 py-4 rounded-2xl text-lg font-bold text-blue-300 border border-blue-500/30 hover:bg-blue-500/10 transition-all w-full sm:w-auto text-center">
              See a Sample Roadmap →
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 5, 9, 12].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/32?img=${i}`} className="w-8 h-8 rounded-full border-2 border-[#050714]" alt="" />
                ))}
              </div>
              <span>Trusted by <strong className="text-white">10,000+</strong> learners</span>
            </div>
            <span className="hidden sm:inline text-gray-800">|</span>
            <div className="flex items-center gap-1.5">
              <div className="flex text-yellow-400">★★★★★</div>
              <span><strong className="text-white">4.9/5</strong> avg. rating</span>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black">
              <div className="bg-[#111827] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="ml-4 text-xs text-gray-500 font-mono">careerpilot.ai/roadmap/you</span>
              </div>
              <div className="p-6 md:p-8 text-left">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                    <p className="text-[10px] text-gray-500 font-mono mb-3 uppercase tracking-wider">// YOUR GOAL</p>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-xl">🎯</div>
                      <div>
                        <p className="font-semibold text-sm">AI Engineer</p>
                        <p className="text-[10px] text-gray-500">6-month plan</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                        <span>Overall Progress</span><span className="text-blue-400">Week 3</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[35%]" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                    <p className="text-[10px] text-gray-500 font-mono mb-3 uppercase tracking-wider">// TODAY'S TASKS</p>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5 text-xs">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-500 line-through">Python basics — variables</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-500 line-through">Linear regression concept</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs bg-blue-500/10 border border-blue-500/20 rounded-lg p-1.5">
                        <Rocket className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-medium">Build sentiment classifier</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                    <p className="text-[10px] text-gray-500 font-mono mb-3 uppercase tracking-wider">// AI MENTOR</p>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 flex items-center justify-center text-[8px] font-bold">AI</div>
                        <div className="bg-white/5 rounded-xl rounded-tl-none px-3 py-2 text-[10px] text-gray-300">
                          You're 3 days ahead of schedule! Focus on your classifier project today.
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <div className="bg-blue-600/20 rounded-xl rounded-tr-none px-3 py-2 text-[10px] text-gray-300">
                          What if I get stuck on model accuracy?
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">✦ Features</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4 font-display">
              Everything you need.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Nothing you don't.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.08] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layout className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Career Roadmap</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Type your goal, and CareerPilot AI generates a personalized, week-by-week roadmap based on your skill level and schedule.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.08] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Daily Task System</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Wake up knowing exactly what to do. Micro-tasks and milestones delivered daily. Check them off and build momentum.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.08] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Project Builder</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Real-world projects guided by AI. From idea → code → deployment. Build the portfolio that gets you hired.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">✦ Pricing</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4 font-display">
              One latte or<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">a career-changing plan?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-4">Free Plan</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-extrabold font-display">₹0</span>
                <span className="text-gray-500">/ forever</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "1 Career Roadmap (7-day preview)",
                  "5 daily tasks per week",
                  "AI mentor (10 queries/month)",
                  "1 guided starter project",
                  "Basic progress tracking"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={onGetStarted}
                className="w-full py-4 rounded-2xl text-sm font-bold text-blue-300 border border-blue-500/30 hover:bg-blue-500/10 transition-all"
              >
                Start Free — No Card Needed
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/50 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
              </div>
              <p className="text-xs text-blue-400 uppercase tracking-widest font-mono mb-4">Pro Plan</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-gray-500 line-through text-lg font-display">₹999</span>
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-display">₹499</span>
                <span className="text-gray-400">/ month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited Career Roadmaps",
                  "Daily tasks auto-scheduled",
                  "Unlimited AI mentor access",
                  "Unlimited projects with AI guidance",
                  "AI Resume Generator (ATS-optimized)",
                  "Interview prep module",
                  "Private community access"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={onGetStarted}
                className="w-full py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1"
              >
                Get Pro — Start for ₹0 Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 bg-[#040611]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Layout className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg font-display">CareerPilot <span className="text-blue-400">AI</span></span>
              </div>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">Go from confused beginner to job-ready professional with a personalized AI roadmap, daily tasks, and expert AI guidance.</p>
              <div className="flex items-center gap-3 mt-5">
                <a href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:border-blue-500/50 transition-all">
                  <Twitter className="w-4 h-4 text-gray-400" />
                </a>
                <a href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:border-blue-500/50 transition-all">
                  <Linkedin className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-4 font-display">Product</p>
              <div className="space-y-2.5 text-sm text-gray-500">
                <a href="#features" className="block hover:text-white transition-colors">Features</a>
                <a href="#pricing" className="block hover:text-white transition-colors">Pricing</a>
                <a href="#how" className="block hover:text-white transition-colors">How It Works</a>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-4 font-display">Company</p>
              <div className="space-y-2.5 text-sm text-gray-500">
                <a href="#" className="block hover:text-white transition-colors">About</a>
                <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-600 text-sm">© 2025 CareerPilot AI. All rights reserved.</p>
            <p className="text-gray-700 text-xs">Built with ❤️ for learners everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
