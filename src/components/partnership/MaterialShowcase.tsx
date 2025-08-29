import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const materials = [
  {
    name: "Quartz",
    popularFor: "Luxury homes, Commercial spaces",
    advantages: "Non-porous, consistent patterns, low maintenance",
    finishes: "Polished, Honed, Textured",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
  },
  {
    name: "Granite",
    popularFor: "Custom homes, High-end remodels",
    advantages: "Natural beauty, heat resistant, unique patterns",
    finishes: "Polished, Honed, Leathered",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop"
  },
  {
    name: "Quartzite",
    popularFor: "Designer homes, Commercial lobbies",
    advantages: "Natural stone durability, stunning veining",
    finishes: "Polished, Honed, Brushed",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&h=600&fit=crop"
  },
  {
    name: "Marble",
    popularFor: "Luxury bathrooms, Feature walls",
    advantages: "Timeless elegance, unique veining, premium appeal",
    finishes: "Polished, Honed, Antiqued",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&h=600&fit=crop"
  },
  {
    name: "Porcelain",
    popularFor: "Modern designs, Outdoor applications",
    advantages: "UV resistant, ultra-thin options, large formats",
    finishes: "Matte, Textured, Wood-look",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
  }
];

const MaterialShowcase = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-section-title mb-6 font-bold text-foreground">
            Premium Materials for Every Project
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
            Professional-grade materials with builder advantages and client appeal
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {materials.map((material, index) => (
            <Card key={index} className="card-blueprint transition-blueprint hover:shadow-elevated overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${material.image})` }}
              ></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-foreground">{material.name}</h3>
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="font-semibold text-accent">Popular for:</span>
                    <p className="text-muted-foreground">{material.popularFor}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-accent">Builder advantages:</span>
                    <p className="text-muted-foreground">{material.advantages}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-accent">Available finishes:</span>
                    <p className="text-muted-foreground">{material.finishes}</p>
                  </div>
                </div>
                <Button onClick={scrollToForm} className="w-full cta-secondary">
                  Get Samples
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialShowcase;