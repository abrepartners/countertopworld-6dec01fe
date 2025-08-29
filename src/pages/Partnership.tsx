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
      {/* Hero Section */}
      <section className="relative gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative container-custom section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-hero mb-6">
              Your Countertop Partner in Arkansas
            </h1>
            <p className="text-subtitle mb-8 opacity-95">
              Fast, Reliable, and Ready for Your Next Project. From one-off designs to high-volume contracts, 
              Countertop World helps you close projects on time and on budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-button transition-bounce text-lg px-8 py-4"
              >
                Request Partnership Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <SupplierPacketDownload />
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="section-padding gradient-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-section-title mb-4">Partnership. Not Problems.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-card transition-smooth hover:shadow-elevated">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-8 w-8 text-accent mr-3" />
                  <h3 className="text-xl font-semibold">No More Missed Deadlines</h3>
                </div>
                <p className="text-muted-foreground">
                  <strong>Problem:</strong> Tired of missed deadlines and budget overruns?<br/>
                  <strong>Solution:</strong> We are a streamlined, professional fabricator that gets the job done right, on time.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card transition-smooth hover:shadow-elevated">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-8 w-8 text-accent mr-3" />
                  <h3 className="text-xl font-semibold">Consistent Quality</h3>
                </div>
                <p className="text-muted-foreground">
                  <strong>Problem:</strong> Dealing with inconsistent quality?<br/>
                  <strong>Solution:</strong> Our state-of-the-art facility ensures every cut is perfect, every time.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card transition-smooth hover:shadow-elevated">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-8 w-8 text-accent mr-3" />
                  <h3 className="text-xl font-semibold">Commercial Expertise</h3>
                </div>
                <p className="text-muted-foreground">
                  <strong>Problem:</strong> Looking for a partner that understands commercial contracts?<br/>
                  <strong>Solution:</strong> We have the capacity and expertise to handle projects of any size.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Partner with Us Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-section-title mb-4">Why Partner with Countertop World?</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expertise</h3>
              <p className="text-muted-foreground">More than a fabricator; a trusted partner with decades of experience in commercial and residential projects.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Speed & Scale</h3>
              <p className="text-muted-foreground">Two locations serving a 150-mile radius for rapid, reliable service when you need it most.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Exclusive Products</h3>
              <p className="text-muted-foreground">Exclusive access to materials like the beautiful and durable Tashmaja Hall Quartz that your clients will love.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="section-padding gradient-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-section-title mb-4">What Our Partners Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="mb-4 italic">"Countertop World has been our go-to partner for over 3 years. Their reliability and quality keep our projects on schedule and our clients happy."</p>
                <div className="font-semibold">Mike Richardson</div>
                <div className="text-sm text-muted-foreground">Richardson Custom Homes</div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="mb-4 italic">"Professional service, competitive pricing, and they understand the demands of commercial projects. Countertop World delivers every time."</p>
                <div className="font-semibold">Sarah Chen</div>
                <div className="text-sm text-muted-foreground">Chen Architecture Studio</div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="mb-4 italic">"Fast turnaround, excellent communication, and beautiful results. They've helped us win more bids with their reliable partnerships."</p>
                <div className="font-semibold">David Martinez</div>
                <div className="text-sm text-muted-foreground">Martinez Construction</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA & Form Section */}
      <section id="partnership-form" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-section-title mb-4">Let's Build Something Great Together</h2>
            <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
              Ready to partner with Arkansas's most reliable countertop fabricator? 
              Let's discuss how we can help your next project succeed.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <PartnershipForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partnership;