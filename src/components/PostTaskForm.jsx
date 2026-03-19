import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { parseTaskIntent } from '../data/mockData';

const STEPS = { INPUT: 'input', PARSING: 'parsing', CONFIRM: 'confirm', DONE: 'done' };

export default function PostTaskForm() {
  const { showPostTask, setShowPostTask, addTask, user, setShowLogin } = useApp();
  const [step, setStep] = useState(STEPS.INPUT);
  const [inputText, setInputText] = useState('');
  const [parsed, setParsed] = useState(null);

  if (!showPostTask) return null;

  const handleClose = () => {
    setShowPostTask(false);
    setStep(STEPS.INPUT);
    setInputText('');
    setParsed(null);
  };

  const handleSubmitText = () => {
    if (!user) { setShowLogin(true); return; }
    if (!inputText.trim()) return;
    setStep(STEPS.PARSING);
    // Simulate AI parsing delay
    setTimeout(() => {
      const result = parseTaskIntent(inputText);
      setParsed(result);
      setStep(STEPS.CONFIRM);
    }, 1500);
  };

  const handleConfirm = () => {
    addTask({
      ...parsed,
      description: inputText,
    });
    setStep(STEPS.DONE);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const EXAMPLE_PROMPTS = [
    '下周二下午3点找人搬沙发到楼下，50块',
    '帮我代取快递，菜鸟驿站，今天下午，给15元',
    '需要水电维修师傅，明天上午，价格面议',
    '帮我排队买限定球鞋，周六早上，80块',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center fade-in"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="glass-panel w-full max-w-md p-6 mb-0 rounded-b-none slide-up" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

        {step === STEPS.INPUT && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">📝 我有事，发布需求</h2>
              <button onClick={handleClose} className="text-gray-400 text-xl">✕</button>
            </div>

            <div className="bg-orange-50 rounded-xl p-3 mb-4 flex items-start gap-2">
              <span className="text-orange-500 text-sm">💡</span>
              <p className="text-orange-700 text-xs leading-relaxed">
                用自然语言描述您的需求，AI 会自动提取时间、地点和报酬信息
              </p>
            </div>

            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="例如：下周二下午3点找人搬沙发到楼下，50块..."
              className="w-full bg-gray-50 rounded-xl p-4 text-gray-800 outline-none border border-gray-200 focus:border-orange-400 resize-none text-base"
              rows={4}
              autoFocus
            />

            {/* Example prompts */}
            <p className="text-xs text-gray-400 mt-3 mb-2">快速示例：</p>
            <div className="flex flex-col gap-2 mb-4">
              {EXAMPLE_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setInputText(p)}
                  className="text-left text-xs bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-orange-600 rounded-lg px-3 py-2 border border-gray-100 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmitText}
              disabled={!inputText.trim()}
              className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all"
              style={{
                background: inputText.trim()
                  ? 'linear-gradient(135deg, #f97316, #ef4444)'
                  : '#e5e7eb',
                color: inputText.trim() ? 'white' : '#9ca3af',
              }}
            >
              🤖 AI 智能解析
            </button>
          </>
        )}

        {step === STEPS.PARSING && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🤖</div>
            <p className="text-gray-700 font-medium mb-6">AI 正在解析您的需求...</p>
            <div className="flex justify-center gap-2">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          </div>
        )}

        {step === STEPS.CONFIRM && parsed && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">✅ 确认发布信息</h2>
              <button onClick={() => setStep(STEPS.INPUT)} className="text-orange-500 text-sm">重新输入</button>
            </div>

            <div className="bg-white rounded-2xl border border-orange-200 p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    background: parsed.type === 'skill' ? '#eff6ff' : '#fff7ed',
                    color: parsed.type === 'skill' ? '#1d4ed8' : '#c2410c'
                  }}>
                  {parsed.type === 'skill' ? '🔧 专业技能' : '📦 基础任务'}
                </span>
                {parsed.priceType === 'fixed'
                  ? <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-bold">¥{parsed.price} 一口价</span>
                  : <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">面议报价</span>
                }
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-400 w-14 shrink-0">📋 描述</span>
                  <span className="text-gray-800 font-medium">{parsed.title}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 w-14 shrink-0">🕐 时间</span>
                  <span className="text-gray-800">{parsed.time}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 w-14 shrink-0">📍 位置</span>
                  <span className="text-gray-800">当前位置（自动定位）</span>
                </div>
                {parsed.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-2">
                    {parsed.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(STEPS.INPUT)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium"
              >
                修改
              </button>
              <button
                onClick={handleConfirm}
                className="flex-2 py-3 px-6 rounded-xl text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}
              >
                确认发布 🚀
              </button>
            </div>
          </>
        )}

        {step === STEPS.DONE && (
          <div className="text-center py-12 slide-up">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">发布成功！</h3>
            <p className="text-gray-500 text-sm">您的任务气泡已飘至地图上</p>
          </div>
        )}
      </div>
    </div>
  );
}
