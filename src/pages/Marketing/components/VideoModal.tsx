import { useEffect } from 'react';

interface VideoModalProps {
  videoUrl: string;
  onClose: () => void;
}

export const VideoModal = ({ videoUrl, onClose }: VideoModalProps) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Close on Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal content */}
      <div className="relative w-full max-w-4xl bg-surface rounded-xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          aria-label="Close video"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Video embed */}
        <div className="aspect-video">
          <iframe
            src={videoUrl}
            title="Demo Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video info */}
        <div className="p-4 bg-bg-secondary border-t border-border">
          <h3 className="font-semibold text-foreground">Product Demo</h3>
          <p className="text-sm text-text-secondary mt-1">
            See how autoiXpert transforms your damage assessment workflow
          </p>
        </div>
      </div>
    </div>
  );
};
