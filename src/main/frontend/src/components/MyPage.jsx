import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const MyPage = () => {
  const { user, logout, login } = useAuth();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ nickname: user?.nickname || '', phone: user?.phone || '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 내 정보 최신화 (마운트/수정 후)
  useEffect(() => {
    if (!user) return;
    const fetchMe = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/users/me?email=${encodeURIComponent(user.email)}`);
        if (!res.ok) throw new Error('내 정보 조회 실패');
        const data = await res.json();
        setForm({ nickname: data.nickname, phone: data.phone });
        // 최신 정보로 Context도 갱신
        login({ ...user, nickname: data.nickname, phone: data.phone }, '');
      } catch (e) {
        setError('내 정보 조회 실패');
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
    // eslint-disable-next-line
  }, [user?.email]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEdit(true);
    setSuccess('');
    setError('');
  };

  const handleCancel = () => {
    setEdit(false);
    setForm({ nickname: user.nickname, phone: user.phone });
    setSuccess('');
    setError('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch(`/api/users/me?email=${encodeURIComponent(user.email)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('정보 수정 실패');
      const data = await res.json();
      setSuccess('정보가 저장되었습니다!');
      setEdit(false);
      // 최신 정보로 Context도 갱신
      login({ ...user, nickname: data.nickname, phone: data.phone }, '');
    } catch (e) {
      setError('정보 수정 실패');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

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
        <h2 style={{ marginBottom: 40, color: '#fff', fontSize: '2.2rem', fontWeight: 700, letterSpacing: '2px', textAlign: 'center', textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>마이페이지</h2>
        <div style={{ marginBottom: 32, color: '#fff', fontSize: '1.1rem' }}>
          <div style={{ marginBottom: 18 }}><b>이메일</b><br />{user.email}</div>
          {edit ? (
            <form onSubmit={handleSave} autoComplete="off">
              <div style={{ marginBottom: 24 }}>
                <b>닉네임</b><br />
                <input name="nickname" value={form.nickname} onChange={handleChange} style={{ width: '100%', padding: 14, background: 'rgba(255,255,255,0.10)', color: '#fff', border: 'none', borderRadius: 10, fontSize: '1.1rem', marginTop: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: 32 }}>
                <b>전화번호</b><br />
                <input name="phone" value={form.phone} onChange={handleChange} style={{ width: '100%', padding: 14, background: 'rgba(255,255,255,0.10)', color: '#fff', border: 'none', borderRadius: 10, fontSize: '1.1rem', marginTop: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '14px 0', background: 'linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)', color: '#fff', border: 'none', borderRadius: 12, fontSize: '1.1rem', fontWeight: 700, letterSpacing: '2px', boxShadow: '0 4px 16px rgba(238,9,121,0.18)', cursor: 'pointer', marginBottom: 12 }} disabled={loading}>저장</button>
              <button type="button" onClick={handleCancel} style={{ width: '100%', padding: '12px 0', background: '#222', color: '#fff', border: 'none', borderRadius: 12, fontSize: '1.05rem', fontWeight: 500, letterSpacing: '1px', marginBottom: 8, cursor: 'pointer' }} disabled={loading}>취소</button>
            </form>
          ) : (
            <>
              <div style={{ marginBottom: 18 }}><b>닉네임</b><br />{user.nickname}</div>
              <div style={{ marginBottom: 32 }}><b>전화번호</b><br />{user.phone}</div>
              <button onClick={handleEdit} style={{ width: '100%', padding: '14px 0', background: 'linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)', color: '#fff', border: 'none', borderRadius: 12, fontSize: '1.1rem', fontWeight: 700, letterSpacing: '2px', boxShadow: '0 4px 16px rgba(238,9,121,0.18)', cursor: 'pointer', marginBottom: 12 }}>정보 수정</button>
            </>
          )}
          <button onClick={logout} style={{ width: '100%', padding: '12px 0', background: '#444', color: '#fff', border: 'none', borderRadius: 12, fontSize: '1.05rem', fontWeight: 500, letterSpacing: '1px', marginTop: 8, cursor: 'pointer' }}>로그아웃</button>
        </div>
      </div>
    </div>
  );
};

export default MyPage; 