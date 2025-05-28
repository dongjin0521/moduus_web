import React, { useEffect } from 'react';
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
import './App.css';

function App() {
  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
  }, []);

  const scrollToHome = () => {
    const firstSection = document.querySelector('.section:first-child');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const secondSection = document.querySelector('.section:nth-child(2)');
    if (secondSection) {
      secondSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const lastSection = document.querySelector('.section:last-child');
    if (lastSection) {
      lastSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">MODUUS</div>
        <ul className="nav-links">
          <li><a href="#" onClick={scrollToHome}>HOME</a></li>
          <li><a href="#" onClick={scrollToAbout}>ABOUT</a></li>
          <li><a href="#" onClick={scrollToContact}>CONTACT</a></li>
        </ul>
      </nav>
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
        <section className="section snap-start">
          <img src={image13} alt="Section 13" className="section-image" />
        </section>
      </div>
    </div>
  );
}

export default App;