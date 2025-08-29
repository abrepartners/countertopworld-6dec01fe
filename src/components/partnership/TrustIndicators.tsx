import { Award, Settings, Shield, CheckCircle, Users } from "lucide-react";

const TrustIndicators = () => {
  const indicators = [
    {
      icon: Users,
      text: "Family-owned since 2015"
    },
    {
      icon: Settings,
      text: "Only Sasso-Lux machine in Arkansas"
    },
    {
      icon: CheckCircle,
      text: "In-house fabrication facility"
    },
    {
      icon: Shield,
      text: "Licensed & insured"
    },
    {
      icon: Award,
      text: "500+ projects completed"
    }
  ];

  return (
    <section className="py-12 bg-background border-b border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
          {indicators.map((indicator, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <indicator.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">{indicator.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;