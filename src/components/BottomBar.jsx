import { useApp } from '../store/AppContext';

export default function BottomBar() {
  const {
    user, setShowLogin, setShowPostTask, setActiveTab, activeTab,
    visibleTasks, tasks,
  } = useApp();

  const openTasks = tasks.filter(t => t.status === 'open').length;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
      {/* Post task bar */}
      <div className="px-4 pb-2 pointer-events-auto">
        <button
          onClick={() => user ? setShowPostTask(true) : setShowLogin(true)}
          className="w-full py-4 rounded-2xl text-white font-bold text-base shadow-lg flex items-center gap-3 px-5"
          style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}
        >
          <span className="text-2xl">✍️</span>
          <span className="flex-1 text-left">我有事，发布需求</span>
          <span className="text-orange-200 text-sm">{openTasks} 个任务在找人</span>
        </button>
      </div>

      {/* Bottom nav */}
      <div className="glass-panel mx-2 mb-2 px-6 py-2 flex justify-around pointer-events-auto">
        {[
          { key: 'map', icon: '🗺️', label: '地图' },
          { key: 'tasks', icon: '📋', label: '任务列表', count: openTasks },
          { key: 'profile', icon: user ? '👤' : '🔑', label: user ? '我的' : '登录' },
        ].map(({ key, icon, label, count }) => (
          <button
            key={key}
            onClick={() => {
              if (key === 'profile' && !user) { setShowLogin(true); return; }
              setActiveTab(key);
            }}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
              activeTab === key ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <span className="text-xl relative">
              {icon}
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold" style={{ fontSize: '9px' }}>
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </span>
            <span className="text-xs mt-0.5 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
