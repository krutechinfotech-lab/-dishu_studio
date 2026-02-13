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
  "https://customer-assets.emergentagent.com/job_photo-studios/artifacts/ml1hc7wi_jhdcnd.png",
  "https://customer-assets.emergentagent.com/job_photo-studios/artifacts/lbxld6wt_TUL_2526.jpg",
  "https://customer-assets.emergentagent.com/job_photo-studios/artifacts/axf9iqfx_img7.JPG",
  "https://customer-assets.emergentagent.com/job_photo-studios/artifacts/sy2983wh_058A9781.JPG",
  "https://customer-assets.emergentagent.com/job_photo-studios/artifacts/bw82yu0a_Couple%20Pose%203%20-%20Facing%20Camera%20Romantic%20Pose.png",
  "https://customer-assets.emergentagent.com/job_photo-studios/artifacts/id4bks1w_Couple_Pose_2.png",
];

export default function WeddingShootPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden" data-testid="wedding-hero">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover" poster="https://customer-assets.emergentagent.com/job_photo-studios/artifacts/lbxld6wt_TUL_2526.jpg">
            <source src="https://customer-assets.emergentagent.com/job_photo-studios/artifacts/ack6h4zd_02%20HIGHLIGHT%20%282%29.mp4" type="video/mp4" />
          </video>
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
