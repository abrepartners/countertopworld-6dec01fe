import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-section">
      <div className="text-center container-custom">
        <div className="max-w-md mx-auto">
          <AlertCircle className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-section-title mb-4">Page Not Found</h1>
          <p className="text-subtitle text-muted-foreground mb-8">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
