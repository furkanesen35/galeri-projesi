interface CookieBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const CookieBanner = ({ onAccept, onDecline }: CookieBannerProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-surface border-t border-border shadow-xl backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-foreground mb-1 font-semibold">
                We use cookies
              </p>
              <p className="text-xs text-text-secondary">
                We use cookies to improve your experience and analyze site traffic. 
                By clicking "Accept", you consent to our use of cookies.{' '}
                <a href="#" className="text-primary hover:underline">Learn more</a>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onDecline}
                className="px-4 py-2 text-sm border border-border text-foreground rounded-md hover:border-primary transition-colors"
              >
                Decline
              </button>
              <button
                onClick={onAccept}
                className="px-4 py-2 text-sm bg-primary text-primary-text rounded-md hover:bg-primary-hover transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
