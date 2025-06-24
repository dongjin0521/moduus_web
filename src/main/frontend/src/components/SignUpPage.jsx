import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function validateEmail(email) {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
}
function validatePassword(password) {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
}
function validatePhone(phone) {
  return /^\d{10,11}$/.test(phone);
}

const SignUpPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    nickname: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldError, setFieldError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldError({ ...fieldError, [e.target.name]: '' });
  };

  const validateAll = () => {
    const err = {};
    if (!validateEmail(form.email)) err.email = '올바른 이메일 형식이 아닙니다.';
    if (!validatePassword(form.password)) err.password = '비밀번호는 8자 이상, 영문+숫자 조합이어야 합니다.';
    if (!form.nickname) err.nickname = '닉네임을 입력해 주세요.';
    if (!validatePhone(form.phone)) err.phone = '전화번호는 숫자 10~11자리여야 합니다.';
    setFieldError(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validateAll()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || '회원가입 실패');
      }
      setSuccess('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      setForm({ email: '', password: '', nickname: '', phone: '' });
      setTimeout(() => navigate('/login'), 1500);
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
        <h2 style={{ marginBottom: 40, color: '#fff', fontSize: '2.2rem', fontWeight: 700, letterSpacing: '2px', textAlign: 'center', textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>회원가입</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ marginBottom: 32 }}>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="이메일" style={{ width: '100%', padding: 18, background: 'rgba(255,255,255,0.10)', color: '#fff', border: 'none', borderRadius: 12, fontSize: '1.15rem', marginBottom: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', boxSizing: 'border-box' }} />
            {fieldError.email && <div style={{ color: '#ff4d4f', fontSize: '0.98rem', marginTop: 4 }}>{fieldError.email}</div>}
          </div>
          <div style={{ marginBottom: 32 }}>
            <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="비밀번호" style={{ width: '100%', padding: 18, background: 'rgba(255,255,255,0.10)', color: '#fff', border: 'none', borderRadius: 12, fontSize: '1.15rem', marginBottom: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', boxSizing: 'border-box' }} />
            {fieldError.password && <div style={{ color: '#ff4d4f', fontSize: '0.98rem', marginTop: 4 }}>{fieldError.password}</div>}
          </div>
          <div style={{ marginBottom: 32 }}>
            <input name="nickname" type="text" value={form.nickname} onChange={handleChange} required placeholder="닉네임" style={{ width: '100%', padding: 18, background: 'rgba(255,255,255,0.10)', color: '#fff', border: 'none', borderRadius: 12, fontSize: '1.15rem', marginBottom: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', boxSizing: 'border-box' }} />
            {fieldError.nickname && <div style={{ color: '#ff4d4f', fontSize: '0.98rem', marginTop: 4 }}>{fieldError.nickname}</div>}
          </div>
          <div style={{ marginBottom: 40 }}>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="전화번호" style={{ width: '100%', padding: 18, background: 'rgba(255,255,255,0.10)', color: '#fff', border: 'none', borderRadius: 12, fontSize: '1.15rem', marginBottom: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', boxSizing: 'border-box' }} />
            {fieldError.phone && <div style={{ color: '#ff4d4f', fontSize: '0.98rem', marginTop: 4 }}>{fieldError.phone}</div>}
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
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage; 