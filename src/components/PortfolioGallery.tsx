import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Trash2,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

interface PortfolioGalleryProps {
  images: string[];
  craftsmanName: string;
  editable?: boolean;
  onRemoveImage?: (index: number) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  images,
  craftsmanName,
  editable = false,
  onRemoveImage,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState<1 | 1.6>(1);

  const isOpen = lightboxIndex !== null && images[lightboxIndex] !== undefined;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        setZoomScale(1);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % images.length
        );
        setZoomScale(1);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + images.length) % images.length
        );
        setZoomScale(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length]);

  const openImage = (idx: number) => {
    setLightboxIndex(idx);
    setZoomScale(1);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setZoomScale(1);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
    setZoomScale(1);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    setZoomScale(1);
  };

  if (images.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-[#F8F9FA] p-6 text-center text-slate-500 space-y-2">
        <ImageOff className="w-8 h-8 mx-auto text-slate-400" />
        <p className="text-sm font-medium">لا توجد صور أعمال مضافة حالياً</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((imgSrc, idx) => (
          <div
            key={`${imgSrc.slice(0, 40)}-${idx}`}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
          >
            <button
              type="button"
              onClick={() => openImage(idx)}
              aria-label={`تكبير صورة العمل رقم ${idx + 1} - ${craftsmanName}`}
              className="w-full h-full block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] cursor-zoom-in"
            >
              <img
                src={imgSrc}
                alt={`نموذج عمل ${idx + 1} - ${craftsmanName}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1B365D]/90 text-white rounded-xl px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1.5 shadow-sm">
                  <ZoomIn className="w-4 h-4 text-[#F58220]" />
                  <span>تكبير</span>
                </span>
              </span>
            </button>

            {editable && onRemoveImage && (
              <button
                type="button"
                onClick={() => onRemoveImage(idx)}
                aria-label={`حذف الصورة رقم ${idx + 1}`}
                className="absolute top-2 left-2 z-10 w-8 h-8 rounded-lg bg-black/70 text-white flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Zoom Modal */}
      {isOpen && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`معرض أعمال ${craftsmanName}`}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between gap-4 text-white max-w-5xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-sm sm:text-base truncate">
                {craftsmanName}
              </span>
              <span className="text-xs text-slate-300 tabular-nums">
                {lightboxIndex + 1} / {images.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomScale((z) => (z === 1 ? 1.6 : 1))}
                className="min-h-[44px] px-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                aria-label={zoomScale === 1 ? 'تكبير الصورة' : 'تصغير الصورة'}
              >
                {zoomScale === 1 ? (
                  <>
                    <ZoomIn className="w-4 h-4 text-[#F58220]" />
                    <span>تكبير</span>
                  </>
                ) : (
                  <>
                    <ZoomOut className="w-4 h-4 text-[#F58220]" />
                    <span>الحجم الأصلي</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={closeLightbox}
                className="min-h-[44px] min-w-[44px] rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="إغلاق المعرض"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image Viewport */}
          <div
            className="relative flex-1 flex items-center justify-center max-w-5xl w-full mx-auto my-4 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="الصورة السابقة"
                className="absolute right-2 sm:right-4 z-10 min-h-[48px] min-w-[48px] rounded-full bg-[#1B365D]/85 hover:bg-[#F58220] text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <div className="max-h-[72vh] max-w-full overflow-auto rounded-2xl flex items-center justify-center">
              <img
                src={images[lightboxIndex]}
                alt={`نموذج عمل مكبر ${lightboxIndex + 1} - ${craftsmanName}`}
                referrerPolicy="no-referrer"
                onClick={() => setZoomScale((z) => (z === 1 ? 1.6 : 1))}
                style={{ transform: `scale(${zoomScale})` }}
                className={`max-h-[70vh] w-auto object-contain rounded-xl transition-transform duration-200 origin-center ${
                  zoomScale === 1 ? 'cursor-zoom-in' : 'cursor-zoom-out'
                }`}
              />
            </div>

            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                aria-label="الصورة التالية"
                className="absolute left-2 sm:left-4 z-10 min-h-[48px] min-w-[48px] rounded-full bg-[#1B365D]/85 hover:bg-[#F58220] text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          {images.length > 1 && (
            <div
              className="flex items-center justify-center gap-2.5 overflow-x-auto py-1 max-w-5xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((thumb, idx) => (
                <button
                  key={`${thumb.slice(0, 30)}-thumb-${idx}`}
                  type="button"
                  onClick={() => {
                    setLightboxIndex(idx);
                    setZoomScale(1);
                  }}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    idx === lightboxIndex
                      ? 'border-[#F58220] opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`مصغرة ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
