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
    name: "Classic",
    price: "\u20B925,000",
    features: ["4 Hours Coverage", "200 Edited Photos", "1 Photographer", "Online Gallery", "Basic Retouching"],
  },
  {
    name: "Premium",
    price: "\u20B950,000",
    popular: true,
    features: ["8 Hours Coverage", "500 Edited Photos", "2 Photographers", "Premium Photo Album", "Advanced Retouching", "Pre-Wedding Consult"],
  },
  {
    name: "Royal",
    price: "\u20B91,00,000",
    features: ["Full Day Coverage", "Unlimited Photos", "3 Photographers", "Luxury Photo Album", "Cinematic Highlights", "Drone Coverage", "Same-Day Edit"],
  },
];

const sampleGallery = [
  "https://images.unsplash.com/photo-1762068863353-50744fd8dbe1?w=500&q=80",
  "https://images.unsplash.com/photo-1698419193331-5b2fb90a6304?w=500&q=80",
  "https://images.unsplash.com/photo-1760613129745-418b15f91d56?w=500&q=80",
  "https://images.unsplash.com/photo-1670291362999-00f36b631e15?w=500&q=80",
  "https://images.unsplash.com/photo-1610173826014-d131b02d69ca?w=500&q=80",
  "https://images.unsplash.com/photo-1722952934661-dde241aeb591?w=500&q=80",
];

export default function WeddingShootPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden" data-testid="wedding-hero">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1665960213508-48f07086d49c?w=1600&q=80" alt="Wedding Photography" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="uppercase tracking-[0.3em] text-xs mb-4">
            Photography
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-heading text-4xl sm:text-5xl lg:text-6xl">
            Wedding Shoot
          </motion.h1>
        </div>
      </section>

      {/* Details */}
      <section className="py-24 md:py-32 bg-white" data-testid="wedding-details">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <p className="uppercase tracking-[0.2em] text-xs text-[#D4AF37] mb-4">About This Service</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A] mb-6">Your Love Story, Beautifully Told</h2>
            <p className="text-[#555] text-sm leading-relaxed">
              Your wedding day is one of the most important days of your life, and we are here to ensure every precious moment is captured with perfection. From the grandeur of the ceremony to the intimate, candid exchanges, our team brings artistic vision and technical excellence to create a visual narrative of your love story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 md:py-32 bg-[#FAFAFA]" data-testid="wedding-pricing">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="uppercase tracking-[0.2em] text-xs text-[#999] mb-4">Pricing</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A]">Choose Your Package</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative bg-white p-10 text-center ${pkg.popular ? "ring-2 ring-[#D4AF37]" : "border border-[#EFEFEF]"}`}
                data-testid={`wedding-package-${i}`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white text-[10px] uppercase tracking-widest px-4 py-1">
                    Most Popular
                  </span>
                )}
                <h3 className="font-heading text-xl text-[#1A1A1A] mb-2">{pkg.name}</h3>
                <p className="font-heading text-3xl text-[#D4AF37] mb-8">{pkg.price}</p>
                <ul className="space-y-3 text-left">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-[#555]">
                      <Check className="h-4 w-4 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Gallery */}
      <section className="py-24 md:py-32 bg-white" data-testid="wedding-gallery">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="uppercase tracking-[0.2em] text-xs text-[#999] mb-4">Portfolio</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A]">Sample Work</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sampleGallery.map((url, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="overflow-hidden aspect-square group">
                <img src={url} alt={`Wedding sample ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24 md:py-32 bg-[#F5F5F0]" data-testid="wedding-booking">
        <div className="max-w-xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="uppercase tracking-[0.2em] text-xs text-[#999] mb-4">Reserve Your Date</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A]">Book Your Session</h2>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <BookingForm serviceType="wedding" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
