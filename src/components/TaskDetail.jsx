import { useState } from 'react';
import { useApp } from '../store/AppContext';

function MessageBubble({ msg }) {
  return (
    <div className={`flex gap-2 mb-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm shrink-0">
        {msg.avatar}
      </div>
      <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
        msg.isMe
          ? 'bg-orange-500 text-white rounded-tr-sm'
          : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
      }`}>
        {msg.text}
        <div className={`text-xs mt-0.5 ${msg.isMe ? 'text-orange-200' : 'text-gray-400'}`}>
          {msg.time}
        </div>
      </div>
    </div>
  );
}

export default function TaskDetail() {
  const { showTaskDetail, setShowTaskDetail, selectedTask, closeTask, user } = useApp();
  const [messages, setMessages] = useState([
    { id: 1, avatar: selectedTask?.poster?.avatar || '👤', text: '你好！我可以帮你完成这个任务，方便聊一下吗？', time: '刚刚', isMe: false },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [tab, setTab] = useState('detail'); // 'detail' | 'messages'
  const [bidAmount, setBidAmount] = useState('');

  if (!showTaskDetail || !selectedTask) return null;

  const task = selectedTask;
  const isMyTask = task.poster?.name === user?.name;

  const sendMessage = () => {
    if (!inputMsg.trim()) return;
    const msg = { id: Date.now(), avatar: user?.avatar || '👤', text: inputMsg, time: '刚刚', isMe: true };
    setMessages(prev => [...prev, msg]);
    setInputMsg('');
    // Simulate auto reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        avatar: task.poster?.avatar || '👤',
        text: '好的！我的微信是：jobmap_demo，方便的话可以加我详细沟通 😊',
        time: '刚刚',
        isMe: false,
      }]);
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center fade-in"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => e.target === e.currentTarget && setShowTaskDetail(false)}
    >
      <div className="glass-panel w-full max-w-md rounded-b-none slide-up"
        style={{ maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>

        {/* Handle + close */}
        <div className="flex-shrink-0 px-6 pt-4 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {['detail', 'messages'].map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    tab === t
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-500'
                  }`}
                >
                  {t === 'detail' ? '任务详情' : '💬 留言板'}
                </button>
              ))}
            </div>
            <button onClick={() => setShowTaskDetail(false)} className="text-gray-400 text-xl p-1">✕</button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {tab === 'detail' && (
            <div className="slide-up">
              {/* Task header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl shrink-0">
                  {task.type === 'skill' ? '🔧' : '📦'}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-base leading-tight">{task.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      task.type === 'skill'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-orange-50 text-orange-700'
                    }`}>
                      {task.type === 'skill' ? '专业技能' : '基础任务'}
                    </span>
                    <span className="text-gray-400 text-xs">👁 {task.views} 次查看</span>
                  </div>
                </div>
                <div className="text-right">
                  {task.priceType === 'fixed'
                    ? <div className="text-2xl font-black text-orange-500">¥{task.price}</div>
                    : <div className="text-lg font-black text-gray-600">面议</div>
                  }
                </div>
              </div>

              {/* Details */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg">📋</span>
                  <div>
                    <p className="text-xs text-gray-400">任务描述</p>
                    <p className="text-sm text-gray-800">{task.description}</p>
                  </div>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex items-center gap-3">
                  <span className="text-lg">🕐</span>
                  <div>
                    <p className="text-xs text-gray-400">期望时间</p>
                    <p className="text-sm text-gray-800 font-medium">{task.time}</p>
                  </div>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex items-center gap-3">
                  <span className="text-lg">📍</span>
                  <div>
                    <p className="text-xs text-gray-400">任务地点</p>
                    <p className="text-sm text-gray-800">{task.location}</p>
                  </div>
                </div>
              </div>

              {/* Poster info */}
              <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-xl">
                  {task.poster?.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{task.poster?.name}</p>
                  <div className="flex items-center gap-1">
                    {'⭐'.repeat(Math.round(task.poster?.rating || 0))}
                    <span className="text-xs text-gray-400">{task.poster?.rating} 分</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{task.createdAt}发布</div>
              </div>

              {/* Tags */}
              {task.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {task.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">#{tag}</span>
                  ))}
                </div>
              )}

              {/* Bid input for bidding tasks */}
              {task.priceType === 'bidding' && !isMyTask && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-medium mb-2">💰 您的报价（元）</p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={e => setBidAmount(e.target.value)}
                      placeholder="输入您的期望报酬"
                      className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200 focus:border-orange-400 outline-none text-sm"
                    />
                    <span className="flex items-center text-gray-500 text-sm">元</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              {isMyTask ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => setTab('messages')}
                    className="flex-1 py-3 rounded-xl border border-orange-200 text-orange-500 font-medium text-sm"
                  >
                    💬 查看留言 ({messages.length})
                  </button>
                  <button
                    onClick={() => closeTask(task.id)}
                    className="flex-1 py-3 rounded-xl text-white font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                  >
                    ✅ 已招到人
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setTab('messages')}
                  className="w-full py-4 rounded-xl text-white font-bold text-base"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}
                >
                  {task.priceType === 'bidding' && bidAmount
                    ? `💬 发送报价 ¥${bidAmount}`
                    : '💬 我来做！留言联系'}
                </button>
              )}
            </div>
          )}

          {tab === 'messages' && (
            <div className="slide-up flex flex-col" style={{ minHeight: '300px' }}>
              <div className="flex-1 py-2">
                {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
              </div>
              <div className="bg-blue-50 rounded-xl p-3 my-3">
                <p className="text-xs text-blue-600">
                  💡 <strong>去中心化建联：</strong>建议双方在此交换微信或手机号，在微信中完成议价和转账，平台仅作信息撮合。
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <input
                  value={inputMsg}
                  onChange={e => setInputMsg(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="发送留言..."
                  className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200 focus:border-orange-400 outline-none text-sm"
                />
                <button
                  onClick={sendMessage}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}
                >
                  ↑
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
