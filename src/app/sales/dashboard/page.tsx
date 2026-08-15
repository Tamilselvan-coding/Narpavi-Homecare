'use client';

import { FormEvent, useCallback, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  RefreshCw,
  Users,
  UserCheck,
  Phone,
  ClipboardList,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  PhoneCall,
  Clock,
  ArrowRight,
  Shield,
  Star,
  User,
  Send,
  Edit3,
  Search,
  Filter,
  BarChart3,
  Target,
  CalendarClock,
  Sparkles,
  ArrowUpRight,
  X,
  UserRoundCheck,
  MessageCircle,
  Copy,
  TrendingUp,
  Eye,
  Award,
  Activity,
  Zap,
  Hash,
  Timer,
  Crown,
  ExternalLink,
  ChevronRight,
  Flame,
  Bell,
} from 'lucide-react';

/* ──────────────── Types ──────────────── */
type Session = { id?: number; username: string; fullName?: string; role: string };
type Lead = {
  lead_type: string;
  lead_id: number;
  name: string;
  phone: string;
  detail: string;
  package_name?: string;
  enquiry_for?: string;
  service_start_date?: string;
  source_path?: string;
  allocated_to_id?: number;
  allocated_to_name?: string;
  lead_status?: string;
  notes?: string;
};
type Staff = {
  id: number;
  fullName: string;
  role: string;
  status?: string;
  managerId?: number | null;
  teamLeadId?: number | null;
  tlApprovalStatus?: string;
};

/* ──────────────── Status Config ──────────────── */
const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'QUALIFIED', 'UNQUALIFIED', 'FOLLOW_UP', 'CLOSED'] as const;

function statusStyle(status: string): { bg: string; color: string; icon: React.ReactNode } {
  switch (status?.toUpperCase()) {
    case 'CONTACTED':
      return { bg: '#dbeafe', color: '#1e40af', icon: <PhoneCall size={12} /> };
    case 'QUALIFIED':
      return { bg: '#dcfce7', color: '#166534', icon: <CheckCircle size={12} /> };
    case 'UNQUALIFIED':
      return { bg: '#fee2e2', color: '#991b1b', icon: <XCircle size={12} /> };
    case 'FOLLOW_UP':
      return { bg: '#fef3c7', color: '#92400e', icon: <Clock size={12} /> };
    case 'CLOSED':
      return { bg: '#f1f5f9', color: '#475569', icon: <CheckCircle size={12} /> };
    default:
      return { bg: '#f0fdfa', color: '#0f766e', icon: <AlertCircle size={12} /> };
  }
}

function roleConfig(role: string) {
  switch (role?.toUpperCase()) {
    case 'MANAGER':
    case 'ADMIN':
      return { label: 'Manager', icon: <Shield size={14} />, bg: '#f3e8ff', color: '#7e22ce' };
    case 'TEAM_LEAD':
      return { label: 'Team Lead', icon: <Star size={14} />, bg: '#fef3c7', color: '#92400e' };
    case 'EXECUTIVE':
      return { label: 'Executive', icon: <User size={14} />, bg: '#e0f2fe', color: '#0369a1' };
    case 'TELECALLER':
      return { label: 'Telecaller', icon: <PhoneCall size={14} />, bg: '#e0f2fe', color: '#0369a1' };
    default:
      return { label: role, icon: <User size={14} />, bg: '#f1f5f9', color: '#475569' };
  }
}

function leadTypeLabel(type: string) {
  switch (type) {
    case 'CARE_ASSESSMENT': return 'Care Assessment';
    case 'DOWNLOAD': return 'Blog Download';
    default: return type?.replace(/_/g, ' ') || '—';
  }
}

function detectCareCategory(item: { source_path?: string; package_name?: string; enquiry_for?: string; detail?: string }): {
  label: string;
  bg: string;
  color: string;
} {
  const text = `${item.source_path || ''} ${item.package_name || ''} ${item.enquiry_for || ''} ${item.detail || ''}`.toLowerCase();

  if (text.includes('elder') || text.includes('senior') || text.includes('companion') || text.includes('dementia') || text.includes('stroke') || text.includes('parkinson') || text.includes('golden') || text.includes('graceful') || text.includes('falls')) {
    return { label: 'Elder Care', bg: '#fef3c7', color: '#92400e' };
  }
  if (text.includes('baby') || text.includes('mother') || text.includes('newborn') || text.includes('postnatal') || text.includes('infant') || text.includes('pediatric') || text.includes('nanny') || text.includes('premature')) {
    return { label: 'Baby & Mother Care', bg: '#fce7f3', color: '#9d174d' };
  }
  if (text.includes('icu') || text.includes('ventilator') || text.includes('critical')) {
    return { label: 'ICU at Home', bg: '#fee2e2', color: '#991b1b' };
  }
  if (text.includes('specialty') || text.includes('tracheostomy') || text.includes('palliative') || text.includes('chemotherapy') || text.includes('dialysis') || text.includes('wound') || text.includes('stoma') || text.includes('colostomy') || text.includes('ileostomy')) {
    return { label: 'Specialty Care', bg: '#f3e8ff', color: '#6b21a8' };
  }
  if (text.includes('advance') || text.includes('post-op') || text.includes('cardiac') || text.includes('neuro') || text.includes('ortho') || text.includes('catheter') || text.includes('iv-')) {
    return { label: 'Advance Nursing Care', bg: '#e0e7ff', color: '#3730a3' };
  }
  if (text.includes('equipment') || text.includes('rent') || text.includes('buy') || text.includes('oxygen') || text.includes('bed')) {
    return { label: 'Medical Equipment', bg: '#e0f2fe', color: '#0369a1' };
  }
  return { label: 'Home Nursing Care', bg: '#ccfbf1', color: '#0f766e' };
}

