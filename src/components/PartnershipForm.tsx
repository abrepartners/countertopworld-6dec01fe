import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Building, MessageSquare } from "lucide-react";

interface FormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  profession: string;
  message: string;
}

const PartnershipForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    profession: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.fullName || !formData.companyName || !formData.email || !formData.profession) {
      toast({
        title: "Please fill in all required fields",
        description: "Full name, company name, email, and profession are required.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission (integrate with HubSpot API here)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Request submitted successfully!",
        description: "A partnership specialist will contact you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        fullName: "",
        companyName: "",
        phone: "",
        email: "",
        profession: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-elevated card-blueprint">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-section-title font-bold text-foreground mb-4">Request a Partnership Consultation</CardTitle>
        <p className="text-muted-foreground leading-relaxed">Fill out the form below and a partnership specialist will contact you within 24 hours.</p>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                required
                className="transition-smooth focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  required
                  className="pl-10 transition-smooth focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-10 transition-smooth focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="pl-10 transition-smooth focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profession">Profession *</Label>
            <Select onValueChange={(value) => handleInputChange("profession", value)} required>
              <SelectTrigger className="transition-smooth focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Select your profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="builder">Builder</SelectItem>
                <SelectItem value="architect">Architect</SelectItem>
                <SelectItem value="millworker">Millworker</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message / Project Details</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={4}
                className="pl-10 transition-smooth focus:ring-2 focus:ring-primary"
                placeholder="Tell us about your project or partnership needs..."
              />
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            disabled={isSubmitting}
            className="w-full cta-secondary text-lg py-4 font-semibold rounded-lg"
          >
            {isSubmitting ? "Submitting..." : "Request Partnership Consultation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PartnershipForm;