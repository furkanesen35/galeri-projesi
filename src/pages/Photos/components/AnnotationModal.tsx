import { useState } from 'react';

interface Photo {
  id: string;
  fileName: string;
  url: string;
}

interface Annotation {
  id: string;
  type: 'arrow' | 'circle' | 'text';
  x: number;
  y: number;
  text?: string;
}

interface AnnotationModalProps {
  photo: Photo;
  onClose: () => void;
  onSave: (annotations: Annotation[]) => void;
}

export const AnnotationModal = ({ photo, onClose, onSave }: AnnotationModalProps) => {
  const [tool, setTool] = useState<'arrow' | 'circle' | 'text'>('arrow');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const handleSave = () => {
    onSave(annotations);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-6xl bg-surface rounded-xl shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border bg-bg-secondary flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Annotate Photo</h2>
            <p className="text-sm text-text-secondary">{photo.fileName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-foreground transition-colors"
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
        </div>

        {/* Toolbar */}
        <div className="px-6 py-3 border-b border-border bg-bg-secondary flex items-center gap-2">
          <span className="text-sm text-text-secondary mr-2">Tools:</span>
          <button
            onClick={() => setTool('arrow')}
            className={`p-2 rounded-lg transition-colors ${
              tool === 'arrow'
                ? 'bg-primary text-primary-text'
                : 'bg-surface text-foreground hover:bg-surface-hover'
            }`}
            title="Arrow"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
          <button
            onClick={() => setTool('circle')}
            className={`p-2 rounded-lg transition-colors ${
              tool === 'circle'
                ? 'bg-primary text-primary-text'
                : 'bg-surface text-foreground hover:bg-surface-hover'
            }`}
            title="Circle"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="9" strokeWidth={2} />
            </svg>
          </button>
          <button
            onClick={() => setTool('text')}
            className={`p-2 rounded-lg transition-colors ${
              tool === 'text'
                ? 'bg-primary text-primary-text'
                : 'bg-surface text-foreground hover:bg-surface-hover'
            }`}
            title="Text"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <div className="w-px h-6 bg-border mx-2"></div>

          <button
            onClick={() => setAnnotations([])}
            className="p-2 rounded-lg text-error hover:bg-error/10 transition-colors"
            title="Clear all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        {/* Canvas area */}
        <div className="flex-1 p-6 bg-bg-tertiary overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border-2 border-border flex items-center justify-center">
              {/* Photo placeholder */}
              <div className="text-center">
                <svg
                  className="w-20 h-20 mx-auto text-primary/40 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-text-secondary">
                  {tool === 'arrow' && 'Click and drag to draw an arrow'}
                  {tool === 'circle' && 'Click and drag to draw a circle'}
                  {tool === 'text' && 'Click to add text annotation'}
                </p>
              </div>

              {/* Annotations overlay (POC - simplified) */}
              {annotations.length > 0 && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 bg-error/80 text-white px-2 py-1 rounded text-sm">
                    {annotations.length} annotation{annotations.length !== 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-4 p-4 bg-surface border border-border rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Instructions</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Use arrow tool to point out specific damage areas</li>
                <li>• Use circle tool to highlight larger damage regions</li>
                <li>• Use text tool to add detailed notes and descriptions</li>
                <li>• Annotations will be saved with the photo for future reference</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-bg-secondary flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-foreground hover:bg-surface rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-primary-text rounded-lg font-semibold hover:bg-primary-hover transition-colors"
          >
            Save Annotations
          </button>
        </div>
      </div>
    </div>
  );
};
