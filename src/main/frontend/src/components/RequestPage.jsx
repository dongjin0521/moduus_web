import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const RequestPage = () => {
  const { user } = useAuth();
  const [productImages, setProductImages] = useState([]);
  const [referenceImages, setReferenceImages] = useState([]);
  const [description, setDescription] = useState('');

  const handleProductImageChange = (e) => {
    setProductImages(Array.from(e.target.files));
  };

  const handleReferenceImageChange = (e) => {
    setReferenceImages(Array.from(e.target.files));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API 연동
    alert('제작 요청이 제출되었습니다! (API 연동 예정)');
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
    <div style={{ minHeight: '100vh', background: '#111', padding: '140px 0 80px 0', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 36, background: 'rgba(30,30,30,0.92)', borderRadius: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.25)', backdropFilter: 'blur(2px)', border: '1.5px solid rgba(255,255,255,0.08)' }}>
        <h2 style={{ marginBottom: 32, color: '#fff', fontSize: '2.2rem', fontWeight: 700, letterSpacing: '2px', textAlign: 'center', textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>제작 요청</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#fff', fontWeight: 500, fontSize: '1.1rem' }}>제품 이미지 업로드 (여러 장 가능)<br/>
              <input type="file" multiple accept="image/*" onChange={handleProductImageChange} style={{ marginTop: 8, color: '#fff', background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, padding: 8 }} />
            </label>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#fff', fontWeight: 500, fontSize: '1.1rem' }}>참조 이미지 업로드 (포즈, 무드 등, 여러 장 가능)<br/>
              <input type="file" multiple accept="image/*" onChange={handleReferenceImageChange} style={{ marginTop: 8, color: '#fff', background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, padding: 8 }} />
            </label>
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={{ color: '#fff', fontWeight: 500, fontSize: '1.1rem' }}>설명<br/>
              <textarea value={description} onChange={handleDescriptionChange} rows={5} style={{ width: '100%', resize: 'vertical', marginTop: 8, background: 'rgba(255,255,255,0.10)', color: '#fff', border: 'none', borderRadius: 10, padding: 14, fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} placeholder="요청 사항, 설명 등을 입력해 주세요." />
            </label>
          </div>
          <button type="submit" style={{ width: '100%', padding: '20px 0', background: 'linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)', color: '#fff', border: 'none', borderRadius: 16, fontSize: '1.5rem', fontWeight: 700, letterSpacing: '2px', boxShadow: '0 4px 16px rgba(238,9,121,0.18)', cursor: 'pointer', transition: 'all 0.18s cubic-bezier(.4,2,.6,1)', textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            onMouseOver={e => {
              e.target.style.background = 'linear-gradient(90deg, #ee0979 0%, #ff6a00 100%)';
              e.target.style.transform = 'scale(1.04)';
              e.target.style.boxShadow = '0 8px 32px rgba(238,9,121,0.28)';
            }}
            onMouseOut={e => {
              e.target.style.background = 'linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 16px rgba(238,9,121,0.18)';
            }}
          >
            제작 요청 제출
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestPage; 