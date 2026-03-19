import { useApp } from '../store/AppContext';

export default function Notification() {
  const { notification } = useApp();
  if (!notification) return null;

  const colors = {
    success: 'bg-green-500',
    info: 'bg-blue-500',
    error: 'bg-red-500',
    warning: 'bg-orange-500',
  };

  return (
    <div
      className={`fixed top-16 left-1/2 z-[100] -translate-x-1/2 ${colors[notification.type] || colors.info} text-white px-5 py-3 rounded-2xl shadow-lg text-sm font-medium slide-up max-w-xs text-center`}
      style={{ pointerEvents: 'none' }}
    >
      {notification.message}
    </div>
  );
}
