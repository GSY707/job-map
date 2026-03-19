import { useApp } from '../store/AppContext';

export default function ProfilePanel() {
  const { activeTab, setActiveTab, user, logout, tasks, setShowSkillOnboard } = useApp();
  if (activeTab !== 'profile' || !user) return null;

  const myTasks = tasks.filter(t => t.poster?.name === user.name);
  const openTasks = myTasks.filter(t => t.status === 'open');
  const closedTasks = myTasks.filter(t => t.status === 'closed');

  return (
    <div className="absolute inset-0 z-20 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-10 pb-3" style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setActiveTab('map')} className="text-white text-xl">←</button>
          <h1 className="text-lg font-bold text-white">我的</h1>
          <button onClick={logout} className="text-white text-sm opacity-80">退出</button>
        </div>
        <div className="flex items-center gap-4 pb-2">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
            {user.avatar}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-white/70 text-sm">{user.phone}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-yellow-300 text-sm">⭐</span>
              <span className="text-white text-sm font-medium">{user.points || 0} 积分</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '发布任务', value: myTasks.length, icon: '📤' },
            { label: '进行中', value: openTasks.length, icon: '⏳' },
            { label: '已完成', value: closedTasks.length, icon: '✅' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-2xl p-3 text-center shadow-sm">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-xl font-black text-gray-800">{value}</div>
              <div className="text-xs text-gray-400">{label}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">🛠️ 我的技能</h3>
            <button
              onClick={() => setShowSkillOnboard(true)}
              className="text-orange-500 text-xs font-medium"
            >
              + 添加技能
            </button>
          </div>
          {user.skills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skills.map(skill => (
                <span key={skill.id} className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
                  {skill.icon} {skill.label}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-400">
              <p className="text-sm">暂无技能标签</p>
              <button
                onClick={() => setShowSkillOnboard(true)}
                className="mt-2 text-orange-500 text-sm font-medium"
              >
                立即设置 →
              </button>
            </div>
          )}
        </div>

        {/* Skill unlock tip */}
        {user.skills?.length > 0 && (
          <div className="bg-blue-50 rounded-2xl p-4">
            <p className="text-blue-700 text-sm font-medium">🔓 技能解锁成功</p>
            <p className="text-blue-600 text-xs mt-1">
              地图上已为您显示对应的专业任务气泡：{user.skills.map(s => s.label).join('、')}
            </p>
          </div>
        )}

        {/* My tasks */}
        {myTasks.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3">📋 我发布的任务</h3>
            <div className="space-y-2">
              {myTasks.map(task => (
                <div key={task.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <span className="text-lg">{task.type === 'skill' ? '🔧' : '📦'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{task.title}</p>
                    <p className="text-xs text-gray-400">{task.createdAt}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    task.status === 'open' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {task.status === 'open' ? '招募中' : '已关闭'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Points history */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3">⭐ 积分说明</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>关闭任务（成功撮合）</span>
              <span className="text-green-600 font-medium">+10 积分</span>
            </div>
            <div className="flex justify-between">
              <span>完成任务并评价</span>
              <span className="text-green-600 font-medium">+5 积分</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>积分用途（即将开放）</span>
              <span>兑换服务优先展示</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
