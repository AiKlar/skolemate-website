import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm sm:text-base leading-relaxed">
            Denne hjemmeside bruger cookies for at sikre dig den bedste oplevelse. Ved at fortsætte med at bruge dette site, accepterer du vores brug af cookies.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            onClick={handleDecline}
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900 transition-colors duration-300"
          >
            Afslå
          </Button>
          <Button
            onClick={handleAccept}
            className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300"
          >
            Accepter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;