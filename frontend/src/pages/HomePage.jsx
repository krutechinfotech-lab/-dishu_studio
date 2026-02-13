import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const testimonials = [
  { name: "Priya & Rahul", service: "Wedding Photography", quote: "Dishu Studio captured our wedding day perfectly. Every emotion, every moment \u2014 beautifully preserved forever." },
  { name: "Neha Patel", service: "Baby Photography", quote: "The baby photoshoot was magical! They made our little one so comfortable, and the photos are absolutely stunning." },
  { name: "Ankit & Meera", service: "Pre-Wedding Shoot", quote: "Professional, creative, and passionate. The pre-wedding shoot exceeded all our expectations." },
];

const galleryPreview = [
  { url: "https://customer-assets.emergentagent.com/job_photo-studios/artifacts/ml1hc7wi_jhdcnd.png", alt: "Bride Portrait" },
  { url: "https://customer-assets.emergentagent.com/job_photo-studios/artifacts/axf9iqfx_img7.JPG", alt: "Pre-Wedding Couple" },
  { url: "https://customer-assets.emergentagent.com/job_photo-studios/artifacts/xyw2czky_TUL_9695.jpg", alt: "Maternity Shoot" },
  { url: "https://customer-assets.emergentagent.com/job_photo-studios/artifacts/sy2983wh_058A9781.JPG", alt: "Bridal Mehndi Details" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://customer-assets.emergentagent.com/job_photo-studios/artifacts/lbxld6wt_TUL_2526.jpg"
          >
            <source src="https://customer-assets.emergentagent.com/job_photo-studios/artifacts/ack6h4zd_02%20HIGHLIGHT%20%282%29.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="uppercase tracking-[0.3em] text-xs mb-6">
            Professional Photography Studio
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-tight mb-8">
            Capturing Timeless<br />Moments
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
            <Link to="/services">
              <Button className="bg-white text-[#1A1A1A] hover:bg-[#D4AF37] hover:text-white rounded-none px-10 py-6 uppercase tracking-[0.2em] text-xs transition-all duration-300" data-testid="hero-cta-btn">
                Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 md:py-32 bg-white" data-testid="services-preview-section">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="uppercase tracking-[0.2em] text-xs text-[#999] mb-4">Our Services</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A]">What We Offer</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div {...fadeUp} className="group">
              <Link to="/services/wedding" data-testid="home-service-wedding">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img src="https://customer-assets.emergentagent.com/job_photo-studios/artifacts/ml1hc7wi_jhdcnd.png" alt="Dishu Studio Wedding Photography" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="uppercase tracking-[0.2em] text-xs text-white/80 mb-2">Photography</p>
                    <h3 className="font-heading text-3xl text-white">Wedding Shoot</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
            <motion.div {...fadeUp} className="group" transition={{ duration: 0.7, delay: 0.15 }}>
              <Link to="/services/baby" data-testid="home-service-baby">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img src="https://customer-assets.emergentagent.com/job_photo-studios/artifacts/xyw2czky_TUL_9695.jpg" alt="Dishu Studio Baby Photography" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="uppercase tracking-[0.2em] text-xs text-white/80 mb-2">Photography</p>
                    <h3 className="font-heading text-3xl text-white">Baby Shoot</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 md:py-32 bg-[#FAFAFA]" data-testid="gallery-preview-section">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="uppercase tracking-[0.2em] text-xs text-[#999] mb-4">Portfolio</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A]">Our Work</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryPreview.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="overflow-hidden aspect-square group">
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="text-center mt-12">
            <Link to="/gallery">
              <Button variant="outline" className="rounded-none px-8 py-6 uppercase tracking-[0.2em] text-xs border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300" data-testid="gallery-view-all-btn">
                View Full Gallery
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-white" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="uppercase tracking-[0.2em] text-xs text-[#999] mb-4">Testimonials</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A]">What Our Clients Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className="text-center px-6 py-8" data-testid={`testimonial-${i}`}>
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-[#555] text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <p className="text-[#1A1A1A] font-medium text-sm">{t.name}</p>
                <p className="text-[#999] text-xs uppercase tracking-widest mt-1">{t.service}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[#F5F5F0]" data-testid="cta-section">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <p className="uppercase tracking-[0.2em] text-xs text-[#999] mb-4">Ready?</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A] mb-8">Let's Create Something Beautiful</h2>
            <Link to="/contact">
              <Button className="bg-[#1A1A1A] text-white hover:bg-[#333] rounded-none px-10 py-6 uppercase tracking-[0.2em] text-xs transition-all duration-300" data-testid="cta-contact-btn">
                Get In Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
