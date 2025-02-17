
import { Features } from "@/components/Features";
import Hero from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { CallToAction } from "@/components/CallToAction";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero/>
      <Features />
      <HowItWorks />
      <CallToAction />
    </main>
  );
}
