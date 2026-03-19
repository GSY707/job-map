import { useState, createContext, useContext } from 'react';
import { MOCK_TASKS } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); // null = guest
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showPostTask, setShowPostTask] = useState(false);
  const [showSkillOnboard, setShowSkillOnboard] = useState(false);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [activeTab, setActiveTab] = useState('map'); // 'map' | 'post' | 'profile'
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'basic' | 'skill'
  const [notification, setNotification] = useState(null);

  const login = (phone) => {
    const newUser = {
      id: Date.now(),
      phone,
      name: '用户' + phone.slice(-4),
      avatar: '👤',
      skills: [],
      points: 0,
      joinedAt: new Date().toLocaleDateString(),
    };
    setUser(newUser);
    setShowLogin(false);
    // Show skill onboarding for new users
    setTimeout(() => setShowSkillOnboard(true), 500);
    showNotification('登录成功！欢迎来到「我有事/我有空」', 'success');
  };

  const logout = () => {
    setUser(null);
    showNotification('已退出登录', 'info');
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      poster: { name: user?.name || '我', avatar: user?.avatar || '👤', rating: 5.0 },
      createdAt: '刚刚',
      views: 0,
      status: 'open',
      lat: 30.5395 + (Math.random() - 0.5) * 0.05,
      lng: 114.3696 + (Math.random() - 0.5) * 0.08,
    };
    setTasks(prev => [newTask, ...prev]);
    showNotification('任务发布成功！气泡已飘至地图 🎉', 'success');
    return newTask;
  };

  const closeTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'closed' } : t));
    showNotification('任务已关闭，感谢使用！获得 10 积分 ⭐', 'success');
    setShowTaskDetail(false);
    setSelectedTask(null);
    if (user) {
      setUser(prev => ({ ...prev, points: (prev.points || 0) + 10 }));
    }
  };

  const addUserSkill = (skill) => {
    setUser(prev => ({
      ...prev,
      skills: [...(prev.skills || []), skill],
    }));
  };

  const openTaskDetail = (task) => {
    if (!user) {
      setSelectedTask(task);
      setShowLogin(true);
      return;
    }
    setSelectedTask(task);
    setShowTaskDetail(true);
    // Increment view count
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, views: t.views + 1 } : t));
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => setNotification(null), 3000);
  };

  const visibleTasks = tasks.filter(t => {
    if (t.status === 'closed') return false;
    if (filterType === 'basic' && t.type !== 'basic') return false;
    if (filterType === 'skill' && t.type !== 'skill') return false;
    // Skill tasks only visible to users with matching skill
    if (t.type === 'skill' && user) {
      if (t.requiredSkill && !user.skills?.some(s => s.label === t.requiredSkill)) {
        // Still show it but mark as locked
      }
    }
    // Price filter (only for fixed price tasks, bidding always shown)
    if (t.priceType === 'fixed' && t.price !== null) {
      if (t.price < priceRange[0] || t.price > priceRange[1]) return false;
    }
    return true;
  });

  return (
    <AppContext.Provider value={{
      user, tasks, visibleTasks, selectedTask, showLogin, showPostTask,
      showSkillOnboard, showTaskDetail, activeTab, priceRange, filterType, notification,
      setShowLogin, setShowPostTask, setShowSkillOnboard, setShowTaskDetail,
      setActiveTab, setPriceRange, setFilterType, setSelectedTask,
      login, logout, addTask, closeTask, addUserSkill, openTaskDetail, showNotification,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
