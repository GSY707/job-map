import { useApp } from '../store/AppContext';

export default function GuestBanner() {
  const { user, setShowLogin, visibleTasks } = useApp();
  if (user) return null;

  return (
    <div className="absolute top-14 left-4 right-4 z-10 pointer-events-auto">
      <div
        className="glass-panel p-3 flex items-center gap-3 cursor-pointer active:scale-98 transition-transform"
        onClick={() => setShowLogin(true)}
      >
        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-lg shrink-0">
          🌫️
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-800">迷雾地图模式</p>
          <p className="text-xs text-gray-500">
            附近有 <span className="text-orange-500 font-bold">{visibleTasks.length}</span> 个任务，登录查看完整详情
          </p>
        </div>
        <button className="text-white text-xs px-3 py-1.5 rounded-full font-medium shrink-0"
          style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}>
          登录
        </button>
      </div>
    </div>
  );
}
