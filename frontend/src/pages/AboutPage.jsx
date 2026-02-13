import { motion } from "framer-motion";
import { Camera, Eye, Heart } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const stats = [
  { value: "500+", label: "Events Captured" },
  { value: "16+", label: "Years Experience" },
  { value: "500+", label: "Happy Clients" },
  { value: "10K+", label: "Photos Delivered" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-[#FAFAFA]" data-testid="about-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="uppercase tracking-[0.3em] text-xs text-[#999] mb-4">
            About Us
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A]">
            Our Story
          </motion.h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 md:py-32 bg-white" data-testid="about-intro">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554086190-db10cbdb4316?w=800&q=80"
                alt="Photographer at work"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }}>
            <p className="uppercase tracking-[0.2em] text-xs text-[#D4AF37] mb-4">Who We Are</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A] mb-6">Dishu Studio</h2>
            <p className="text-[#555] text-sm leading-relaxed mb-4">
              Founded with a passion for storytelling through the lens, Dishu Studio has been creating timeless visual narratives for over 8 years. Based in Surat, Gujarat, we specialize in wedding and baby photography that captures the purest emotions and most cherished moments.
            </p>
            <p className="text-[#555] text-sm leading-relaxed">
              Every click of our shutter is driven by a commitment to artistry, authenticity, and excellence. We believe that photographs are not just images — they are stories waiting to be told, memories waiting to be relived.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 md:py-32 bg-[#F5F5F0]" data-testid="about-vision-mission">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div {...fadeUp} className="text-left">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="h-6 w-6 text-[#D4AF37]" strokeWidth={1.5} />
                <h3 className="font-heading text-2xl text-[#1A1A1A]">Our Vision</h3>
              </div>
              <p className="text-[#555] text-sm leading-relaxed">
                To be the most trusted photography studio in Gujarat, known for creating visual masterpieces that families treasure for generations. We envision a world where every precious moment is captured with perfection and preserved with care.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }} className="text-left">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="h-6 w-6 text-[#D4AF37]" strokeWidth={1.5} />
                <h3 className="font-heading text-2xl text-[#1A1A1A]">Our Mission</h3>
              </div>
              <p className="text-[#555] text-sm leading-relaxed">
                To deliver exceptional photography experiences that exceed our clients' expectations. We combine technical expertise with creative passion, ensuring every session is comfortable, enjoyable, and results in breathtaking images.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience / Stats */}
      <section className="py-24 md:py-32 bg-white" data-testid="about-stats">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="uppercase tracking-[0.2em] text-xs text-[#999] mb-4">Experience</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A]">Numbers That Speak</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center py-8"
                data-testid={`stat-${i}`}
              >
                <p className="font-heading text-4xl text-[#D4AF37] mb-2">{stat.value}</p>
                <p className="text-[#555] text-xs uppercase tracking-[0.2em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Approach */}
      <section className="py-24 md:py-32 bg-[#FAFAFA]" data-testid="about-approach">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <Camera className="h-10 w-10 text-[#D4AF37] mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-heading text-3xl text-[#1A1A1A] mb-6">Our Approach</h2>
            <p className="text-[#555] text-sm leading-relaxed">
              We blend traditional values with modern techniques. Using state-of-the-art equipment and post-processing workflows, we ensure every image meets the highest standards of quality. From candid moments to carefully composed portraits, our versatile style adapts to your unique story.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
