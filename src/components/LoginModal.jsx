import { useState } from 'react';
import { useApp } from '../store/AppContext';

export default function LoginModal() {
  const { showLogin, setShowLogin, login, selectedTask } = useApp();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!showLogin) return null;

  const sendCode = () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      alert('请输入正确的手机号');
      return;
    }
    setCodeSent(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLogin = () => {
    if (!codeSent) { sendCode(); return; }
    if (code.length < 4) { alert('请输入验证码'); return; }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(phone);
      setLoading(false);
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center fade-in"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => e.target === e.currentTarget && setShowLogin(false)}
    >
      <div className="glass-panel w-full max-w-md p-6 mb-0 rounded-b-none slide-up">
        {/* Handle bar */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🗺️</div>
          <h2 className="text-xl font-bold text-gray-800">登录后查看完整信息</h2>
          {selectedTask && (
            <p className="text-sm text-gray-500 mt-1">
              您正在查看：<span className="text-orange-500 font-medium">{selectedTask.title.substring(0, 15)}...</span>
            </p>
          )}
        </div>

        {/* Phone input */}
        <div className="mb-3">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-orange-400">
            <span className="text-gray-400 text-sm">+86</span>
            <div className="w-px h-4 bg-gray-300" />
            <input
              type="tel"
              maxLength={11}
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="请输入手机号"
              className="flex-1 bg-transparent outline-none text-gray-800 text-base"
            />
          </div>
        </div>

        {/* Code input */}
        {codeSent && (
          <div className="mb-3 flex gap-2 slide-up">
            <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-orange-400">
              <input
                type="number"
                maxLength={6}
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="请输入验证码（任意填写）"
                className="flex-1 bg-transparent outline-none text-gray-800 text-base"
              />
            </div>
          </div>
        )}

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all"
          style={{ background: loading ? '#ccc' : 'linear-gradient(135deg, #f97316, #ef4444)' }}
        >
          {loading ? '登录中...' : codeSent ? '立即登录' : '获取验证码'}
        </button>

        {/* Send code button (after phone entered, before sent) */}
        {!codeSent && phone.length === 11 && (
          <button
            onClick={sendCode}
            className="w-full mt-2 py-3 rounded-xl text-orange-500 font-medium text-sm border border-orange-200"
          >
            发送验证码
          </button>
        )}

        {/* Resend */}
        {codeSent && countdown > 0 && (
          <p className="text-center text-gray-400 text-sm mt-2">{countdown}s 后可重新发送</p>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">或</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* WeChat login */}
        <button className="w-full py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2"
          style={{ background: '#07c160' }}
          onClick={() => { login('微信用户' + Math.random().toString(36).slice(2,6)); }}
        >
          <span>💚</span> 微信一键登录（演示）
        </button>

        <p className="text-center text-gray-400 text-xs mt-4">
          登录即同意《用户协议》和《隐私政策》
        </p>
      </div>
    </div>
  );
}
