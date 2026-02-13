import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import api from "@/lib/api";

export default function BookingForm({ serviceType }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      await api.post("/bookings", {
        ...form,
        service_type: serviceType,
        preferred_date: date ? format(date, "yyyy-MM-dd") : "",
      });
      toast.success("Thank You, Your Booking is Confirmed!");
      setForm({ name: "", email: "", phone: "", message: "" });
      setDate(null);
    } catch {
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-[#D4AF37] placeholder:text-gray-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="booking-form">
      <div>
        <label className="uppercase tracking-[0.2em] text-xs text-[#999] block mb-2">Name *</label>
        <Input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} data-testid="booking-name-input" />
      </div>
      <div>
        <label className="uppercase tracking-[0.2em] text-xs text-[#999] block mb-2">Email *</label>
        <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} data-testid="booking-email-input" />
      </div>
      <div>
        <label className="uppercase tracking-[0.2em] text-xs text-[#999] block mb-2">Phone *</label>
        <Input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} data-testid="booking-phone-input" />
      </div>
      <div>
        <label className="uppercase tracking-[0.2em] text-xs text-[#999] block mb-2">Preferred Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-4 hover:bg-transparent font-normal h-auto"
              data-testid="booking-date-trigger"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-[#999]" />
              {date ? format(date, "PPP") : <span className="text-gray-400">Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} data-testid="booking-calendar" />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <label className="uppercase tracking-[0.2em] text-xs text-[#999] block mb-2">Message</label>
        <Textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your requirements..."
          className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-[#D4AF37] resize-none min-h-[80px] placeholder:text-gray-400"
          data-testid="booking-message-input"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="bg-[#1A1A1A] text-white hover:bg-[#333] rounded-none px-8 py-6 uppercase tracking-[0.2em] text-xs transition-all duration-300 w-full"
        data-testid="booking-submit-btn"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading ? "Submitting..." : "Book Now"}
      </Button>
    </form>
  );
}
