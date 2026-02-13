import { motion } from "framer-motion";
import { Check } from "lucide-react";
import BookingForm from "@/components/BookingForm";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const packages = [
  {
    name: "Mini",
    price: "\u20B95,000",
    features: ["1 Hour Session", "20 Edited Photos", "1 Outfit Change", "Online Gallery", "Basic Props"],
  },
  {
    name: "Classic",
    price: "\u20B910,000",
    popular: true,
    features: ["2 Hours Session", "50 Edited Photos", "3 Outfit Changes", "Premium Props", "Online Gallery", "5 Printed Photos"],
  },
  {
    name: "Premium",
    price: "\u20B920,000",
    features: ["3 Hours Session", "100 Edited Photos", "Unlimited Outfits", "Custom Props & Themes", "Luxury Photo Album", "All Digital Files", "Family Portraits"],
  },
];

const sampleGallery = [
  "https://images.unsplash.com/photo-1761891928740-840ed75169e4?w=500&q=80",
  "https://images.unsplash.com/photo-1761891950459-bc48f5bf026d?w=500&q=80",
  "https://images.unsplash.com/photo-1761891951458-4bb2d9bd118a?w=500&q=80",
  "https://images.unsplash.com/photo-1761891950106-3276efeef9d1?w=500&q=80",
  "https://images.unsplash.com/photo-1603298624547-e38905ce21d7?w=500&q=80",
  "https://images.unsplash.com/photo-1761891928740-840ed75169e4?w=500&q=80",
];

export default function BabyShootPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden" data-testid="baby-hero">
        <div className="absolute inset-0">
          <img src="https://customer-assets.emergentagent.com/job_photo-studios/artifacts/xyw2czky_TUL_9695.jpg" alt="Dishu Studio Baby Photography" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="uppercase tracking-[0.3em] text-xs mb-4">
            Photography
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-heading text-4xl sm:text-5xl lg:text-6xl">
            Baby Shoot
          </motion.h1>
        </div>
      </section>

      {/* Details */}
      <section className="py-24 md:py-32 bg-white" data-testid="baby-details">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <p className="uppercase tracking-[0.2em] text-xs text-[#D4AF37] mb-4">About This Service</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A] mb-6">Precious Little Moments</h2>
            <p className="text-[#555] text-sm leading-relaxed">
              Babies grow up so fast, and every tiny detail deserves to be remembered. Our baby photography sessions are designed to capture the sweetness, wonder, and joy of your little one in a safe, comfortable, and creative studio environment. From newborn to first birthday milestones, we create magical images you'll cherish forever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sample Gallery */}
      <section className="py-24 md:py-32 bg-white" data-testid="baby-gallery">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="uppercase tracking-[0.2em] text-xs text-[#999] mb-4">Portfolio</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A]">Sample Work</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sampleGallery.map((url, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="overflow-hidden aspect-square group">
                <img src={url} alt={`Baby sample ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24 md:py-32 bg-[#F5F5F0]" data-testid="baby-booking">
        <div className="max-w-xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="uppercase tracking-[0.2em] text-xs text-[#999] mb-4">Reserve Your Session</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A]">Book Your Session</h2>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <BookingForm serviceType="baby" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
