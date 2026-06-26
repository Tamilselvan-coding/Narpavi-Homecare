import type { ReactNode } from 'react';

interface ScrollAnimatorProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'scaleIn';
  delay?: number;
  threshold?: number;
}

export default function ScrollAnimator({ children, className = '' }: ScrollAnimatorProps) {
  if (!className) return <>{children}</>;

  return <div className={className}>{children}</div>;
}
