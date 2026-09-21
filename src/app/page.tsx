import { Hero } from "@/components/home/Hero";
import { Stall } from "@/components/home/Stall";
import { PathSection } from "@/components/home/PathSection";
import { AgentsSection } from "@/components/home/AgentsSection";
import { Industries } from "@/components/home/Industries";
import { BriefSection } from "@/components/home/BriefSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stall />
      <PathSection />
      <AgentsSection />
      <Industries />
      <BriefSection />
    </>
  );
}
