import { CheckCircle, Clock, Award, Users, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PartnershipForm from "@/components/PartnershipForm";
import SupplierPacketDownload from "@/components/SupplierPacketDownload";
import heroImage from "@/assets/hero-partnership.jpg";

const Partnership = () => {
  const scrollToForm = () => {
    document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - The "Handshake" */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative container-custom section-padding text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-hero mb-8 text-white font-bold leading-tight">
              Your Countertop Partner in Arkansas
            </h1>
            <p className="text-subtitle mb-12 text-white/90 max-w-3xl mx-auto font-medium">
              Fast, Reliable, and Ready for Your Next Project. From one-off designs to high-volume contracts, 
              Countertop World helps you close projects on time and on budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="cta-primary text-lg px-10 py-4 rounded-lg font-semibold"
              >
                Request Partnership Consultation
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <SupplierPacketDownload />
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section - Professional Acknowledgment */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-section-title mb-6 font-bold text-foreground">Partnership. Not Problems.</h2>
            <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
              We understand the challenges you face. Here's how we solve them.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="card-blueprint transition-blueprint hover:shadow-elevated group">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-destructive/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">No More Missed Deadlines</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground font-medium">
                    <span className="text-destructive font-semibold">Problem:</span> Tired of missed deadlines and budget overruns?
                  </p>
                  <p className="text-foreground font-medium">
                    <span className="text-accent font-semibold">Solution:</span> We are a streamlined, professional fabricator that gets the job done right, on time.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-blueprint transition-blueprint hover:shadow-elevated group">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-destructive/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Consistent Quality</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground font-medium">
                    <span className="text-destructive font-semibold">Problem:</span> Dealing with inconsistent quality?
                  </p>
                  <p className="text-foreground font-medium">
                    <span className="text-accent font-semibold">Solution:</span> Our state-of-the-art facility ensures every cut is perfect, every time.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-blueprint transition-blueprint hover:shadow-elevated group">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-destructive/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Commercial Expertise</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground font-medium">
                    <span className="text-destructive font-semibold">Problem:</span> Looking for a partner that understands commercial contracts?
                  </p>
                  <p className="text-foreground font-medium">
                    <span className="text-accent font-semibold">Solution:</span> We have the capacity and expertise to handle projects of any size.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Partner with Us Section - The Evidence */}
      <section className="section-padding gradient-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-section-title mb-6 font-bold text-foreground">Why Partner with Countertop World?</h2>
            <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
              More than a fabricator. A trusted partner with the expertise and scale you need.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="icon-background mb-6 transition-blueprint group-hover:bg-primary/20">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Expertise</h3>
              <p className="text-muted-foreground leading-relaxed">
                More than a fabricator; a trusted partner with decades of experience in commercial and residential projects.
              </p>
            </div>

            <div className="text-center group">
              <div className="icon-background mb-6 transition-blueprint group-hover:bg-primary/20">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Speed & Scale</h3>
              <p className="text-muted-foreground leading-relaxed">
                Two locations serving a 150-mile radius for rapid, reliable service when you need it most.
              </p>
            </div>

            <div className="text-center group">
              <div className="icon-background mb-6 transition-blueprint group-hover:bg-primary/20">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Exclusive Products</h3>
              <p className="text-muted-foreground leading-relaxed">
                Exclusive access to materials like the beautiful and durable Tashmaja Hall Quartz that your clients will love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section - Professional Testimonials */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-section-title mb-6 font-bold text-foreground">What Our Partners Say</h2>
            <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. Here's what builders and architects say about partnering with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="card-blueprint transition-blueprint hover:shadow-elevated h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>
                <blockquote className="mb-6 italic text-muted-foreground leading-relaxed flex-grow">
                  "Countertop World has been our go-to partner for over 3 years. Their reliability and quality keep our projects on schedule and our clients happy."
                </blockquote>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">Mike Richardson</div>
                  <div className="text-sm text-muted-foreground">Richardson Custom Homes</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-blueprint transition-blueprint hover:shadow-elevated h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>
                <blockquote className="mb-6 italic text-muted-foreground leading-relaxed flex-grow">
                  "Professional service, competitive pricing, and they understand the demands of commercial projects. Countertop World delivers every time."
                </blockquote>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">Sarah Chen</div>
                  <div className="text-sm text-muted-foreground">Chen Architecture Studio</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-blueprint transition-blueprint hover:shadow-elevated h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>
                <blockquote className="mb-6 italic text-muted-foreground leading-relaxed flex-grow">
                  "Fast turnaround, excellent communication, and beautiful results. They've helped us win more bids with their reliable partnerships."
                </blockquote>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">David Martinez</div>
                  <div className="text-sm text-muted-foreground">Martinez Construction</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA & Form Section - Professional Call to Action */}
      <section id="partnership-form" className="section-padding gradient-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-section-title mb-6 font-bold text-foreground">Let's Build Something Great Together</h2>
            <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to partner with Arkansas's most reliable countertop fabricator? 
              Let's discuss how we can help your next project succeed.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <PartnershipForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partnership;