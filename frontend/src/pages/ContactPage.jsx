import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const contactInfo = [
  { icon: MapPin, label: "Address", value: "B-12 Gopinath Complex, Lajamani Chowk, Mota Varachha, Surat, Gujarat" },
  { icon: Phone, label: "Phone", value: "+91 97238 61620" },
  { icon: Mail, label: "Email", value: "dishuvekariya5@gmail.com" },
  { icon: Clock, label: "Hours", value: "Mon - Sat: 10:00 AM - 7:00 PM" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await api.post("/contact", form);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-[#D4AF37] placeholder:text-gray-400";

  return (
    <div>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-[#FAFAFA]" data-testid="contact-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="uppercase tracking-[0.3em] text-xs text-[#999] mb-4">
            Get In Touch
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A]">
            Contact Us
          </motion.h1>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-24 md:py-32 bg-white" data-testid="contact-form-section">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <motion.div {...fadeUp}>
            <p className="uppercase tracking-[0.2em] text-xs text-[#D4AF37] mb-4">Reach Out</p>
            <h2 className="font-heading text-3xl text-[#1A1A1A] mb-8">We'd Love to Hear From You</h2>
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <item.icon className="h-5 w-5 text-[#D4AF37] mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#999] mb-1">{item.label}</p>
                    <p className="text-sm text-[#1A1A1A]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div>
                <label className="uppercase tracking-[0.2em] text-xs text-[#999] block mb-2">Name *</label>
                <Input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass} data-testid="contact-name-input" />
              </div>
              <div>
                <label className="uppercase tracking-[0.2em] text-xs text-[#999] block mb-2">Email *</label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} data-testid="contact-email-input" />
              </div>
              <div>
                <label className="uppercase tracking-[0.2em] text-xs text-[#999] block mb-2">Phone *</label>
                <Input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} data-testid="contact-phone-input" />
              </div>
              <div>
                <label className="uppercase tracking-[0.2em] text-xs text-[#999] block mb-2">Message *</label>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-[#D4AF37] resize-none min-h-[100px] placeholder:text-gray-400"
                  data-testid="contact-message-input"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#1A1A1A] text-white hover:bg-[#333] rounded-none px-8 py-6 uppercase tracking-[0.2em] text-xs transition-all duration-300 w-full"
                data-testid="contact-submit-btn"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Google Map */}
      <section className="bg-[#FAFAFA]" data-testid="contact-map-section">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="uppercase tracking-[0.2em] text-xs text-[#999] mb-4">Find Us</p>
            <h2 className="font-heading text-3xl text-[#1A1A1A]">Our Location</h2>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <iframe
              title="Dishu Studio Location"
              src="https://maps.google.com/maps?q=Lajamani+Chowk,+Mota+Varachha,+Surat,+Gujarat,+India&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              data-testid="contact-google-map"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
