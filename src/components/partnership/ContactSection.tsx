import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, MapPin, Clock, Zap } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    projectType: "",
    squareFootage: "",
    timeline: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Submitted",
      description: "We'll contact you within 2 hours during business hours.",
    });
    setFormData({
      name: "",
      company: "",
      phone: "",
      email: "",
      projectType: "",
      squareFootage: "",
      timeline: "",
      message: ""
    });
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact-form" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-section-title mb-6 font-bold text-foreground">
            Get Your Project Quote
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
            Professional fabrication and installation services for Arkansas builders and contractors
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="card-blueprint">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Phone className="h-6 w-6 text-primary mr-3" />
                  <div>
                    <h3 className="font-bold text-foreground">Main Line</h3>
                    <a href="tel:501-847-2000" className="text-2xl font-bold text-primary hover:underline">
                      (501) 847-2000
                    </a>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Zap className="h-6 w-6 text-accent mr-3" />
                  <div>
                    <h3 className="font-bold text-foreground">Emergency/Rush Line</h3>
                    <a href="tel:501-847-2001" className="text-xl font-bold text-accent hover:underline">
                      (501) 847-2001
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-blueprint">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <MapPin className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Bryant Location</h3>
                    <p className="text-muted-foreground mb-2">
                      123 Main Street<br />
                      Bryant, AR 72022
                    </p>
                    <a href="#" className="text-accent hover:underline text-sm">
                      Get Directions →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-blueprint">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-primary mr-3" />
                  <div>
                    <h3 className="font-bold text-foreground">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 7:00 AM - 6:00 PM<br />
                      Saturday: 8:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quote Form */}
          <Card className="card-blueprint">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectType">Project Type *</Label>
                    <Select value={formData.projectType} onValueChange={(value) => handleChange("projectType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential-new">New Home Construction</SelectItem>
                        <SelectItem value="residential-remodel">Home Remodel</SelectItem>
                        <SelectItem value="commercial-new">Commercial New Build</SelectItem>
                        <SelectItem value="commercial-tenant">Tenant Improvement</SelectItem>
                        <SelectItem value="multifamily">Multi-family Housing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="squareFootage">Estimated Square Footage</Label>
                    <Input
                      id="squareFootage"
                      placeholder="e.g., 45 sq ft"
                      value={formData.squareFootage}
                      onChange={(e) => handleChange("squareFootage", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="timeline">Project Timeline</Label>
                  <Select value={formData.timeline} onValueChange={(value) => handleChange("timeline", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="When do you need installation?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP/Rush Order</SelectItem>
                      <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                      <SelectItem value="3-4weeks">3-4 weeks</SelectItem>
                      <SelectItem value="1-2months">1-2 months</SelectItem>
                      <SelectItem value="planning">Still in planning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Project Details (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Any specific requirements, materials preferences, or questions..."
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full cta-primary text-lg py-3">
                  Get Quote Within 2 Hours
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  * Response time applies during business hours. Rush orders and emergency calls answered 24/7.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;