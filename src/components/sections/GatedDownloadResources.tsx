'use client';

import { FormEvent, useState } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Loader2, X } from 'lucide-react';
import SiteIcon from '@/components/ui/SiteIcon';

interface DownloadResource {
  title: string;
  fileUrl: string;
}

interface BlogResource {
  title: string;
  excerpt: string;
  image: string;
  href: string;
}

interface GatedDownloadResourcesProps {
  downloads: DownloadResource[];
  resources: BlogResource[];
  heading?: string;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  modalDescription?: string;
  downloadFallbackName?: string;
  downloadButtonLabel?: string;
  blogCardVariant?: 'default' | 'imageOverlay';
}

export default function GatedDownloadResources({
  downloads,
  resources,
  heading = 'Blog & Educative Guide on Elder Care',
  intro = (
    <>
      <p>
        Not sure which care plan is right for your loved one? Our <strong>expert-written guide</strong> helps you understand <strong>care levels, safety standards, and questions to ask before hiring a caregiver or nurse.</strong>
      </p>
      <p>It&apos;s a <strong>must-have resource</strong> for families looking for safe and reliable Elder Care.</p>
    </>
  ),
  image = '/images/elder-care/pik-11.jpeg',
  imageAlt = 'Elder care educative guide',
  modalDescription = 'Fill these details to download the elder care guide.',
  downloadFallbackName = 'care-guide.pdf',
  downloadButtonLabel = 'Download Now',
  blogCardVariant = 'imageOverlay',
}: GatedDownloadResourcesProps) {
  const [activeDownload, setActiveDownload] = useState<DownloadResource | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isImageOverlay = blogCardVariant === 'imageOverlay';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activeDownload) return;

    setIsSubmitting(true);
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      mobile: String(formData.get('mobile') ?? '').trim(),
      profession: String(formData.get('profession') ?? '').trim(),
      downloadTitle: activeDownload.title,
      downloadFileUrl: activeDownload.fileUrl,
      sourcePath: typeof window !== 'undefined' ? window.location.pathname : '',
      submittedAt: new Date().toISOString(),
    };

    let targetDownloadUrl = activeDownload.fileUrl;

    try {
      const response = await fetch('/api/download-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const resData = await response.json();
        if (resData.ok && resData.downloadUrl) {
          targetDownloadUrl = resData.downloadUrl;
        }
      }
    } catch (err) {
      console.warn('Unable to log download lead to API:', err);
    } finally {
      setIsSubmitting(false);

      // Trigger the actual PDF file download reliably via Blob URL
      try {
        const fileRes = await fetch(targetDownloadUrl);
        if (fileRes.ok) {
          const blob = await fileRes.blob();
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          const fileName = targetDownloadUrl.split('/').pop() || downloadFallbackName;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          link.remove();
          setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
        } else {
          throw new Error('File fetch failed');
        }
      } catch (err) {
        console.warn('Fallback direct link download:', err);
        const link = document.createElement('a');
        link.href = targetDownloadUrl;
        link.download = targetDownloadUrl.split('/').pop() ?? downloadFallbackName;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

      formElement.reset();
      setActiveDownload(null);
    }
  };

  return (
    <>
      <div className="elder-resource-board">
        <h3>{heading}</h3>
        <div className="elder-resource-board__intro">
          <div className="elder-resource-board__copy">
            {intro}
          </div>
          <div className="elder-resource-board__image">
            <Image src={image} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 260px" />
          </div>
        </div>

        <div className="elder-download-list">
          {downloads.map((item) => (
            <div className="elder-download-row" key={item.fileUrl}>
              <div className="elder-download-row__title">{item.title}</div>
              <button type="button" className="btn btn--outline" onClick={() => setActiveDownload(item)}>
                {downloadButtonLabel} <Download size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className={`elder-blog-tile-grid${isImageOverlay ? ' elder-blog-tile-grid--image-overlay' : ''}`}>
          {resources.map((post) => (
            <Link key={post.title} href={post.href} className={`elder-blog-tile${isImageOverlay ? ' elder-blog-tile--image-overlay' : ''}`}>
              <div className="elder-blog-tile__image">
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 908px) 100vw, 270px" />
              </div>
              <h4>{post.title}</h4>
              {!isImageOverlay && (
                <span>Read blog <SiteIcon name="Arrow" size={15} /></span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {activeDownload && (
        <div className="download-modal" role="dialog" aria-modal="true" aria-labelledby="download-modal-title">
          <button type="button" className="download-modal__backdrop" aria-label="Close download form" onClick={() => setActiveDownload(null)} />
          <div className="download-modal__panel">
            <button type="button" className="download-modal__close" aria-label="Close download form" onClick={() => setActiveDownload(null)}>
              <X size={18} />
            </button>
            <div className="download-modal__eyebrow">Download guide</div>
            <h3 id="download-modal-title">{activeDownload.title}</h3>
            <p>{modalDescription}</p>
            <form onSubmit={handleSubmit} className="download-modal__form">
              <input name="name" type="text" placeholder="Name" aria-label="Name" required />
              <input name="mobile" type="tel" placeholder="Mobile Number" aria-label="Mobile number" required />
              <input name="profession" type="text" placeholder="Profession" aria-label="Profession" required />
              <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Submitting... <Loader2 className="animate-spin" size={16} /></>
                ) : (
                  <>Submit & Download <Download size={16} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
