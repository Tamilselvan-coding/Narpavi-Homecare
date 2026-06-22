'use client';

import { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { BRAND } from '@/lib/constants';

const QUICK_REPLIES = [
  'I need home nursing care',
  'I need medical equipment',
  'I want elder care support',
  'I want to book a care assessment',
];

function whatsappUrl(message: string) {
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function WhatsAppChatbot() {
  const [open, setOpen] = useState(false);

  const introMessage = `Hi Narpavi Homecare, I need help with home healthcare services. Please contact me.`;

  return (
    <div className={`whatsapp-chatbot ${open ? 'whatsapp-chatbot--open' : ''}`}>
      {open && (
        <div className="whatsapp-chatbot__panel" role="dialog" aria-label="WhatsApp chat assistant">
          <div className="whatsapp-chatbot__header">
            <div>
              <strong>Narpavi WhatsApp Assistant</strong>
              <span>Usually replies quickly</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close WhatsApp assistant">
              <X size={18} />
            </button>
          </div>
          <div className="whatsapp-chatbot__body">
            <p>Hi! Select what you need. We will open WhatsApp with the message ready.</p>
            <div className="whatsapp-chatbot__options">
              {QUICK_REPLIES.map((reply) => (
                <a key={reply} href={whatsappUrl(`Hi Narpavi Homecare, ${reply}. Please share details.`)} target="_blank" rel="noopener">
                  {reply}
                </a>
              ))}
            </div>
          </div>
          <a className="whatsapp-chatbot__start" href={whatsappUrl(introMessage)} target="_blank" rel="noopener">
            Start WhatsApp Chat <Send size={16} />
          </a>
        </div>
      )}
      <button
        type="button"
        className="whatsapp-chatbot__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open WhatsApp chat assistant"
        aria-expanded={open}
      >
        <MessageCircle size={24} />
        <span>Chat</span>
      </button>
    </div>
  );
}
