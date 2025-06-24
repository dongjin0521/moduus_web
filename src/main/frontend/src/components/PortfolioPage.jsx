import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PortfolioPage = () => {
  const { user } = useAuth();
  const isAdmin = user && user.adminYn === 'Y';
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // 목록 불러오기
  useEffect(() => {
    setLoading(true);
    fetch('/api/portfolio')
      .then(res => res.ok ? res.json() : Promise.reject('불러오기 실패'))
      .then(data => setList(data))
      .catch(() => setError('포트폴리오 목록 불러오기 실패'))
      .finally(() => setLoading(false));
  }, []);

  // 글 등록
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!form.title.trim() || !form.description.trim()) {
      setFormError('제목과 설명을 입력해 주세요.');
      return;
    }
    setFormLoading(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          imageUrl: form.imageUrl,
          writerEmail: user.email
        })
      });
      if (!res.ok) throw new Error(await res.text());
      setShowForm(false);
      setForm({ title: '', description: '', imageUrl: '' });
      // 등록 후 목록 갱신
      setLoading(true);
      fetch('/api/portfolio')
        .then(res => res.ok ? res.json() : [])
        .then(data => setList(data))
        .finally(() => setLoading(false));
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#111', padding: '140px 0 80px 0', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: 48, background: 'rgba(30,30,30,0.96)', borderRadius: 32, boxShadow: '0 12px 40px rgba(0,0,0,0.32)', border: '2px solid rgba(255,255,255,0.10)', color: '#fff', position: 'relative' }}>
        <h2 style={{ marginBottom: 32, fontSize: '2.2rem', fontWeight: 700, letterSpacing: '2px', textAlign: 'center' }}>포트폴리오</h2>
        {isAdmin && (
          <button onClick={() => setShowForm(true)} style={{ position: 'absolute', top: 36, right: 48, padding: '12px 32px', background: 'linear-gradient(90deg, #00c6fb 0%, #ee0979 100%)', color: '#fff', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: '1.08rem', boxShadow: '0 2px 8px rgba(238,9,121,0.13)', cursor: 'pointer' }}>
            글 등록하기
          </button>
        )}
        {/* 등록 폼 모달 */}
        {showForm && (
          <div style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowForm(false)}>
            <div style={{ minWidth: 340, maxWidth: 440, background: 'rgba(30,30,30,0.98)', borderRadius: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.22)', border: '2px solid rgba(255,255,255,0.13)', padding: 36, color: '#fff', position: 'relative' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowForm(false)} style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', opacity: 0.7 }}>×</button>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 18, letterSpacing: '1px', color: '#00c6fb' }}>포트폴리오 글 등록</h3>
              <form onSubmit={handleSubmit} autoComplete="off">
                <div style={{ marginBottom: 18 }}>
                  <input name="title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="제목" style={{ width: '100%', padding: 14, background: 'rgba(255,255,255,0.10)', color: '#fff', border: 'none', borderRadius: 10, fontSize: '1.1rem', marginTop: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <textarea name="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="설명" rows={5} style={{ width: '100%', padding: 14, background: 'rgba(255,255,255,0.10)', color: '#fff', border: 'none', borderRadius: 10, fontSize: '1.1rem', marginTop: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', boxSizing: 'border-box', resize: 'vertical' }} />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <input name="imageUrl" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} placeholder="이미지 URL (선택)" style={{ width: '100%', padding: 14, background: 'rgba(255,255,255,0.10)', color: '#fff', border: 'none', borderRadius: 10, fontSize: '1.1rem', marginTop: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', boxSizing: 'border-box' }} />
                </div>
                {formError && <div style={{ color: '#ff4d4f', marginBottom: 12 }}>{formError}</div>}
                <button type="submit" style={{ width: '100%', padding: '14px 0', background: 'linear-gradient(90deg, #00c6fb 0%, #ee0979 100%)', color: '#fff', border: 'none', borderRadius: 12, fontSize: '1.1rem', fontWeight: 700, letterSpacing: '2px', boxShadow: '0 4px 16px rgba(238,9,121,0.18)', cursor: 'pointer', marginBottom: 8 }} disabled={formLoading}>{formLoading ? '등록 중...' : '등록'}</button>
              </form>
            </div>
          </div>
        )}
        {/* 포트폴리오 카드 리스트 */}
        <div style={{ marginTop: 48 }}>
          {loading ? <div style={{ textAlign: 'center', color: '#bbb', fontSize: '1.15rem', padding: 40 }}>불러오는 중...</div> :
            error ? <div style={{ textAlign: 'center', color: '#ff4d4f', fontSize: '1.15rem', padding: 40 }}>{error}</div> :
            list.length === 0 ? <div style={{ textAlign: 'center', color: '#bbb', fontSize: '1.15rem', padding: 40 }}>아직 등록된 포트폴리오가 없습니다.</div> :
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36, justifyContent: 'center' }}>
              {list.map(item => (
                <div key={item.id} style={{ width: 280, background: 'rgba(255,255,255,0.08)', borderRadius: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.13)', border: '2px solid rgba(255,255,255,0.13)', padding: 0, color: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                  {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: 180, objectFit: 'cover', borderTopLeftRadius: 18, borderTopRightRadius: 18, background: '#222' }} />}
                  <div style={{ padding: '22px 20px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.18rem', marginBottom: 10, color: '#00c6fb', letterSpacing: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                    <div style={{ fontSize: '1.05rem', color: '#fff', opacity: 0.92, marginBottom: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.description}</div>
                    <div style={{ fontSize: '0.98rem', color: '#bbb', marginBottom: 6 }}>{item.writerNickname} · {new Date(item.createdAt).toLocaleDateString('ko-KR')}</div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage; 