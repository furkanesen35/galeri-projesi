import { useCallback, useState } from 'react';

type Photo = { id: string; name: string; size: number };

export const Photos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const next: Photo[] = Array.from(files).map((file) => ({ id: crypto.randomUUID(), name: file.name, size: file.size }));
    setPhotos((prev) => [...prev, ...next]);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Photos</h3>
          <p className="text-sm text-text-secondary">Upload, reorder, and manage gallery assets.</p>
        </div>
        <label className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-text shadow hover:bg-primary-hover cursor-pointer">
          Upload
          <input type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        </label>
      </div>
      <div className="rounded-2xl border border-dashed border-border bg-bg-secondary p-6 text-center text-text-muted">
        Drag & drop files here or use the upload button.
      </div>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {photos.map((photo) => (
          <div key={photo.id} className="rounded-xl border border-border bg-surface p-3 text-sm text-foreground">
            <p className="font-semibold text-foreground">{photo.name}</p>
            <p className="text-xs text-text-secondary">{(photo.size / 1024).toFixed(1)} KB</p>
          </div>
        ))}
      </div>
    </div>
  );
};
