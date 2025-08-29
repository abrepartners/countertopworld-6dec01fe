import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Phone } from "lucide-react";

const PricingSection = () => {
  const pricingFeatures = [
    "Professional templating included",
    "Precision CNC fabrication",
    "Licensed installation crew",
    "Standard edge profiles",
    "Basic cutouts (sink, cooktop)",
    "Job site protection"
  ];

  const additionalServices = [
    "Custom edge details - Quote on request",
    "Complex cutouts - $75-150 each", 
    "Rush orders - +25% premium",
    "Weekend installation - +15%",
    "Removal of existing tops - $8/sq ft"
  ];

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-padding gradient-section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-section-title mb-6 font-bold text-foreground">
            Contractor & Builder Pricing
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
            Transparent pricing for professional partners
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="card-blueprint transition-blueprint hover:shadow-elevated">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Standard Pricing</h3>
              
              <div className="mb-8">
                <div className="text-3xl font-bold text-primary mb-2">$45-85 /sq ft</div>
                <p className="text-muted-foreground">Installed, material dependent</p>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold mb-4 text-foreground">Standard Package Includes:</h4>
                <ul className="space-y-3">
                  {pricingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button onClick={scrollToForm} className="w-full cta-primary">
                Get Detailed Quote
              </Button>
            </CardContent>
          </Card>

          <Card className="card-blueprint transition-blueprint hover:shadow-elevated">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Volume & Additional Services</h3>
              
              <div className="mb-8">
                <div className="bg-accent/10 p-6 rounded-lg mb-6">
                  <h4 className="font-bold text-foreground mb-2">High-Volume Accounts</h4>
                  <p className="text-muted-foreground mb-3">
                    Multiple projects per month qualify for special pricing
                  </p>
                  <Button variant="outline" className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Call for Volume Pricing
                  </Button>
                </div>

                <h4 className="font-semibold mb-4 text-foreground">Additional Services:</h4>
                <ul className="space-y-3">
                  {additionalServices.map((service, index) => (
                    <li key={index} className="flex items-start text-muted-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg text-center">
                <p className="text-sm font-semibold text-foreground">
                  All quotes valid for 30 days • Payment terms available for qualified contractors
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;