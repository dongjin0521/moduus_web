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
  const [selectedPlan, setSelectedPlan] = useState('lite');

  const handleProductImageChange = (e) => {
    setProductImages(Array.from(e.target.files));
  };

  const handleReferenceImageChange = (e) => {
    setReferenceImages(Array.from(e.target.files));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e, plan = selectedPlan) => {
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
          description,
          plan
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
      <div style={{ maxWidth: 980, margin: '40px auto', padding: 0 }}>
        {/* 가격/상품 카드 섹션 */}
        <div style={{ display: 'flex', gap: 36, marginBottom: 48, justifyContent: 'center' }}>
          {[
            {
              key: 'lite',
              label: 'Lite',
              price: '장당 25,000',
              desc1: '첨부 파일 기반 간단 제작',
              desc2: '상담시간 1시간 이내',
              time: '작업시간 평균 1일 이내',
              color: '#00c6fb'
            },
            {
              key: 'standard',
              label: 'Standard',
              price: '장당 45,000',
              desc1: '디자이너 맞춤 제작',
              desc2: '고해상도 이미지 제공',
              time: '작업시간 평균 3일 이내',
              color: '#ffb300'
            },
            {
              key: 'pro',
              label: 'Pro',
              price: '장당 80,000',
              desc1: '전문가 맞춤 제작',
              desc2: '1:1 컨설팅',
              time: '작업시간 평균 7일 이내',
              color: '#ee0979'
            }
          ].map(plan => (
            <div
              key={plan.key}
              onClick={() => setSelectedPlan(plan.key)}
              style={{
                flex: 1,
                minWidth: 0,
                cursor: 'pointer',
                background: selectedPlan === plan.key ? `linear-gradient(90deg, ${plan.color} 0%, #222 100%)` : 'rgba(30,30,30,0.92)',
                border: selectedPlan === plan.key ? `3px solid ${plan.color}` : '2px solid rgba(255,255,255,0.10)',
                borderRadius: 24,
                boxShadow: selectedPlan === plan.key ? '0 8px 32px rgba(0,198,251,0.18)' : '0 2px 8px rgba(0,0,0,0.10)',
                color: '#fff',
                padding: '44px 32px 32px 32px',
                textAlign: 'center',
                transition: 'all 0.18s cubic-bezier(.4,2,.6,1)',
                position: 'relative',
              }}
            >
              <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '1.5px', marginBottom: 10, textTransform: 'uppercase', color: plan.color }}>{plan.label}</div>
              <div style={{ fontSize: '2.1rem', fontWeight: 900, marginBottom: 10, letterSpacing: '2px', lineHeight: 1.1 }}>{plan.price}</div>
              <div style={{ fontSize: '1.08rem', marginBottom: 6, opacity: 0.92, fontWeight: 500 }}>{plan.desc1}</div>
              <div style={{ fontSize: '1.08rem', marginBottom: 10, opacity: 0.92, fontWeight: 500 }}>{plan.desc2}</div>
              <div style={{ fontSize: '0.98rem', color: '#bbb', marginBottom: 0 }}>{plan.time}</div>
              {selectedPlan === plan.key && (
                <div style={{ position: 'absolute', top: 18, right: 18, background: plan.color, color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: '0.98rem', padding: '2px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>선택됨</div>
              )}
            </div>
          ))}
        </div>
        {/* 폼 카드 */}
        <div style={{ padding: 56, background: 'rgba(30,30,30,0.96)', borderRadius: 32, boxShadow: '0 12px 40px rgba(0,0,0,0.32)', border: '2px solid rgba(255,255,255,0.10)', color: '#fff', marginTop: 0 }}>
          <h2 style={{ marginBottom: 32, fontSize: '2rem', fontWeight: 700, letterSpacing: '2px', textAlign: 'center' }}>제작 요청</h2>
          <form onSubmit={e => { e.preventDefault(); handleSubmit(e, selectedPlan); }}>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontWeight: 600, color: '#ffb300', display: 'block', marginBottom: 10 }}>제품 이미지 업로드 (여러 장 가능)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <label htmlFor="product-upload" style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  background: 'linear-gradient(90deg, #00c6fb 0%, #005bea 100%)',
                  color: '#fff',
                  borderRadius: 14,
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,198,251,0.13)',
                  border: 'none',
                  transition: 'all 0.18s cubic-bezier(.4,2,.6,1)',
                  marginRight: 8
                }}
                  onMouseOver={e => e.target.style.background = 'linear-gradient(90deg, #005bea 0%, #00c6fb 100%)'}
                  onMouseOut={e => e.target.style.background = 'linear-gradient(90deg, #00c6fb 0%, #005bea 100%)'}
                >
                  파일 선택
                  <input id="product-upload" type="file" multiple accept="image/*" onChange={handleProductImageChange} style={{ display: 'none' }} />
                </label>
                <span style={{ color: '#fff', fontSize: '1.05rem', opacity: 0.85 }}>
                  {productImages.length > 0 ? `${productImages.length}개 선택됨` : '선택된 파일 없음'}
                </span>
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontWeight: 600, color: '#ffb300', display: 'block', marginBottom: 10 }}>참조 이미지 업로드 (포즈, 무드 등, 여러 장 가능)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <label htmlFor="ref-upload" style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  background: 'linear-gradient(90deg, #ee0979 0%, #ff6a00 100%)',
                  color: '#fff',
                  borderRadius: 14,
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(238,9,121,0.13)',
                  border: 'none',
                  transition: 'all 0.18s cubic-bezier(.4,2,.6,1)',
                  marginRight: 8
                }}
                  onMouseOver={e => e.target.style.background = 'linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)'}
                  onMouseOut={e => e.target.style.background = 'linear-gradient(90deg, #ee0979 0%, #ff6a00 100%)'}
                >
                  파일 선택
                  <input id="ref-upload" type="file" multiple accept="image/*" onChange={handleReferenceImageChange} style={{ display: 'none' }} />
                </label>
                <span style={{ color: '#fff', fontSize: '1.05rem', opacity: 0.85 }}>
                  {referenceImages.length > 0 ? `${referenceImages.length}개 선택됨` : '선택된 파일 없음'}
                </span>
              </div>
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
      {/* 절차 안내 카드 */}
      <div style={{
        margin: '48px auto 0 auto',
        maxWidth: 980,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 28,
        boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
        border: '2px solid rgba(255,255,255,0.13)',
        padding: '48px 56px 40px 56px',
        color: '#fff',
        textAlign: 'center',
        position: 'relative',
        fontSize: '1.18rem',
        fontWeight: 500
      }}>
        <div style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: 18, letterSpacing: '1.5px', color: '#ffb300', textShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
          작업은 어떻게 진행되나요?
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>
          {/* Step 1 */}
          <div style={{ flex: 1, minWidth: 120, maxWidth: 160, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(90deg,#00c6fb,#005bea)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 28, fontWeight: 700 }}>1</span>
            </div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>제작 요청</div>
            <div style={{ fontSize: '1.02rem', opacity: 0.85 }}>홈페이지에서<br />제작 요청</div>
          </div>
          {/* Arrow */}
          <div style={{ alignSelf: 'center', fontSize: 32, color: '#bbb', margin: '0 0.5em' }}>→</div>
          {/* Step 2 */}
          <div style={{ flex: 1, minWidth: 120, maxWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(90deg,#ffb300,#ff6a00)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 28, fontWeight: 700 }}>2</span>
            </div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>1일 이내 카카오톡 회신</div>
            <div style={{ fontSize: '1.02rem', opacity: 0.85 }}>상담/견적 안내<br />카카오톡으로 발송</div>
          </div>
          <div style={{ alignSelf: 'center', fontSize: 32, color: '#bbb', margin: '0 0.5em' }}>→</div>
          {/* Step 3 */}
          <div style={{ flex: 1, minWidth: 120, maxWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(90deg,#52c41a,#00c6fb)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 28, fontWeight: 700 }}>3</span>
            </div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>입금</div>
            <div style={{ fontSize: '1.02rem', opacity: 0.85 }}>입금 확인 후<br />제작 진행</div>
          </div>
          <div style={{ alignSelf: 'center', fontSize: 32, color: '#bbb', margin: '0 0.5em' }}>→</div>
          {/* Step 4 */}
          <div style={{ flex: 1, minWidth: 120, maxWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(90deg,#ee0979,#ff6a00)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 28, fontWeight: 700 }}>4</span>
            </div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>제작</div>
            <div style={{ fontSize: '1.02rem', opacity: 0.85 }}>전문가가<br />제작 진행</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPage; 