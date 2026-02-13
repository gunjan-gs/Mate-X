import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { BentoFeatures } from "@/components/landing/bento-features";
import { TrustSection } from "@/components/landing/trust-section";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  console.log("Mate-X Landing Page Deployed: v1.0.1");
  return (
    <div className="min-h-screen bg-black font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Global Ambient Lighting */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
          <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-blue-500/10 rounded-full blur-[140px] animate-pulse delay-2000" />
      </div>

      <Navbar />
      
      <main className="flex-1 relative z-10">
        <Hero />
        <TrustSection />
        <BentoFeatures />
        <Pricing />
      </main>
      
      <Footer />
    </div>
  );
}
