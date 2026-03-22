import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Circle, Clock, ChevronRight, Target } from 'lucide-react';

export default function RoadmapView({ roadmap }: { roadmap: any }) {
  return (
    <div className="space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
            <Target className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-display">{roadmap.title}</h3>
            <p className="text-gray-400 text-sm">{roadmap.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] text-gray-500 font-mono uppercase mb-1">Status</p>
            <p className="text-sm font-bold text-blue-400">In Progress</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] text-gray-500 font-mono uppercase mb-1">Progress</p>
            <p className="text-sm font-bold text-white">{roadmap.progress || 0}%</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] text-gray-500 font-mono uppercase mb-1">Phases</p>
            <p className="text-sm font-bold text-white">{roadmap.phases?.length || 0}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-lg font-bold px-2 font-display">Curriculum Phases</h4>
        <div className="space-y-4">
          {roadmap.phases?.map((phase: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-white">{phase.title}</h5>
                    <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded-md">{phase.duration}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">{phase.description}</p>
                  
                  <div className="space-y-2">
                    {phase.tasks?.slice(0, 3).map((task: any, tIdx: number) => (
                      <div key={tIdx} className="flex items-center gap-3 text-[11px] text-gray-500">
                        <Circle className="w-3 h-3" />
                        <span>{task.title}</span>
                      </div>
                    ))}
                    {phase.tasks?.length > 3 && (
                      <p className="text-[10px] text-blue-400/60 pl-6">+{phase.tasks.length - 3} more tasks</p>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
