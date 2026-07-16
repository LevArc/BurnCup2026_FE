import { useState, useEffect } from "react";

import CompetitionHero from "../components/competition/Hero";
import Description from "../components/competition/Description";
import Ruleset, { type Rule } from "../components/competition/Ruleset";
import Timeline, { type TimelineItem } from "../components/competition/Timeline";
import Faq, { type FAQItem } from "../components/competition/Faq";

// Define the shape of the incoming API data
interface ApiCompetitionData {
    id: string;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    bookletUrl: string;
    registrationStartDate: string;
    registrationEndDate: string;
    competitionStartDate: string;
    competitionEndDate: string;
    competitionType: string;
    venue: string;
    registrationfee: number;
    maxMembers: number;
    minMembers: number;
    teamSlot: number;
    faq: Record<string, string> | null;
    // Updated to handle both "date" and "time" optionally
    timeline: { time?: string; date?: string; title: string; description?: string }[] | null;
    rules: string[] | { content: string }[] | null;
}

// Define props for the Competition component
interface CompetitionProps {
    id: string;
}

export default function Competition({ id }: CompetitionProps) {
    const [data, setData] = useState<ApiCompetitionData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompetitionData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/competitions/${id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch competition data");
                }

                const jsonData = await response.json();
                setData(jsonData);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCompetitionData();
        }
    }, [id]);

    // Loading & Error States
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#E9DCBB]">Loading...</div>;
    }

    if (error || !data) {
        return <div className="min-h-screen flex items-center justify-center bg-[#E9DCBB] text-red-600">Error: {error}</div>;
    }

    // --- Data Transformations ---

    // 1. Transform API Rules into expected Ruleset prop format
    let mappedRules: Rule[] = [];
    if (data.rules && Array.isArray(data.rules)) {
        mappedRules = data.rules.map((rule, index) => ({
            id: index + 1,
            content: typeof rule === 'string' ? rule : rule.content || ""
        }));
    } else {
        mappedRules = [{ id: 1, content: "Peraturan belum tersedia untuk kompetisi ini." }];
    }

    // 2. Transform API Timeline into expected Timeline prop format
    let mappedTimeline: TimelineItem[] = [];
    if (data.timeline && Array.isArray(data.timeline)) {
        mappedTimeline = data.timeline.map((item) => ({
            // Use time if it exists, otherwise fallback to date
            time: item.time || item.date || "", 
            title: item.title,
        }));
    }

    // 3. Transform API FAQ into Array of Objects
    let mappedFaq: FAQItem[] = [];
    if (data.faq && typeof data.faq === 'object') {
        mappedFaq = Object.entries(data.faq).map(([question, answer], index) => ({
            id: index + 1,
            question,
            answer
        }));
    }

    return (
        <div>
            <CompetitionHero
                bgImageUrl={data.imageUrl}
                competitionName={data.name}
                registerLink={`/register/${data.id}`}
                bookletLink={data.bookletUrl}
            />

            <Description
                description={data.description}
                targetDate={data.registrationEndDate}
            />

            <Ruleset
                rules={mappedRules}
                competitionName={data.name}
            />

            {/* Only render if we successfully mapped timeline data */}
            {mappedTimeline.length > 0 && (
                <Timeline
                    timeline={mappedTimeline}
                />
            )}

            {mappedFaq.length > 0 && (
                <Faq faqData={mappedFaq} />
            )}
        </div>
    );
}