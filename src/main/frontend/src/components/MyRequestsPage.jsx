import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const statusColors = {
  '대기': '#ffb300',
  '진행': '#00c6fb',
  '완료': '#52c41a',
  '취소': '#ff4d4f',
};

const statusLabels = {
  '대기': '대기',
  '진행': '진행 중',
  '완료': '완료',
  '취소': '취소',
};

const MyRequestsPage = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`/api/requests?userEmail=${encodeURIComponent(user.email)}`)
      .then(res => res.ok ? res.json() : Promise.reject('조회 실패'))
      .then(data => setRequests(data))
      .catch(() => setError('요청 내역 조회 실패'))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: 36, background: 'rgba(30,30,30,0.92)', borderRadius: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.25)', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', marginBottom: 24 }}>로그인 후 이용해 주세요</h2>
          <p style={{ color: '#bbb', marginBottom: 32 }}>내 요청 내역은 회원만 확인할 수 있습니다.<br/>로그인 또는 회원가입 후 이용해 주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#111', padding: '140px 0 80px 0', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 40, background: 'rgba(30,30,30,0.96)', borderRadius: 32, boxShadow: '0 12px 40px rgba(0,0,0,0.32)', border: '2px solid rgba(255,255,255,0.10)', color: '#fff' }}>
        <h2 style={{ marginBottom: 32, fontSize: '2rem', fontWeight: 700, letterSpacing: '2px', textAlign: 'center' }}>내 제작 요청 내역</h2>
        {loading ? <div style={{ textAlign: 'center', color: '#bbb', padding: 40, fontSize: '1.2rem' }}>불러오는 중...</div> :
          error ? <div style={{ textAlign: 'center', color: '#ff4d4f', padding: 40, fontSize: '1.2rem' }}>{error}</div> :
          requests.length === 0 ? <div style={{ textAlign: 'center', color: '#bbb', padding: 40, fontSize: '1.2rem' }}>제작 요청 내역이 없습니다.<br />오른쪽 상단 "제작 요청" 버튼을 눌러 새 요청을 등록해보세요!</div> :
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', background: 'none', fontSize: '1.08rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #444', background: 'rgba(255,255,255,0.03)' }}>
                  <th style={{ padding: 16, fontWeight: 700, fontSize: '1.08rem' }}>요청일</th>
                  <th style={{ padding: 16, fontWeight: 700, fontSize: '1.08rem' }}>플랜</th>
                  <th style={{ padding: 16, fontWeight: 700, fontSize: '1.08rem' }}>설명</th>
                  <th style={{ padding: 16, fontWeight: 700, fontSize: '1.08rem' }}>상태</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(r => (
                  <tr key={r.id} style={{ borderBottom: '1px solid #222', cursor: 'pointer', background: selected && selected.id === r.id ? 'rgba(255,255,255,0.06)' : 'none', transition: 'background 0.18s' }}
                    onClick={() => setSelected(r)}
                  >
                    <td style={{ padding: 14 }}>{new Date(r.createdAt).toLocaleString('ko-KR')}</td>
                    <td style={{ padding: 14, fontWeight: 700, color: '#00c6fb', textTransform: 'capitalize' }}>{r.plan || '-'}</td>
                    <td style={{ padding: 14, maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.description}</td>
                    <td style={{ padding: 14 }}>
                      <span style={{
                        display: 'inline-block',
                        minWidth: 72,
                        padding: '7px 0',
                        borderRadius: 16,
                        fontWeight: 700,
                        fontSize: '1.08rem',
                        background: statusColors[r.status] || '#444',
                        color: '#fff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                        letterSpacing: '1px',
                        textAlign: 'center',
                        transition: 'background 0.18s'
                      }}>{statusLabels[r.status] || r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
      {/* 상세 정보 모달 */}
      {selected && (
        <div style={{
          position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.45)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s'
        }}
          onClick={() => setSelected(null)}
        >
          <div style={{ minWidth: 340, maxWidth: 440, background: 'rgba(30,30,30,0.98)', borderRadius: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.22)', border: '2px solid rgba(255,255,255,0.13)', padding: 36, color: '#fff', position: 'relative' }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', opacity: 0.7 }}>×</button>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 18, letterSpacing: '1px', color: '#00c6fb' }}>제작 요청 상세</h3>
            <div style={{ marginBottom: 18 }}><b>요청일</b><br />{new Date(selected.createdAt).toLocaleString('ko-KR')}</div>
            <div style={{ marginBottom: 18 }}><b>플랜</b><br />{selected.plan}</div>
            <div style={{ marginBottom: 18 }}><b>설명</b><br />{selected.description}</div>
            <div style={{ marginBottom: 18 }}><b>상태</b><br />
              <span style={{
                display: 'inline-block',
                minWidth: 72,
                padding: '7px 0',
                borderRadius: 16,
                fontWeight: 700,
                fontSize: '1.08rem',
                background: statusColors[selected.status] || '#444',
                color: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                letterSpacing: '1px',
                textAlign: 'center',
                transition: 'background 0.18s'
              }}>{statusLabels[selected.status] || selected.status}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequestsPage; 