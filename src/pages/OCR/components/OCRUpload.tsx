interface OCRUploadProps {
  onUpload: (file: File) => void;
  processing: boolean;
}

export const OCRUpload = ({ onUpload, processing }: OCRUploadProps) => {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (processing) {
    return (
      <div className="bg-surface border border-border rounded-xl p-12">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Processing Document...</h3>
          <p className="text-sm text-text-secondary mb-4">
            Our AI is analyzing the Fahrzeugschein and extracting vehicle information
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Scanning document...</span>
              <span className="text-success">✓</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Extracting text...</span>
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Validating fields...</span>
              <span className="text-text-muted">⏳</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="bg-surface border-2 border-dashed border-border rounded-xl p-12 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
    >
      <label className="cursor-pointer block">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Upload Fahrzeugschein</h3>
          <p className="text-sm text-text-secondary mb-6 max-w-md text-center">
            Drop your vehicle registration document here or click to browse.
            <br />
            Supports JPG, PNG, PDF • Max 10MB
          </p>
          <div className="flex items-center gap-4">
            <span className="px-6 py-3 bg-primary text-primary-text rounded-lg font-semibold hover:bg-primary-hover transition-colors">
              Choose File
            </span>
            <span className="text-sm text-text-muted">or drag and drop</span>
          </div>
        </div>
        <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileSelect} />
      </label>
    </div>
  );
};
