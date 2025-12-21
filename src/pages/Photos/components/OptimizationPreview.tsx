import { useState, useEffect } from 'react';
import { mockApi } from '../../../services/mockApi';

interface Photo {
  id: string;
  fileName: string;
  size: number;
}

interface OptimizationPreviewProps {
  photo: Photo;
  onClose: () => void;
}

export const OptimizationPreview = ({ photo, onClose }: OptimizationPreviewProps) => {
  const [optimizing, setOptimizing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [autoOptimizeEnabled, setAutoOptimizeEnabled] = useState(true);

  useEffect(() => {
    handleOptimize();
  }, []);

  const handleOptimize = async () => {
    setOptimizing(true);
    const response = await mockApi.photos.optimizePhoto(photo.id);
    setResult(response.data);
    setOptimizing(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const savingsPercentage = result
    ? ((result.originalSize - result.optimizedSize) / result.originalSize * 100).toFixed(0)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-surface rounded-xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border bg-bg-secondary flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Photo Optimization</h2>
            <p className="text-sm text-text-secondary">{photo.fileName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-foreground transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {optimizing ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-lg font-semibold text-foreground mb-2">Optimizing photo...</p>
              <p className="text-sm text-text-secondary">This may take a few seconds</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Comparison */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-bg-secondary rounded-lg p-4 border border-border">
                  <div className="aspect-video bg-gradient-to-br from-error/20 to-error/5 rounded-lg border-2 border-dashed border-border flex items-center justify-center mb-3">
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto text-error/40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs text-text-secondary">Original</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">File Size:</span>
                      <span className="text-foreground font-medium">{formatFileSize(result.originalSize)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Dimensions:</span>
                      <span className="text-foreground font-medium">{result.dimensions.width}×{result.dimensions.height}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-bg-secondary rounded-lg p-4 border-2 border-success">
                  <div className="aspect-video bg-gradient-to-br from-success/20 to-success/5 rounded-lg border-2 border-dashed border-success/30 flex items-center justify-center mb-3">
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto text-success/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-success font-medium">Optimized</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">File Size:</span>
                      <span className="text-success font-medium">{formatFileSize(result.optimizedSize)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Dimensions:</span>
                      <span className="text-foreground font-medium">{result.dimensions.width}×{result.dimensions.height}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-success">{savingsPercentage}% smaller</p>
                    <p className="text-sm text-text-secondary">
                      Saved {formatFileSize(result.originalSize - result.optimizedSize)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Compression:</span>
                    <span className="ml-2 text-foreground font-medium">
                      {(result.compressionRatio * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Quality:</span>
                    <span className="ml-2 text-success font-medium">High</span>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="bg-bg-secondary rounded-lg p-4 border border-border">
                <h4 className="font-semibold text-foreground mb-3">Optimization Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="text-sm font-medium text-foreground">Auto-optimize on upload</p>
                      <p className="text-xs text-text-secondary">Automatically optimize all uploaded photos</p>
                    </div>
                    <div className={`relative w-11 h-6 rounded-full transition-colors ${autoOptimizeEnabled ? 'bg-primary' : 'bg-border'}`}>
                      <input
                        type="checkbox"
                        checked={autoOptimizeEnabled}
                        onChange={(e) => setAutoOptimizeEnabled(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${autoOptimizeEnabled ? 'translate-x-5' : ''}`}></div>
                    </div>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Max Dimension
                    </label>
                    <select className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground text-sm">
                      <option value="1920">1920px (Recommended)</option>
                      <option value="2560">2560px (High Quality)</option>
                      <option value="3840">3840px (4K)</option>
                      <option value="original">Original (No Resize)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-bg-secondary flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-foreground hover:bg-surface rounded-lg font-medium transition-colors"
          >
            Close
          </button>
          {result && (
            <button
              onClick={onClose}
              className="px-6 py-2 bg-success text-white rounded-lg font-semibold hover:bg-success/90 transition-colors"
            >
              Apply Optimization
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
