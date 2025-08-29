import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Hammer, PenTool, HardHat } from "lucide-react";

const TargetAudience = () => {
  const audiences = [
    {
      icon: Hammer,
      title: "High-Volume Builder Program",
      benefits: [
        "Bulk pricing discounts",
        "Priority scheduling",
        "Dedicated project manager"
      ],
      cta: "View Builder Benefits"
    },
    {
      icon: PenTool,
      title: "Design Partnership Program",
      benefits: [
        "CAD file compatibility",
        "Material specification support",
        "Sample delivery service"
      ],
      cta: "Partner With Us"
    },
    {
      icon: HardHat,
      title: "Reliable Installation Partners",
      benefits: [
        "48-hour emergency service",
        "Licensed installation crews",
        "Warranty backed work"
      ],
      cta: "Get Contractor Pricing"
    }
  ];

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-section-title mb-6 font-bold text-foreground">
            Professional Partnership Programs
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
            Tailored solutions for every type of building professional
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {audiences.map((audience, index) => (
            <Card key={index} className="card-blueprint transition-blueprint hover:shadow-elevated h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="icon-background mb-6">
                  <audience.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-6 text-foreground">{audience.title}</h3>
                <ul className="space-y-3 mb-8 flex-grow">
                  {audience.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-muted-foreground leading-relaxed flex items-start">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={scrollToForm} 
                  className="w-full cta-primary"
                >
                  {audience.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;