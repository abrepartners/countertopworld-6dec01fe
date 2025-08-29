import { Card, CardContent } from "@/components/ui/card";
import { Settings, Home, Zap, Clock } from "lucide-react";

const TechnologySection = () => {
  const features = [
    {
      icon: Settings,
      title: "Advanced CNC Technology",
      description: "Only Sasso-Lux finishing machine in Arkansas",
      details: [
        "Dust-free cutting process",
        "Perfect waterfall edges every time"
      ]
    },
    {
      icon: Home,
      title: "Complete In-House Control",
      description: "Slab selection to installation under one roof",
      details: [
        "No outsourcing delays",
        "Quality control at every step"
      ]
    },
    {
      icon: Zap,
      title: "Digital Templating",
      description: "Laser-accurate measurements",
      details: [
        "Seamless pattern matching",
        "Minimal jobsite disruption"
      ]
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      description: "48-hour standard completion",
      details: [
        "Rush orders available",
        "Real-time project tracking"
      ]
    }
  ];

  return (
    <section className="section-padding gradient-section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-section-title mb-6 font-bold text-foreground">
            Why Arkansas Builders Choose Countertop World
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
            Advanced technology and proven processes that deliver results
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="card-blueprint transition-blueprint hover:shadow-elevated">
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <div className="icon-background mr-4 flex-shrink-0">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-accent font-semibold mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="text-muted-foreground flex items-center">
                          <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;