import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/competitions.css';

// ================= IMPORT ASSETS =================
const heroBackground = '/assets/Competitions/hero.png';
const imgSport = '/assets/Competitions/Sport.png';
const imgESport = '/assets/Competitions/ESport.png';
const imgCreative = '/assets/Competitions/Creative.png';

interface CompetitionCategory {
  id: string;
  title: string;
  image: string;
  path: string;
}

const competitionCategories: CompetitionCategory[] = [
  { id: 'c1', title: 'Sport', image: imgSport, path: '/competitions/sport' },
  { id: 'c2', title: 'E-Sport', image: imgESport, path: '/competitions/esport' },
  { id: 'c3', title: 'Creative', image: imgCreative, path: '/competitions/creative' },
];

const Competitions: React.FC = () => {
  return (
    <div className="competitions-page">
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBackground})` }} />

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="categories-section">
        <div className="categories-wrapper">
          <div className="categories-header">
            <h2>Competition Categories</h2>
              <p>Three arenas, three different challenges. Choose the path that best fits your skills.</p>
          </div>
          <div className="categories-grid">
            {competitionCategories.map((comp) => (
              <Link
                to={comp.path}
                className="category-card"
                key={comp.id}
                style={{ backgroundImage: `url(${comp.image})` }}
              >
                <div className="card-overlay">
                  <h3>{comp.title}</h3>
                    <p>
                      Show your best talent at this prestigious event.
                      Seize the chance to become a champion at Burncup 2026.
                    </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Competitions;
