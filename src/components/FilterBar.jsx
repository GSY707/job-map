import { useApp } from '../store/AppContext';

export default function FilterBar() {
  const { user, priceRange, setPriceRange, filterType, setFilterType } = useApp();

  return (
    <div className="absolute top-4 left-0 right-0 px-4 z-10 flex flex-col gap-2 pointer-events-none">
      {/* Type filter chips */}
      <div className="flex gap-2 pointer-events-auto">
        {[
          { key: 'all', label: '全部' },
          { key: 'basic', label: '📦 基础任务' },
          { key: 'skill', label: '🔧 专业技能' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilterType(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-sm transition-all ${
              filterType === key
                ? 'bg-orange-500 text-white shadow-orange-200'
                : 'bg-white text-gray-600 hover:bg-orange-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Price range - only show when logged in */}
      {user && (
        <div className="glass-panel px-4 py-3 self-start pointer-events-auto" style={{ minWidth: '220px' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 font-medium">💰 期望收益</span>
            <span className="text-xs font-bold text-orange-500">
              {priceRange[0] === 0 && priceRange[1] === 500
                ? '不限'
                : `¥${priceRange[0]} - ¥${priceRange[1]}`}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={500}
            step={10}
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
            style={{ accentColor: '#f97316' }}
          />
          <div className="flex justify-between text-xs text-gray-300 mt-0.5">
            <span>¥0</span>
            <span className="text-xs text-gray-400">含所有面议任务</span>
            <span>¥500+</span>
          </div>
        </div>
      )}
    </div>
  );
}
