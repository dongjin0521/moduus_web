import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import image1 from './components/Elements/1.png';
import image2 from './components/Elements/2.png';
import image3 from './components/Elements/3.png';
import image4 from './components/Elements/4.png';
import image5 from './components/Elements/5.png';
import image6 from './components/Elements/6.png';
import image7 from './components/Elements/7.png';
import image8 from './components/Elements/8.png';
import image9 from './components/Elements/9.png';
import image10 from './components/Elements/10.png';
import image11 from './components/Elements/11.png';
import image12 from './components/Elements/12.png';
import image13 from './components/Elements/13.png';
import RequestPage from './components/RequestPage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import MyPage from './components/MyPage';
import MyRequestsPage from './components/MyRequestsPage';
import './App.css';

function ScrollToSectionOnNavigate() {
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname === '/' && location.state && location.state.scrollTo) {
      setTimeout(() => {
        if (location.state.scrollTo === 'home') {
          const firstSection = document.querySelector('.section:first-child');
          if (firstSection) firstSection.scrollIntoView({ behavior: 'smooth' });
        } else if (location.state.scrollTo === 'about') {
          const secondSection = document.querySelector('.section:nth-child(2)');
          if (secondSection) secondSection.scrollIntoView({ behavior: 'smooth' });
        } else if (location.state.scrollTo === 'contact') {
          const lastSection = document.querySelector('.section:last-child');
          if (lastSection) lastSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  }, [location]);
  return null;
}

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <ScrollToSectionOnNavigate />
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">MODUUS</div>
          <ul className="nav-links">
            <li><Link to="/" state={{ scrollTo: 'home' }}>HOME</Link></li>
            <li><Link to="/" state={{ scrollTo: 'about' }}>ABOUT</Link></li>
            <li><Link to="/" state={{ scrollTo: 'contact' }}>CONTACT</Link></li>
            <li><Link to="/request">제작 요청</Link></li>
            {user ? (
              <li><Link to="/mypage">마이페이지</Link></li>
            ) : (
              <li><Link to="/login">로그인</Link></li>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={
            <div className="app-container">
              <section className="section snap-start">
                <img src={image1} alt="Section 1" className="section-image" />
              </section>
              <section className="section snap-start">
                <img src={image2} alt="Section 2" className="section-image" />
              </section>
              <section className="section snap-start">
                <img src={image3} alt="Section 3" className="section-image" />
              </section>
              <section className="section snap-start">
                <img src={image4} alt="Section 4" className="section-image" />
              </section>
              <section className="section snap-start">
                <img src={image5} alt="Section 5" className="section-image" />
              </section>
              <section className="section snap-start">
                <img src={image6} alt="Section 6" className="section-image" />
              </section>
              <section className="section snap-start">
                <img src={image7} alt="Section 7" className="section-image" />
              </section>
              <section className="section snap-start">
                <img src={image8} alt="Section 8" className="section-image" />
              </section>
              <section className="section snap-start">
                <img src={image9} alt="Section 9" className="section-image" />
              </section>
              <section className="section snap-start">
                <img src={image10} alt="Section 10" className="section-image" />
              </section>
              <section className="section snap-start">
                <img src={image11} alt="Section 11" className="section-image" />
              </section>
              <section className="section snap-start">
                <img src={image12} alt="Section 12" className="section-image" />
              </section>
              <section className="section snap-start" style={{ position: 'relative' }}>
                <img src={image13} alt="Section 13" className="section-image" />
                <Link to="/request" style={{
                  position: 'absolute',
                  bottom: '60px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '28px 80px',
                  background: 'linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)',
                  color: '#fff',
                  borderRadius: '48px',
                  fontSize: '2.2rem',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 32px rgba(238,9,121,0.25), 0 2px 8px rgba(0,0,0,0.10)',
                  border: 'none',
                  transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
                  cursor: 'pointer',
                  zIndex: 10,
                  textShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
                onMouseOver={e => {
                  e.target.style.background = 'linear-gradient(90deg, #ee0979 0%, #ff6a00 100%)';
                  e.target.style.transform = 'translateX(-50%) scale(1.06)';
                  e.target.style.boxShadow = '0 12px 40px rgba(238,9,121,0.35), 0 4px 16px rgba(0,0,0,0.15)';
                }}
                onMouseOut={e => {
                  e.target.style.background = 'linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)';
                  e.target.style.transform = 'translateX(-50%) scale(1)';
                  e.target.style.boxShadow = '0 8px 32px rgba(238,9,121,0.25), 0 2px 8px rgba(0,0,0,0.10)';
                }}
                >
                  제작 요청하기
                </Link>
              </section>
            </div>
          } />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/requests" element={<MyRequestsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;