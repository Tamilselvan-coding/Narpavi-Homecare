export interface CartItem {
  id: string;
  title: string;
  name: string;
  phoneFull: string;
  city: string;
  serviceStartDate: string;
  packageName: string;
  enquiryFor: string;
  sourcePath: string;
  addedAt: string;
}

export interface UserSession {
  phone: string;
  name?: string;
  loggedInAt: string;
}

const CART_KEY = 'narpavi_cart_items';
const SESSION_KEY = 'narpavi_active_user';

export function normalizePhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/\D/g, '').slice(-10);
}

export function getActiveUser(): UserSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setActiveUser(phone: string, name?: string): UserSession {
  const session: UserSession = {
    phone: phone.trim(),
    name: name?.trim(),
    loggedInAt: new Date().toISOString(),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    window.dispatchEvent(new Event('narpavi:user-session-changed'));
    window.dispatchEvent(new Event('narpavi:cart-updated'));
  }
  return session;
}

export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event('narpavi:user-session-changed'));
    window.dispatchEvent(new Event('narpavi:cart-updated'));
  }
}

export function getAllCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getUserCartItems(targetPhone?: string): CartItem[] {
  const activeUser = getActiveUser();
  const phoneToMatch = targetPhone || activeUser?.phone;
  if (!phoneToMatch) return [];

  const normalized = normalizePhone(phoneToMatch);
  if (!normalized) return [];

  const allItems = getAllCartItems();
  return allItems.filter((item) => {
    const itemNorm = normalizePhone(item.phoneFull);
    return itemNorm === normalized;
  });
}

export function addToCart(item: Omit<CartItem, 'id' | 'addedAt'>): CartItem {
  setActiveUser(item.phoneFull, item.name);

  const items = getAllCartItems();
  const newItem: CartItem = {
    ...item,
    id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    addedAt: new Date().toISOString(),
  };
  const updated = [newItem, ...items];
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('narpavi:cart-updated'));
  }
  return newItem;
}

export function removeFromCart(id: string): CartItem[] {
  const items = getAllCartItems();
  const updated = items.filter((i) => i.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('narpavi:cart-updated'));
  }
  return getUserCartItems();
}

export function clearUserCart(): void {
  const activeUser = getActiveUser();
  if (!activeUser) return;

  const userNorm = normalizePhone(activeUser.phone);
  const items = getAllCartItems();
  const remaining = items.filter((item) => normalizePhone(item.phoneFull) !== userNorm);

  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_KEY, JSON.stringify(remaining));
    window.dispatchEvent(new Event('narpavi:cart-updated'));
  }
}
