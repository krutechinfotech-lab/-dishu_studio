import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <img src="https://customer-assets.emergentagent.com/job_photo-studios/artifacts/7bmeu14v_image.png" alt="Dishu Studio" className="h-16 w-auto mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Capturing timeless moments with elegance and artistry.
              Professional photography for weddings and babies.
            </p>
          </div>

          <div>
            <h4 className="uppercase tracking-[0.2em] text-xs text-gray-400 mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Home", to: "/" },
                { label: "About", to: "/about" },
                { label: "Gallery", to: "/gallery" },
                { label: "Services", to: "/services" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors duration-300"
                  data-testid={`footer-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="uppercase tracking-[0.2em] text-xs text-gray-400 mb-6">Contact Us</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
                <span>B-12 Gopinath Complex, Lajamani Chowk, Mota Varachha, Surat, Gujarat</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
                <span>dishuvekariya5@gmail.com</span>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors" data-testid="footer-social-instagram" aria-label="Instagram">
                <Instagram className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors" data-testid="footer-social-facebook" aria-label="Facebook">
                <Facebook className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors" data-testid="footer-social-twitter" aria-label="Twitter">
                <Twitter className="h-5 w-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Dishu Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
