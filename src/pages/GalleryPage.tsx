import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/hospitalData';
import { HospitalImage } from '../components/HospitalImage';

const GALLERY_CATEGORIES = [
  'All',
  'Infrastructure',
  'Clinical & NICU',
  'Medical Team',
  'Events & Recognition',
] as const;

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleItems = GALLERY_ITEMS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const activeItem: GalleryItem | null =
    activeIndex !== null && visibleItems[activeIndex] ? visibleItems[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev - 1 + visibleItems.length) % visibleItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, visibleItems.length]);

  return (
    <div>
      <section className="bg-gradient-to-br from-[#F4F8FE] to-[#E6F0FC] border-b border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-blue-700">Hospital Gallery</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Infrastructure, Medical Team &amp; Clinical Facilities
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            Authentic photographs of Aradhya And Matulya Child Care Hospital in Deoria—our
            building facade, NICU &amp; PICU units, surgical team, and consultation rooms.
          </p>

          <div className="mt-8 inline-flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200">
            {GALLERY_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveIndex(null);
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-700 text-white'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleItems.map((item, idx) => (
              <figure
                key={item.id}
                className="rounded-xl border border-slate-200 overflow-hidden bg-white flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Inspect photo: ${item.title}`}
                  className="aspect-[4/3] bg-slate-100 overflow-hidden block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <HospitalImage
                    src={item.image}
                    alt={item.title}
                    focusClass={item.imageFocus}
                    className="hover:scale-[1.02] transition-transform duration-200"
                  />
                </button>
                <figcaption className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-medium text-blue-700">{item.category}</div>
                    <h2 className="mt-1 text-base font-bold text-slate-950">{item.title}</h2>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{item.caption}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeItem && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-medium text-blue-700">{activeItem.category}</div>
                <h3 className="text-base font-bold text-slate-950">{activeItem.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close photo preview"
                className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-slate-900 aspect-[16/10] max-h-[65vh] w-full overflow-hidden">
              <HospitalImage
                src={activeItem.image}
                alt={activeItem.title}
                focusClass={activeItem.imageFocus}
                fit="contain"
              />
            </div>

            <div className="px-5 py-4 flex items-center justify-between gap-4 bg-white">
              <p className="text-sm text-slate-600">{activeItem.caption}</p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((activeIndex - 1 + visibleItems.length) % visibleItems.length)
                  }
                  aria-label="Previous photo"
                  className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex + 1) % visibleItems.length)}
                  aria-label="Next photo"
                  className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
