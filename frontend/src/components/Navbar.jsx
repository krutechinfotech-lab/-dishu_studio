import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const textColor = isHome && !scrolled ? "text-white" : "text-[#1A1A1A]";
  const linkColor = (active) => {
    if (active) return "text-[#D4AF37]";
    return isHome && !scrolled
      ? "text-white/80 hover:text-[#D4AF37]"
      : "text-[#555555] hover:text-[#D4AF37]";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : isHome
          ? "bg-transparent"
          : "bg-white/90 backdrop-blur-md"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link
          to="/"
          className="transition-opacity duration-300 hover:opacity-80"
          data-testid="nav-logo"
        >
          <img
            src="https://customer-assets.emergentagent.com/job_photo-studios/artifacts/7bmeu14v_image.png"
            alt="Dishu Studio"
            className="h-14 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${linkColor(
                pathname === link.href
              )}`}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" data-testid="mobile-menu-toggle">
              <Menu className={`h-6 w-6 ${textColor}`} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-white pt-16">
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${
                    pathname === link.href
                      ? "text-[#D4AF37]"
                      : "text-[#1A1A1A] hover:text-[#D4AF37]"
                  }`}
                  data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
