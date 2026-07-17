import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/competitions.css';

// ================= IMPORT ASSETS =================
const heroBackground = '/assets/CreativeCompetition/hero.png';
const aboutImage = '/assets/CreativeCompetition/Creative.png';

// Import Gambar Pohon
const treeLeft = '/assets/CreativeCompetition/Tree Left.png';
const treeRight = '/assets/CreativeCompetition/Tree Right.png';

// Import Artwork Unik Setiap Kompetisi
const imgModernDance = '/assets/CreativeCompetition/ModernDance.png';
const imgTraditionalDance = '/assets/CreativeCompetition/TraditionalDance.png';
const imgCosplay = '/assets/CreativeCompetition/Cosplay.png';
const imgCakeDecoration = '/assets/CreativeCompetition/CakeDecoration.png';
const imgBand = '/assets/CreativeCompetition/Band.png';

interface CompetitionCategory {
  id: string;
  title: string;
  image: string;
  path: string;
}

const creativeCompetitions: CompetitionCategory[] = [
  { id: 'c1', title: 'Modern Dance', image: imgModernDance, path: '/competitions/modern-dance' },
  { id: 'c2', title: 'Traditional Dance', image: imgTraditionalDance, path: '/competitions/traditional-dance' },
  { id: 'c3', title: 'Cosplay', image: imgCosplay, path: '/competitions/cosplay' },
  { id: 'c4', title: 'Cake Decoration', image: imgCakeDecoration, path: '/competitions/cake-decoration' },
  { id: 'c5', title: 'Band', image: imgBand, path: '/competitions/band' },
];

const CreativeCompetition: React.FC = () => {
  return (
    <div className="creative-page">

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBackground})` }} />

      {/* ================= ABOUT SECTION ================= */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-image-wrapper">
            <img src={aboutImage} alt="About Competition" className="about-image" />
          </div>
          <div className="about-text">
            <h2>What's Creative Competition<br/>At Burncup 2026?</h2>
            <p>
                            The BURNCUP Creative arena is where imagination, artistry, and passion take center stage.
                            We provide an inspiring platform for talented individuals to express themselves and
                            captivate audiences across a diverse range of creative disciplines.
                            Every performance, every creation, and every detail tells a story worth celebrating.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="categories-section">
        {/* Wrapper to lock tree decorations beside the cards */}
        <div className="categories-wrapper"> 
          <img src={treeLeft} alt="Tree Left" className="tree-left-new" />
          <img src={treeRight} alt="Tree Right" className="tree-right-new" />
          
          <div className="categories-header">
            <h2>Creative Competitions</h2>
            <p>Five canvases, five different challenges. Choose the path that best matches your expertise.</p>
          </div>

          <div className="categories-grid">
            {creativeCompetitions.map((comp) => (
              <Link 
                to={comp.path} 
                className="category-card" 
                key={comp.id}
                style={{ backgroundImage: `url(${comp.image})` }}
              >
                <div className="card-overlay">
                  <h3>{comp.title}</h3>
                  <p>
                    Showcase your best talent in this prestigious event. Seize the chance to become the champion of Burncup 2026.
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

export default CreativeCompetition;