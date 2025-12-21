import { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { mockApi } from '../services/mockApi';
import { PhotoGallery } from './Photos/components/PhotoGallery';
import { PhotoUpload } from './Photos/components/PhotoUpload';
import { AnnotationModal } from './Photos/components/AnnotationModal';
import { OptimizationPreview } from './Photos/components/OptimizationPreview';

interface Photo {
  id: string;
  caseId: string;
  url: string;
  thumbnail: string;
  fileName: string;
  size: number;
  uploadedAt: string;
  tags: string[];
  annotations?: any[];
}

export const Photos = () => {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [showOptimization, setShowOptimization] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [filterTag, setFilterTag] = useState<string>('all');

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    setLoading(true);
    const response = await mockApi.photos.getPhotos();
    setPhotos(response.data);
    setLoading(false);
  };

  const handleUpload = async (files: FileList) => {
    const fileArray = Array.from(files);
    
    for (const file of fileArray) {
      const fileId = `upload-${Date.now()}-${Math.random()}`;
      
      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const current = prev[fileId] || 0;
          if (current >= 100) {
            clearInterval(progressInterval);
            return prev;
          }
          return { ...prev, [fileId]: Math.min(current + 20, 100) };
        });
      }, 300);

      // Mock upload
      const response = await mockApi.photos.uploadPhoto(file, 'CASE-2024-001');
      
      clearInterval(progressInterval);
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileId];
        return newProgress;
      });
      
      setPhotos(prev => [response.data, ...prev]);
    }
  };

  const handleAnnotate = (photo: Photo) => {
    setSelectedPhoto(photo);
    setShowAnnotation(true);
  };

  const handleOptimize = (photo: Photo) => {
    setSelectedPhoto(photo);
    setShowOptimization(true);
  };

  const handleDeletePhoto = async (photoId: string) => {
    await mockApi.photos.deletePhoto(photoId);
    setPhotos(photos.filter(p => p.id !== photoId));
  };

  const handleAddTag = (photoId: string, tag: string) => {
    setPhotos(photos.map(p => 
      p.id === photoId 
        ? { ...p, tags: [...p.tags, tag] }
        : p
    ));
  };

  const handleRemoveTag = (photoId: string, tag: string) => {
    setPhotos(photos.map(p => 
      p.id === photoId 
        ? { ...p, tags: p.tags.filter(t => t !== tag) }
        : p
    ));
  };

  const allTags = Array.from(new Set(photos.flatMap(p => p.tags)));
  const filteredPhotos = filterTag === 'all' 
    ? photos 
    : photos.filter(p => p.tags.includes(filterTag));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('photos.title')}</h1>
          <p className="text-sm text-text-secondary mt-1">
            {t('photos.subtitle')}
          </p>
        </div>
      </div>

      {/* Upload area */}
      <PhotoUpload 
        onUpload={handleUpload}
        uploadProgress={uploadProgress}
      />

      {/* Tags filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-text-secondary">{t('photos.filterByTag')}</span>
        <button
          onClick={() => setFilterTag('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filterTag === 'all'
              ? 'bg-primary text-primary-text'
              : 'bg-surface border border-border text-foreground hover:border-primary'
          }`}
        >
          {t('photos.all')} ({photos.length})
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filterTag === tag
                ? 'bg-primary text-primary-text'
                : 'bg-surface border border-border text-foreground hover:border-primary'
            }`}
          >
            {tag} ({photos.filter(p => p.tags.includes(tag)).length})
          </button>
        ))}
      </div>

      {/* Photo gallery */}
      <PhotoGallery
        photos={filteredPhotos}
        loading={loading}
        onAnnotate={handleAnnotate}
        onOptimize={handleOptimize}
        onDelete={handleDeletePhoto}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
      />

      {/* Modals */}
      {showAnnotation && selectedPhoto && (
        <AnnotationModal
          photo={selectedPhoto}
          onClose={() => setShowAnnotation(false)}
          onSave={(annotations) => {
            setPhotos(photos.map(p =>
              p.id === selectedPhoto.id
                ? { ...p, annotations }
                : p
            ));
            setShowAnnotation(false);
          }}
        />
      )}

      {showOptimization && selectedPhoto && (
        <OptimizationPreview
          photo={selectedPhoto}
          onClose={() => setShowOptimization(false)}
        />
      )}
    </div>
  );
};
