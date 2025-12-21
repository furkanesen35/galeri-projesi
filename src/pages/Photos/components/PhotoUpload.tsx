interface PhotoUploadProps {
  onUpload: (files: FileList) => void;
  uploadProgress: Record<string, number>;
}

export const PhotoUpload = ({ onUpload, uploadProgress }: PhotoUploadProps) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      onUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const hasActiveUploads = Object.keys(uploadProgress).length > 0;

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="rounded-xl border-2 border-dashed border-border bg-bg-secondary p-8 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
      >
        <label className="cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-foreground mb-2">
              Drop photos here or click to browse
            </p>
            <p className="text-sm text-text-secondary">
              Supports JPG, PNG, HEIC • Max 50MB per file
            </p>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && onUpload(e.target.files)}
          />
        </label>
      </div>

      {/* Upload progress */}
      {hasActiveUploads && (
        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Uploading...</h4>
          {Object.entries(uploadProgress).map(([id, progress]) => (
            <div key={id} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">File {id.slice(-8)}</span>
                <span className="text-text-secondary">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
