import { useApp } from '../store/AppContext';

function TaskCard({ task }) {
  const { openTaskDetail } = useApp();
  return (
    <div
      onClick={() => openTaskDetail(task)}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow active:scale-98"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
          style={{ background: task.type === 'skill' ? '#eff6ff' : '#fff7ed' }}>
          {task.type === 'skill' ? '🔧' : '📦'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
              task.type === 'skill' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
            }`}>
              {task.type === 'skill' ? '专业' : '基础'}
            </span>
            <h3 className="font-bold text-gray-800 text-sm truncate">{task.title}</h3>
          </div>
          <p className="text-xs text-gray-500 truncate mb-2">{task.description}</p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>📍 {task.location}</span>
            <span>🕐 {task.time}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          {task.priceType === 'fixed'
            ? <div className="text-lg font-black text-orange-500">¥{task.price}</div>
            : <div className="text-sm font-bold text-gray-500">面议</div>
          }
          <div className="text-xs text-gray-400 mt-0.5">{task.createdAt}</div>
        </div>
      </div>
    </div>
  );
}

export default function TaskListPanel() {
  const { activeTab, setActiveTab, visibleTasks } = useApp();
  if (activeTab !== 'tasks') return null;

  return (
    <div className="absolute inset-0 z-20 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 bg-white px-4 pt-10 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">📋 附近任务</h1>
          <button onClick={() => setActiveTab('map')} className="text-gray-400 text-xl">✕</button>
        </div>
        <p className="text-xs text-gray-400 mt-1">共 {visibleTasks.length} 个任务待完成</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {visibleTasks.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <div className="text-5xl mb-3">🔍</div>
            <p>暂无符合条件的任务</p>
            <p className="text-sm mt-1">尝试调整筛选条件</p>
          </div>
        ) : (
          visibleTasks.map(task => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
