import { useState } from 'react';
import { HeroSection } from './Marketing/components/HeroSection';
import { TrustLogos } from './Marketing/components/TrustLogos';
import { HotspotExplainer } from './Marketing/components/HotspotExplainer';
import { TestimonialsCarousel } from './Marketing/components/TestimonialsCarousel';
import { WebinarsStrip } from './Marketing/components/WebinarsStrip';
import { Footer } from './Marketing/components/Footer';
import { CookieBanner } from './Marketing/components/CookieBanner';
import { VideoModal } from './Marketing/components/VideoModal';

export const Marketing = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  // Initialize state based on localStorage (no effect needed)
  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    return !cookieConsent;
  });

  const handleCookieConsent = (accepted: boolean) => {
    localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
    setShowCookieBanner(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onWatchDemo={() => setShowVideoModal(true)} />
      <TrustLogos />
      <HotspotExplainer />
      <WebinarsStrip />
      <TestimonialsCarousel />
      <Footer />

      {showCookieBanner && (
        <CookieBanner
          onAccept={() => handleCookieConsent(true)}
          onDecline={() => handleCookieConsent(false)}
        />
      )}

      {showVideoModal && (
        <VideoModal
          videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
          onClose={() => setShowVideoModal(false)}
        />
      )}
    </div>
  );
};
