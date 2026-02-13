import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const categories = ["all", "wedding", "baby"];

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1762068863353-50744fd8dbe1?w=600&q=80", alt: "Bride in cream and gold sari", category: "wedding" },
  { url: "https://images.unsplash.com/photo-1698419193331-5b2fb90a6304?w=600&q=80", alt: "Traditional wedding couple", category: "wedding" },
  { url: "https://images.unsplash.com/photo-1761891928740-840ed75169e4?w=600&q=80", alt: "Newborn with teddy bear", category: "baby" },
  { url: "https://images.unsplash.com/photo-1760613129745-418b15f91d56?w=600&q=80", alt: "Bride in red wedding dress", category: "wedding" },
  { url: "https://images.unsplash.com/photo-1761891950459-bc48f5bf026d?w=600&q=80", alt: "Baby sleeping in bucket", category: "baby" },
  { url: "https://images.unsplash.com/photo-1722952934661-dde241aeb591?w=600&q=80", alt: "Elegant wedding couple", category: "wedding" },
  { url: "https://images.unsplash.com/photo-1761891951458-4bb2d9bd118a?w=600&q=80", alt: "Newborn with flowers", category: "baby" },
  { url: "https://images.unsplash.com/photo-1670291362999-00f36b631e15?w=600&q=80", alt: "Wedding couple portrait", category: "wedding" },
  { url: "https://images.unsplash.com/photo-1761891950106-3276efeef9d1?w=600&q=80", alt: "Baby in yellow outfit", category: "baby" },
  { url: "https://images.unsplash.com/photo-1610173826014-d131b02d69ca?w=600&q=80", alt: "Indian bride portrait", category: "wedding" },
  { url: "https://images.unsplash.com/photo-1603298624547-e38905ce21d7?w=600&q=80", alt: "Cute baby portrait", category: "baby" },
  { url: "https://images.unsplash.com/photo-1665960213508-48f07086d49c?w=600&q=80", alt: "Grand wedding ceremony", category: "wedding" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = filter === "all" ? galleryImages : galleryImages.filter((img) => img.category === filter);

  return (
    <div>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-[#FAFAFA]" data-testid="gallery-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="uppercase tracking-[0.3em] text-xs text-[#999] mb-4">
            Portfolio
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A]">
            Our Gallery
          </motion.h1>
        </div>
      </section>

      {/* Filter + Gallery */}
      <section className="py-24 md:py-32 bg-white" data-testid="gallery-grid-section">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          <div className="flex justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                onClick={() => setFilter(cat)}
                className={`rounded-none px-6 py-5 uppercase tracking-[0.2em] text-xs transition-all duration-300 ${
                  filter === cat
                    ? "bg-[#1A1A1A] text-white"
                    : "border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
                }`}
                data-testid={`gallery-filter-${cat}`}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.url}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="overflow-hidden aspect-square cursor-pointer group"
                  onClick={() => setSelected(img)}
                  data-testid={`gallery-image-${i}`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none [&>button]:text-white [&>button]:hover:text-[#D4AF37]" data-testid="gallery-lightbox">
          <DialogTitle className="sr-only">Image Preview</DialogTitle>
          {selected && (
            <img
              src={selected.url.replace("w=600", "w=1200")}
              alt={selected.alt}
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
