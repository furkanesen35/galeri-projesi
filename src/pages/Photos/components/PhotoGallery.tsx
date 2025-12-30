import { useState } from 'react';

interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  fileName: string;
  size: number;
  uploadedAt: string;
  tags: string[];
}

interface PhotoGalleryProps {
  photos: Photo[];
  loading: boolean;
  onAnnotate: (photo: Photo) => void;
  onOptimize: (photo: Photo) => void;
  onDelete: (photoId: string) => void;
  onAddTag: (photoId: string, tag: string) => void;
  onRemoveTag: (photoId: string, tag: string) => void;
}

export const PhotoGallery = ({
  photos,
  loading,
  onAnnotate,
  onOptimize,
  onDelete,
  onAddTag,
  onRemoveTag,
}: PhotoGalleryProps) => {
  const [newTag, setNewTag] = useState<Record<string, string>>({});
  const [showTagInput, setShowTagInput] = useState<string | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('de-DE', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const handleAddTag = (photoId: string) => {
    const tag = newTag[photoId]?.trim();
    if (tag) {
      onAddTag(photoId, tag);
      setNewTag((prev) => ({ ...prev, [photoId]: '' }));
      setShowTagInput(null);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-surface border border-border rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-lg p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg-secondary flex items-center justify-center">
          <svg
            className="w-8 h-8 text-text-muted"
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
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No photos yet</h3>
        <p className="text-sm text-text-secondary">Upload photos to start documenting damage</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="group relative bg-surface border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-lg transition-all"
        >
          {/* Photo preview */}
          <div className="aspect-square bg-bg-secondary relative overflow-hidden">
            {/* Placeholder since we don't have real images */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <svg
                className="w-16 h-16 text-primary/40"
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
            </div>

            {/* Action overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => onAnnotate(photo)}
                className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                title="Annotate"
              >
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onOptimize(photo)}
                className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                title="Optimize"
              >
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete(photo.id)}
                className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                title="Delete"
              >
                <svg
                  className="w-5 h-5 text-error"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Photo info */}
          <div className="p-3">
            <p className="text-sm font-medium text-foreground truncate mb-1">{photo.fileName}</p>
            <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
              <span>{formatFileSize(photo.size)}</span>
              <span>{formatDate(photo.uploadedAt)}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-2">
              {photo.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
                >
                  {tag}
                  <button
                    onClick={() => onRemoveTag(photo.id, tag)}
                    className="hover:text-error transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
              {showTagInput === photo.id ? (
                <input
                  type="text"
                  value={newTag[photo.id] || ''}
                  onChange={(e) => setNewTag((prev) => ({ ...prev, [photo.id]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddTag(photo.id);
                    if (e.key === 'Escape') setShowTagInput(null);
                  }}
                  onBlur={() => setShowTagInput(null)}
                  autoFocus
                  placeholder="Tag name..."
                  className="px-2 py-0.5 text-xs bg-background border border-primary rounded-full focus:outline-none"
                />
              ) : (
                <button
                  onClick={() => setShowTagInput(photo.id)}
                  className="px-2 py-0.5 bg-surface border border-dashed border-border hover:border-primary text-text-muted hover:text-primary rounded-full text-xs font-medium transition-colors"
                >
                  + Tag
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
