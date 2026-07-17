import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/competitions.css';

// ================= IMPORT ASSETS =================
const heroBackground = '/assets/SportCompetition/hero.png';
const aboutImage = '/assets/SportCompetition/Sport.png';

// Import Gambar Pohon
const treeLeft = '/assets/SportCompetition/Tree Left.png';
const treeRight = '/assets/SportCompetition/Tree Right.png';

// Import Artwork Unik Setiap Kompetisi
const imgFutsal = '/assets/SportCompetition/Futsal.jpg';
const imgBasketball = '/assets/SportCompetition/Basketball.jpg';
const imgVolly = '/assets/SportCompetition/volly.jpg';
const imgPingpong = '/assets/SportCompetition/Pingpong.jpg';
const imgBilliard = '/assets/SportCompetition/Billiard.jpg';
const imgChess = '/assets/SportCompetition/chess.jpg';

interface CompetitionCategory {
  id: string;
  title: string;
  image: string;
  path: string;
}

const esportCompetitions: CompetitionCategory[] = [
  { id: 'c1', title: 'Futsal', image: imgFutsal, path: '/competitions/futsal' },
  { id: 'c2', title: 'Basketball', image: imgBasketball, path: '/competitions/basketball' },
  { id: 'c3', title: 'Volly', image: imgVolly, path: '/competitions/volly' },
  { id: 'c4', title: 'Pingpong', image: imgPingpong, path: '/competitions/pingpong' },
  { id: 'c5', title: 'Billiard', image: imgBilliard, path: '/competitions/billiard' },
  { id: 'c6', title: 'Chess', image: imgChess, path: '/competitions/chess' },
];

const SportCompetition: React.FC = () => {
  return (
    <div className="sport-page">

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBackground})` }} />

      {/* ================= ABOUT SECTION ================= */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-image-wrapper">
            <img src={aboutImage} alt="About Competition" className="about-image" />
          </div>
          <div className="about-text">
            <h2>What's Sport Competition<br/>At Burncup 2026?</h2>
            <p>
              The BURNCUP Sport arena is where strategy, speed, and precision collide. 
              We provide a professional platform for elite competitors to showcase their prowess 
              across the globe's most demanding games. Every move, every detail, and every 
              performance is amplified in our high-performance ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="categories-section">
        <div className="categories-wrapper">
          <img src={treeLeft} alt="Tree Left" className="tree-left-new" />
          <img src={treeRight} alt="Tree Right" className="tree-right-new" />

          <div className="categories-header">
            <h2>Sport Competitions</h2>
            <p>Enam medan, enam tantangan berbeda. Pilih jalur yang paling sesuai dengan keahlianmu.</p>
          </div>

          <div className="categories-grid">
            {esportCompetitions.map((comp) => (
              <Link
                to={comp.path}
                className="category-card"
                key={comp.id}
                style={{ backgroundImage: `url(${comp.image})` }}
              >
                <div className="card-overlay">
                  <h3>{comp.title}</h3>
                  <p>
                    Tunjukkan bakat terbaikmu di ajang bergengsi ini.
                    Raih kesempatan untuk menjadi juara di Burncup 2026.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="cta-section">
        <h2>Join the Competition Now!</h2>
        <button className="cta-register-btn">Register Now!</button>
      </section>
    </div>
  );
};

export default SportCompetition;