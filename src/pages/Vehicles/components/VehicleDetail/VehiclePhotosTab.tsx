import { useState } from 'react';
import { Vehicle } from '../../../../types/domain';
import { 
  Image, Upload, Trash2, Download, Move, Star, 
  ZoomIn, Grid, Rows, CheckCircle, MoreVertical
} from 'lucide-react';

interface Props {
  vehicle: Vehicle;
}

export const VehiclePhotosTab = ({ vehicle }: Props) => {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const toggleImageSelection = (index: number) => {
    setSelectedImages(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const selectAll = () => {
    if (selectedImages.length === vehicle.images.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(vehicle.images.map((_, i) => i));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Image className="h-5 w-5 text-primary" />
            Fotos ({vehicle.images.length})
          </h3>
          {selectedImages.length > 0 && (
            <span className="text-sm text-text-secondary">
              {selectedImages.length} ausgewählt
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded p-1.5 transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-primary-text' : 'text-text-secondary hover:bg-bg-secondary'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded p-1.5 transition-colors ${
                viewMode === 'list' ? 'bg-primary text-primary-text' : 'text-text-secondary hover:bg-bg-secondary'
              }`}
            >
              <Rows className="h-4 w-4" />
            </button>
          </div>
          
          {/* Select All */}
          <button 
            onClick={selectAll}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground hover:bg-bg-secondary transition-colors"
          >
            <CheckCircle className="h-4 w-4" />
            {selectedImages.length === vehicle.images.length ? 'Auswahl aufheben' : 'Alle auswählen'}
          </button>

          {/* Upload Button */}
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-text hover:bg-primary-hover transition-all">
            <Upload className="h-4 w-4" />
            Fotos hochladen
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedImages.length > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3">
          <span className="text-sm text-foreground font-medium mr-2">
            {selectedImages.length} Foto(s) ausgewählt:
          </span>
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground hover:bg-bg-secondary transition-colors">
            <Download className="h-4 w-4" />
            Herunterladen
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground hover:bg-bg-secondary transition-colors">
            <Move className="h-4 w-4" />
            Reihenfolge ändern
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-sm text-red-500 hover:bg-red-500/20 transition-colors">
            <Trash2 className="h-4 w-4" />
            Löschen
          </button>
        </div>
      )}

      {/* Photo Grid */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
        : 'flex flex-col gap-3'
      }>
        {vehicle.images.map((image, index) => (
          <div 
            key={index}
            className={`group relative rounded-xl border overflow-hidden transition-all cursor-pointer ${
              selectedImages.includes(index) 
                ? 'border-primary ring-2 ring-primary/30' 
                : 'border-border hover:border-primary/50'
            } ${viewMode === 'list' ? 'flex items-center gap-4 p-3 bg-surface' : ''}`}
            onClick={() => toggleImageSelection(index)}
          >
            {viewMode === 'grid' ? (
              <>
                <div className="aspect-video">
                  <img 
                    src={image} 
                    alt={`${vehicle.brand} ${vehicle.model} - Foto ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors">
                  {/* Selection Checkbox */}
                  <div className={`absolute top-2 left-2 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedImages.includes(index)
                      ? 'bg-primary border-primary'
                      : 'border-white bg-black/30 opacity-0 group-hover:opacity-100'
                  }`}>
                    {selectedImages.includes(index) && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                  
                  {/* Main Photo Badge */}
                  {index === 0 && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
                      <Star className="h-3 w-3 fill-current" />
                      Hauptbild
                    </div>
                  )}

                  {/* Actions */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); }}
                      className="rounded-lg bg-white/90 p-2 text-gray-700 hover:bg-white transition-colors"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); }}
                      className="rounded-lg bg-white/90 p-2 text-gray-700 hover:bg-white transition-colors"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="h-20 w-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${vehicle.brand} ${vehicle.model} - Foto ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">Foto {index + 1}</p>
                    {index === 0 && (
                      <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-500">
                        <Star className="h-3 w-3 fill-current" />
                        Hauptbild
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mt-1">800 x 600 px • JPG</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg p-2 text-text-secondary hover:bg-bg-secondary hover:text-foreground transition-colors">
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-2 text-text-secondary hover:bg-bg-secondary hover:text-foreground transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-2 text-text-secondary hover:bg-red-500/10 hover:text-red-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {/* Upload Placeholder */}
        <div className={`rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center ${
          viewMode === 'grid' ? 'aspect-video' : 'p-6'
        }`}>
          <div className="text-center">
            <Upload className="h-8 w-8 text-text-secondary mx-auto mb-2" />
            <p className="text-sm text-text-secondary">Foto hinzufügen</p>
          </div>
        </div>
      </div>
    </div>
  );
};
