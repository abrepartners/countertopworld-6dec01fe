import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Shield, Users } from "lucide-react";

const SocialProof = () => {
  const credentials = [
    {
      icon: Shield,
      title: "Licensed Arkansas Contractor",
      subtitle: "#12345"
    },
    {
      icon: Award,
      title: "Better Business Bureau",
      subtitle: "A+ Rating"
    },
    {
      icon: Star,
      title: "Google Reviews",
      subtitle: "4.9/5 (127 reviews)"
    },
    {
      icon: Users,
      title: "Professional Members",
      subtitle: "NKBA, ISFA Certified"
    }
  ];

  const partnerLogos = [
    "Custom Homes of Arkansas",
    "Bryant Building Group", 
    "Rogers Construction Co.",
    "Arkansas Design Build",
    "Central AR Contractors",
    "Professional Builders LLC"
  ];

  return (
    <section className="section-padding bg-background border-t border-border">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-section-title mb-6 font-bold text-foreground">
            Trusted by Arkansas's Leading Builders
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
            Professional credentials and trusted partnerships
          </p>
        </div>

        {/* Credentials */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {credentials.map((credential, index) => (
            <Card key={index} className="card-blueprint text-center transition-blueprint hover:shadow-elevated">
              <CardContent className="p-6">
                <div className="icon-background mb-4 mx-auto">
                  <credential.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{credential.title}</h3>
                <p className="text-sm text-muted-foreground">{credential.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partner Companies */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-8 text-foreground">Trusted by Leading Local Builders:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg text-center">
                <p className="text-sm font-medium text-muted-foreground">{partner}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Recognition */}
        <div className="mt-16 text-center">
          <Card className="card-blueprint inline-block">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-4">
                <Award className="h-8 w-8 text-accent" />
                <div className="text-left">
                  <h4 className="font-bold text-foreground">Featured in Arkansas Builder Magazine</h4>
                  <p className="text-sm text-muted-foreground">"Leading Fabrication Technology in Central Arkansas"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;