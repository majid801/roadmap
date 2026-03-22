import React from 'react';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { CheckCircle, Circle, Clock, Zap } from 'lucide-react';

export default function TaskList({ roadmap }: { roadmap: any }) {
  const completedTasks = roadmap.completedTasks || [];
  
  // Flatten tasks from all phases for the daily list
  const allTasks = roadmap.phases?.flatMap((phase: any, pIdx: number) => 
    phase.tasks.map((task: any, tIdx: number) => ({
      ...task,
      id: `${pIdx}-${tIdx}`,
      phaseTitle: phase.title
    }))
  ) || [];

  const toggleTask = async (taskId: string) => {
    const isCompleted = completedTasks.includes(taskId);
    const roadmapRef = doc(db, 'roadmaps', roadmap.id);
    
    try {
      await updateDoc(roadmapRef, {
        completedTasks: isCompleted ? arrayRemove(taskId) : arrayUnion(taskId),
        progress: Math.round(((completedTasks.length + (isCompleted ? -1 : 1)) / allTasks.length) * 100)
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Show only a subset for "Today's Tasks"
  const todayTasks = allTasks.slice(0, 5);

  return (
    <div className="bg-[#0a0f1e] border border-white/10 rounded-3xl overflow-hidden sticky top-24">
      <div className="p-6 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold font-display">Today's Tasks</h4>
          <span className="text-[10px] font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md">Day 12</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] text-gray-500 mb-1">
            <span>Daily Progress</span>
            <span>{Math.round((todayTasks.filter(t => completedTasks.includes(t.id)).length / todayTasks.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" 
              style={{ width: `${(todayTasks.filter(t => completedTasks.includes(t.id)).length / todayTasks.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {todayTasks.map((task) => {
          const isDone = completedTasks.includes(task.id);
          return (
            <button 
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`w-full flex items-start gap-3 p-3 rounded-2xl transition-all text-left group ${isDone ? 'bg-green-500/5' : 'hover:bg-white/5'}`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-600 group-hover:text-blue-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium leading-tight ${isDone ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] text-gray-600 uppercase font-mono">{task.phaseTitle}</span>
                  {task.estimatedTime && (
                    <span className="flex items-center gap-1 text-[9px] text-gray-600">
                      <Clock className="w-2 h-2" />
                      {task.estimatedTime}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-6 bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-t border-white/5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-xs font-bold text-white">Pro Tip</p>
        </div>
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Consistency is key. Completing just 3 tasks a day puts you in the top 10% of learners globally.
        </p>
      </div>
    </div>
  );
}
