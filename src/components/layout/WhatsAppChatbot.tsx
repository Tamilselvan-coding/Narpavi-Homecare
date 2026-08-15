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

export default function WhatsAppChatbot() {
  const [open, setOpen] = useState(false);

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
                <a
                  key={reply}
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi Narpavi Homecare, ${reply}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {reply}
                </a>
              ))}
            </div>
          </div>
          <a
            className="whatsapp-chatbot__start"
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi Narpavi Homecare, I would like to make an enquiry.')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
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
