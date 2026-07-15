// import "../components/home/Home.css";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import CategorySection from "../components/home/CategorySection";
import TimelineSection from "../components/home/TimelineSection";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#F0E6D2]">
      <Hero />
      <AboutSection />
      <CategorySection />
      <TimelineSection />
    </main>
  );
}
