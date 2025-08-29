import HeroSection from "@/components/partnership/HeroSection";
import TrustIndicators from "@/components/partnership/TrustIndicators";
import TargetAudience from "@/components/partnership/TargetAudience";
import TechnologySection from "@/components/partnership/TechnologySection";
import MaterialShowcase from "@/components/partnership/MaterialShowcase";
import PricingSection from "@/components/partnership/PricingSection";
import ContactSection from "@/components/partnership/ContactSection";
import SocialProof from "@/components/partnership/SocialProof";

const Partnership = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrustIndicators />
      <TargetAudience />
      <TechnologySection />
      <MaterialShowcase />
      <PricingSection />
      <ContactSection />
      <SocialProof />
    </div>
  );
};

export default Partnership;