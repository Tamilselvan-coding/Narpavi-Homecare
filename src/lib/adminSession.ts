'use client';

import { useEffect, useRef, useCallback } from 'react';

/** Usage timeout in milliseconds: 15 minutes of inactivity */
export const USAGE_TIMEOUT_MS = 15 * 60 * 1000;

export interface AdminSession {
  username: string;
  id?: number;
  fullName?: string;
  role: string;
  allowedTabs?: string;
  loggedInAt?: string;
  lastActiveAt?: number;
}

/**
 * Returns the current active session if valid and not timed out.
 * Automatically clears the session and dispatches event if timed out or closed.
 */
export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem('narpavi_admin_session');
    if (!raw) return null;

    const session = JSON.parse(raw) as AdminSession;
    const now = Date.now();
    const lastActive = session.lastActiveAt || (session.loggedInAt ? new Date(session.loggedInAt).getTime() : now);

    // Check if usage timeout (inactivity) has passed
    if (now - lastActive > USAGE_TIMEOUT_MS) {
      clearAdminSession('timeout');
      return null;
    }

    // Check if usage was closed (tab/browser was closed and session storage cleared)
    const isTabActive = sessionStorage.getItem('narpavi_admin_session_active');
    if (!isTabActive && now - lastActive > 60000) {
      clearAdminSession('closed');
      return null;
    }

    // Re-affirm tab active state in sessionStorage
    if (!isTabActive) {
      sessionStorage.setItem('narpavi_admin_session_active', 'true');
    }

    return session;
  } catch {
    clearAdminSession('error');
    return null;
  }
}

/**
 * Saves a new admin session and initializes activity tracking.
 */
export function saveAdminSession(data: {
  username: string;
  id?: number;
  fullName?: string;
  role: string;
  allowedTabs?: string;
  loggedInAt?: string;
}) {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  const session: AdminSession = {
    ...data,
    loggedInAt: data.loggedInAt || new Date().toISOString(),
    lastActiveAt: now,
  };

  localStorage.setItem('narpavi_admin_session', JSON.stringify(session));
  sessionStorage.setItem('narpavi_admin_session_active', 'true');
  window.dispatchEvent(new CustomEvent('narpavi:admin-session-changed', { detail: { action: 'login', session } }));
}

/**
 * Updates the last activity timestamp for active sessions.
 */
export function touchAdminSession() {
  if (typeof window === 'undefined') return;

  try {
    const raw = localStorage.getItem('narpavi_admin_session');
    if (!raw) return;

    const session = JSON.parse(raw) as AdminSession;
    session.lastActiveAt = Date.now();
    localStorage.setItem('narpavi_admin_session', JSON.stringify(session));
    sessionStorage.setItem('narpavi_admin_session_active', 'true');
  } catch {}
}

/**
 * Clears the session from storage and emits the change event.
 */
export function clearAdminSession(reason: 'timeout' | 'closed' | 'manual' | 'error' = 'manual') {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('narpavi_admin_session');
  sessionStorage.removeItem('narpavi_admin_session_active');
  window.dispatchEvent(new CustomEvent('narpavi:admin-session-changed', { detail: { action: 'logout', reason } }));
}

/**
 * React hook to manage usage timeout for logged-in admin / sales staff.
 * Monitors user interaction and triggers onTimeout / redirect when usage expires.
 */
export function useSessionTimeout(options?: {
  onTimeout?: (reason: string) => void;
  redirectUrl?: string;
  enabled?: boolean;
}) {
  const { onTimeout, redirectUrl = '/admin/login?reason=timeout', enabled = true } = options || {};
  const lastTouchRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTimeout = useCallback((reason: string) => {
    clearAdminSession('timeout');
    if (onTimeout) {
      onTimeout(reason);
    } else if (typeof window !== 'undefined' && redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [onTimeout, redirectUrl]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Check immediately on mount
    const currentSession = getAdminSession();
    if (!currentSession) {
      handleTimeout('expired');
      return;
    }

    const checkSessionInterval = () => {
      const session = getAdminSession();
      if (!session) {
        handleTimeout('timeout');
      }
    };

    // Throttle activity updates to once every 20 seconds
    const onUserActivity = () => {
      const now = Date.now();
      if (now - lastTouchRef.current > 20000) {
        lastTouchRef.current = now;
        touchAdminSession();
      }
    };

    // User interaction listeners
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart', 'focus'];
    events.forEach((ev) => window.addEventListener(ev, onUserActivity, { passive: true }));

    // Visibility change (when tab is reopened or focused)
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkSessionInterval();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Periodic check every 15 seconds
    timerRef.current = setInterval(checkSessionInterval, 15000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      events.forEach((ev) => window.removeEventListener(ev, onUserActivity));
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [enabled, handleTimeout]);
}
