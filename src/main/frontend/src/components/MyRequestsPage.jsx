import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const MyRequestsPage = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`/api/requests?userEmail=${encodeURIComponent(user.email)}`)
      .then(res => res.ok ? res.json() : Promise.reject('조회 실패'))
      .then(data => setRequests(data))
      .catch(() => setError('요청 내역 조회 실패'))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#111', padding: '140px 0 80px 0', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: 40, background: 'rgba(30,30,30,0.96)', borderRadius: 32, boxShadow: '0 12px 40px rgba(0,0,0,0.32)', border: '2px solid rgba(255,255,255,0.10)', color: '#fff' }}>
        <h2 style={{ marginBottom: 32, fontSize: '2rem', fontWeight: 700, letterSpacing: '2px', textAlign: 'center' }}>내 제작 요청 내역</h2>
        {loading ? <div style={{ textAlign: 'center', color: '#bbb' }}>불러오는 중...</div> :
          error ? <div style={{ textAlign: 'center', color: '#ff4d4f' }}>{error}</div> :
          requests.length === 0 ? <div style={{ textAlign: 'center', color: '#bbb' }}>제작 요청 내역이 없습니다.</div> :
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', background: 'none' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid #444' }}>
                <th style={{ padding: 12, fontWeight: 600 }}>요청일</th>
                <th style={{ padding: 12, fontWeight: 600 }}>설명</th>
                <th style={{ padding: 12, fontWeight: 600 }}>상태</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #222' }}>
                  <td style={{ padding: 10 }}>{new Date(r.createdAt).toLocaleString('ko-KR')}</td>
                  <td style={{ padding: 10 }}>{r.description}</td>
                  <td style={{ padding: 10, fontWeight: 600, color: r.status === '완료' ? '#52c41a' : r.status === '진행' ? '#ffb300' : '#fff' }}>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
};

export default MyRequestsPage; 