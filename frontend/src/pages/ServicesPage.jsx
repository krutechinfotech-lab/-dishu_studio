import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const services = [
  {
    title: "Wedding Shoot",
    description: "From engagement to reception, we capture every precious moment of your wedding journey with artistry and elegance.",
    image: "https://images.unsplash.com/photo-1722952934661-dde241aeb591?w=800&q=80",
    link: "/services/wedding",
  },
  {
    title: "Baby Shoot",
    description: "Adorable, heartwarming baby photography that preserves the tiny details and precious milestones of your little one.",
    image: "https://images.unsplash.com/photo-1603298624547-e38905ce21d7?w=800&q=80",
    link: "/services/baby",
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-[#FAFAFA]" data-testid="services-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="uppercase tracking-[0.3em] text-xs text-[#999] mb-4">
            What We Do
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A]">
            Our Services
          </motion.h1>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-24 md:py-32 bg-white" data-testid="services-cards">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((svc, i) => (
              <motion.div key={svc.title} {...fadeUp} transition={{ duration: 0.7, delay: i * 0.15 }} className="group">
                <Link to={svc.link} data-testid={`service-card-${i}`}>
                  <div className="relative overflow-hidden aspect-[3/4] mb-8">
                    <img src={svc.image} alt={svc.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading text-2xl text-[#1A1A1A] mb-2">{svc.title}</h3>
                      <p className="text-[#555] text-sm leading-relaxed max-w-md">{svc.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#D4AF37] shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
