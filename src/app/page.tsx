import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { PathGrowth } from "@/components/home/PathGrowth";
import { AgentsSection } from "@/components/home/AgentsSection";
import { Industries } from "@/components/home/Industries";
import { BriefSection } from "@/components/home/BriefSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <PathGrowth />
      <AgentsSection />
      <Industries />
      <BriefSection />
    </>
  );
}