/* ──────────────── Main Component ──────────────── */
export default function SalesDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Staff[]>([]);
  const [assignment, setAssignment] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'info' }>({ show: false, message: '', type: 'info' });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'CARE_ASSESSMENT' | 'DOWNLOAD'>('ALL');
  const [allocationFilter, setAllocationFilter] = useState<'ALL' | 'ALLOCATED' | 'UNASSIGNED'>('ALL');
  const [selectedExecutive, setSelectedExecutive] = useState<Staff | null>(null);
  const [roleChoices, setRoleChoices] = useState<Record<number, string>>({});
  const [teamLeadChoices, setTeamLeadChoices] = useState<Record<number, string>>({});
  const [approvalBusy, setApprovalBusy] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const role = session?.role === 'ADMIN' ? 'MANAGER' : session?.role;
  const isManager = role === 'MANAGER';
  const isTeamLead = role === 'TEAM_LEAD';
  const canAssign = isManager || isTeamLead;
  const isExecutive = role === 'EXECUTIVE' || role === 'TELECALLER';
  const key = (lead: Lead) => `${lead.lead_type}-${lead.lead_id}`;

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ show: true, message, type });
    toastTimer.current = setTimeout(() => setToast(prev => ({ ...prev, show: false })), 4000);
  };

  const load = useCallback(async (current: Session) => {
    setLoading(true);
    const normalized = current.role === 'ADMIN' ? 'MANAGER' : current.role;
    try {
      let response = await fetch(`/api/sales/workspace?actorId=${current.id || ''}&role=${normalized}`);
      if (!response.ok) {
        response = await fetch(`http://127.0.0.1:8085/api/sales/workspace?actorId=${current.id || ''}&role=${normalized}`);
      }
      const data = await response.json();
      if (response.ok) {
        setLeads(data.leads || []);
        setStaff(data.staff || []);
        setPendingRequests(data.pendingRequests || []);
        if (current.id && Array.isArray(data.staff)) {
          const dbUser = data.staff.find((s: Staff) => String(s.id) === String(current.id));
          if (dbUser && dbUser.role) {
            const dbRole = dbUser.role.toUpperCase();
            if (dbRole !== current.role) {
              const updatedSession = { ...current, role: dbRole, fullName: dbUser.fullName || current.fullName };
              setSession(updatedSession);
              localStorage.setItem('narpavi_admin_session', JSON.stringify(updatedSession));
            }
          }
        }
      } else {
        showToast(data.message || 'Could not load leads', 'error');
      }
    } catch {
      try {
        const directResponse = await fetch(`http://127.0.0.1:8085/api/sales/workspace?actorId=${current.id || ''}&role=${normalized}`);
        if (directResponse.ok) {
          const data = await directResponse.json();
          setLeads(data.leads || []);
          setStaff(data.staff || []);
          setPendingRequests(data.pendingRequests || []);
          if (current.id && Array.isArray(data.staff)) {
            const dbUser = data.staff.find((s: Staff) => String(s.id) === String(current.id));
            if (dbUser && dbUser.role) {
              const dbRole = dbUser.role.toUpperCase();
              if (dbRole !== current.role) {
                const updatedSession = { ...current, role: dbRole, fullName: dbUser.fullName || current.fullName };
                setSession(updatedSession);
                localStorage.setItem('narpavi_admin_session', JSON.stringify(updatedSession));
              }
            }
          }
        } else {
          showToast('Sales server is unavailable', 'error');
        }
      } catch {
        showToast('Sales server is unavailable', 'error');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem('narpavi_admin_session');
    if (!raw) { router.replace('/admin/login'); return; }
    const current = JSON.parse(raw) as Session;
    setSession(current);
    load(current);
    setMounted(true);
  }, [load, router]);

  async function assign(lead: Lead) {
    const executiveId = Number(assignment[key(lead)]);
    if (!executiveId || !session) return showToast('Please choose an executive first.', 'error');
    try {
      const res = await fetch('/api/sales/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actorId: session.id,
          actorRole: role,
          executiveId,
          leadType: lead.lead_type,
          leadId: lead.lead_id,
        }),
      });
      const data = await res.json();
      showToast(data.message, res.ok ? 'success' : 'error');
      if (res.ok) load(session);
    } catch {
      showToast('Failed to allocate lead', 'error');
    }
  }

  async function pickUp(lead: Lead) {
    if (!session?.id) return;
    try {
      const res = await fetch('/api/sales/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actorId: session.id,
          leadType: lead.lead_type,
          leadId: lead.lead_id,
        }),
      });
      const data = await res.json();
      showToast(data.message, res.ok ? 'success' : 'error');
      if (res.ok) load(session);
    } catch {
      showToast('Failed to pick up lead', 'error');
    }
  }

  async function update(e: FormEvent, lead: Lead) {
    e.preventDefault();
    if (!session) return;
    const form = new FormData(e.currentTarget as HTMLFormElement);
    try {
      const res = await fetch('/api/sales/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actorId: session.id,
          actorRole: role,
          leadType: lead.lead_type,
          leadId: lead.lead_id,
          status: form.get('status'),
          notes: notes[key(lead)] || '',
        }),
      });
      const data = await res.json();
      showToast(data.message, res.ok ? 'success' : 'error');
      if (res.ok) load(session);
    } catch {
      showToast('Failed to update lead', 'error');
    }
  }

  async function approvalAction(action: 'configure' | 'finalApprove' | 'reject' | 'tlApprove' | 'tlReject', userId: number, payload: Record<string, unknown> = {}) {
    if (!session?.id) return showToast('Please sign in again before taking this action.', 'error');
    setApprovalBusy(userId);
    try {
      const res = await fetch(`/api/sales/approval/${action}?id=${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actorId: session.id, ...payload }),
      });
      const data = await res.json();
      showToast(data.message || 'Action completed', res.ok ? 'success' : 'error');
      if (res.ok) load(session);
    } catch {
      showToast('Approval action failed. Please retry.', 'error');
    } finally {
      setApprovalBusy(null);
    }
  }

  function configureAccount(user: Staff) {
    const selectedRole = roleChoices[user.id] || user.role || 'EXECUTIVE';
    const payload: Record<string, unknown> = { role: selectedRole, allowedTabs: 'sales' };
    if (selectedRole !== 'TEAM_LEAD') {
      const teamLeadId = Number(teamLeadChoices[user.id] || user.teamLeadId || '');
      if (!teamLeadId) return showToast('Choose a Team Lead for this Executive/Telecaller.', 'error');
      payload.teamLeadId = teamLeadId;
    }
    approvalAction('configure', user.id, payload);
  }

  if (!session) return null;

  const executives = staff.filter(s => {
    const r = s.role?.toUpperCase();
    return (r === 'EXECUTIVE' || r === 'TELECALLER') && s.status === 'APPROVED';
  });

  // Executive/Telecaller sees ONLY their allocated leads
  const baseLeads = isExecutive ? leads.filter(l => l.allocated_to_id === session?.id) : leads;

  // Filtering
  const filteredLeads = baseLeads.filter(lead => {
    const matchesSearch = !searchQuery.trim() ||
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.detail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.package_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.enquiry_for?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.allocated_to_name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'ALL' || lead.lead_type === typeFilter;

    const matchesAllocation = isExecutive ? true : (allocationFilter === 'ALL' ||
      (allocationFilter === 'ALLOCATED' ? Boolean(lead.allocated_to_id) : !lead.allocated_to_id));

    const matchesStatus = statusFilter === 'ALL' ||
      (statusFilter === 'UNASSIGNED' ? !lead.allocated_to_id : (lead.lead_status || 'NEW').toUpperCase() === statusFilter);

    return matchesSearch && matchesType && matchesAllocation && matchesStatus;
  });

  const allocatedLeads = leads.filter(l => Boolean(l.allocated_to_id));
  const myLeads = leads.filter(l => l.allocated_to_id === session.id);
  const unassignedCount = leads.filter(l => !l.allocated_to_id).length;
  const followUpCount = isExecutive
    ? myLeads.filter(l => (l.lead_status || '').toUpperCase() === 'FOLLOW_UP').length
    : leads.filter(l => (l.lead_status || '').toUpperCase() === 'FOLLOW_UP').length;
  const qualifiedCount = isExecutive
    ? myLeads.filter(l => (l.lead_status || '').toUpperCase() === 'QUALIFIED').length
    : leads.filter(l => (l.lead_status || '').toUpperCase() === 'QUALIFIED').length;
  const approvedTeamLeads = staff.filter((member) => member.role?.toUpperCase() === 'TEAM_LEAD' && member.status === 'APPROVED');
  const allocationMetricLabel = isExecutive ? 'My allocated' : role === 'TEAM_LEAD' ? 'Team allocated' : 'Allocated leads';
  const allocationMetricValue = isExecutive ? myLeads.length : allocatedLeads.length;
  const roleCfg = roleConfig(role || '');

  return (
    <main style={{
      maxWidth: 1400,
      margin: '0 auto',
      padding: '130px 24px 60px',
      color: '#0f172a',
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      minHeight: '100vh',
      background: '#f8fafc',
      opacity: mounted ? 1 : 0,
      transition: 'opacity 0.4s ease',
    }}>
      {/* ═══════════ HEADER ═══════════ */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        marginBottom: 28,
        flexWrap: 'wrap',
        padding: '24px 32px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #0f766e 100%)',
        borderRadius: 24,
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 12px 36px rgba(15, 23, 42, 0.16)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle Ambient Glow */}
        <div style={{
          position: 'absolute', top: '-40%', right: '-10%', width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{
              padding: '4px 12px',
              borderRadius: 9999,
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.6px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
            }}>
              ✨ Executive Suite
            </span>
            <span style={{
              padding: '4px 12px',
              borderRadius: 9999,
              fontSize: '0.72rem',
              fontWeight: 800,
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
            }}>
              {roleCfg.icon} {roleCfg.label}
            </span>
          </div>
          <h1 style={{ margin: 0, fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Welcome back, {session.fullName || session.username} 👋
          </h1>
          <p style={{ margin: '6px 0 0', color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', fontWeight: 500 }}>
            {canAssign
              ? 'Manage, track & allocate incoming leads to your sales team seamlessly.'
              : 'Track and update your assigned home care leads below.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', zIndex: 1 }}>
          <button onClick={() => load(session)} disabled={loading} style={{
            ...btnBase,
            background: 'rgba(255, 255, 255, 0.12)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            opacity: loading ? 0.6 : 1,
            transition: 'all 0.2s ease',
          }}>
            <RefreshCw size={15} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} /> Refresh
          </button>
          {role === 'MANAGER' && (
            <button onClick={() => document.getElementById('team-approvals')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} style={{
              ...btnBase,
              background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(126, 34, 206, 0.3)',
            }}>
              <ClipboardList size={15} /> Staff approvals
            </button>
          )}
          <button onClick={() => {
            localStorage.removeItem('narpavi_admin_session');
            window.dispatchEvent(new Event('narpavi:admin-session-changed'));
            router.push('/admin/login');
          }} style={{
            ...btnBase,
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#fca5a5',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}>
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </header>

      {/* ═══════════ METRICS ═══════════ */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 14,
        marginBottom: 24,
      }}>
        <MetricCard
          icon={<ClipboardList size={22} />}
          label={isExecutive ? "My Total Leads" : "Total Leads"}
          value={isExecutive ? myLeads.length : leads.length}
          color="#0a8f8f"
          delay={0}
        />
        <MetricCard
          icon={<UserCheck size={22} />}
          label={allocationMetricLabel}
          value={allocationMetricValue}
          color="#3b82f6"
          delay={80}
        />
        {!isExecutive && (
          <MetricCard
            icon={<AlertCircle size={22} />}
            label="Unassigned"
            value={unassignedCount}
            color="#f59e0b"
            delay={160}
          />
        )}
        <MetricCard
          icon={<Flame size={22} />}
          label="Follow-ups Due"
          value={followUpCount}
          color="#ef4444"
          delay={240}
        />
        <MetricCard
          icon={<TrendingUp size={22} />}
          label="Qualified"
          value={qualifiedCount}
          color="#10b981"
          delay={320}
        />
        {!isExecutive && (
          <MetricCard
            icon={<Users size={22} />}
            label="Active Executives"
            value={executives.length}
            color="#8b5cf6"
            delay={400}
          />
        )}
      </section>

      {/* ═══════════ EXECUTIVE / TELECALLER — MY LEAD SUMMARY ═══════════ */}
      {isExecutive && myLeads.length > 0 && (
        <section style={{
          marginBottom: 24,
          padding: '22px 24px',
          borderRadius: 20,
          background: 'linear-gradient(135deg, #ecfeff 0%, #f0fdfa 50%, #f0fdf4 100%)',
          border: '1px solid rgba(10, 143, 143, 0.15)',
          boxShadow: '0 4px 20px rgba(10, 143, 143, 0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{
              padding: '4px 10px',
              borderRadius: 8,
              fontSize: '0.72rem',
              fontWeight: 800,
              background: role === 'TELECALLER' ? '#dbeafe' : '#e0f2fe',
              color: role === 'TELECALLER' ? '#1e40af' : '#0369a1',
              letterSpacing: '0.05em',
            }}>
              {role === 'TELECALLER' ? '📞 TELECALLER' : '💼 SALES EXECUTIVE'} DASHBOARD
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            <div style={{ padding: '14px 16px', borderRadius: 14, background: '#fff', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0a8f8f' }}>{myLeads.length}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>My Leads</div>
            </div>
            <div style={{ padding: '14px 16px', borderRadius: 14, background: '#fff', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3b82f6' }}>
                {myLeads.filter(l => ['CONTACTED', 'QUALIFIED', 'UNQUALIFIED', 'FOLLOW_UP', 'CLOSED'].includes((l.lead_status || '').toUpperCase())).length}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Contacted</div>
            </div>
            <div style={{ padding: '14px 16px', borderRadius: 14, background: '#fff', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>
                {myLeads.filter(l => (l.lead_status || '').toUpperCase() === 'QUALIFIED').length}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Qualified</div>
            </div>
            <div style={{ padding: '14px 16px', borderRadius: 14, background: '#fff', border: '1px solid #e2e8f0', position: 'relative' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ef4444' }}>
                {myLeads.filter(l => (l.lead_status || '').toUpperCase() === 'FOLLOW_UP').length}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Follow-ups</div>
              {myLeads.filter(l => (l.lead_status || '').toUpperCase() === 'FOLLOW_UP').length > 0 && (
                <span style={{
                  position: 'absolute', top: 8, right: 8, width: 8, height: 8,
                  borderRadius: '50%', background: '#ef4444',
                  animation: 'pulse 2s ease-in-out infinite',
                }} />
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ MANAGER — TEAM LEAD PERFORMANCE OVERVIEW ═══════════ */}
      {role === 'MANAGER' && approvedTeamLeads.length > 0 && (
        <section style={{
          marginBottom: 24,
          borderRadius: 22,
          overflow: 'hidden',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
        }}>
          <div style={{
            padding: '18px 24px',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #6d28d9 100%)',
            color: '#fff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: '1rem' }}>
              <Crown size={18} /> Team Lead Performance Overview
            </div>
            <p style={{ margin: '5px 0 0', color: '#ddd6fe', fontSize: '0.84rem' }}>
              Monitor each Team Lead&apos;s team performance, lead distribution, and conversion metrics.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, padding: 20 }}>
            {approvedTeamLeads.map((tl) => {
              const tlExecutives = staff.filter(s => s.teamLeadId === tl.id && (s.role?.toUpperCase() === 'EXECUTIVE' || s.role?.toUpperCase() === 'TELECALLER') && s.status === 'APPROVED');
              const tlLeads = leads.filter(l => tlExecutives.some(ex => ex.id === l.allocated_to_id));
              const tlQualified = tlLeads.filter(l => (l.lead_status || '').toUpperCase() === 'QUALIFIED').length;
              const tlContacted = tlLeads.filter(l => ['CONTACTED', 'QUALIFIED', 'UNQUALIFIED', 'FOLLOW_UP', 'CLOSED'].includes((l.lead_status || '').toUpperCase())).length;
              const conversionRate = tlLeads.length > 0 ? Math.round((tlQualified / tlLeads.length) * 100) : 0;
              return (
                <article key={tl.id} style={{
                  padding: '18px',
                  borderRadius: 16,
                  border: '1px solid #ede9fe',
                  background: 'linear-gradient(135deg, #faf5ff 0%, #f5f3ff 100%)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'default',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(109, 40, 217, 0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                      display: 'grid', placeItems: 'center',
                      color: '#fff', fontWeight: 800, fontSize: '1rem',
                    }}>
                      {tl.fullName?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <strong style={{ color: '#1e1b4b', fontSize: '0.95rem' }}>{tl.fullName}</strong>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                        <span style={{ padding: '2px 7px', borderRadius: 5, background: '#fef3c7', color: '#92400e', fontSize: '0.68rem', fontWeight: 800 }}>
                          <Star size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} /> Team Lead
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{tlExecutives.length} members</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
                    <div style={{ textAlign: 'center', padding: '8px 4px', borderRadius: 10, background: '#fff', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a8f8f' }}>{tlLeads.length}</div>
                      <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600 }}>Total</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '8px 4px', borderRadius: 10, background: '#fff', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#3b82f6' }}>{tlContacted}</div>
                      <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600 }}>Contacted</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '8px 4px', borderRadius: 10, background: '#fff', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10b981' }}>{tlQualified}</div>
                      <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600 }}>Qualified</div>
                    </div>
                  </div>
                  {/* Conversion Rate Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, height: 8, borderRadius: 999, background: '#e2e8f0', overflow: 'hidden' }}>
                      <div style={{
                        width: `${conversionRate}%`,
                        height: '100%',
                        borderRadius: 999,
                        background: conversionRate > 50 ? 'linear-gradient(90deg, #10b981, #34d399)' : conversionRate > 25 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' : 'linear-gradient(90deg, #ef4444, #f87171)',
                        transition: 'width 0.6s ease',
                      }} />
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: conversionRate > 50 ? '#10b981' : conversionRate > 25 ? '#f59e0b' : '#ef4444', minWidth: 38 }}>
                      {conversionRate}%
                    </span>
                  </div>
                  <div style={{ marginTop: 4, fontSize: '0.7rem', color: '#94a3b8', textAlign: 'right' }}>conversion rate</div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {role === 'TEAM_LEAD' && (
        <TeamLeadControlRoom
          leads={leads}
          executives={executives}
          unassignedCount={unassignedCount}
          followUpCount={followUpCount}
          qualifiedCount={qualifiedCount}
          onOpenMember={setSelectedExecutive}
          onShowQueue={() => { setAllocationFilter('UNASSIGNED'); setStatusFilter('ALL'); }}
          onShowFollowUps={() => { setStatusFilter('FOLLOW_UP'); setAllocationFilter('ALL'); }}
        />
      )}

      {role === 'MANAGER' && (
        <ManagerApprovalBoard
          users={pendingRequests}
          teamLeads={approvedTeamLeads}
          roleChoices={roleChoices}
          teamLeadChoices={teamLeadChoices}
          busyId={approvalBusy}
          onRoleChange={(id, value) => setRoleChoices({ ...roleChoices, [id]: value })}
          onTeamLeadChange={(id, value) => setTeamLeadChoices({ ...teamLeadChoices, [id]: value })}
          onConfigure={configureAccount}
          onFinalApprove={(user) => approvalAction('finalApprove', user.id, { allowedTabs: 'sales' })}
          onReject={(user) => approvalAction('reject', user.id)}
        />
      )}

      {role === 'TEAM_LEAD' && (
        <TeamLeadApprovalBoard
          users={pendingRequests}
          busyId={approvalBusy}
          onApprove={(user) => approvalAction('tlApprove', user.id)}
          onReject={(user) => approvalAction('tlReject', user.id)}
        />
      )}

      {/* ═══════════ VISUAL ANALYTICS & GRAPHS ═══════════ */}
      {role !== 'TEAM_LEAD' && leads.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <BarChart3 size={18} style={{ color: '#0a8f8f' }} /> Sales Performance Analytics
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            <LeadStatusDonutChart leads={leads} darkBg={false} />
            {role === 'MANAGER' && staff.filter(s => ['EXECUTIVE', 'TELECALLER'].includes((s.role || '').toUpperCase())).length > 0 && (
              <ExecutivePerformanceBarGraph
                darkBg={false}
                memberStats={staff.filter(s => ['EXECUTIVE', 'TELECALLER'].includes((s.role || '').toUpperCase())).map(member => {
                  const mLeads = leads.filter(l => l.allocated_to_id === member.id);
                  const q = mLeads.filter(l => (l.lead_status || '').toUpperCase() === 'QUALIFIED').length;
                  const c = mLeads.filter(l => ['CONTACTED', 'QUALIFIED', 'UNQUALIFIED', 'FOLLOW_UP', 'CLOSED'].includes((l.lead_status || '').toUpperCase())).length;
                  return { member, assigned: mLeads.length, contacted: c, qualified: q };
                })}
              />
            )}
          </div>
        </section>
      )}

      {/* ═══════════ CATEGORY & ALLOCATION TABS ═══════════ */}
      <div style={{
        display: 'flex',
        gap: 10,
        marginBottom: 18,
        padding: '6px',
        background: '#ffffff',
        borderRadius: 16,
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
        flexWrap: 'wrap',
      }}>
        <button
          onClick={() => { setAllocationFilter('ALL'); setTypeFilter('ALL'); }}
          style={{
            padding: '10px 18px',
            borderRadius: 12,
            border: 'none',
            background: allocationFilter === 'ALL' && typeFilter === 'ALL'
              ? 'linear-gradient(135deg, #0a8f8f 0%, #066060 100%)'
              : 'transparent',
            color: allocationFilter === 'ALL' && typeFilter === 'ALL' ? '#ffffff' : '#64748b',
            fontWeight: 800,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: allocationFilter === 'ALL' && typeFilter === 'ALL' ? '0 4px 14px rgba(10, 143, 143, 0.3)' : 'none',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {isExecutive ? '📋 My Allocated Leads' : '📋 All Leads'} <span style={{
            background: allocationFilter === 'ALL' && typeFilter === 'ALL' ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
            color: allocationFilter === 'ALL' && typeFilter === 'ALL' ? '#fff' : '#475569',
            padding: '2px 8px', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 800,
          }}>{isExecutive ? myLeads.length : leads.length}</span>
        </button>
        {!isExecutive && (
          <button
            onClick={() => setAllocationFilter('ALLOCATED')}
            style={{
              padding: '10px 18px',
              borderRadius: 12,
              border: 'none',
              background: allocationFilter === 'ALLOCATED'
                ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                : 'transparent',
              color: allocationFilter === 'ALLOCATED' ? '#ffffff' : '#64748b',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: allocationFilter === 'ALLOCATED' ? '0 4px 14px rgba(59, 130, 246, 0.3)' : 'none',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            🎯 Allocated Leads <span style={{
              background: allocationFilter === 'ALLOCATED' ? 'rgba(255,255,255,0.25)' : '#eff6ff',
              color: allocationFilter === 'ALLOCATED' ? '#fff' : '#1d4ed8',
              padding: '2px 8px', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 800,
            }}>{allocatedLeads.length}</span>
          </button>
        )}
        {!isExecutive && (
          <button
            onClick={() => setAllocationFilter('UNASSIGNED')}
            style={{
              padding: '10px 18px',
              borderRadius: 12,
              border: 'none',
              background: allocationFilter === 'UNASSIGNED'
                ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                : 'transparent',
              color: allocationFilter === 'UNASSIGNED' ? '#ffffff' : '#64748b',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: allocationFilter === 'UNASSIGNED' ? '0 4px 14px rgba(245, 158, 11, 0.3)' : 'none',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            ⚡ Unassigned Leads <span style={{
              background: allocationFilter === 'UNASSIGNED' ? 'rgba(255,255,255,0.25)' : '#fffbeb',
              color: allocationFilter === 'UNASSIGNED' ? '#fff' : '#b45309',
              padding: '2px 8px', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 800,
            }}>{unassignedCount}</span>
          </button>
        )}
        <button
          onClick={() => setTypeFilter('CARE_ASSESSMENT')}
          style={{
            padding: '10px 18px',
            borderRadius: 12,
            border: 'none',
            background: typeFilter === 'CARE_ASSESSMENT'
              ? 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)'
              : 'transparent',
            color: typeFilter === 'CARE_ASSESSMENT' ? '#ffffff' : '#64748b',
            fontWeight: 800,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: typeFilter === 'CARE_ASSESSMENT' ? '0 4px 14px rgba(15, 118, 110, 0.3)' : 'none',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          📦 Package Enquiries <span style={{
            background: typeFilter === 'CARE_ASSESSMENT' ? 'rgba(255,255,255,0.25)' : '#f0fdfa',
            color: typeFilter === 'CARE_ASSESSMENT' ? '#fff' : '#0f766e',
            padding: '2px 8px', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 800,
          }}>{baseLeads.filter(l => l.lead_type === 'CARE_ASSESSMENT').length}</span>
        </button>
        <button
          onClick={() => setTypeFilter('DOWNLOAD')}
          style={{
            padding: '10px 18px',
            borderRadius: 12,
            border: 'none',
            background: typeFilter === 'DOWNLOAD'
              ? 'linear-gradient(135deg, #7e22ce 0%, #6b21a8 100%)'
              : 'transparent',
            color: typeFilter === 'DOWNLOAD' ? '#ffffff' : '#64748b',
            fontWeight: 800,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: typeFilter === 'DOWNLOAD' ? '0 4px 14px rgba(126, 34, 206, 0.3)' : 'none',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          📑 Blog Download Leads <span style={{
            background: typeFilter === 'DOWNLOAD' ? 'rgba(255,255,255,0.25)' : '#faf5ff',
            color: typeFilter === 'DOWNLOAD' ? '#fff' : '#7e22ce',
            padding: '2px 8px', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 800,
          }}>{baseLeads.filter(l => l.lead_type === 'DOWNLOAD').length}</span>
        </button>
      </div>

      {/* ═══════════ FILTERS & SEARCH ═══════════ */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 14,
        flexWrap: 'wrap',
        marginBottom: 20,
        padding: '14px 20px',
        background: '#ffffff',
        borderRadius: 14,
        border: '1px solid #e2e8f0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.84rem', fontWeight: 700, color: '#475569' }}>
            <Filter size={14} /> Status:
          </span>
          {(isExecutive ? ['ALL', ...STATUS_OPTIONS] : ['ALL', 'UNASSIGNED', ...STATUS_OPTIONS]).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: '5px 12px',
                borderRadius: 9999,
                border: '1px solid',
                borderColor: statusFilter === s ? '#0a8f8f' : '#e2e8f0',
                background: statusFilter === s ? '#0a8f8f' : '#fff',
                color: statusFilter === s ? '#fff' : '#475569',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {s === 'ALL' ? 'All' : s === 'UNASSIGNED' ? '⚡ Unassigned' : s.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: 260 }}>
          <Search size={15} style={{ position: 'absolute', left: 10, top: 10, color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search leads by name, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 32px',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              fontSize: '0.85rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#0a8f8f'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
          />
        </div>
      </div>

      {/* ═══════════ LEADS TABLE ═══════════ */}
      {loading ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#64748b',
          fontSize: '1rem',
        }}>
          <RefreshCw size={28} style={{ animation: 'spin 1s linear infinite', marginBottom: 12 }} />
          <p>Loading sales workspace…</p>
        </div>
      ) : (
        <section style={{
          overflowX: 'auto',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 18,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                {(isExecutive
                  ? ['Lead Name', 'Type', 'Contact', 'Details', 'Status', 'Action / Update']
                  : ['Lead Name', 'Type', 'Contact', 'Details', 'Status', 'Allocated To', 'Action']
                ).map(h => (
                  <th key={h} style={{
                    ...cellStyle,
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px',
                    color: '#475569',
                    padding: '14px 14px',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={isExecutive ? 6 : 7} style={{
                    textAlign: 'center',
                    padding: '50px 20px',
                    color: '#94a3b8',
                  }}>
                    <AlertCircle size={32} style={{ marginBottom: 10, opacity: 0.5 }} />
                    <p style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 4px' }}>No leads found</p>
                    <p style={{ fontSize: '0.85rem', margin: 0 }}>
                      {isExecutive
                        ? 'No leads are currently assigned to you. Check back soon!'
                        : 'No leads match your current filters.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, idx) => {
                  const st = statusStyle(lead.lead_status || 'NEW');
                  const isMyLead = lead.allocated_to_id === session.id;
                  const isUnassigned = !lead.allocated_to_id;
                  return (
                    <tr
                      key={key(lead)}
                      style={{
                        borderTop: idx > 0 ? '1px solid #f1f5f9' : undefined,
                        transition: 'background 0.15s ease',
                        background: isMyLead ? 'rgba(10, 143, 143, 0.02)' : 'transparent',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(10, 143, 143, 0.03)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = isMyLead ? 'rgba(10, 143, 143, 0.02)' : 'transparent'}
                    >
                      {/* Lead Name */}
                      <td style={cellStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #0a8f8f 0%, #0d7c7c 100%)',
                            color: '#ffffff',
                            display: 'grid',
                            placeItems: 'center',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            flexShrink: 0,
                            boxShadow: '0 3px 10px rgba(10, 143, 143, 0.25)',
                          }}>
                            {(lead.name || 'L').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block', fontWeight: 800 }}>{lead.name || '—'}</strong>
                            {isMyLead && (
                              <div style={{
                                marginTop: 3,
                                fontSize: '0.68rem',
                                fontWeight: 800,
                                color: '#0a8f8f',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 3,
                                background: 'rgba(10, 143, 143, 0.1)',
                                padding: '2px 7px',
                                borderRadius: 5,
                              }}>
                                <UserCheck size={10} /> My Lead
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td style={cellStyle}>
                        <span style={{
                          padding: '3px 9px',
                          borderRadius: 6,
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          background: lead.lead_type === 'CARE_ASSESSMENT' ? '#f0fdfa' : '#fef3c7',
                          color: lead.lead_type === 'CARE_ASSESSMENT' ? '#0f766e' : '#92400e',
                        }}>
                          {leadTypeLabel(lead.lead_type)}
                        </span>
                      </td>

                      {/* Contact */}
                      <td style={cellStyle}>
                        {lead.phone ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <a href={`tel:${lead.phone}`} style={{
                              color: '#0a8f8f',
                              fontWeight: 600,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              fontSize: '0.88rem',
                            }}>
                              <Phone size={13} /> {lead.phone}
                            </a>
                            <div style={{ display: 'flex', gap: 4 }}>
                              <a href={`tel:${lead.phone}`} title="Call" style={{
                                ...quickActionBtnStyle,
                                background: '#f0fdfa',
                                color: '#0f766e',
                                border: '1px solid #99f6e4',
                              }}>
                                <PhoneCall size={12} />
                              </a>
                              <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" style={{
                                ...quickActionBtnStyle,
                                background: '#f0fdf4',
                                color: '#16a34a',
                                border: '1px solid #bbf7d0',
                              }}>
                                <MessageCircle size={12} />
                              </a>
                              <button title="Copy number" onClick={() => { navigator.clipboard.writeText(lead.phone); showToast('Phone number copied!', 'success'); }} style={{
                                ...quickActionBtnStyle,
                                background: '#f8fafc',
                                color: '#64748b',
                                border: '1px solid #e2e8f0',
                              }}>
                                <Copy size={12} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span style={{ color: '#94a3b8' }}>—</span>
                        )}
                      </td>

                      {/* Details */}
                      <td style={{ ...cellStyle, maxWidth: 260 }}>
                        {(() => {
                          const category = detectCareCategory(lead);
                          const hasPkg = Boolean(lead.package_name);
                          const hasEnq = Boolean(lead.enquiry_for);
                          const isSamePkgEnq = hasPkg && hasEnq && lead.package_name === lead.enquiry_for;
                          const mainServiceTitle = lead.enquiry_for || lead.package_name;
                          const secondaryPkgName = (!isSamePkgEnq && hasPkg) ? lead.package_name : null;

                          return (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                              {/* Care Category Badge (Elder Care, Baby Care, Specialty Care, etc.) */}
                              <div style={{
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                color: category.color,
                                background: category.bg,
                                padding: '2px 8px',
                                borderRadius: 6,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                width: 'fit-content',
                                border: `1px solid ${category.color}22`,
                              }}>
                                🏷️ {category.label}
                              </div>

                              {/* Service / Enquiry Title */}
                              {mainServiceTitle && (
                                <div style={{ fontSize: '0.83rem', fontWeight: 700, color: '#0f172a' }}>
                                  🩺 {mainServiceTitle}
                                </div>
                              )}

                              {/* Specific Package Name if different */}
                              {secondaryPkgName && (
                                <div style={{
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  color: '#92400e',
                                  background: '#fef3c7',
                                  padding: '2px 7px',
                                  borderRadius: 5,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  width: 'fit-content',
                                }}>
                                  📦 {secondaryPkgName}
                                </div>
                              )}

                              {/* Location / City */}
                              <div style={{ color: '#475569', fontSize: '0.84rem' }}>
                                📍 {lead.detail || '—'}
                              </div>

                              {/* Start Date */}
                              {lead.service_start_date && (
                                <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                                  📅 Start: {lead.service_start_date}
                                </div>
                              )}

                              {/* Source Path */}
                              {lead.source_path && (
                                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                  🌐 Page: {lead.source_path}
                                </div>
                              )}

                              {/* Notes */}
                              {lead.notes && (
                                <div style={{
                                  marginTop: 2,
                                  fontSize: '0.78rem',
                                  color: '#64748b',
                                  fontStyle: 'italic',
                                  maxWidth: 240,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}>
                                  📝 {lead.notes}
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </td>

                      {/* Status */}
                      <td style={cellStyle}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: 8,
                            fontSize: '0.76rem',
                            fontWeight: 800,
                            background: st.bg,
                            color: st.color,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            position: 'relative',
                            animation: (lead.lead_status || '').toUpperCase() === 'FOLLOW_UP' ? 'pulseGlow 2s ease-in-out infinite' : 'none',
                          }}>
                            {st.icon} {(lead.lead_status || 'NEW').replace(/_/g, ' ')}
                            {(lead.lead_status || '').toUpperCase() === 'FOLLOW_UP' && (
                              <span style={{
                                width: 6, height: 6, borderRadius: '50%',
                                background: '#f59e0b',
                                animation: 'pulse 1.5s ease-in-out infinite',
                              }} />
                            )}
                          </span>
                          {/* Overdue indicator for NEW leads — hint for attention */}
                          {(!lead.lead_status || lead.lead_status === 'NEW') && !lead.allocated_to_id && (
                            <span style={{
                              fontSize: '0.65rem',
                              color: '#ef4444',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 3,
                            }}>
                              <Bell size={10} /> Needs attention
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Allocated To */}
                      {!isExecutive && (
                        <td style={cellStyle}>
                          {canAssign ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                              <div style={{ position: 'relative' }}>
                                <select
                                  value={assignment[key(lead)] || String(lead.allocated_to_id || '')}
                                  onChange={(e) => setAssignment({ ...assignment, [key(lead)]: e.target.value })}
                                  style={{
                                    ...inputStyle,
                                    paddingRight: 28,
                                    appearance: 'none',
                                    background: '#fff',
                                  }}
                                >
                                  <option value="">Select executive…</option>
                                  {executives.map(s => (
                                    <option key={s.id} value={s.id}>{s.fullName}</option>
                                  ))}
                                </select>
                                <ChevronDown size={14} style={{
                                  position: 'absolute',
                                  right: 8,
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  color: '#94a3b8',
                                  pointerEvents: 'none',
                                }} />
                              </div>
                            </div>
                          ) : (
                            <span style={{
                              fontWeight: 600,
                              fontSize: '0.88rem',
                              color: lead.allocated_to_name ? '#0f172a' : '#94a3b8',
                            }}>
                              {lead.allocated_to_name || 'Not allocated'}
                            </span>
                          )}
                        </td>
                      )}

                      {/* Action */}
                      <td style={{ ...cellStyle, minWidth: 210 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {/* Allocation Button for Manager / Team Lead */}
                          {canAssign && (
                            <button
                              onClick={() => assign(lead)}
                              style={{
                                ...primaryBtnStyle,
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 5,
                                fontSize: '0.78rem',
                                padding: '6px 12px',
                              }}
                            >
                              <Send size={12} /> {lead.allocated_to_id ? 'Re-allocate' : 'Allocate'}
                            </button>
                          )}

                          {/* Status Update Form for Executive / Telecaller */}
                          {isExecutive ? (
                            <form onSubmit={(e) => update(e, lead)} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                              <div style={{ position: 'relative' }}>
                                <select
                                  name="status"
                                  defaultValue={lead.lead_status || 'NEW'}
                                  style={{ ...inputStyle, paddingRight: 24, fontSize: '0.78rem', padding: '5px 8px', fontWeight: 700, width: '100%' }}
                                >
                                  {STATUS_OPTIONS.map(s => (
                                    <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                                  ))}
                                </select>
                                <ChevronDown size={12} style={{
                                  position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                                  color: '#94a3b8', pointerEvents: 'none',
                                }} />
                              </div>
                              <input
                                value={notes[key(lead)] ?? lead.notes ?? ''}
                                onChange={(e) => setNotes({ ...notes, [key(lead)]: e.target.value })}
                                placeholder="Add update notes…"
                                style={{ ...inputStyle, fontSize: '0.78rem', padding: '5px 8px', width: '100%' }}
                              />
                              <button type="submit" style={{
                                ...btnBase,
                                background: 'linear-gradient(135deg, #0a8f8f 0%, #066060 100%)',
                                color: '#ffffff',
                                fontWeight: 700,
                                fontSize: '0.78rem',
                                padding: '6px 10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 4,
                                boxShadow: '0 2px 8px rgba(10, 143, 143, 0.2)',
                              }}>
                                <Edit3 size={12} /> Save Status
                              </button>
                            </form>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Table footer */}
          {filteredLeads.length > 0 && (
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid #f1f5f9',
              fontSize: '0.82rem',
              color: '#94a3b8',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span>Showing {filteredLeads.length} of {leads.length} leads</span>
              {searchQuery && <span>Filtered by: &quot;{searchQuery}&quot;</span>}
            </div>
          )}
        </section>
      )}

      {/* ═══════════ TOAST NOTIFICATION ═══════════ */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          zIndex: 99999,
          padding: '14px 22px',
          borderRadius: 14,
          background: toast.type === 'success' ? '#dcfce7' : toast.type === 'error' ? '#fee2e2' : '#e0f2fe',
          color: toast.type === 'success' ? '#166534' : toast.type === 'error' ? '#991b1b' : '#075985',
          fontWeight: 700,
          fontSize: '0.88rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
          border: `1px solid ${toast.type === 'success' ? '#bbf7d0' : toast.type === 'error' ? '#fecaca' : '#bae6fd'}`,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          animation: 'slideInUp 0.3s ease-out',
          maxWidth: 420,
        }}>
          {toast.type === 'success' ? <CheckCircle size={18} /> : toast.type === 'error' ? <XCircle size={18} /> : <AlertCircle size={18} />}
          {toast.message}
          <button
            onClick={() => setToast(prev => ({ ...prev, show: false }))}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginLeft: 8,
              color: 'inherit',
              opacity: 0.6,
              fontSize: '1rem',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ═══════════ GLOBAL ANIMATIONS ═══════════ */}
      {selectedExecutive && (
        <TeamMemberDrawer
          member={selectedExecutive}
          leads={leads.filter((lead) => lead.allocated_to_id === selectedExecutive.id)}
          onClose={() => setSelectedExecutive(null)}
        />
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInScale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
          50% { box-shadow: 0 0 8px 2px rgba(245, 158, 11, 0.2); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}

/* ──────────────── Metric Card ──────────────── */
function ManagerApprovalBoard({
  users,
  teamLeads,
  roleChoices,
  teamLeadChoices,
  busyId,
  onRoleChange,
  onTeamLeadChange,
  onConfigure,
  onFinalApprove,
  onReject,
}: {
  users: Staff[];
  teamLeads: Staff[];
  roleChoices: Record<number, string>;
  teamLeadChoices: Record<number, string>;
  busyId: number | null;
  onRoleChange: (id: number, value: string) => void;
  onTeamLeadChange: (id: number, value: string) => void;
  onConfigure: (user: Staff) => void;
  onFinalApprove: (user: Staff) => void;
  onReject: (user: Staff) => void;
}) {
  if (!users.length) return null;
  return <section id="team-approvals" style={{ marginBottom: 24, border: '1px solid #ddd6fe', borderRadius: 20, overflow: 'hidden', background: '#fff', boxShadow: '0 8px 28px rgba(76,29,149,.07)' }}>
    <div style={{ padding: '18px 20px', color: '#fff', background: 'linear-gradient(135deg, #4c1d95, #7c3aed)' }}><div style={{ display: 'flex', alignItems: 'center', gap: 9, fontWeight: 800 }}><Shield size={18} /> Manager approval centre</div><p style={{ margin: '5px 0 0', fontSize: '.84rem', color: '#ede9fe' }}>Set the reporting line first; final approval is enabled only after the required review stage.</p></div>
    <div style={{ display: 'grid', gap: 12, padding: 16 }}>
      {users.map((user) => {
        const selectedRole = roleChoices[user.id] || user.role || 'EXECUTIVE';
        const isTeamLead = selectedRole === 'TEAM_LEAD';
        const configured = Boolean(user.managerId) && user.role === selectedRole && (isTeamLead ? !user.teamLeadId : Boolean(user.teamLeadId));
        const isFinalReady = isTeamLead ? configured : configured && user.tlApprovalStatus === 'APPROVED';
        const busy = busyId === user.id;
        return <article key={user.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(150px,1.1fr) minmax(170px,1fr) minmax(190px,1.2fr) auto', alignItems: 'center', gap: 12, border: '1px solid #ede9fe', borderRadius: 14, padding: 14, background: '#fcfbff' }}>
          <div><strong style={{ color: '#1e1b4b' }}>{user.fullName}</strong><div style={{ marginTop: 4, color: '#64748b', fontSize: '.78rem' }}>#{user.id} · {user.status === 'PENDING' ? 'Pending account' : user.status}</div></div>
          <label style={{ display: 'grid', gap: 5, color: '#475569', fontSize: '.75rem', fontWeight: 700 }}>Role<select value={selectedRole} onChange={(event) => onRoleChange(user.id, event.target.value)} style={{ ...inputStyle, minWidth: 0 }} disabled={busy}><option value="TEAM_LEAD">Team Lead</option><option value="EXECUTIVE">Sales Executive</option><option value="TELECALLER">Telecaller</option></select></label>
          {isTeamLead ? <div style={{ fontSize: '.8rem', color: '#6d28d9', fontWeight: 700, padding: '10px 0' }}>Reports directly to you</div> : <label style={{ display: 'grid', gap: 5, color: '#475569', fontSize: '.75rem', fontWeight: 700 }}>Assign Team Lead<select value={teamLeadChoices[user.id] || String(user.teamLeadId || '')} onChange={(event) => onTeamLeadChange(user.id, event.target.value)} style={{ ...inputStyle, minWidth: 0 }} disabled={busy}><option value="">Choose TL…</option>{teamLeads.map((lead) => <option key={lead.id} value={lead.id}>{lead.fullName}</option>)}</select></label>}
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', justifyContent: 'flex-end' }}><button type="button" onClick={() => onConfigure(user)} disabled={busy} style={{ ...miniButton, background: '#ede9fe', color: '#6d28d9' }}>{busy ? 'Saving…' : configured ? 'Update setup' : 'Set up'}</button>{isFinalReady ? <button type="button" onClick={() => onFinalApprove(user)} disabled={busy} style={{ ...miniButton, background: '#16a34a', color: '#fff' }}>Final approve</button> : <span style={{ color: '#a16207', fontWeight: 700, fontSize: '.75rem' }}>{configured ? (isTeamLead ? 'Ready to approve' : 'Waiting for TL') : 'Set hierarchy'}</span>}<button type="button" onClick={() => onReject(user)} disabled={busy} style={{ ...miniButton, background: '#fff1f2', color: '#be123c' }}>Reject</button></div>
        </article>;
      })}
    </div>
  </section>;
}

function TeamLeadApprovalBoard({ users, busyId, onApprove, onReject }: { users: Staff[]; busyId: number | null; onApprove: (user: Staff) => void; onReject: (user: Staff) => void }) {
  if (!users.length) return null;
  return <section id="team-approvals" style={{ marginBottom: 24, border: '1px solid #99f6e4', borderRadius: 20, overflow: 'hidden', background: '#fff', boxShadow: '0 8px 28px rgba(13,148,136,.08)' }}>
    <div style={{ padding: '18px 20px', color: '#fff', background: 'linear-gradient(135deg, #0f766e, #0a8f8f)' }}><div style={{ display: 'flex', alignItems: 'center', gap: 9, fontWeight: 800 }}><UserRoundCheck size={18} /> Team Lead approval queue</div><p style={{ margin: '5px 0 0', fontSize: '.84rem', color: '#ccfbf1' }}>Review executives and telecallers mapped to your team. The Manager gives final access after your approval.</p></div>
    <div style={{ display: 'grid', gap: 10, padding: 16 }}>{users.map((user) => <article key={user.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, border: '1px solid #ccfbf1', borderRadius: 14, padding: 14, flexWrap: 'wrap' }}><div><strong style={{ color: '#134e4a' }}>{user.fullName}</strong><div style={{ marginTop: 4, color: '#64748b', fontSize: '.78rem' }}>{user.role === 'TELECALLER' ? 'Telecaller' : 'Sales Executive'} · awaiting your review</div></div><div style={{ display: 'flex', gap: 8 }}><button type="button" disabled={busyId === user.id} onClick={() => onApprove(user)} style={{ ...miniButton, background: '#0f766e', color: '#fff' }}>{busyId === user.id ? 'Saving…' : 'Approve for Manager'}</button><button type="button" disabled={busyId === user.id} onClick={() => onReject(user)} style={{ ...miniButton, background: '#fff1f2', color: '#be123c' }}>Reject</button></div></article>)}</div>
  </section>;
}

const miniButton: React.CSSProperties = { border: 0, borderRadius: 8, padding: '8px 10px', cursor: 'pointer', fontWeight: 800, fontSize: '.75rem', whiteSpace: 'nowrap' };

function TeamLeadControlRoom({
  leads,
  executives,
  unassignedCount,
  followUpCount,
  qualifiedCount,
  onOpenMember,
  onShowQueue,
  onShowFollowUps,
}: {
  leads: Lead[];
  executives: Staff[];
  unassignedCount: number;
  followUpCount: number;
  qualifiedCount: number;
  onOpenMember: (member: Staff) => void;
  onShowQueue: () => void;
  onShowFollowUps: () => void;
}) {
  const memberStats = executives.map((member) => {
    const memberLeads = leads.filter((lead) => lead.allocated_to_id === member.id);
    const qualifiedLeads = memberLeads.filter((lead) => (lead.lead_status || '').toUpperCase() === 'QUALIFIED').length;
    const contactedLeads = memberLeads.filter((lead) => ['CONTACTED', 'QUALIFIED', 'UNQUALIFIED', 'FOLLOW_UP', 'CLOSED'].includes((lead.lead_status || '').toUpperCase())).length;
    const followUpLeads = memberLeads.filter((lead) => (lead.lead_status || '').toUpperCase() === 'FOLLOW_UP').length;
    const newLeads = memberLeads.filter((lead) => !(lead.lead_status) || (lead.lead_status || '').toUpperCase() === 'NEW').length;
    const closedLeads = memberLeads.filter((lead) => (lead.lead_status || '').toUpperCase() === 'CLOSED').length;
    return {
      member,
      assigned: memberLeads.length,
      qualified: qualifiedLeads,
      followUps: followUpLeads,
      contacted: contactedLeads,
      newCount: newLeads,
      closedCount: closedLeads,
      conversionRate: memberLeads.length > 0 ? Math.round((qualifiedLeads / memberLeads.length) * 100) : 0,
    };
  });
  const busiest = Math.max(1, ...memberStats.map((item) => item.assigned));
  const totalTeamLeads = leads.filter(l => executives.some(ex => ex.id === l.allocated_to_id)).length;
  const totalQualified = memberStats.reduce((sum, m) => sum + m.qualified, 0);
  const teamConversionRate = totalTeamLeads > 0 ? Math.round((totalQualified / totalTeamLeads) * 100) : 0;
  const topPerformer = memberStats.length > 0 ? memberStats.reduce((best, curr) => curr.qualified > best.qualified ? curr : best, memberStats[0]) : null;
  const avgLeadsPerExec = executives.length > 0 ? Math.round(totalTeamLeads / executives.length) : 0;

  return (
    <section style={{
      marginBottom: 24,
      borderRadius: 22,
      background: 'linear-gradient(135deg, #ffffff 0%, #f0fdfa 50%, #f8fafc 100%)',
      color: '#0f172a',
      border: '1px solid #ccfbf1',
      boxShadow: '0 8px 30px rgba(10, 143, 143, 0.08)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle background ambient glow */}
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(10,143,143,0.06) 0%, transparent 70%)', top: -150, right: -80, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)', bottom: -100, left: -60, pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ position: 'relative', padding: '28px 28px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', marginBottom: 24 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 999, background: 'linear-gradient(135deg, #0f766e 0%, #0a8f8f 100%)', color: '#ffffff', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.08em', marginBottom: 12, boxShadow: '0 2px 8px rgba(10, 143, 143, 0.25)' }}>
              <Sparkles size={13} /> TEAM LEAD CONTROL ROOM
            </div>
            <h2 style={{ margin: '0 0 6px', fontSize: '1.55rem', letterSpacing: '-0.02em', fontWeight: 800, color: '#0f172a' }}>Your team&apos;s sales pulse</h2>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.88rem', maxWidth: 520, lineHeight: 1.5, fontWeight: 500 }}>
              Monitor performance, allocate enquiries, and keep your team&apos;s pipeline flowing.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ padding: '14px 18px', borderRadius: 16, background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', textAlign: 'center', minWidth: 100 }}>
              <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Team size</div>
              <strong style={{ fontSize: '1.6rem', lineHeight: 1.3, color: '#0f172a' }}>{executives.length}</strong>
            </div>
            <div style={{ padding: '14px 18px', borderRadius: 16, background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', textAlign: 'center', minWidth: 100 }}>
              <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Conversion</div>
              <strong style={{ fontSize: '1.6rem', lineHeight: 1.3, color: teamConversionRate > 40 ? '#10b981' : teamConversionRate > 20 ? '#d97706' : '#dc2626' }}>{teamConversionRate}%</strong>
            </div>
          </div>
        </div>

        {/* Quick Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, marginBottom: 24 }}>
          <button type="button" onClick={onShowQueue} style={{
            position: 'relative', textAlign: 'left', padding: '18px', color: '#0f172a',
            border: '1px solid #e2e8f0', borderRadius: 16, background: '#ffffff',
            cursor: 'pointer', transition: 'all .25s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(10, 143, 143, 0.12)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.03)'; }}
          >
            <span style={{ width: 36, height: 36, borderRadius: 11, display: 'grid', placeItems: 'center', marginBottom: 12, background: '#fef3c7', color: '#d97706' }}><Target size={18} /></span>
            <strong style={{ fontSize: '1.6rem', display: 'block', color: '#0f172a' }}>{unassignedCount}</strong>
            <small style={{ color: '#64748b', fontSize: '0.76rem', fontWeight: 600 }}>Waiting to allocate</small>
            {unassignedCount > 0 && <span style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', animation: 'pulse 1.5s ease-in-out infinite' }} />}
            <ArrowUpRight size={14} style={{ position: 'absolute', right: 13, bottom: 13, color: '#94a3b8' }} />
          </button>
          <button type="button" onClick={onShowFollowUps} style={{
            position: 'relative', textAlign: 'left', padding: '18px', color: '#0f172a',
            border: '1px solid #e2e8f0', borderRadius: 16, background: '#ffffff',
            cursor: 'pointer', transition: 'all .25s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.12)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.03)'; }}
          >
            <span style={{ width: 36, height: 36, borderRadius: 11, display: 'grid', placeItems: 'center', marginBottom: 12, background: '#ffedd5', color: '#ea580c' }}><CalendarClock size={18} /></span>
            <strong style={{ fontSize: '1.6rem', display: 'block', color: '#0f172a' }}>{followUpCount}</strong>
            <small style={{ color: '#64748b', fontSize: '0.76rem', fontWeight: 600 }}>Need follow-up</small>
            {followUpCount > 0 && <span style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: '#ea580c', animation: 'pulse 1.5s ease-in-out infinite' }} />}
            <ArrowUpRight size={14} style={{ position: 'absolute', right: 13, bottom: 13, color: '#94a3b8' }} />
          </button>
          <div style={{
            position: 'relative', textAlign: 'left', padding: '18px', color: '#0f172a',
            border: '1px solid #e2e8f0', borderRadius: 16, background: '#ffffff', boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
          }}>
            <span style={{ width: 36, height: 36, borderRadius: 11, display: 'grid', placeItems: 'center', marginBottom: 12, background: '#dcfce7', color: '#16a34a' }}><BarChart3 size={18} /></span>
            <strong style={{ fontSize: '1.6rem', display: 'block', color: '#0f172a' }}>{qualifiedCount}</strong>
            <small style={{ color: '#64748b', fontSize: '0.76rem', fontWeight: 600 }}>Qualified leads</small>
          </div>
          <div style={{
            position: 'relative', textAlign: 'left', padding: '18px', color: '#0f172a',
            border: '1px solid #e2e8f0', borderRadius: 16, background: '#ffffff', boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
          }}>
            <span style={{ width: 36, height: 36, borderRadius: 11, display: 'grid', placeItems: 'center', marginBottom: 12, background: '#dbeafe', color: '#2563eb' }}><Hash size={18} /></span>
            <strong style={{ fontSize: '1.6rem', display: 'block', color: '#0f172a' }}>{avgLeadsPerExec}</strong>
            <small style={{ color: '#64748b', fontSize: '0.76rem', fontWeight: 600 }}>Avg per executive</small>
          </div>
        </div>

        {/* Visual Analytics Graphs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14, marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <BarChart3 size={15} /> Lead Status Distribution
            </div>
            <LeadStatusDonutChart leads={leads} darkBg={false} />
          </div>
          {memberStats.length > 0 && (
            <div>
              <ExecutivePerformanceBarGraph memberStats={memberStats} darkBg={false} />
            </div>
          )}
        </div>
      </div>

      {/* Team Members Section */}
      <div style={{ position: 'relative', padding: '0 28px 28px' }}>
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
              <UserRoundCheck size={18} /> My Executive Team
            </div>
            {topPerformer && topPerformer.qualified > 0 && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px',
                borderRadius: 999, background: '#fef3c7', border: '1px solid #fde68a',
                fontSize: '0.75rem', fontWeight: 800, color: '#92400e',
              }}>
                <Crown size={13} /> Top: {topPerformer.member.fullName} ({topPerformer.qualified} qualified)
              </div>
            )}
          </div>

          {memberStats.length === 0 ? (
            <div style={{ padding: '28px', border: '2px dashed #cbd5e1', borderRadius: 16, color: '#64748b', fontSize: '0.88rem', textAlign: 'center', background: '#ffffff' }}>
              <Users size={28} style={{ opacity: 0.5, marginBottom: 8 }} />
              <p style={{ margin: 0, fontWeight: 700, color: '#334155' }}>No executive has been mapped to your team yet.</p>
              <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#64748b' }}>Ask the manager to assign telecallers/sales executives to your team.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
              {memberStats.map(({ member, assigned, qualified, followUps, contacted, newCount, closedCount, conversionRate }) => {
                const workload = Math.round((assigned / busiest) * 100);
                const isTopPerformer = topPerformer?.member.id === member.id && qualified > 0;
                const roleCfg = member.role?.toUpperCase() === 'TELECALLER'
                  ? { color: '#059669', bg: '#ecfeff', label: '📞 Telecaller' }
                  : { color: '#2563eb', bg: '#eff6ff', label: '💼 Executive' };
                const statusSegments = [
                  { count: newCount, color: '#10b981', label: 'New' },
                  { count: contacted - qualified - followUps - closedCount, color: '#3b82f6', label: 'Contacted' },
                  { count: qualified, color: '#059669', label: 'Qualified' },
                  { count: followUps, color: '#f59e0b', label: 'Follow-up' },
                  { count: closedCount, color: '#64748b', label: 'Closed' },
                ].filter(s => s.count > 0);

                return (
                  <button key={member.id} type="button" onClick={() => onOpenMember(member)} style={{
                    textAlign: 'left',
                    border: isTopPerformer ? '1px solid #fde68a' : '1px solid #e2e8f0',
                    color: '#0f172a',
                    background: isTopPerformer ? '#fffdf5' : '#ffffff',
                    borderRadius: 18,
                    padding: '18px',
                    cursor: 'pointer',
                    transition: 'all .25s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 3px 12px rgba(0,0,0,0.03)',
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(0,0,0,0.03)'; }}
                  >
                    {isTopPerformer && (
                      <div style={{ position: 'absolute', top: 0, right: 0, padding: '4px 10px', borderRadius: '0 16px 0 10px', background: '#fef3c7', fontSize: '0.65rem', fontWeight: 800, color: '#92400e', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Crown size={10} /> TOP
                      </div>
                    )}
                    {/* Member header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 14,
                        background: `linear-gradient(135deg, ${roleCfg.color}, ${roleCfg.color}cc)`,
                        display: 'grid', placeItems: 'center',
                        fontWeight: 800, fontSize: '1rem', color: '#ffffff',
                        boxShadow: `0 4px 12px ${roleCfg.color}30`,
                      }}>
                        {member.fullName?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{member.fullName}</strong>
                        </div>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4,
                          padding: '2px 8px', borderRadius: 6,
                          background: roleCfg.bg, color: roleCfg.color,
                          fontSize: '0.68rem', fontWeight: 800,
                        }}>
                          {roleCfg.label}
                        </span>
                      </div>
                      <ChevronRight size={16} style={{ color: '#94a3b8' }} />
                    </div>

                    {/* Workload bar */}
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                        <span>{assigned} leads assigned</span>
                        <span style={{ color: contacted > 0 ? '#059669' : '#64748b' }}>{contacted} actioned</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 999, background: '#f1f5f9', overflow: 'hidden' }}>
                        <div style={{
                          width: `${workload}%`,
                          height: '100%', borderRadius: 999,
                          background: workload > 80 ? 'linear-gradient(90deg, #f59e0b, #d97706)' : 'linear-gradient(90deg, #10b981, #059669)',
                          transition: 'width 0.6s ease',
                        }} />
                      </div>
                    </div>

                    {/* Status breakdown mini-bar */}
                    {assigned > 0 && (
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', height: 4, borderRadius: 999, overflow: 'hidden', gap: 1 }}>
                          {statusSegments.map((seg, i) => (
                            <div key={i} title={`${seg.label}: ${seg.count}`} style={{
                              flex: seg.count,
                              background: seg.color,
                              borderRadius: i === 0 ? '999px 0 0 999px' : i === statusSegments.length - 1 ? '0 999px 999px 0' : 0,
                            }} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Stats pills */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', fontSize: '0.7rem', fontWeight: 700 }}>
                      <span style={{ background: '#f0fdf4', color: '#166534', padding: '3px 8px', borderRadius: 6, border: '1px solid #bbf7d0' }}>
                        {qualified} qualified
                      </span>
                      <span style={{ background: '#fffbeb', color: '#92400e', padding: '3px 8px', borderRadius: 6, border: '1px solid #fde68a', position: 'relative' }}>
                        {followUps} follow-up
                        {followUps > 0 && <span style={{ position: 'absolute', top: -2, right: -2, width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', animation: 'pulse 1.5s ease-in-out infinite' }} />}
                      </span>
                      {conversionRate > 0 && (
                        <span style={{ background: '#eff6ff', color: '#1e40af', padding: '3px 8px', borderRadius: 6, border: '1px solid #bfdbfe' }}>
                          <TrendingUp size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />{conversionRate}%
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Enhanced Team Member Drawer ──────────────── */
function TeamMemberDrawer({ member, leads, onClose }: { member: Staff; leads: Lead[]; onClose: () => void }) {
  const [drawerFilter, setDrawerFilter] = useState<string>('ALL');
  const [drawerSort, setDrawerSort] = useState<'status' | 'name'>('status');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const qualified = leads.filter(l => (l.lead_status || '').toUpperCase() === 'QUALIFIED').length;
  const contacted = leads.filter(l => ['CONTACTED', 'QUALIFIED', 'UNQUALIFIED', 'FOLLOW_UP', 'CLOSED'].includes((l.lead_status || '').toUpperCase())).length;
  const followUps = leads.filter(l => (l.lead_status || '').toUpperCase() === 'FOLLOW_UP').length;
  const conversionRate = leads.length > 0 ? Math.round((qualified / leads.length) * 100) : 0;

  const roleCfg = member.role?.toUpperCase() === 'TELECALLER'
    ? { color: '#10b981', bg: '#f0fdf4', label: 'Telecaller', icon: <PhoneCall size={14} /> }
    : { color: '#3b82f6', bg: '#eff6ff', label: 'Sales Executive', icon: <User size={14} /> };

  const statusCounts: Record<string, number> = {};
  leads.forEach(l => {
    const s = (l.lead_status || 'NEW').toUpperCase();
    statusCounts[s] = (statusCounts[s] || 0) + 1;
  });

  let filteredDrawerLeads = drawerFilter === 'ALL' ? leads : leads.filter(l => (l.lead_status || 'NEW').toUpperCase() === drawerFilter);
  if (drawerSort === 'name') {
    filteredDrawerLeads = [...filteredDrawerLeads].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }

  const copyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  return (
    <div role="dialog" aria-modal="true" aria-label={`${member.fullName} lead details`} style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(6px)',
      display: 'flex', justifyContent: 'flex-end',
    }} onClick={onClose}>
      <aside onClick={(event) => event.stopPropagation()} style={{
        width: 'min(520px, 100%)',
        height: '100%',
        overflowY: 'auto',
        background: '#ffffff',
        boxShadow: '-24px 0 60px rgba(15,23,42,.25)',
        animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Glassmorphism Header */}
        <div style={{
          padding: '24px 24px 20px',
          background: member.role?.toUpperCase() === 'TELECALLER'
            ? 'linear-gradient(135deg, #065f46 0%, #10b981 100%)'
            : 'linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', top: -90, right: -40 }} />
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: 'rgba(255,255,255,0.2)',
                display: 'grid', placeItems: 'center',
                fontWeight: 800, fontSize: '1.2rem',
                border: '2px solid rgba(255,255,255,0.3)',
              }}>
                {member.fullName?.[0]?.toUpperCase() || '?'}
              </div>
              <div>
                <h2 style={{ margin: '0 0 4px', fontSize: '1.3rem', fontWeight: 800 }}>{member.fullName}</h2>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '3px 10px', borderRadius: 6,
                  background: 'rgba(255,255,255,0.18)',
                  fontSize: '0.72rem', fontWeight: 700,
                }}>
                  {roleCfg.icon} {roleCfg.label}
                </span>
              </div>
            </div>
            <button type="button" aria-label="Close details" onClick={onClose} style={{
              border: 0, borderRadius: 10, cursor: 'pointer', padding: 8,
              color: '#fff', background: 'rgba(255,255,255,0.15)',
              transition: 'background 0.2s ease',
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
              <X size={18} />
            </button>
          </div>

          {/* Performance Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 18 }}>
            {[
              { label: 'Assigned', value: leads.length, color: '#fff' },
              { label: 'Contacted', value: contacted, color: '#93c5fd' },
              { label: 'Qualified', value: qualified, color: '#86efac' },
              { label: 'Conversion', value: `${conversionRate}%`, color: conversionRate > 40 ? '#86efac' : conversionRate > 20 ? '#fbbf24' : '#fca5a5' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '8px 4px', borderRadius: 10, background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: '0.62rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Distribution Bar */}
        {leads.length > 0 && (
          <div style={{ padding: '14px 24px', borderBottom: '1px solid #f1f5f9', background: '#fafbfc' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Status Distribution</div>
            <div style={{ display: 'flex', height: 8, borderRadius: 999, overflow: 'hidden', gap: 2 }}>
              {Object.entries(statusCounts).map(([status, count]) => {
                const st = statusStyle(status);
                return (
                  <div key={status} title={`${status.replace(/_/g, ' ')}: ${count}`} style={{
                    flex: count,
                    background: st.color,
                    borderRadius: 4,
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                  }} />
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
              {Object.entries(statusCounts).map(([status, count]) => {
                const st = statusStyle(status);
                return (
                  <button key={status} type="button" onClick={() => setDrawerFilter(drawerFilter === status ? 'ALL' : status)} style={{
                    ...miniButton,
                    padding: '3px 8px',
                    background: drawerFilter === status ? st.color : st.bg,
                    color: drawerFilter === status ? '#fff' : st.color,
                    fontSize: '0.68rem',
                    transition: 'all 0.2s ease',
                  }}>
                    {status.replace(/_/g, ' ')} ({count})
                  </button>
                );
              })}
              {drawerFilter !== 'ALL' && (
                <button type="button" onClick={() => setDrawerFilter('ALL')} style={{ ...miniButton, padding: '3px 8px', background: '#f1f5f9', color: '#475569', fontSize: '0.68rem' }}>
                  Show all
                </button>
              )}
            </div>
          </div>
        )}

        {/* Filter/Sort bar */}
        <div style={{ padding: '10px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 700 }}>
            {filteredDrawerLeads.length} lead{filteredDrawerLeads.length === 1 ? '' : 's'}
            {drawerFilter !== 'ALL' && <span style={{ color: '#0a8f8f' }}> ({drawerFilter.replace(/_/g, ' ')})</span>}
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button type="button" onClick={() => setDrawerSort('status')} style={{
              ...miniButton, padding: '3px 8px', fontSize: '0.68rem',
              background: drawerSort === 'status' ? '#0a8f8f' : '#f1f5f9',
              color: drawerSort === 'status' ? '#fff' : '#475569',
            }}>
              By Status
            </button>
            <button type="button" onClick={() => setDrawerSort('name')} style={{
              ...miniButton, padding: '3px 8px', fontSize: '0.68rem',
              background: drawerSort === 'name' ? '#0a8f8f' : '#f1f5f9',
              color: drawerSort === 'name' ? '#fff' : '#475569',
            }}>
              By Name
            </button>
          </div>
        </div>

        {/* Lead Cards */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          <div style={{ display: 'grid', gap: 12 }}>
            {filteredDrawerLeads.length === 0 ? (
              <div style={{ color: '#64748b', padding: 32, borderRadius: 14, textAlign: 'center', background: '#f8fafc' }}>
                <AlertCircle size={28} style={{ opacity: 0.4, marginBottom: 8 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>No leads {drawerFilter !== 'ALL' ? `with status "${drawerFilter.replace(/_/g, ' ')}"` : 'currently allocated'}</p>
              </div>
            ) : filteredDrawerLeads.map((lead, idx) => {
              const status = statusStyle(lead.lead_status || 'NEW');
              const isFollowUp = (lead.lead_status || '').toUpperCase() === 'FOLLOW_UP';
              return (
                <article key={`${lead.lead_type}-${lead.lead_id}`} style={{
                  border: isFollowUp ? '1px solid #fde68a' : '1px solid #e2e8f0',
                  borderRadius: 16,
                  padding: '16px',
                  background: isFollowUp ? '#fffbeb' : '#fff',
                  transition: 'all 0.2s ease',
                  animation: `fadeIn 0.3s ease ${idx * 0.05}s both`,
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {/* Lead Header */}
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>{lead.name || '—'}</strong>
                      <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                        <span style={{
                          padding: '2px 7px', borderRadius: 5,
                          fontSize: '0.68rem', fontWeight: 700,
                          background: lead.lead_type === 'CARE_ASSESSMENT' ? '#f0fdfa' : '#fef3c7',
                          color: lead.lead_type === 'CARE_ASSESSMENT' ? '#0f766e' : '#92400e',
                        }}>
                          {leadTypeLabel(lead.lead_type)}
                        </span>
                        {isFollowUp && (
                          <span style={{ padding: '2px 7px', borderRadius: 5, fontSize: '0.68rem', fontWeight: 700, background: '#fef3c7', color: '#92400e', display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Bell size={9} /> Needs follow-up
                          </span>
                        )}
                      </div>
                    </div>
                    <span style={{
                      height: 'fit-content',
                      padding: '4px 9px', borderRadius: 8,
                      background: status.bg, color: status.color,
                      fontSize: '0.71rem', fontWeight: 800,
                      display: 'flex', alignItems: 'center', gap: 3,
                    }}>
                      {status.icon} {(lead.lead_status || 'NEW').replace(/_/g, ' ')}
                    </span>
                  </div>

                  {/* Lead Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
                    {(() => {
                      const category = detectCareCategory(lead);
                      return (
                        <div style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          color: category.color,
                          background: category.bg,
                          padding: '2px 8px',
                          borderRadius: 6,
                          display: 'inline-flex',
                          width: 'fit-content',
                          border: `1px solid ${category.color}22`,
                          marginBottom: 2,
                        }}>
                          🏷️ {category.label}
                        </div>
                      );
                    })()}
                    {lead.enquiry_for && (
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f766e' }}>🩺 {lead.enquiry_for}</div>
                    )}
                    {lead.package_name && lead.package_name !== lead.enquiry_for && (
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400e', background: '#fef3c7', padding: '2px 7px', borderRadius: 5, display: 'inline-flex', width: 'fit-content' }}>
                        📦 {lead.package_name}
                      </div>
                    )}
                    {lead.detail && (
                      <div style={{ fontSize: '0.8rem', color: '#475569' }}>📍 {lead.detail}</div>
                    )}
                    {lead.service_start_date && (
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>📅 Start: {lead.service_start_date}</div>
                    )}
                    {lead.source_path && (
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>🌐 {lead.source_path}</div>
                    )}
                    {lead.notes && (
                      <div style={{ marginTop: 4, padding: '8px 10px', borderRadius: 8, background: '#f8fafc', border: '1px solid #f1f5f9', fontSize: '0.78rem', color: '#475569', lineHeight: 1.5 }}>
                        📝 {lead.notes}
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div style={{ display: 'flex', gap: 6, borderTop: '1px solid #f1f5f9', paddingTop: 10 }}>
                    {lead.phone && (
                      <>
                        <a href={`tel:${lead.phone}`} style={{
                          ...quickActionBtnStyle,
                          background: '#f0fdfa', color: '#0f766e', border: '1px solid #99f6e4',
                          textDecoration: 'none', flex: 1, justifyContent: 'center',
                        }}>
                          <PhoneCall size={13} /> Call
                        </a>
                        <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{
                          ...quickActionBtnStyle,
                          background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0',
                          textDecoration: 'none', flex: 1, justifyContent: 'center',
                        }}>
                          <MessageCircle size={13} /> WhatsApp
                        </a>
                        <button type="button" onClick={() => copyPhone(lead.phone)} style={{
                          ...quickActionBtnStyle,
                          background: copiedPhone === lead.phone ? '#dcfce7' : '#f8fafc',
                          color: copiedPhone === lead.phone ? '#16a34a' : '#64748b',
                          border: `1px solid ${copiedPhone === lead.phone ? '#bbf7d0' : '#e2e8f0'}`,
                        }}>
                          {copiedPhone === lead.phone ? <CheckCircle size={13} /> : <Copy size={13} />}
                          {copiedPhone === lead.phone ? 'Done' : lead.phone}
                        </button>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}

const teamPulseCardStyle: React.CSSProperties = { position: 'relative', textAlign: 'left', padding: '18px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, background: 'rgba(255,255,255,0.08)', cursor: 'pointer', transition: 'all .25s cubic-bezier(0.4, 0, 0.2, 1)' };
const teamPulseStaticStyle: React.CSSProperties = { position: 'relative', textAlign: 'left', padding: '18px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, background: 'rgba(255,255,255,0.08)' };
const teamPulseIconStyle: React.CSSProperties = { width: 36, height: 36, borderRadius: 11, display: 'grid', placeItems: 'center', marginBottom: 12 };

function MetricCard({ icon, label, value, color, delay }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '20px 22px',
      border: '1px solid #e2e8f0',
      borderRadius: 18,
      background: '#ffffff',
      boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      opacity: visible ? 1 : 0,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'default',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 12px 30px ${color}22`;
        e.currentTarget.style.borderColor = `${color}44`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.04)';
        e.currentTarget.style.borderColor = '#e2e8f0';
      }}
    >
      {/* Top Accent Color Bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, ${color} 0%, ${color}aa 100%)`,
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: `${color}18`,
          color,
          display: 'grid',
          placeItems: 'center',
          boxShadow: `0 3px 10px ${color}15`,
        }}>
          {icon}
        </div>
      </div>
      <strong style={{ fontSize: '1.75rem', fontWeight: 800, display: 'block', color: '#0f172a', letterSpacing: '-0.02em' }}>
        {value}
      </strong>
      <div style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: 700, marginTop: 3 }}>
        {label}
      </div>
    </div>
  );
}

/* ──────────────── Style Constants ──────────────── */
const cellStyle: React.CSSProperties = {
  padding: '14px 14px',
  verticalAlign: 'top',
  fontSize: '0.88rem',
};

const inputStyle: React.CSSProperties = {
  padding: '8px 10px',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  width: '100%',
  fontSize: '0.84rem',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  minWidth: 140,
};

const btnBase: React.CSSProperties = {
  border: 'none',
  padding: '9px 14px',
  borderRadius: 10,
  display: 'inline-flex',
  gap: 6,
  alignItems: 'center',
  cursor: 'pointer',
  fontWeight: 700,
  fontSize: '0.84rem',
  transition: 'all 0.2s ease',
};

const primaryBtnStyle: React.CSSProperties = {
  ...btnBase,
  background: 'linear-gradient(135deg, #0a8f8f 0%, #0d7c7c 100%)',
  color: '#ffffff',
  boxShadow: '0 2px 8px rgba(10, 143, 143, 0.2)',
  border: 'none',
};

const quickActionBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '5px 8px',
  borderRadius: 7,
  fontSize: '0.74rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  border: 'none',
};

