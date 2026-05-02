import { CLINIC } from "@/lib/clinic";
import { MessageCircle } from "lucide-react";

export const WhatsAppFab = () => (
  <a
    href={`https://wa.me/${CLINIC.whatsappNumber}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-success text-white grid place-items-center shadow-elegant hover:scale-110 transition-transform"
  >
    <MessageCircle className="h-6 w-6" />
    <span className="absolute inset-0 rounded-full bg-success/40 animate-ping -z-10" />
  </a>
);
