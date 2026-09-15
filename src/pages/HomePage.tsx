// import "../components/home/Home.css";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import CategorySection from "../components/home/CategorySection";
import TimelineSection from "../components/home/TimelineSection";
import SponsorSection from "../components/home/SponsorSection";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4ECD8] overflow-x-hidden">
      <Hero />
      <AboutSection />
      <CategorySection />
      <TimelineSection />
      <SponsorSection />
    </main>
  );
}
