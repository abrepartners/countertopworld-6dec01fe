import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-partnership.jpg";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative container-custom section-padding text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-hero mb-4 text-white font-bold leading-tight">
            Arkansas's Leading Countertop Fabricator for Builders & Architects
          </h1>
          <p className="text-2xl mb-6 text-white/95 font-semibold">
            State-of-the-art CNC technology • In-house fabrication • 48-hour turnaround
          </p>
          <p className="text-xl mb-12 text-white/90 font-medium">
            Granite • Quartz • Quartzite • Marble • Porcelain
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-12 py-4 rounded-lg font-semibold border-0"
            >
              Get Project Quote
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollToForm}
              className="border-2 border-white text-white hover:bg-white hover:text-black text-lg px-12 py-4 rounded-lg font-semibold"
            >
              Schedule Facility Tour
              <Calendar className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;