import CompetitionHero from "../components/competition/Hero"
import Description from "../components/competition/Description";
import Ruleset from "../components/competition/Ruleset";
import Timeline from "../components/competition/Timeline";
import Faq from "../components/competition/Faq";

export default function Competition(){
    return(
        <div>
            <CompetitionHero/>
            <Description/>
            <Ruleset/>
            <Timeline/>
            <Faq/>
        </div>
        
    );
}