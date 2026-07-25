import CompetitionHero from '../components/competition/Hero';
import Description from '../components/competition/Description';
import Ruleset from '../components/competition/Ruleset';
import Timeline from '../components/competition/Timeline';
import Faq from '../components/competition/Faq';

export default function FutsalCompetitionPage() {
  return (
    <main className="min-h-screen bg-[#F4EFDF]">
      <CompetitionHero
        bgImageUrl="/assets/SportCompetition/hero.png"
        competitionName="Futsal"
        registerLink="#"
        bookletLink="#"
      />
      <Description
        description="Kompetisi futsal antar tim terbaik di BurnCup 2026."
        targetDate="2026-10-01T00:00:00"
      />
      <Ruleset
        competitionName="Futsal"
        rules={[
          { id: 1, content: "Peraturan akan segera diumumkan." }
        ]}
      />
      <Timeline
        timeline={[
          { time: "1 Agustus 2026", title: "Pendaftaran Dibuka" },
          { time: "30 September 2026", title: "Pendaftaran Ditutup" },
          { time: "1 Oktober 2026", title: "Hari Kompetisi" }
        ]}
      />
      <Faq
        faqData={[
          { id: 1, question: "Kapan pendaftaran dibuka?", answer: "1 Agustus 2026" }
        ]}
      />
    </main>
  );
}
