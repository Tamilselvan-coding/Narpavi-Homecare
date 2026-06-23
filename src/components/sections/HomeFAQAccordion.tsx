'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from '@/app/home.module.css';

type HomeFAQ = {
  id: number;
  question: string;
  answer: string;
};

export default function HomeFAQAccordion({ faqs }: { faqs: HomeFAQ[] }) {
  const [openId, setOpenId] = useState<number>(faqs[0]?.id ?? 0);

  return (
    <div className={styles.faqGrid}>
      {faqs.map((faq) => {
        const open = openId === faq.id;
        return (
          <article className={`${styles.faqItem} ${open ? styles.faqItemOpen : ''}`} key={faq.id}>
            <button
              type="button"
              className={styles.faqQuestion}
              onClick={() => setOpenId(open ? 0 : faq.id)}
              aria-expanded={open}
              aria-controls={`home-faq-answer-${faq.id}`}
            >
              <span className={styles.faqNumber}>{String(faq.id).padStart(2, '0')}</span>
              <span>{faq.question}</span>
              <ChevronDown size={20} />
            </button>
            <div className={styles.faqAnswer} id={`home-faq-answer-${faq.id}`}>
              <p>{faq.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
