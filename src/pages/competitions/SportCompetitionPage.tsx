import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/competitions.css';

// ================= IMPORT ASSETS =================
const heroBackground = '/assets/SportCompetition/hero.png';
const aboutImage = '/assets/SportCompetition/Sport.png';

const treeLeft = '/assets/SportCompetition/Tree Left.png';
const treeRight = '/assets/SportCompetition/Tree Right.png';

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

const sportCompetitions: CompetitionCategory[] = [
  { id: 'c1', title: 'Futsal', image: imgFutsal, path: '/competitions/futsal' },
  { id: 'c2', title: 'Basketball', image: imgBasketball, path: '/competitions/basketball' },
  { id: 'c3', title: 'Volly', image: imgVolly, path: '/competitions/volly' },
  { id: 'c4', title: 'Pingpong', image: imgPingpong, path: '/competitions/pingpong' },
  { id: 'c5', title: 'Billiard', image: imgBilliard, path: '/competitions/billiard' },
  { id: 'c6', title: 'Chess', image: imgChess, path: '/competitions/chess' },
];

const SportCompetition: React.FC = () => {
  const categoriesRef = useRef<HTMLElement>(null);

  // 1. Updated scroll function with a custom offset
  const handleScrollUp = () => {
    if (categoriesRef.current) {
      // Get the distance from the top of the page to the section
      const elementPosition = categoriesRef.current.getBoundingClientRect().top;
      
      // Calculate the exact position to scroll to, minus an offset. 
      // Change '150' to make it scroll up more or less!
      const offset = 100; 
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
              The BURNCUP Sport arena is where athleticism, endurance, and teamwork come together.
              We provide a competitive stage for dedicated athletes to push their limits and
              showcase their physical excellence across a range of traditional and modern sports.
              Every match, every point, and every victory is celebrated in our energetic sporting environment.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="categories-section" ref={categoriesRef}>
        <div className="categories-wrapper">
          <img src={treeLeft} alt="Tree Left" className="tree-left-new" />
          <img src={treeRight} alt="Tree Right" className="tree-right-new" />

          <div className="categories-header">
            <h2>Sport Competitions</h2>
            <p>Six grounds, six different challenges. Choose the path that best matches your expertise.</p>
          </div>

          <div className="categories-grid">
            {sportCompetitions.map((comp) => (
              <Link
                to={comp.path}
                className="category-card"
                key={comp.id}
                style={{ backgroundImage: `url(${comp.image})` }}
              >
                <div className="card-overlay">
                  <h3>{comp.title}</h3>
                  <p>
                    Prove your athletic excellence at this prestigious event.
                    Compete for the championship title at Burncup 2026.
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
        <button className="cta-register-btn" onClick={handleScrollUp}>
          Register Now
        </button>
      </section>
    </div>
  );
};

export default SportCompetition;