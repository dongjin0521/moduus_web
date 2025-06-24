import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const RequestPage = () => {
  const { user } = useAuth();
  const [productImages, setProductImages] = useState([]);
  const [referenceImages, setReferenceImages] = useState([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleProductImageChange = (e) => {
    setProductImages(Array.from(e.target.files));
  };

  const handleReferenceImageChange = (e) => {
    setReferenceImages(Array.from(e.target.files));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!description.trim()) {
      setError('설명을 입력해 주세요.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user.email,
          description
        })
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || '제작 요청 실패');
      }
      setSuccess('제작 요청이 성공적으로 제출되었습니다!');
      setDescription('');
      setProductImages([]);
      setReferenceImages([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#111', padding: '140px 0 80px 0', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: 36, background: 'rgba(30,30,30,0.92)', borderRadius: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.25)', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', marginBottom: 24 }}>로그인 후 이용해 주세요</h2>
          <p style={{ color: '#bbb', marginBottom: 32 }}>제작 요청은 회원만 가능합니다.<br/>로그인 또는 회원가입 후 이용해 주세요.</p>
          <Link to="/login" style={{ marginRight: 16, padding: '12px 32px', background: 'linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)', color: '#fff', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(238,9,121,0.18)' }}>로그인</Link>
          <Link to="/signup" style={{ padding: '12px 32px', background: 'linear-gradient(90deg, #ee0979 0%, #ff6a00 100%)', color: '#fff', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(238,9,121,0.18)' }}>회원가입</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#111', padding: '140px 0 80px 0', boxSizing: 'border-box', position: 'relative' }}>
      {(error || success) && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 40, margin: 'auto', width: '90%',
          padding: '18px 0', borderRadius: 16, fontWeight: 700, fontSize: '1.1rem', textAlign: 'center',
          background: error ? 'linear-gradient(90deg,#ff4d4f,#ff6a00)' : 'linear-gradient(90deg,#52c41a,#00c6fb)',
          color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', opacity: 1, zIndex: 10,
          transition: 'opacity 0.4s',
          animation: 'fadeInDown 0.5s'
        }}>
          {error || success}
        </div>
      )}
      <div style={{ maxWidth: 600, margin: '40px auto', padding: 40, background: 'rgba(30,30,30,0.96)', borderRadius: 32, boxShadow: '0 12px 40px rgba(0,0,0,0.32)', border: '2px solid rgba(255,255,255,0.10)', color: '#fff' }}>
        <h2 style={{ marginBottom: 32, fontSize: '2rem', fontWeight: 700, letterSpacing: '2px', textAlign: 'center' }}>제작 요청</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 600, color: '#ffb300' }}>제품 이미지 업로드 (여러 장 가능)<br/>
              <input type="file" multiple accept="image/*" onChange={handleProductImageChange} style={{ marginTop: 8, color: '#fff', background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, padding: 8 }} />
            </label>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 600, color: '#ffb300' }}>참조 이미지 업로드 (포즈, 무드 등, 여러 장 가능)<br/>
              <input type="file" multiple accept="image/*" onChange={handleReferenceImageChange} style={{ marginTop: 8, color: '#fff', background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, padding: 8 }} />
            </label>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 600, color: '#ffb300' }}>설명<br/>
              <textarea value={description} onChange={handleDescriptionChange} rows={5} style={{ width: '100%', resize: 'vertical', marginTop: 8, background: 'rgba(255,255,255,0.10)', color: '#fff', border: 'none', borderRadius: 12, fontSize: '1.08rem', padding: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', boxSizing: 'border-box' }} placeholder="요청 사항, 설명 등을 입력해 주세요." />
            </label>
          </div>
          <button type="submit" style={{ width: '100%', padding: '18px 0', background: 'linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)', color: '#fff', border: 'none', borderRadius: 18, fontSize: '1.2rem', fontWeight: 700, letterSpacing: '2px', boxShadow: '0 6px 24px rgba(238,9,121,0.22)', cursor: 'pointer', marginTop: 8, marginBottom: 4, transition: 'all 0.18s cubic-bezier(.4,2,.6,1)', textShadow: '0 2px 8px rgba(0,0,0,0.15)' }} disabled={loading}>
            {loading ? '제출 중...' : '제출'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestPage; 