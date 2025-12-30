import { useState } from 'react';
import { Vehicle } from '../../../../types/domain';
import {
  Upload,
  Trash2,
  Download,
  Move,
  Star,
  ZoomIn,
  Grid,
  Rows,
  CheckCircle,
  MoreVertical,
  Camera,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface Props {
  vehicle: Vehicle;
}

type PhotoCategory = 'before' | 'after';

interface PhotoData {
  id: string;
  url: string;
  category: PhotoCategory;
  uploadedAt: string;
  description?: string;
}

export const VehiclePhotosTab = ({ vehicle }: Props) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Create mock photo data from vehicle images, split between before/after
  const allPhotos: PhotoData[] = vehicle.images.map((url, index) => ({
    id: `photo-${index}`,
    url,
    category: index < Math.ceil(vehicle.images.length / 2) ? 'before' : 'after',
    uploadedAt: new Date(Date.now() - index * 86400000).toISOString(),
    description: index === 0 ? 'Hauptbild' : undefined,
  }));

  const beforePhotos = allPhotos.filter((p) => p.category === 'before');
  const afterPhotos = allPhotos.filter((p) => p.category === 'after');

  const toggleImageSelection = (id: string) => {
    setSelectedImages((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const currentSelectedCount = selectedImages.length;

  const PhotoCard = ({
    photo,
    index,
    category,
  }: {
    photo: PhotoData;
    index: number;
    category: PhotoCategory;
  }) => (
    <div
      className={`group relative rounded-xl border overflow-hidden transition-all cursor-pointer ${
        selectedImages.includes(photo.id)
          ? 'border-primary ring-2 ring-primary/30'
          : 'border-border hover:border-primary/50'
      }`}
      onClick={() => toggleImageSelection(photo.id)}
    >
      <div className="aspect-video">
        <img
          src={photo.url}
          alt={`${vehicle.brand} ${vehicle.model} - ${category === 'before' ? 'Vorher' : 'Nachher'} ${index + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors">
        {/* Selection Checkbox */}
        <div
          className={`absolute top-2 left-2 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
            selectedImages.includes(photo.id)
              ? 'bg-primary border-primary'
              : 'border-white bg-black/30 opacity-0 group-hover:opacity-100'
          }`}
        >
          {selectedImages.includes(photo.id) && <CheckCircle className="h-4 w-4 text-white" />}
        </div>

        {/* Main Photo Badge */}
        {index === 0 && category === 'before' && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
            <Star className="h-3 w-3 fill-current" />
            Hauptbild
          </div>
        )}

        {/* Actions */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="rounded-lg bg-white/90 p-2 text-gray-700 hover:bg-white transition-colors"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="rounded-lg bg-white/90 p-2 text-gray-700 hover:bg-white transition-colors"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const PhotoColumn = ({
    photos,
    category,
    title,
    icon: Icon,
    color,
    bgColor,
  }: {
    photos: PhotoData[];
    category: PhotoCategory;
    title: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
  }) => (
    <div className="flex-1 min-w-0">
      {/* Column Header */}
      <div className={`rounded-t-xl border border-b-0 border-border p-4 ${bgColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 bg-white/50`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <div>
              <h4 className={`font-semibold ${color}`}>{title}</h4>
              <p className="text-sm text-text-secondary">{photos.length} Fotos</p>
            </div>
          </div>
          <button
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              category === 'before'
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            <Upload className="h-4 w-4" />
            Hochladen
          </button>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="rounded-b-xl border border-border bg-surface p-4 min-h-[400px]">
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[350px] border-2 border-dashed border-border rounded-lg">
            <div className={`rounded-full p-4 mb-4 ${bgColor}`}>
              <Icon className={`h-8 w-8 ${color}`} />
            </div>
            <h5 className="font-medium text-foreground">Keine {title}-Fotos</h5>
            <p className="text-sm text-text-secondary mt-1 text-center max-w-[200px]">
              {category === 'before'
                ? 'Dokumentieren Sie den Ankaufszustand'
                : 'Zeigen Sie das aufbereitete Fahrzeug'}
            </p>
            <button
              className={`mt-4 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
                category === 'before'
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              <Upload className="h-4 w-4" />
              Fotos hochladen
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {photos.map((photo, index) => (
              <PhotoCard key={photo.id} photo={photo} index={index} category={category} />
            ))}
            {/* Upload Placeholder */}
            <div className="aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center">
              <div className="text-center">
                <Upload className="h-6 w-6 text-text-secondary mx-auto mb-1" />
                <p className="text-xs text-text-secondary">Hinzufügen</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header with View Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">Fahrzeugfotos</h3>
          <span className="text-sm text-text-secondary">{allPhotos.length} Fotos insgesamt</span>
        </div>
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded p-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary text-primary-text'
                  : 'text-text-secondary hover:bg-bg-secondary'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded p-1.5 transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary text-primary-text'
                  : 'text-text-secondary hover:bg-bg-secondary'
              }`}
            >
              <Rows className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {currentSelectedCount > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3">
          <span className="text-sm text-foreground font-medium mr-2">
            {currentSelectedCount} Foto(s) ausgewählt:
          </span>
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground hover:bg-bg-secondary transition-colors">
            <Download className="h-4 w-4" />
            Herunterladen
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground hover:bg-bg-secondary transition-colors">
            <Move className="h-4 w-4" />
            Verschieben
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-sm text-red-500 hover:bg-red-500/20 transition-colors">
            <Trash2 className="h-4 w-4" />
            Löschen
          </button>
          <button
            onClick={() => setSelectedImages([])}
            className="ml-auto text-sm text-text-secondary hover:text-foreground"
          >
            Auswahl aufheben
          </button>
        </div>
      )}

      {/* Side by Side Layout: Vorher (Left) | Nachher (Right) */}
      <div className="flex gap-6">
        {/* VORHER - Left Column */}
        <PhotoColumn
          photos={beforePhotos}
          category="before"
          title="Vorher (Ankauf)"
          icon={Camera}
          color="text-amber-600"
          bgColor="bg-amber-500/10"
        />

        {/* Arrow Indicator */}
        <div className="flex-shrink-0 flex items-center">
          <div className="rounded-full bg-bg-secondary p-3 border border-border">
            <ArrowRight className="h-6 w-6 text-text-secondary" />
          </div>
        </div>

        {/* NACHHER - Right Column */}
        <PhotoColumn
          photos={afterPhotos}
          category="after"
          title="Nachher (Verkauf)"
          icon={Sparkles}
          color="text-green-600"
          bgColor="bg-green-500/10"
        />
      </div>

      {/* Summary Footer */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="text-sm text-text-secondary">
              Vorher: <strong className="text-foreground">{beforePhotos.length}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-sm text-text-secondary">
              Nachher: <strong className="text-foreground">{afterPhotos.length}</strong>
            </span>
          </div>
        </div>
        <div className="text-sm text-text-secondary">
          Zuletzt aktualisiert: {new Date().toLocaleDateString('de-DE')}
        </div>
      </div>
    </div>
  );
};
