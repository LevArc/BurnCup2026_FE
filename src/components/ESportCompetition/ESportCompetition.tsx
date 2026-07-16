import React from 'react';
import { Link } from 'react-router-dom';
import './ESportCompetition.css';

// ================= IMPORT ASSETS =================
const heroBackground = '/assets/ESportCompetition/hero.png';
const aboutImage = '/assets/ESportCompetition/ESport.png';

// Import Gambar Pohon
const treeLeft = '/assets/ESportCompetition/Tree Left.png';
const treeRight = '/assets/ESportCompetition/Tree Right.png';

// Import Artwork Unik Setiap Kompetisi
const imgFIFA = '/assets/ESportCompetition/FIFA.jpg';
const imgMobileLegend = '/assets/ESportCompetition/MobileLegend.jpg';
const imgValorant = '/assets/ESportCompetition/VALORANT.jpg';
const imgNBA2k = '/assets/ESportCompetition/NBA2K.jpg';
const imgPubg = '/assets/ESportCompetition/PUBG.jpg';

interface CompetitionCategory {
  id: string;
  title: string;
  image: string;
  path: string;
}

const esportCompetitions: CompetitionCategory[] = [
  { id: 'c1', title: 'FIFA', image: imgFIFA, path: '/competitions/fifa' },
  { id: 'c2', title: 'Mobile Legend', image: imgMobileLegend, path: '/competitions/mobile-legend' },
  { id: 'c3', title: 'Valorant', image: imgValorant, path: '/competitions/valorant' },
  { id: 'c4', title: 'NBA 2K', image: imgNBA2k, path: '/competitions/nba-2k' },
  { id: 'c5', title: 'PUBG Mobile', image: imgPubg, path: '/competitions/pubg-mobile' },
];

const ESportCompetition: React.FC = () => {
  return (
    <div className="e-sport-page">

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBackground})` }} />

      {/* ================= ABOUT SECTION ================= */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-image-wrapper">
            <img src={aboutImage} alt="About Competition" className="about-image" />
          </div>
          <div className="about-text">
            <h2>What's E-Sport Competition<br/>At Burncup 2026?</h2>
            <p>
              The BURNCUP E-Sport arena is where strategy, speed, and precision collide. 
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
            <h2>E-Sport Competitions</h2>
            <p>Lima medan, lima tantangan berbeda. Pilih jalur yang paling sesuai dengan keahlianmu.</p>
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

export default ESportCompetition;