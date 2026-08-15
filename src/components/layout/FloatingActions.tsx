import { MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export default function FloatingActions() {
  return (
    <div className="floating-actions" aria-label="Quick contact options">
      <a
        href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi Narpavi Homecare, I would like to enquire about home nursing care.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-actions__whatsapp"
      >
        <MessageCircle size={17} /> WhatsApp Us
      </a>
    </div>
  );
}
