'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  FileText,
  Download,
  Briefcase,
  Search,
  RefreshCw,
  LogOut,
  ShieldCheck,
  Filter,
  FileSpreadsheet,
  CheckCircle,
} from 'lucide-react';

interface CareAssessment {
  id: number;
  name: string;
  phone_full: string;
  phone: string;
  city: string;
  service_start_date: string;
  package_name: string;
  enquiry_for: string;
  source_path: string;
  submitted_at: string;
  created_at: string;
}

interface DownloadLead {
  id: number;
  name: string;
  mobile: string;
  profession: string;
  download_title: string;
  download_file_url: string;
  status: string;
  source_path: string;
  submitted_at: string;
  created_at: string;
}

interface PartnerEnquiry {
  id: number;
  contact_name: string;
  organization: string;
  partner_type: string;
  phone: string;
  email: string;
  location: string;
  message: string;
  submitted_at: string;
  created_at: string;
}

interface CandidateApplication {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  experience: string;
  location: string;
  message: string;
  submitted_at: string;
  created_at: string;
}

interface UserAccountData {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phone?: string;
  role: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  allowedTabs?: string;
  createdAt?: string;
  approvedAt?: string;
}

function detectCareCategory(item: { source_path?: string; package_name?: string; enquiry_for?: string; download_title?: string }): {
  label: string;
  bg: string;
  color: string;
} {
  const text = `${item.source_path || ''} ${item.package_name || ''} ${item.enquiry_for || ''} ${item.download_title || ''}`.toLowerCase();

  if (text.includes('elder') || text.includes('senior') || text.includes('companion') || text.includes('dementia') || text.includes('stroke') || text.includes('parkinson') || text.includes('golden') || text.includes('graceful') || text.includes('falls')) {
    return { label: 'Elder Care', bg: '#fef3c7', color: '#92400e' };
  }
  if (text.includes('baby') || text.includes('mother') || text.includes('newborn') || text.includes('postnatal') || text.includes('infant') || text.includes('pediatric') || text.includes('nanny') || text.includes('premature')) {
    return { label: 'Baby & Mother Care', bg: '#fce7f3', color: '#9d174d' };
  }
  if (text.includes('icu') || text.includes('ventilator') || text.includes('critical')) {
    return { label: 'ICU at Home', bg: '#fee2e2', color: '#991b1b' };
  }
  if (text.includes('specialty') || text.includes('tracheostomy') || text.includes('palliative') || text.includes('chemotherapy') || text.includes('dialysis') || text.includes('wound') || text.includes('stoma')) {
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

function exportToCSV(filename: string, headers: string[], rows: (string | number)[][]) {
  const csvContent = [
    headers.map((h) => `"${String(h).replace(/"/g, '""')}"`).join(','),
    ...rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  // \uFEFF UTF-8 BOM ensures Microsoft Excel opens all columns perfectly separated!
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'packages' | 'downloads' | 'partners' | 'candidates' | 'users'>('packages');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // User session permissions
  const [userAllowedTabs, setUserAllowedTabs] = useState<string[]>(['packages', 'downloads', 'partners', 'candidates', 'users']);
  const [currentUserRole, setCurrentUserRole] = useState<string>('ADMIN');

  // Data states
  const [careAssessments, setCareAssessments] = useState<CareAssessment[]>([]);
  const [downloadLeads, setDownloadLeads] = useState<DownloadLead[]>([]);
  const [partnerEnquiries, setPartnerEnquiries] = useState<PartnerEnquiry[]>([]);
  const [candidateApplications, setCandidateApplications] = useState<CandidateApplication[]>([]);
  const [userAccounts, setUserAccounts] = useState<UserAccountData[]>([]);

  // User Approval Permission Edit State (maps userId -> allowedTabs string)
  const [userTabPermissions, setUserTabPermissions] = useState<Record<number, string[]>>({});

  // User Role Selection State (maps userId -> selected role)
  const [userRoleSelections, setUserRoleSelections] = useState<Record<number, string>>({});

  // Notification Modal Popup State
  const [notificationModal, setNotificationModal] = useState<{
    show: boolean;
    title: string;
    message: string;
    username?: string;
    permissions?: string;
  }>({
    show: false,
    title: '',
    message: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rawSession = localStorage.getItem('narpavi_admin_session');
      if (!rawSession) {
        router.push('/admin/login');
        return;
      }
      try {
        const session = JSON.parse(rawSession);
        setCurrentUserRole(session.role || 'ADMIN');
        
        let tabs = ['packages', 'downloads', 'partners', 'candidates', 'users'];
        if (session.role === 'ADMIN' || session.username === 'admin' || !session.allowedTabs) {
          tabs = ['packages', 'downloads', 'partners', 'candidates', 'users'];
        } else if (typeof session.allowedTabs === 'string') {
          const parsed = session.allowedTabs.split(',').map((t: string) => t.trim()).filter(Boolean);
          if (parsed.length > 0) {
            tabs = parsed;
          }
        }
        setUserAllowedTabs(tabs);

        // Auto-select valid active tab
        if (!tabs.includes(activeTab)) {
          setActiveTab((tabs[0] as any) || 'packages');
        }
      } catch (e) {
        setUserAllowedTabs(['packages', 'downloads', 'partners', 'candidates', 'users']);
      }
      setIsAdminLoggedIn(true);
    }
    fetchLeadsData();
  }, [router]);

  const fetchLeadsData = async () => {
    setIsLoading(true);
    try {
      let res = await fetch('/api/admin/leads');
      if (!res.ok) {
        res = await fetch('http://127.0.0.1:8085/api/admin/leads');
      }
      if (res.ok) {
        const data = await res.json();
        setCareAssessments(data.careAssessments || []);
        setDownloadLeads(data.downloadLeads || []);
        setPartnerEnquiries(data.partnerEnquiries || []);
        setCandidateApplications(data.candidateApplications || []);
        setUserAccounts(data.userAccounts || []);
      }
    } catch (err) {
      try {
        const directRes = await fetch('http://127.0.0.1:8085/api/admin/leads');
        if (directRes.ok) {
          const data = await directRes.json();
          setCareAssessments(data.careAssessments || []);
          setDownloadLeads(data.downloadLeads || []);
          setPartnerEnquiries(data.partnerEnquiries || []);
          setCandidateApplications(data.candidateApplications || []);
          setUserAccounts(data.userAccounts || []);
        }
      } catch (e) {
        console.error('Failed to fetch leads data:', e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('narpavi_admin_session');
      window.dispatchEvent(new Event('narpavi:admin-session-changed'));
    }
    router.push('/admin/login');
  };

  if (!isAdminLoggedIn) {
    return null;
  }

  // Filtered Lists
  const query = searchFilter.toLowerCase().trim();

  const filteredCareAssessments = careAssessments.filter((item) => {
    const cat = detectCareCategory(item).label;
    const matchesCategory = categoryFilter === 'ALL' || cat === categoryFilter;
    const matchesQuery =
      !query ||
      item.name?.toLowerCase().includes(query) ||
      item.phone_full?.toLowerCase().includes(query) ||
      item.city?.toLowerCase().includes(query) ||
      item.package_name?.toLowerCase().includes(query) ||
      item.enquiry_for?.toLowerCase().includes(query) ||
      cat.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const filteredDownloadLeads = downloadLeads.filter((item) => {
    const cat = detectCareCategory(item).label;
    const matchesCategory = categoryFilter === 'ALL' || cat === categoryFilter;
    const matchesQuery =
      !query ||
      item.name?.toLowerCase().includes(query) ||
      item.mobile?.toLowerCase().includes(query) ||
      item.profession?.toLowerCase().includes(query) ||
      item.download_title?.toLowerCase().includes(query) ||
      cat.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const filteredPartners = partnerEnquiries.filter((item) =>
    !query ||
    item.contact_name?.toLowerCase().includes(query) ||
    item.organization?.toLowerCase().includes(query) ||
    item.phone?.toLowerCase().includes(query) ||
    item.email?.toLowerCase().includes(query)
  );

  const filteredCandidates = candidateApplications.filter((item) =>
    !query ||
    item.name?.toLowerCase().includes(query) ||
    item.role?.toLowerCase().includes(query) ||
    item.phone?.toLowerCase().includes(query) ||
    item.email?.toLowerCase().includes(query)
  );

  const filteredUserAccounts = userAccounts.filter((user) =>
    !query ||
    user.fullName?.toLowerCase().includes(query) ||
    user.username?.toLowerCase().includes(query) ||
    user.email?.toLowerCase().includes(query) ||
    user.phone?.toLowerCase().includes(query) ||
    user.status?.toLowerCase().includes(query)
  );

  const toggleUserPermission = (userId: number, tabKey: string, currentAllowedString?: string) => {
    setUserTabPermissions((prev) => {
      const activeList = prev[userId]
        ? [...prev[userId]]
        : (currentAllowedString || 'packages,downloads,partners,candidates').split(',').map((t) => t.trim());

      if (activeList.includes(tabKey)) {
        return { ...prev, [userId]: activeList.filter((t) => t !== tabKey) };
      } else {
        return { ...prev, [userId]: [...activeList, tabKey] };
      }
    });
  };

  const handleApproveUser = async (userId: number, currentAllowedString?: string, username?: string, currentRole?: string) => {
    try {
      const selectedList = userTabPermissions[userId]
        || (currentAllowedString ? currentAllowedString.split(',').map((t) => t.trim()) : ['packages', 'downloads', 'partners', 'candidates']);

      const targetRole = userRoleSelections[userId] || currentRole || 'EXECUTIVE';

      let res = await fetch(`/api/admin/users/${userId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          allowedTabs: selectedList.join(','),
          role: targetRole,
        }),
      });

      if (!res.ok) {
        res = await fetch(`http://127.0.0.1:8085/api/admin/users/${userId}/approve`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            allowedTabs: selectedList.join(','),
            role: targetRole,
          }),
        });
      }

      if (res.ok) {
        fetchLeadsData();
        setNotificationModal({
          show: true,
          title: '🎉 Permissions & Approval Updated!',
          message: `User account @${username || userId} has been approved as ${targetRole}. Allowed dashboard menu tabs updated:`,
          username: username || String(userId),
          permissions: selectedList.join(', '),
        });
      }
    } catch (err) {
      console.error('Failed to approve user:', err);
    }
  };

  const handleRejectUser = async (userId: number, username?: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:8085/api/admin/users/${userId}/reject`, {
        method: 'PUT',
      });
      if (res.ok) {
        fetchLeadsData();
        setNotificationModal({
          show: true,
          title: '❌ Account Status Updated',
          message: `User account @${username || userId} has been rejected.`,
          username: username || String(userId),
        });
      }
    } catch (err) {
      console.error('Failed to reject user:', err);
    }
  };

  // Excel Export Functions
  const handleExportPackages = () => {
    const headers = ['ID', 'Care Category', 'Applicant Name', 'Mobile Number', 'City', 'Service Requested', 'Selected Package', 'Start Date', 'Submitted At'];
    const rows = filteredCareAssessments.map((item) => [
      item.id,
      detectCareCategory(item).label,
      item.name,
      item.phone_full || item.phone,
      item.city,
      item.enquiry_for || 'Care Assessment',
      item.package_name || '-',
      item.service_start_date || 'Flexible',
      item.created_at ? new Date(item.created_at).toLocaleString() : item.submitted_at,
    ]);
    exportToCSV(`narpavi_package_enquiries_${categoryFilter.replace(/\s+/g, '_')}`, headers, rows);
  };

  const handleExportDownloads = () => {
    const headers = ['ID', 'Care Category', 'User Name', 'Mobile Number', 'Profession', 'Downloaded Guide Title', 'File URL', 'Status', 'Submitted At'];
    const rows = filteredDownloadLeads.map((item) => [
      item.id,
      detectCareCategory(item).label,
      item.name,
      item.mobile,
      item.profession,
      item.download_title,
      item.download_file_url || '-',
      item.status || 'READY',
      item.created_at ? new Date(item.created_at).toLocaleString() : item.submitted_at,
    ]);
    exportToCSV(`narpavi_blog_download_leads_${categoryFilter.replace(/\s+/g, '_')}`, headers, rows);
  };

  const handleExportPartners = () => {
    const headers = ['ID', 'Contact Name', 'Organization', 'Partner Type', 'Phone Number', 'Email', 'Location', 'Message', 'Submitted At'];
    const rows = filteredPartners.map((item) => [
      item.id,
      item.contact_name,
      item.organization,
      item.partner_type,
      item.phone,
      item.email,
      item.location,
      item.message || '-',
      item.created_at ? new Date(item.created_at).toLocaleString() : item.submitted_at,
    ]);
    exportToCSV('narpavi_partner_enquiries', headers, rows);
  };

  const handleExportCandidates = () => {
    const headers = ['ID', 'Candidate Name', 'Role Applied', 'Experience', 'Phone Number', 'Email', 'Location', 'Message', 'Submitted At'];
    const rows = filteredCandidates.map((item) => [
      item.id,
      item.name,
      item.role,
      item.experience,
      item.phone,
      item.email,
      item.location,
      item.message || '-',
      item.created_at ? new Date(item.created_at).toLocaleString() : item.submitted_at,
    ]);
    exportToCSV('narpavi_candidate_applications', headers, rows);
  };

  const handleExportActiveTab = () => {
    if (activeTab === 'packages') handleExportPackages();
    else if (activeTab === 'downloads') handleExportDownloads();
    else if (activeTab === 'partners') handleExportPartners();
    else if (activeTab === 'candidates') handleExportCandidates();
  };

  return (
    <div className="admin-dashboard-page">
      <div className="container">
        {/* HEADER BAR */}
        <div className="admin-dash-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span className="admin-pill-tag"><ShieldCheck size={14} style={{ display: 'inline', marginRight: 4 }} /> Admin Portal</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>Narpavi Care Applications & Leads</h1>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Category-wise overview & Excel export for Elder Care, Baby Care, Home Nursing & Package Bookings.</p>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleExportActiveTab}
              className="btn btn--primary btn--sm"
              style={{ background: '#10b981', borderColor: '#10b981', color: '#fff', gap: 6 }}
            >
              <FileSpreadsheet size={16} /> Export Section to Excel (.csv)
            </button>
            <button type="button" onClick={fetchLeadsData} className="btn btn--outline btn--sm" disabled={isLoading}>
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} /> Refresh Data
            </button>
            <button type="button" onClick={handleLogout} className="btn btn--secondary btn--sm" style={{ background: '#ef4444', borderColor: '#ef4444', color: '#fff' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* METRICS */}
        <div className="admin-dash-metrics">
          {userAllowedTabs.includes('packages') && (
            <div className="admin-metric-card" onClick={() => setActiveTab('packages')} style={{ cursor: 'pointer' }}>
              <div className="admin-metric-icon"><FileText size={24} /></div>
              <div className="admin-metric-info">
                <span>Package Bookings</span>
                <strong>{careAssessments.length}</strong>
              </div>
            </div>
          )}

          {userAllowedTabs.includes('downloads') && (
            <div className="admin-metric-card" onClick={() => setActiveTab('downloads')} style={{ cursor: 'pointer' }}>
              <div className="admin-metric-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}><Download size={24} /></div>
              <div className="admin-metric-info">
                <span>Blog Download Leads</span>
                <strong>{downloadLeads.length}</strong>
              </div>
            </div>
          )}

          {userAllowedTabs.includes('partners') && (
            <div className="admin-metric-card" onClick={() => setActiveTab('partners')} style={{ cursor: 'pointer' }}>
              <div className="admin-metric-icon" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}><Users size={24} /></div>
              <div className="admin-metric-info">
                <span>Partner Enquiries</span>
                <strong>{partnerEnquiries.length}</strong>
              </div>
            </div>
          )}

          {userAllowedTabs.includes('candidates') && (
            <div className="admin-metric-card" onClick={() => setActiveTab('candidates')} style={{ cursor: 'pointer' }}>
              <div className="admin-metric-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}><Briefcase size={24} /></div>
              <div className="admin-metric-info">
                <span>Candidate Applicants</span>
                <strong>{candidateApplications.length}</strong>
              </div>
            </div>
          )}

          {(userAllowedTabs.includes('users') || currentUserRole === 'ADMIN') && (
            <div className="admin-metric-card" onClick={() => setActiveTab('users')} style={{ cursor: 'pointer' }}>
              <div className="admin-metric-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><ShieldCheck size={24} /></div>
              <div className="admin-metric-info">
                <span>User Approvals</span>
                <strong>{userAccounts.filter((u) => u.status === 'PENDING').length} Pending</strong>
              </div>
            </div>
          )}
        </div>

        {/* MAIN NAVIGATION TABS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
          <div className="admin-dash-tabs" style={{ margin: 0, border: 'none' }}>
            {userAllowedTabs.includes('packages') && (
              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'packages' ? 'admin-tab-btn--active' : ''}`}
                onClick={() => setActiveTab('packages')}
              >
                Package Enquiries ({careAssessments.length})
              </button>
            )}

            {userAllowedTabs.includes('downloads') && (
              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'downloads' ? 'admin-tab-btn--active' : ''}`}
                onClick={() => setActiveTab('downloads')}
              >
                Blog Download Leads ({downloadLeads.length})
              </button>
            )}

            {userAllowedTabs.includes('partners') && (
              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'partners' ? 'admin-tab-btn--active' : ''}`}
                onClick={() => setActiveTab('partners')}
              >
                Partner Enquiries ({partnerEnquiries.length})
              </button>
            )}

            {userAllowedTabs.includes('candidates') && (
              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'candidates' ? 'admin-tab-btn--active' : ''}`}
                onClick={() => setActiveTab('candidates')}
              >
                Candidate Applications ({candidateApplications.length})
              </button>
            )}

            {(userAllowedTabs.includes('users') || currentUserRole === 'ADMIN') && (
              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'users' ? 'admin-tab-btn--active' : ''}`}
                onClick={() => setActiveTab('users')}
                style={{
                  background: activeTab === 'users' ? 'linear-gradient(135deg, #0a8f8f 0%, #0d7c7c 100%)' : undefined,
                  position: 'relative',
                }}
              >
                🔐 User Approvals ({userAccounts.filter((u) => u.status === 'PENDING').length} Pending / {userAccounts.length})
              </button>
            )}
          </div>

          <div style={{ position: 'relative', width: 280 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search leads by name, phone..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{ width: '100%', padding: '0.55rem 0.8rem 0.55rem 2.3rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
            />
          </div>
        </div>

        {/* CATEGORY FILTER BUTTONS (FOR PACKAGES & DOWNLOAD LEADS) */}
        {(activeTab === 'packages' || activeTab === 'downloads') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 20, padding: '0.85rem 1rem', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: 4, marginRight: 8 }}>
              <Filter size={15} /> Care Category:
            </span>

            {[
              { id: 'ALL', label: 'All Categories' },
              { id: 'Elder Care', label: '👴 Elder Care' },
              { id: 'Baby & Mother Care', label: '👶 Baby Care' },
              { id: 'Home Nursing Care', label: '🩺 Home Nursing' },
              { id: 'ICU at Home', label: '🏥 ICU at Home' },
              { id: 'Specialty Care', label: '🔬 Specialty Care' },
              { id: 'Advance Nursing Care', label: '⚡ Advance Care' },
              { id: 'Medical Equipment', label: '📦 Medical Equipment' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                style={{
                  padding: '0.35rem 0.8rem',
                  borderRadius: 9999,
                  border: '1px solid',
                  borderColor: categoryFilter === cat.id ? '#0a8f8f' : '#cbd5e1',
                  background: categoryFilter === cat.id ? '#0a8f8f' : '#f8fafc',
                  color: categoryFilter === cat.id ? '#ffffff' : '#334155',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            ))}

            <button
              type="button"
              onClick={handleExportActiveTab}
              style={{
                marginLeft: 'auto',
                padding: '0.4rem 0.85rem',
                borderRadius: 8,
                background: '#10b981',
                color: '#fff',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <FileSpreadsheet size={15} /> Export Filtered to Excel
            </button>
          </div>
        )}

        {/* TAB 1: CARE PACKAGE BOOKINGS & ENQUIRIES */}
        {activeTab === 'packages' && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Care Category</th>
                  <th>Applicant Name</th>
                  <th>Mobile Number</th>
                  <th>City</th>
                  <th>Requested Package / Service</th>
                  <th>Start Date</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {filteredCareAssessments.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                      No care package enquiries found for category filter: <strong>{categoryFilter}</strong>.
                    </td>
                  </tr>
                ) : (
                  filteredCareAssessments.map((item) => {
                    const cat = detectCareCategory(item);
                    return (
                      <tr key={item.id}>
                        <td><strong>#{item.id}</strong></td>
                        <td>
                          <span style={{ padding: '0.25rem 0.65rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 800, background: cat.bg, color: cat.color }}>
                            {cat.label}
                          </span>
                        </td>
                        <td><strong>{item.name}</strong></td>
                        <td><a href={`tel:${item.phone_full}`} style={{ color: '#0a8f8f', fontWeight: 600 }}>{item.phone_full || item.phone}</a></td>
                        <td>{item.city}</td>
                        <td>
                          <span className="admin-pill-tag">{item.enquiry_for || item.package_name || 'Care Assessment'}</span>
                          {item.package_name && item.package_name !== item.enquiry_for && (
                            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 2 }}>{item.package_name}</div>
                          )}
                        </td>
                        <td>{item.service_start_date || 'Flexible'}</td>
                        <td><small>{item.created_at ? new Date(item.created_at).toLocaleString() : item.submitted_at}</small></td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: BLOG DOWNLOAD LEADS */}
        {activeTab === 'downloads' && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Care Category</th>
                  <th>User Name</th>
                  <th>Mobile Number</th>
                  <th>Profession</th>
                  <th>Downloaded Title / Guide</th>
                  <th>Status</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {filteredDownloadLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                      No blog download leads found for category filter: <strong>{categoryFilter}</strong>.
                    </td>
                  </tr>
                ) : (
                  filteredDownloadLeads.map((item) => {
                    const cat = detectCareCategory(item);
                    return (
                      <tr key={item.id}>
                        <td><strong>#{item.id}</strong></td>
                        <td>
                          <span style={{ padding: '0.25rem 0.65rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 800, background: cat.bg, color: cat.color }}>
                            {cat.label}
                          </span>
                        </td>
                        <td><strong>{item.name}</strong></td>
                        <td><a href={`tel:${item.mobile}`} style={{ color: '#0a8f8f', fontWeight: 600 }}>{item.mobile}</a></td>
                        <td>{item.profession}</td>
                        <td>
                          <strong>{item.download_title}</strong>
                          {item.download_file_url && (
                            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 2 }}>{item.download_file_url}</div>
                          )}
                        </td>
                        <td>
                          <span className="admin-pill-tag" style={{ background: item.status === 'READY' ? '#dcfce7' : '#fef9c3', color: item.status === 'READY' ? '#15803d' : '#a16207' }}>
                            {item.status || 'READY'}
                          </span>
                        </td>
                        <td><small>{item.created_at ? new Date(item.created_at).toLocaleString() : item.submitted_at}</small></td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: PARTNER ENQUIRIES */}
        {activeTab === 'partners' && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Contact Name</th>
                  <th>Organization</th>
                  <th>Partner Type</th>
                  <th>Phone & Email</th>
                  <th>Location</th>
                  <th>Message</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {filteredPartners.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                      No partner enquiries found.
                    </td>
                  </tr>
                ) : (
                  filteredPartners.map((item) => (
                    <tr key={item.id}>
                      <td><strong>#{item.id}</strong></td>
                      <td><strong>{item.contact_name}</strong></td>
                      <td>{item.organization}</td>
                      <td><span className="admin-pill-tag">{item.partner_type}</span></td>
                      <td>
                        <div><a href={`tel:${item.phone}`} style={{ color: '#0a8f8f', fontWeight: 600 }}>{item.phone}</a></div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{item.email}</div>
                      </td>
                      <td>{item.location}</td>
                      <td><small style={{ color: '#475569' }}>{item.message || '-'}</small></td>
                      <td><small>{item.created_at ? new Date(item.created_at).toLocaleString() : item.submitted_at}</small></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: CANDIDATE APPLICATIONS */}
        {activeTab === 'candidates' && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Candidate Name</th>
                  <th>Role Applied</th>
                  <th>Experience</th>
                  <th>Phone & Email</th>
                  <th>Location</th>
                  <th>Message</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                      No candidate applications found.
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((item) => (
                    <tr key={item.id}>
                      <td><strong>#{item.id}</strong></td>
                      <td><strong>{item.name}</strong></td>
                      <td><span className="admin-pill-tag" style={{ background: '#f3e8ff', color: '#7e22ce' }}>{item.role}</span></td>
                      <td>{item.experience}</td>
                      <td>
                        <div><a href={`tel:${item.phone}`} style={{ color: '#0a8f8f', fontWeight: 600 }}>{item.phone}</a></div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{item.email}</div>
                      </td>
                      <td>{item.location}</td>
                      <td><small style={{ color: '#475569' }}>{item.message || '-'}</small></td>
                      <td><small>{item.created_at ? new Date(item.created_at).toLocaleString() : item.submitted_at}</small></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 5: USER ACCOUNTS & APPROVALS */}
        {activeTab === 'users' && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>Email & Phone</th>
                  <th>Assign Role (Manager Selects)</th>
                  <th>Allowed Menu Permissions</th>
                  <th>Status</th>
                  <th>Approval Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUserAccounts.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                      No registered user accounts found.
                    </td>
                  </tr>
                ) : (
                  filteredUserAccounts.map((user) => {
                    const currentActiveTabs = userTabPermissions[user.id]
                      ? userTabPermissions[user.id]
                      : (user.allowedTabs || 'packages,downloads,partners,candidates').split(',').map((t) => t.trim());

                    return (
                      <tr key={user.id}>
                        <td><strong>#{user.id}</strong></td>
                        <td>
                          <strong>{user.fullName}</strong>
                        </td>
                        <td><code style={{ fontSize: '0.85rem', color: '#0a8f8f', background: 'rgba(10, 143, 143, 0.08)', padding: '2px 8px', borderRadius: 6 }}>@{user.username}</code></td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{user.email}</div>
                          <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{user.phone || '-'}</div>
                        </td>
                        <td>
                          {user.role === 'ADMIN' ? (
                            <span style={{
                              padding: '4px 10px',
                              borderRadius: 8,
                              fontSize: '0.78rem',
                              fontWeight: 800,
                              background: '#f3e8ff',
                              color: '#7e22ce',
                            }}>
                              👑 MANAGER (Admin)
                            </span>
                          ) : (
                            <select
                              value={userRoleSelections[user.id] || user.role || 'EXECUTIVE'}
                              onChange={(e) => setUserRoleSelections(prev => ({ ...prev, [user.id]: e.target.value }))}
                              style={{
                                padding: '0.45rem 0.6rem',
                                borderRadius: 8,
                                border: '2px solid #0a8f8f',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                color: '#0f172a',
                                background: '#f0fdfa',
                                cursor: 'pointer',
                                width: '100%',
                                maxWidth: 220,
                              }}
                            >
                              <option value="EXECUTIVE">👤 Executive (Sales/Telecaller)</option>
                              <option value="TEAM_LEAD">⭐ Team Lead</option>
                              <option value="ADMIN">👑 Manager / Admin</option>
                            </select>
                          )}
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.82rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={currentActiveTabs.includes('packages')}
                                onChange={() => toggleUserPermission(user.id, 'packages', user.allowedTabs)}
                              />
                              📦 Package Enquiries
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={currentActiveTabs.includes('downloads')}
                                onChange={() => toggleUserPermission(user.id, 'downloads', user.allowedTabs)}
                              />
                              📑 Blog Download Leads
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={currentActiveTabs.includes('partners')}
                                onChange={() => toggleUserPermission(user.id, 'partners', user.allowedTabs)}
                              />
                              🤝 Partner Enquiries
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={currentActiveTabs.includes('candidates')}
                                onChange={() => toggleUserPermission(user.id, 'candidates', user.allowedTabs)}
                              />
                              💼 Candidate Applications
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={currentActiveTabs.includes('users')}
                                onChange={() => toggleUserPermission(user.id, 'users', user.allowedTabs)}
                              />
                              🔐 User Approvals (Admin Only)
                            </label>
                          </div>
                        </td>
                        <td>
                          <span style={{
                            padding: '0.3rem 0.75rem',
                            borderRadius: 9999,
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            background: user.status === 'APPROVED' ? '#dcfce7' : user.status === 'REJECTED' ? '#fee2e2' : '#fef9c3',
                            color: user.status === 'APPROVED' ? '#166534' : user.status === 'REJECTED' ? '#991b1b' : '#854d0e',
                          }}>
                            {user.status === 'PENDING' ? '⏳ PENDING APPROVAL' : user.status === 'APPROVED' ? '✅ APPROVED' : '❌ REJECTED'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {user.status !== 'APPROVED' ? (
                              <button
                                type="button"
                                onClick={() => handleApproveUser(user.id, user.allowedTabs, user.username, user.role)}
                                style={{
                                  padding: '0.45rem 0.85rem',
                                  borderRadius: 8,
                                  background: '#10b981',
                                  color: '#ffffff',
                                  border: 'none',
                                  fontWeight: 800,
                                  fontSize: '0.8rem',
                                  cursor: 'pointer',
                                  boxShadow: '0 2px 6px rgba(16, 185, 129, 0.25)',
                                }}
                              >
                                Approve User
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleApproveUser(user.id, user.allowedTabs, user.username, user.role)}
                                style={{
                                  padding: '0.35rem 0.75rem',
                                  borderRadius: 8,
                                  background: '#0a8f8f',
                                  color: '#ffffff',
                                  border: 'none',
                                  fontWeight: 700,
                                  fontSize: '0.75rem',
                                  cursor: 'pointer',
                                }}
                              >
                                Update Permissions
                              </button>
                            )}
                            {user.status !== 'REJECTED' && (
                              <button
                                type="button"
                                onClick={() => handleRejectUser(user.id, user.username)}
                                style={{
                                  padding: '0.4rem 0.85rem',
                                  borderRadius: 8,
                                  background: '#ef4444',
                                  color: '#ffffff',
                                  border: 'none',
                                  fontWeight: 800,
                                  fontSize: '0.8rem',
                                  cursor: 'pointer',
                                  boxShadow: '0 2px 6px rgba(239, 68, 68, 0.25)',
                                }}
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* POPUP NOTIFICATION MODAL */}
      {notificationModal.show && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            display: 'grid',
            placeItems: 'center',
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div
            style={{
              width: '90%',
              maxWidth: 480,
              background: '#ffffff',
              borderRadius: 24,
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              textAlign: 'center',
              border: '1px solid rgba(226, 232, 240, 0.8)',
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: notificationModal.title.includes('❌') ? '#fee2e2' : '#dcfce7',
                color: notificationModal.title.includes('❌') ? '#ef4444' : '#10b981',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 1rem',
              }}
            >
              <CheckCircle size={36} />
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              {notificationModal.title}
            </h2>

            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {notificationModal.message}
            </p>

            {notificationModal.permissions && (
              <div
                style={{
                  background: 'rgba(10, 143, 143, 0.08)',
                  border: '1px solid rgba(10, 143, 143, 0.2)',
                  borderRadius: 12,
                  padding: '0.75rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#0a8f8f',
                  marginBottom: '1.5rem',
                  wordBreak: 'break-word',
                }}
              >
                🔑 Allowed Tabs: {notificationModal.permissions}
              </div>
            )}

            <button
              type="button"
              onClick={() => setNotificationModal({ show: false, title: '', message: '' })}
              style={{
                width: '100%',
                padding: '0.85rem 1.5rem',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #0a8f8f 0%, #0d7c7c 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(10, 143, 143, 0.3)',
              }}
            >
              OK, Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
