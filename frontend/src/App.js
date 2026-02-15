import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntroScreen from "@/components/IntroScreen";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import GalleryPage from "@/pages/GalleryPage";
import ServicesPage from "@/pages/ServicesPage";
import WeddingShootPage from "@/pages/WeddingShootPage";
import BabyShootPage from "@/pages/BabyShootPage";
import ContactPage from "@/pages/ContactPage";
import AdminPage from "@/pages/AdminPage";
import "@/App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isAdmin = pathname === "/admin";

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/wedding" element={<WeddingShootPage />} />
        <Route path="/services/baby" element={<BabyShootPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem("dishu_intro_seen");
  });

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem("dishu_intro_seen", "true");
    setShowIntro(false);
  }, []);

  return (
    <BrowserRouter>
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      <ScrollToTop />
      <AppLayout />
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}

export default App;