/* ──────────────── SVG Donut Graph ──────────────── */
function LeadStatusDonutChart({ leads, darkBg = false }: { leads: Lead[]; darkBg?: boolean }) {
  const statuses: Array<{ key: string; label: string; color: string; count?: number; pct?: number }> = [
    { key: 'NEW', label: 'New', color: '#10b981' },
    { key: 'CONTACTED', label: 'Contacted', color: '#3b82f6' },
    { key: 'QUALIFIED', label: 'Qualified', color: '#8b5cf6' },
    { key: 'FOLLOW_UP', label: 'Follow-up', color: '#f59e0b' },
    { key: 'UNQUALIFIED', label: 'Unqualified', color: '#ef4444' },
    { key: 'CLOSED', label: 'Closed', color: '#64748b' },
  ];

  const total = leads.length;
  const allCounts = statuses.map(s => {
    const count = leads.filter(l => (l.lead_status || 'NEW').toUpperCase() === s.key).length;
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return { ...s, count, pct };
  });
  const counts = allCounts.filter(s => s.count > 0);

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPct = 0;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap',
      padding: '18px 20px',
      borderRadius: 18,
      background: darkBg ? 'rgba(255, 255, 255, 0.08)' : '#ffffff',
      border: darkBg ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid #e2e8f0',
      backdropFilter: darkBg ? 'blur(12px)' : 'none',
      boxShadow: darkBg ? 'none' : '0 4px 20px rgba(0,0,0,0.03)',
    }}>
      {/* SVG Donut */}
      <div style={{ position: 'relative', width: 140, height: 140, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
        <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="70" cy="70" r={radius} fill="none" stroke={darkBg ? 'rgba(255,255,255,0.1)' : '#f1f5f9'} strokeWidth="16" />
          {counts.map((item) => {
            const strokeDasharray = `${(item.pct / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPct / 100) * circumference);
            accumulatedPct += item.pct;
            return (
              <circle
                key={item.key}
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth="16"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
            );
          })}
        </svg>
        <div style={{ position: 'absolute', textAlign: 'center' }}>
          <strong style={{ fontSize: '1.45rem', fontWeight: 800, color: darkBg ? '#ffffff' : '#0f172a', display: 'block', lineHeight: 1 }}>
            {total}
          </strong>
          <span style={{ fontSize: '0.68rem', color: darkBg ? 'rgba(255,255,255,0.7)' : '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Total Leads
          </span>
        </div>
      </div>

      {/* Legend Grid */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10, minWidth: 160 }}>
        {(counts.length > 0 ? counts : allCounts.slice(0, 4)).map((item) => (
          <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: item.color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.76rem', color: darkBg ? '#ffffff' : '#334155', fontWeight: 700 }}>{item.label}</div>
              <div style={{ fontSize: '0.7rem', color: darkBg ? 'rgba(255,255,255,0.65)' : '#64748b', fontWeight: 600 }}>
                {item.count ?? 0} <span style={{ opacity: 0.8 }}>({item.pct ?? 0}%)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────── SVG Executive Bar Graph ──────────────── */
function ExecutivePerformanceBarGraph({ memberStats, darkBg = false }: { memberStats: any[]; darkBg?: boolean }) {
  if (memberStats.length === 0) return null;
  const maxAssigned = Math.max(1, ...memberStats.map(m => m.assigned));

  return (
    <div style={{
      padding: '18px 20px',
      borderRadius: 18,
      background: darkBg ? 'rgba(255, 255, 255, 0.08)' : '#ffffff',
      border: darkBg ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid #e2e8f0',
      backdropFilter: darkBg ? 'blur(12px)' : 'none',
      boxShadow: darkBg ? 'none' : '0 4px 20px rgba(0,0,0,0.03)',
    }}>
      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: darkBg ? '#ffffff' : '#0f172a', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <TrendingUp size={15} /> Executive Workload &amp; Conversion
        </span>
        <div style={{ display: 'flex', gap: 12, fontSize: '0.68rem', fontWeight: 700, color: darkBg ? 'rgba(255,255,255,0.75)' : '#64748b' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: '#60a5fa' }} /> Assigned</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: '#34d399' }} /> Contacted</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: '#a78bfa' }} /> Qualified</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {memberStats.map(({ member, assigned, contacted, qualified }) => {
          const assignedPct = Math.round((assigned / maxAssigned) * 100);
          const contactedPct = assigned > 0 ? Math.round((contacted / maxAssigned) * 100) : 0;
          const qualifiedPct = assigned > 0 ? Math.round((qualified / maxAssigned) * 100) : 0;

          return (
            <div key={member.id} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: darkBg ? '#ffffff' : '#1e293b' }}>
                <span>{member.fullName}</span>
                <span style={{ fontSize: '0.72rem', color: darkBg ? 'rgba(255,255,255,0.7)' : '#64748b' }}>
                  {assigned} assigned · <strong style={{ color: darkBg ? '#86efac' : '#10b981' }}>{qualified} qualified</strong>
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ height: 6, borderRadius: 999, background: darkBg ? 'rgba(255,255,255,0.1)' : '#f1f5f9', overflow: 'hidden' }}>
                  <div title={`Assigned: ${assigned}`} style={{ width: `${assignedPct}%`, height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', transition: 'width 0.6s ease' }} />
                </div>
                <div style={{ height: 6, borderRadius: 999, background: darkBg ? 'rgba(255,255,255,0.1)' : '#f1f5f9', overflow: 'hidden' }}>
                  <div title={`Contacted: ${contacted}`} style={{ width: `${contactedPct}%`, height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #10b981, #34d399)', transition: 'width 0.6s ease' }} />
                </div>
                <div style={{ height: 6, borderRadius: 999, background: darkBg ? 'rgba(255,255,255,0.1)' : '#f1f5f9', overflow: 'hidden' }}>
                  <div title={`Qualified: ${qualified}`} style={{ width: `${qualifiedPct}%`, height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', transition: 'width 0.6s ease' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

