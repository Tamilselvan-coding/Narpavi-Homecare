'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  MapPin,
  Phone,
  Trash2,
  User,
  ShoppingBag,
  ShieldCheck,
  HeartHandshake,
  Clock,
  MessageCircle,
  Sparkles,
  ChevronRight,
  Activity,
  Award,
  Check,
  LogIn,
  LogOut,
  Lock,
} from 'lucide-react';
import {
  getUserCartItems,
  removeFromCart,
  clearUserCart,
  getActiveUser,
  setActiveUser,
  logoutUser,
  type CartItem,
  type UserSession,
} from '@/lib/cart';
import { BRAND } from '@/lib/constants';
import SiteIcon from '@/components/ui/SiteIcon';

export default function CartPage() {
  const [activeUser, setActiveUserSession] = useState<UserSession | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [bookingStatus, setBookingStatus] = useState<Record<string, 'submitting' | 'success' | 'error'>>({});
  const [statusMessages, setStatusMessages] = useState<Record<string, string>>({});
  const [isBookingAll, setIsBookingAll] = useState(false);
  const [bulkMessage, setBulkMessage] = useState('');

  // Login form state
  const [inputPhone, setInputPhone] = useState('');
  const [inputCountryCode, setInputCountryCode] = useState('+91');
  const [inputName, setInputName] = useState('');
  const [loginError, setLoginError] = useState('');

  const refreshCartState = () => {
    const user = getActiveUser();
    setActiveUserSession(user);
    if (user) {
      setCartItems(getUserCartItems());
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    refreshCartState();

    const handleUpdate = () => {
      refreshCartState();
    };

    window.addEventListener('narpavi:cart-updated', handleUpdate);
    window.addEventListener('narpavi:user-session-changed', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('narpavi:cart-updated', handleUpdate);
      window.removeEventListener('narpavi:user-session-changed', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handlePhoneLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError('');

    const phoneDigits = inputPhone.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 7) {
      setLoginError('Please enter a valid mobile number');
      return;
    }

    const fullPhone = `${inputCountryCode} ${phoneDigits}`.trim();
    setActiveUser(fullPhone, inputName);
    refreshCartState();
  };

  const handleLogout = () => {
    logoutUser();
    refreshCartState();
  };

  const handleRemove = (id: string) => {
    const updated = removeFromCart(id);
    setCartItems(updated);
  };

  const handleClearAll = () => {
    clearUserCart();
    setCartItems([]);
  };

  const handleBookItem = async (item: CartItem) => {
    setBookingStatus((prev) => ({ ...prev, [item.id]: 'submitting' }));
    setStatusMessages((prev) => ({ ...prev, [item.id]: '' }));

    const payload = {
      name: item.name,
      countryCode: item.phoneFull.split(' ')[0] || '+91',
      phone: item.phoneFull.split(' ').slice(1).join(' ') || item.phoneFull,
      phoneFull: item.phoneFull,
      city: item.city,
      serviceStartDate: item.serviceStartDate,
      packageName: item.packageName,
      enquiryFor: item.enquiryFor || item.title,
      sourcePath: item.sourcePath || '/cart',
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/care-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      setBookingStatus((prev) => ({ ...prev, [item.id]: 'success' }));
      setStatusMessages((prev) => ({
        ...prev,
        [item.id]: `Booking confirmed for ${item.title}! Our care advisor will contact you at ${item.phoneFull} shortly.`,
      }));

      setTimeout(() => {
        handleRemove(item.id);
      }, 3500);
    } catch {
      setBookingStatus((prev) => ({ ...prev, [item.id]: 'error' }));
      setStatusMessages((prev) => ({
        ...prev,
        [item.id]: 'Unable to submit booking right now. Please try again or reach out to our team.',
      }));
    }
  };

  const handleBookAll = async () => {
    if (cartItems.length === 0) return;
    setIsBookingAll(true);
    setBulkMessage('');

    let successCount = 0;
    for (const item of cartItems) {
      try {
        const payload = {
          name: item.name,
          countryCode: item.phoneFull.split(' ')[0] || '+91',
          phone: item.phoneFull.split(' ').slice(1).join(' ') || item.phoneFull,
          phoneFull: item.phoneFull,
          city: item.city,
          serviceStartDate: item.serviceStartDate,
          packageName: item.packageName,
          enquiryFor: item.enquiryFor || item.title,
          sourcePath: item.sourcePath || '/cart',
          submittedAt: new Date().toISOString(),
        };

        const response = await fetch('/api/care-assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          successCount++;
        }
      } catch {
        // continue
      }
    }

    setIsBookingAll(false);
    if (successCount > 0) {
      setBulkMessage(`Successfully booked ${successCount} care item(s)! Our team will contact you shortly.`);
      setTimeout(() => {
        clearUserCart();
        setCartItems([]);
      }, 3000);
    } else {
      setBulkMessage('Failed to submit bookings. Please try individual bookings or call support.');
    }
  };

  return (
    <div className="cart-page-v2">
      {/* HEADER HERO */}
      <section className="cart-v2-hero">
        <div className="container">
          <div className="cart-v2-hero__breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Care Cart</span>
          </div>

          <div className="cart-v2-hero__header">
            <div className="cart-v2-hero__title-box">
              <span className="cart-v2-hero__tag">
                <ShoppingBag size={16} /> Saved Care Enquiries
              </span>
              <h1>Your Individual Care Cart</h1>
              <p>
                Review your personal saved care packages, nurse assessments, and equipment inquiries.
                Your saved items are securely tied to your mobile account.
              </p>
            </div>

            <div className="cart-v2-hero__badges">
              <div className="cart-v2-hero-badge">
                <Clock size={18} />
                <div>
                  <strong>15-Min Response</strong>
                  <small>Fast Care Advisor Callback</small>
                </div>
              </div>

              <div className="cart-v2-hero-badge">
                <ShieldCheck size={18} />
                <div>
                  <strong>Individual Cart</strong>
                  <small>Mobile Account Scoped</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="container cart-v2-main">
        {!activeUser ? (
          /* LOGIN REQUIRED CARD */
          <div className="cart-v2-login-card">
            <div className="cart-v2-login-card__icon">
              <Lock size={42} />
            </div>
            <h2>Access Your Saved Care Cart</h2>
            <p>
              Please enter your mobile number to log in and view your individual saved care packages and assessment inquiries.
            </p>

            <form className="cart-v2-login-form" onSubmit={handlePhoneLogin}>
              <div className="cart-v2-login-fields">
                <div className="cart-v2-phone-group">
                  <select
                    value={inputCountryCode}
                    onChange={(e) => setInputCountryCode(e.target.value)}
                    aria-label="Country Code"
                  >
                    <option value="+91">India (+91)</option>
                    <option value="+1">USA/Canada (+1)</option>
                    <option value="+44">UK (+44)</option>
                    <option value="+971">UAE (+971)</option>
                    <option value="+65">Singapore (+65)</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Enter Mobile Number"
                    value={inputPhone}
                    onChange={(e) => setInputPhone(e.target.value)}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                />
              </div>

              {loginError && <p className="cart-v2-login-error">{loginError}</p>}

              <button type="submit" className="btn btn--primary cart-v2-login-btn">
                <LogIn size={18} /> View My Saved Cart
              </button>
            </form>
          </div>
        ) : (
          /* LOGGED IN VIEW */
          <>
            {/* USER BAR */}
            <div className="cart-v2-user-bar">
              <div className="cart-v2-user-bar__info">
                <User size={20} className="text-teal-600" />
                <div>
                  <small>Viewing Cart for Mobile Account</small>
                  <strong>{activeUser.name ? `${activeUser.name} (${activeUser.phone})` : activeUser.phone}</strong>
                </div>
              </div>

              <button type="button" className="cart-v2-logout-btn" onClick={handleLogout}>
                <LogOut size={16} /> Switch Account / Logout
              </button>
            </div>

            {bulkMessage && (
              <div className="cart-v2-bulk-alert" role="alert">
                <CheckCircle2 size={22} />
                <span>{bulkMessage}</span>
              </div>
            )}

            {cartItems.length === 0 ? (
              <div className="cart-v2-empty">
                <div className="cart-v2-empty__graphic">
                  <div className="cart-v2-empty__icon-bg">
                    <ShoppingBag size={54} />
                  </div>
                  <Sparkles className="cart-v2-empty__sparkle" size={28} />
                </div>

                <h2>No Saved Care Items Found for {activeUser.phone}</h2>
                <p>
                  You currently have no saved care packages or assessment inquiries under this mobile number. Explore our nurse-supervised
                  home care services and save your preferences to book later.
                </p>

                <div className="cart-v2-empty__categories">
                  <Link href="/home-nursing-care" className="cart-v2-category-card">
                    <Activity size={24} />
                    <div>
                      <strong>Home Nursing Care</strong>
                      <small>Basic, Advanced & ICU Care</small>
                    </div>
                    <ArrowRight size={18} />
                  </Link>

                  <Link href="/elder-care" className="cart-v2-category-card">
                    <HeartHandshake size={24} />
                    <div>
                      <strong>Elder Care Services</strong>
                      <small>Companion & Mobility Support</small>
                    </div>
                    <ArrowRight size={18} />
                  </Link>

                  <Link href="/baby-care" className="cart-v2-category-card">
                    <Sparkles size={24} />
                    <div>
                      <strong>Baby & Mother Care</strong>
                      <small>Newborn & Postnatal Care</small>
                    </div>
                    <ArrowRight size={18} />
                  </Link>

                  <Link href="/medical-equipment" className="cart-v2-category-card">
                    <ShieldCheck size={24} />
                    <div>
                      <strong>Medical Equipment</strong>
                      <small>Rent & Buy ICU Devices</small>
                    </div>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="cart-v2-grid">
                {/* ITEMS LIST */}
                <div className="cart-v2-left">
                  <div className="cart-v2-bar">
                    <div className="cart-v2-bar__info">
                      <ShoppingBag size={18} />
                      <span>
                        Individual Saved Items: <strong>{cartItems.length} Enquiry / Booking{cartItems.length > 1 ? 's' : ''}</strong>
                      </span>
                    </div>

                    <div className="cart-v2-bar__actions">
                      {cartItems.length > 1 && (
                        <button
                          type="button"
                          className="btn btn--primary btn--sm cart-v2-bulk-btn"
                          onClick={handleBookAll}
                          disabled={isBookingAll}
                        >
                          {isBookingAll ? 'Booking All...' : 'Book All Saved Services'} <ArrowRight size={16} />
                        </button>
                      )}
                      <button type="button" className="cart-v2-clear-link" onClick={handleClearAll}>
                        <Trash2 size={15} /> Clear Cart
                      </button>
                    </div>
                  </div>

                  <div className="cart-v2-list">
                    {cartItems.map((item, index) => {
                      const status = bookingStatus[item.id];
                      const message = statusMessages[item.id];

                      return (
                        <article className="cart-v2-card" key={item.id}>
                          <div className="cart-v2-card__top">
                            <div className="cart-v2-card__header-text">
                              <span className="cart-v2-card__tag">Saved Item #{index + 1}</span>
                              <h3>{item.title || item.enquiryFor || 'Home Care Assessment'}</h3>
                            </div>

                            <div className="cart-v2-card__price-badge">
                              <strong>FREE</strong>
                              <small>Assessment</small>
                            </div>
                          </div>

                          <div className="cart-v2-card__grid">
                            <div className="cart-v2-info-pill">
                              <User size={18} className="cart-v2-pill-icon" />
                              <div>
                                <label>Patient / Contact</label>
                                <span>{item.name}</span>
                              </div>
                            </div>

                            <div className="cart-v2-info-pill">
                              <Phone size={18} className="cart-v2-pill-icon" />
                              <div>
                                <label>Phone Number</label>
                                <span>{item.phoneFull}</span>
                              </div>
                            </div>

                            <div className="cart-v2-info-pill">
                              <MapPin size={18} className="cart-v2-pill-icon" />
                              <div>
                                <label>City / Location</label>
                                <span>{item.city}</span>
                              </div>
                            </div>

                            <div className="cart-v2-info-pill">
                              <Calendar size={18} className="cart-v2-pill-icon" />
                              <div>
                                <label>Requested Start Date</label>
                                <span>{item.serviceStartDate || 'Flexible / Immediately'}</span>
                              </div>
                            </div>
                          </div>

                          {item.packageName && item.packageName !== item.title && (
                            <div className="cart-v2-card__package-strip">
                              <Check size={16} /> Selected Package: <strong>{item.packageName}</strong>
                            </div>
                          )}

                          {status === 'success' ? (
                            <div className="cart-v2-card__success-box">
                              <CheckCircle2 size={24} />
                              <div>
                                <strong>Booking Confirmed!</strong>
                                <p>{message}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="cart-v2-card__footer">
                              {status === 'error' && (
                                <p className="cart-v2-card__error">{message}</p>
                              )}

                              <button
                                type="button"
                                className="btn btn--primary cart-v2-book-btn"
                                onClick={() => handleBookItem(item)}
                                disabled={status === 'submitting'}
                              >
                                {status === 'submitting' ? 'Confirming...' : 'Book Now'} <ArrowRight size={17} />
                              </button>

                              <button
                                type="button"
                                className="cart-v2-remove-btn"
                                onClick={() => handleRemove(item.id)}
                                title="Remove item"
                              >
                                <Trash2 size={16} /> Remove
                              </button>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </div>

                {/* SIDEBAR */}
                <aside className="cart-v2-sidebar">
                  <div className="cart-v2-summary-card">
                    <h3>Care Booking Summary</h3>
                    <div className="cart-v2-summary-rows">
                      <div className="cart-v2-summary-row">
                        <span>Account Holder</span>
                        <strong>{activeUser.phone}</strong>
                      </div>

                      <div className="cart-v2-summary-row">
                        <span>Individual Saved Items</span>
                        <strong>{cartItems.length} Service{cartItems.length > 1 ? 's' : ''}</strong>
                      </div>

                      <div className="cart-v2-summary-row">
                        <span>Initial Nurse Assessment</span>
                        <strong className="text-emerald-600">FREE (₹0)</strong>
                      </div>

                      <div className="cart-v2-summary-row">
                        <span>Payment Terms</span>
                        <strong>Pay After Onboarding</strong>
                      </div>
                    </div>

                    <div className="cart-v2-guarantee-list">
                      <div className="cart-v2-guarantee-item">
                        <Check size={16} /> Verified Background-Checked Caregivers
                      </div>
                      <div className="cart-v2-guarantee-item">
                        <Check size={16} /> Doctor-Supervised Care Protocols
                      </div>
                      <div className="cart-v2-guarantee-item">
                        <Check size={16} /> Easy Caregiver Replacement Option
                      </div>
                    </div>
                  </div>

                  {/* DIRECT CONTACT ASSISTANCE */}
                  <div className="cart-v2-help-card">
                    <h4><Phone size={18} /> Need Immediate Assistance?</h4>
                    <p>Speak directly with our clinical care advisor to customize your care plan.</p>
                    <div className="cart-v2-help-buttons">
                      <a href={`tel:${BRAND.phone.replace(/\s+/g, '')}`} className="btn btn--secondary cart-v2-call-btn">
                        <SiteIcon name="Phone" size={16} /> Call Care Advisor
                      </a>
                      <span className="cart-v2-call-timing"><Clock size={14} /> Available: 8:00 AM – 6:00 PM</span>
                      <a
                        href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20Narpavi%20Homecare,%20I%20have%20questions%20about%20my%20saved%20care%20cart.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--outline cart-v2-wa-btn"
                      >
                        <MessageCircle size={16} /> WhatsApp Us
                      </a>
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
