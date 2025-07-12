import React, { useEffect, useState } from 'react';
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
import backgroundImg from './components/Elements/background.png';
import mobileImg from './components/Elements/mobile.png';
import RequestPage from './components/RequestPage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import MyPage from './components/MyPage';
import MyRequestsPage from './components/MyRequestsPage';
import PortfolioPage from './components/PortfolioPage';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
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

// 모바일 감지 훅
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}

// 모바일 랜딩페이지 컴포넌트
function MobileLandingPage() {
  return (
    <div style={{
      width: '100%',
      height: 'auto'
    }}>
      <img 
        src={mobileImg} 
        alt="Mobile Landing Page" 
        style={{
          width: '100%',
          height: 'auto',
          display: 'block'
        }}
      />
    </div>
  );
}

function App() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [showMobileLanding, setShowMobileLanding] = useState(false);

  useEffect(() => {
    if (isMobile && window.location.pathname === '/') {
      setShowMobileLanding(true);
    }
  }, [isMobile]);

  if (showMobileLanding) {
    return (
      <Router>
        <div className="mobile-landing-container">
          <MobileLandingPage />
        </div>
        <Routes>
          <Route path="/request" element={<RequestPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/requests" element={<MyRequestsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </Router>
    );
  }

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
            <li><Link to="/portfolio">PORTFOLIO</Link></li>
            {user && (
              <li><Link to="/mypage">마이페이지</Link></li>
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
              <section className="section snap-start" style={{
                position: 'relative',
                background: `url(${backgroundImg}) center/cover no-repeat`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
              }}>
                <div style={{
                  background: 'rgba(0,0,0,0.54)',
                  borderRadius: 32,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
                  padding: '64px 48px',
                  textAlign: 'center',
                  color: '#fff',
                  maxWidth: 420,
                  width: '100%',
                  backdropFilter: 'blur(2px)',
                  border: '2px solid rgba(255,255,255,0.10)',
                  zIndex: 2,
                  animation: 'fadeInUp 0.8s cubic-bezier(.4,2,.6,1)',
                  position: 'relative'
                }}>
                  <h2 style={{ fontSize: '2.3rem', fontWeight: 800, marginBottom: 36, letterSpacing: '2px', textShadow: '0 2px 12px rgba(0,0,0,0.18)' }}>Contact Us</h2>
                  <div style={{ fontSize: '1.18rem', fontWeight: 700, marginBottom: 18, letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <FaEnvelope style={{ color: '#00c6fb', fontSize: 20, marginRight: 4 }} /> E-mail
                  </div>
                  <a href="mailto:moduusai@gmail.com" style={{
                    color: '#00c6fb',
                    fontSize: '1.18rem',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    wordBreak: 'break-all',
                    transition: 'color 0.18s',
                    marginBottom: 28,
                    display: 'inline-block',
                    letterSpacing: '0.5px'
                  }}
                    onMouseOver={e => e.target.style.color = '#ff6a00'}
                    onMouseOut={e => e.target.style.color = '#00c6fb'}
                  >moduusai@gmail.com</a>
                  <div style={{ fontSize: '1.18rem', fontWeight: 700, margin: '36px 0 18px 0', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <FaPhone style={{ color: '#ffb300', fontSize: 20, marginRight: 4 }} /> Phone
                  </div>
                  <a href="tel:+821046122896" style={{
                    color: '#ffb300',
                    fontSize: '1.18rem',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    transition: 'color 0.18s',
                    letterSpacing: '0.5px'
                  }}
                    onMouseOver={e => e.target.style.color = '#ee0979'}
                    onMouseOut={e => e.target.style.color = '#ffb300'}
                  >(+82)10-4612-2896</a>
                </div>
              </section>
            </div>
          } />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/requests" element={<MyRequestsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;