import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Download, Mail } from "lucide-react";

const SupplierPacketDownload = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to download the supplier packet.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call for lead capture and PDF generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Download started!",
        description: "Check your email for the supplier packet PDF.",
      });
      
      // In a real implementation, this would trigger the PDF download
      // window.open('/path-to-supplier-packet.pdf', '_blank');
      
      setEmail("");
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="lg"
          className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth shadow-button"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Our Supplier Packet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Download Supplier Packet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleDownload} className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Enter your email to receive our comprehensive supplier packet with pricing, capabilities, and partnership details.
          </p>
          <div className="space-y-2">
            <Label htmlFor="download-email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="download-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 transition-smooth focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? "Processing..." : "Download Now"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierPacketDownload;