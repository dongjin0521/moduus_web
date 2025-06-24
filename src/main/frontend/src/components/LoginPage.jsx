import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || '로그인 실패');
      }
      const data = await res.json();
      setSuccess('로그인 성공! 제작 요청 페이지로 이동합니다.');
      setForm({ email: '', password: '' });
      login(data, data.token || '');
      setTimeout(() => navigate('/request'), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#111', padding: '140px 0 80px 0', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 540, margin: '0 auto', padding: 48, background: 'rgba(30,30,30,0.96)', borderRadius: 32, boxShadow: '0 12px 40px rgba(0,0,0,0.32)', backdropFilter: 'blur(2px)', border: '2px solid rgba(255,255,255,0.10)', boxSizing: 'border-box', position: 'relative' }}>
        {(error || success) && (
          <div style={{
            position: 'absolute', left: 0, right: 0, top: -60, margin: 'auto', width: '90%',
            padding: '18px 0', borderRadius: 16, fontWeight: 700, fontSize: '1.1rem', textAlign: 'center',
            background: error ? 'linear-gradient(90deg,#ff4d4f,#ff6a00)' : 'linear-gradient(90deg,#52c41a,#00c6fb)',
            color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', opacity: 1, zIndex: 10,
            transition: 'opacity 0.4s',
            animation: 'fadeInDown 0.5s'
          }}>
            {error || success}
          </div>
        )}
        <h2 style={{ marginBottom: 40, color: '#fff', fontSize: '2.2rem', fontWeight: 700, letterSpacing: '2px', textAlign: 'center', textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 32 }}>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="이메일" style={{ width: '100%', padding: 18, background: 'rgba(255,255,255,0.10)', color: '#fff', border: 'none', borderRadius: 12, fontSize: '1.15rem', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 40 }}>
            <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="비밀번호" style={{ width: '100%', padding: 18, background: 'rgba(255,255,255,0.10)', color: '#fff', border: 'none', borderRadius: 12, fontSize: '1.15rem', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '20px 0', background: 'linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)', color: '#fff', border: 'none', borderRadius: 18, fontSize: '1.3rem', fontWeight: 700, letterSpacing: '2px', boxShadow: '0 6px 24px rgba(238,9,121,0.22)', cursor: 'pointer', transition: 'all 0.18s cubic-bezier(.4,2,.6,1)', textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            disabled={loading}
            onMouseOver={e => {
              e.target.style.background = 'linear-gradient(90deg, #ee0979 0%, #ff6a00 100%)';
              e.target.style.transform = 'scale(1.04)';
              e.target.style.boxShadow = '0 12px 32px rgba(238,9,121,0.28)';
            }}
            onMouseOut={e => {
              e.target.style.background = 'linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 6px 24px rgba(238,9,121,0.22)';
            }}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <span style={{ color: '#bbb', marginRight: 8 }}>아직 회원이 아니신가요?</span>
          <Link to="/signup" style={{ color: '#ff6a00', fontWeight: 700, textDecoration: 'underline', fontSize: '1.08rem' }}>회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 