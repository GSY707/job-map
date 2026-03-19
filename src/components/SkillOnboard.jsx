import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { SKILL_TAGS } from '../data/mockData';

export default function SkillOnboard() {
  const { showSkillOnboard, setShowSkillOnboard, addUserSkill, user } = useApp();
  const [step, setStep] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState([]);

  if (!showSkillOnboard || !user) return null;

  const QUESTIONS = [
    '平时会点什么手艺或技能？',
    '太棒了！还有其他的吗？',
  ];

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.some(s => s.id === skill.id)
        ? prev.filter(s => s.id !== skill.id)
        : [...prev, skill]
    );
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(s => s + 1);
    } else {
      selectedSkills.forEach(skill => addUserSkill(skill));
      setShowSkillOnboard(false);
    }
  };

  const handleSkip = () => {
    selectedSkills.forEach(skill => addUserSkill(skill));
    setShowSkillOnboard(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center fade-in"
      style={{ background: 'rgba(0,0,0,0.5)' }}
    >
      <div className="glass-panel w-full max-w-md p-6 mb-0 rounded-b-none slide-up">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

        {/* AI avatar */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-xl">
            🤖
          </div>
          <div className="flex-1">
            <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2.5 inline-block">
              <p className="text-gray-800 text-sm font-medium">{QUESTIONS[step]}</p>
            </div>
          </div>
        </div>

        {/* Skill grid */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {SKILL_TAGS.map(skill => {
            const selected = selectedSkills.some(s => s.id === skill.id);
            return (
              <button
                key={skill.id}
                onClick={() => toggleSkill(skill)}
                className={`flex flex-col items-center py-3 px-1 rounded-xl border-2 transition-all ${
                  selected
                    ? 'border-orange-400 bg-orange-50 scale-105'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <span className="text-2xl mb-1">{skill.icon}</span>
                <span className={`text-xs font-medium ${selected ? 'text-orange-600' : 'text-gray-600'}`}>
                  {skill.label}
                </span>
              </button>
            );
          })}
        </div>

        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {selectedSkills.map(s => (
              <span key={s.id} className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                {s.icon} {s.label}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={handleSkip} className="flex-1 py-3 text-gray-400 text-sm">
            {selectedSkills.length === 0 ? '暂时跳过' : '完成设置'}
          </button>
          <button
            onClick={handleNext}
            className="flex-2 py-3 px-6 rounded-xl text-white font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}
          >
            {step < QUESTIONS.length - 1 ? '继续 →' : '解锁技能任务 🔓'}
          </button>
        </div>
      </div>
    </div>
  );
}
