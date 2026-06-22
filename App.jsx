```react
import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, Building2, Scale, ShieldAlert, 
  Activity, Settings, Bell, Search, ChevronDown, 
  Filter, MoreVertical, Check, X, Users, CreditCard,
  FileText, Download, Plus, ChevronLeft, ChevronRight,
  Menu, LogOut, User, RefreshCw, Layers, ShieldCheck, 
  HardDrive, AlertTriangle, Play, CheckCircle2, XCircle, 
  ArrowUpRight, ArrowDownRight, Briefcase, Mail, Send, 
  Database, HelpCircle, Eye, Sliders, ToggleLeft, ToggleRight, Trash2, Edit2
} from 'lucide-react';

// --- STYLES & FONTS ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  body {
    font-family: 'Inter', sans-serif;
    background-color: #f8fafc;
    color: #0f172a;
  }
`;

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  // --- CENTRALIZED STATE (SIMULATING PRODUCTION DATABASE) ---
  const [companies, setCompanies] = useState([
    { id: 'COMP-001', name: 'TechFlow Solutions', tenant: 'Global Corp', status: 'Active', branches: 4, employees: 1250, created: '2025-11-12', riskTier: 'Low', budget: 150000, utilized: 45000, customFields: {} },
    { id: 'COMP-002', name: 'Nexus Industries', tenant: 'Nexus Group', status: 'Active', branches: 12, employees: 3400, created: '2025-10-05', riskTier: 'Medium', budget: 400000, utilized: 185000, customFields: {} },
    { id: 'COMP-003', name: 'Apex Retail Group', tenant: 'Global Corp', status: 'Inactive', branches: 2, employees: 450, created: '2026-01-20', riskTier: 'High', budget: 50000, utilized: 12000, customFields: {} },
    { id: 'COMP-004', name: 'Vanguard Logistics', tenant: 'Vanguard', status: 'Active', branches: 8, employees: 2100, created: '2025-08-30', riskTier: 'Low', budget: 250000, utilized: 98000, customFields: {} },
    { id: 'COMP-005', name: 'Summit Healthcare', tenant: 'Global Corp', status: 'Pending', branches: 1, employees: 120, created: '2026-06-15', riskTier: 'Critical', budget: 20000, utilized: 0, customFields: {} },
    { id: 'COMP-006', name: 'Quantum Financial', tenant: 'Quantum', status: 'Active', branches: 5, employees: 890, created: '2025-12-01', riskTier: 'Low', budget: 180000, utilized: 35000, customFields: {} },
    { id: 'COMP-007', name: 'EcoBuild Partners', tenant: 'Global Corp', status: 'Active', branches: 3, employees: 600, created: '2026-02-14', riskTier: 'Medium', budget: 90000, utilized: 41000, customFields: {} },
  ]);

  const [transactions, setTransactions] = useState([
    { id: 'TXN-9012', employee: 'Marcus Vance', company: 'TechFlow Solutions', amount: 245.00, channel: 'Instant Transfer', status: 'Success', timestamp: '2026-06-22 14:32:10' },
    { id: 'TXN-9013', employee: 'Sarah Jenkins', company: 'Nexus Industries', amount: 410.00, channel: 'Next-Day ACH', status: 'Pending', timestamp: '2026-06-22 15:10:04' },
    { id: 'TXN-9014', employee: 'Carlos Ramos', company: 'Vanguard Logistics', amount: 150.00, channel: 'Instant Transfer', status: 'Failed', timestamp: '2026-06-22 15:45:11' },
    { id: 'TXN-9015', employee: 'Alina Drago', company: 'Quantum Financial', amount: 320.00, channel: 'Real-Time Clearing', status: 'Success', timestamp: '2026-06-22 16:01:55' },
    { id: 'TXN-9016', employee: 'David Wu', company: 'Nexus Industries', amount: 80.00, channel: 'Instant Transfer', status: 'Success', timestamp: '2026-06-22 16:22:40' },
  ]);

  const [rules, setRules] = useState([
    { id: 'RUL-001', name: 'Global Baseline Limit', scope: 'Global', maxAdvancePct: 50, feeType: 'Flat Rate ($2.99)', velocityLimit: '3 transfers / cycle', status: 'Active' },
    { id: 'RUL-002', name: 'Nexus Corporate Override', scope: 'Corporate', maxAdvancePct: 60, feeType: 'Zero Fee', velocityLimit: 'No limit', status: 'Active' },
    { id: 'RUL-003', name: 'Apex High Risk Limitation', scope: 'Corporate', maxAdvancePct: 30, feeType: 'Tiered Percentage', velocityLimit: '1 transfer / cycle', status: 'Active' },
  ]);

  const [kycConfigs, setKycConfigs] = useState([
    { tenant: 'Global Corp', docTypes: ['National ID', 'Payslip'], method: 'OCR + Manual Approval', threshold: 85 },
    { tenant: 'Nexus Group', docTypes: ['National ID', 'Employment Verification'], method: 'Automated OCR', threshold: 92 },
    { tenant: 'Vanguard', docTypes: ['National ID'], method: 'OCR + Manual Approval', threshold: 80 },
  ]);

  const [integrations, setIntegrations] = useState([
    { id: 'INT-ADP', name: 'ADP Workforce Now', type: 'Payroll & HRIS', status: 'Healthy', lastTested: '2026-06-22 18:00', host: 'api.adp.com/v1/workforce' },
    { id: 'INT-WORK', name: 'Workday Core HR', type: 'HRIS Directory', status: 'Healthy', lastTested: '2026-06-22 17:15', host: 'wd5-impl.workday.com/ewa' },
    { id: 'INT-BAM', name: 'BambooHR', type: 'Employee Directory', status: 'Degraded', lastTested: '2026-06-22 12:30', host: 'api.bamboohr.com/v1' },
    { id: 'INT-SAP', name: 'SAP SuccessFactors', type: 'Payroll System', status: 'Offline', lastTested: '2026-06-21 09:00', host: 'sf-connector.ewa-prod.net' },
  ]);

  const [userAccounts, setUserAccounts] = useState([
    { id: 'USR-01', name: 'Elena Rostova', email: 'elena@ewaplatform.com', role: 'Super Admin', tenant: 'Global Corp', status: 'Active', lastLogin: '2026-06-22 19:30' },
    { id: 'USR-02', name: 'Devon Carter', email: 'devon.carter@ewaplatform.com', role: 'Operations Lead', tenant: 'Nexus Group', status: 'Active', lastLogin: '2026-06-22 20:12' },
    { id: 'USR-03', name: 'Sarah Jenkins', email: 'sarah.j@ewaplatform.com', role: 'Risk Officer', tenant: 'Vanguard', status: 'Active', lastLogin: '2026-06-22 15:45' },
  ]);

  const [chartOfAccounts, setChartOfAccounts] = useState([
    { code: '1000', name: 'Assets', type: 'Asset', balance: 5240000, parent: null },
    { code: '1100', name: 'Cash and Cash Equivalents', type: 'Asset', balance: 3410000, parent: '1000' },
    { code: '1110', name: 'EWA Disbursement Clearing Escrow', type: 'Asset', balance: 1830000, parent: '1100' },
    { code: '2000', name: 'Liabilities', type: 'Liability', balance: 4120000, parent: null },
    { code: '2100', name: 'Outstanding EWA Disbursals', type: 'Liability', balance: 3950000, parent: '2000' },
    { code: '2200', name: 'Unearned Transaction Fee Pool', type: 'Liability', balance: 170000, parent: '2000' },
    { code: '3000', name: 'Equity', type: 'Equity', balance: 1120000, parent: null },
  ]);

  const [onboardingQueue, setOnboardingQueue] = useState([
    { company: 'Prime Retailers', tenant: 'Global Corp', stage: 'Contract Signoff', assigned: 'Elena Rostova', progress: 75 },
    { company: 'Swift Delivery Systems', tenant: 'Vanguard', stage: 'Sandbox Testing', assigned: 'Devon Carter', progress: 50 },
    { company: 'Legacy Heavy Machineries', tenant: 'Global Corp', stage: 'Due Diligence', assigned: 'Sarah Jenkins', progress: 20 },
  ]);

  const [ghostAlerts, setGhostAlerts] = useState([
    { id: 'GST-101', employee: 'Johnathan Doe', company: 'Apex Retail Group', imbalance: '$1,200', alertScore: 94, status: 'Open' },
    { id: 'GST-102', employee: 'Alisha Sterling', company: 'Nexus Industries', imbalance: '$650', alertScore: 82, status: 'Open' },
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { timestamp: '2026-06-22 20:15:34', user: 'elena@ewaplatform.com', action: 'Modified KYC Ruleset Auto-Approval limit for Nexus Group', ip: '192.168.1.45' },
    { timestamp: '2026-06-22 19:42:10', user: 'system_daemon', action: 'Ghost Employee Scanner flagged high variance for employee USR-892', ip: '127.0.0.1' },
    { timestamp: '2026-06-22 18:22:15', user: 'devon.carter@ewaplatform.com', action: 'Approved corporate onboarding credentials for TechFlow Solutions', ip: '192.168.1.92' },
  ]);

  const [customFields, setCustomFields] = useState([
    { id: 'cf_tax_id', label: 'Local Tax Registration ID', type: 'text', target: 'companies' },
  ]);

  const [systemSettings, setSystemSettings] = useState({
    platformName: 'EWA Enterprise Hub',
    supportEmail: 'escalations@ewaplatform.com',
    sessionTimeout: '30 Minutes',
    maxLoginAttempts: '5 Attempts',
    allowDirectEscrowFunding: true,
  });

  const [notificationTemplates, setNotificationTemplates] = useState([
    { id: 'NT-01', trigger: 'Advance Request Success', channel: 'SMS', content: 'Your Earned Wage Access of {amount} was cleared successfully to your debit card.' },
    { id: 'NT-02', trigger: 'Overdue Repayment Reminder', channel: 'Email', content: 'This is a polite notification that your accumulated payroll balance sync is pending verification.' },
  ]);

  const [bulkJobs, setBulkJobs] = useState([
    { jobId: 'JOB-2294', type: 'HRIS Employee Synchronization', status: 'Processing', progress: 68, started: '2026-06-22 20:30' },
    { jobId: 'JOB-2293', type: 'ADP Pay Statement Sync', status: 'Completed', progress: 100, started: '2026-06-22 19:00' },
  ]);

  const [settlements, setSettlements] = useState([
    { id: 'SET-7023', company: 'TechFlow Solutions', amount: 14500.00, submittedAt: '2026-06-22 10:00', proof: 'receipt_trans_7023.png', status: 'Pending' },
    { id: 'SET-7024', company: 'Nexus Industries', amount: 48900.00, submittedAt: '2026-06-22 11:15', proof: 'receipt_trans_7024.png', status: 'Pending' },
  ]);

  const [userPreferences, setUserPreferences] = useState({
    defaultLandingPage: 'dashboard',
    defaultPaginationSize: 10,
    twoFactorEnabled: true,
  });

  // --- NAVIGATION STATE ---
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toasts, setToasts] = useState([]);

  // --- SYSTEM STATS DERIVATIONS (LIVE REACTIVITY) ---
  const calculatedStats = useMemo(() => {
    const totalCompaniesCount = companies.length;
    const activeTenantsCount = Array.from(new Set(companies.map(c => c.tenant))).length;
    const activeCompanies = companies.filter(c => c.status === 'Active');
    const totalVolume = transactions.reduce((acc, curr) => curr.status === 'Success' ? acc + curr.amount : acc, 0);
    const feeRevenue = transactions.filter(t => t.status === 'Success').length * 2.99; // Simple simulation

    return {
      totalCompaniesCount,
      activeTenantsCount,
      totalVolume,
      feeRevenue,
      activeCompaniesCount: activeCompanies.length,
    };
  }, [companies, transactions]);

  // --- TRIGGER ACTION ACTION TOASTS ---
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // --- COMPONENT PORTALS RENDERING LOGIC ---
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans antialiased text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />

      {/* GLOBAL TOAST ALERTS */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full">
        {toasts.map(toast => (
          <div key={toast.id} className={`p-4 rounded-sm border shadow-lg flex items-start gap-3 bg-white transition-all transform duration-300 translate-y-0 ${
            toast.type === 'error' ? 'border-red-200 text-red-900' : 
            toast.type === 'warning' ? 'border-amber-200 text-amber-900' : 'border-emerald-200 text-emerald-900'
          }`}>
            {toast.type === 'error' ? <XCircle className="w-5 h-5 text-red-500 shrink-0" /> :
             toast.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" /> :
             <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
            <div className="text-sm font-medium">{toast.message}</div>
          </div>
        ))}
      </div>

      {/* FIXED SIDEBAR */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col z-30 border-r border-slate-800`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center text-white font-extrabold text-base">E</div>
              <span className="font-semibold text-base tracking-wider text-white">EWA PLATFORM</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center text-white font-extrabold text-base mx-auto">E</div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {/* Menu Sections */}
          {[
            {
              title: 'Admin Module',
              items: [
                { id: 'dashboard', label: 'Dashboard (F-18)', icon: LayoutDashboard },
                { id: 'companies', label: 'Companies (F-19)', icon: Building2 },
                { id: 'rules', label: 'Rules Engine (F-20)', icon: Scale },
                { id: 'kyc', label: 'KYC Control (F-21)', icon: ShieldCheck },
                { id: 'integrations', label: 'Integrations (F-22)', icon: Database },
                { id: 'users', label: 'User & Roles (F-23)', icon: Users },
                { id: 'accounts', label: 'Ledger Accounts (F-24)', icon: Layers },
                { id: 'tenants', label: 'Tenants (F-25)', icon: HardDrive },
              ]
            },
            {
              title: 'Operations Module',
              items: [
                { id: 'ops-dash', label: 'Ops Desk (F-26)', icon: Activity },
                { id: 'transactions', label: 'Transactions (F-27)', icon: FileText },
                { id: 'verification', label: 'Settlements (F-28)', icon: CheckCircle2 },
                { id: 'repayments', label: 'Repayments (F-29)', icon: CreditCard },
                { id: 'onboarding', label: 'Onboarding (F-30)', icon: Briefcase },
                { id: 'qr-transfers', label: 'QR Transfers (F-32)', icon: Search },
                { id: 'reports', label: 'Reports (F-33)', icon: FileText },
              ]
            },
            {
              title: 'Risk & Treasury',
              items: [
                { id: 'risk-scoring', label: 'Risk Scores (F-34)', icon: ShieldAlert },
                { id: 'budgets', label: 'Budgets (F-35)', icon: Sliders },
                { id: 'ghosts', label: 'Ghost Detection (F-38)', icon: AlertTriangle },
                { id: 'global-notifications', label: 'Notification Config', icon: Mail },
                { id: 'audit-logs', label: 'Platform Audit', icon: FileText },
                { id: 'system-settings', label: 'Settings', icon: Settings },
              ]
            }
          ].map((section, sIdx) => (
            <div key={sIdx} className="mb-6">
              {sidebarOpen && (
                <div className="px-6 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  {section.title}
                </div>
              )}
              <ul>
                {section.items.map(item => {
                  const isActive = activeMenu === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveMenu(item.id)}
                        className={`w-full flex items-center px-6 py-2 text-sm font-medium transition-colors ${
                          isActive 
                            ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                        }`}
                        title={!sidebarOpen ? item.label : ''}
                      >
                        <item.icon className={`w-4 h-4 ${sidebarOpen ? 'mr-3' : 'mx-auto'} ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                        {sidebarOpen && <span>{item.label}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center text-slate-400 hover:text-white w-full justify-center">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* CONTENT REGION */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* GLOBAL HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-sm bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">All Tenants & Corporates</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            {/* Quick Stats Indicator */}
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Ledger Synchronized</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Simulation controls */}
            <button 
              onClick={() => {
                // Simulate new transaction flow
                const randomNames = ['Erica Price', 'Timothy Stone', 'Daniel Craig', 'Sofia Loren'];
                const randomCompanies = companies.map(c => c.name);
                const randomAmount = Math.floor(Math.random() * 300) + 50;
                const newTx = {
                  id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
                  employee: randomNames[Math.floor(Math.random() * randomNames.length)],
                  company: randomCompanies[Math.floor(Math.random() * randomCompanies.length)],
                  amount: randomAmount,
                  channel: 'Instant Transfer',
                  status: Math.random() > 0.15 ? 'Success' : 'Failed',
                  timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                };
                setTransactions(prev => [newTx, ...prev]);
                // Log it
                setAuditLogs(prev => [
                  { timestamp: newTx.timestamp, user: 'system_daemon', action: `Simulated transaction ${newTx.id} on behalf of ${newTx.employee}`, ip: '127.0.0.1' },
                  ...prev
                ]);
                showToast(`New simulated transaction generated: ${newTx.id}`, newTx.status === 'Success' ? 'success' : 'error');
              }}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-1.5 px-3 rounded-sm border border-slate-300 flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Simulate Activity
            </button>

            <div className="relative text-slate-500 hover:text-slate-800 cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
            </div>

            <div className="h-6 w-px bg-slate-200"></div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-slate-900 leading-tight">Admin Console</span>
                <span className="text-[10px] text-slate-500">Super Admin Mode</span>
              </div>
              <div className="w-9 h-9 rounded-sm bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* WORKSPACE AREA */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
          <div className="max-w-[1600px] mx-auto">
            {activeMenu === 'dashboard' && (
              <AdminDashboardPortal stats={calculatedStats} companies={companies} transactions={transactions} showToast={showToast} />
            )}
            {activeMenu === 'companies' && (
              <CompanyManagementPortal 
                companies={companies} 
                setCompanies={setCompanies} 
                customFields={customFields}
                showToast={showToast} 
              />
            )}
            {activeMenu === 'rules' && (
              <RulesEnginePortal rules={rules} setRules={setRules} companies={companies} showToast={showToast} />
            )}
            {activeMenu === 'kyc' && (
              <KYCControlPortal kycConfigs={kycConfigs} setKycConfigs={setKycConfigs} showToast={showToast} />
            )}
            {activeMenu === 'integrations' && (
              <IntegrationsPortal integrations={integrations} setIntegrations={setIntegrations} showToast={showToast} />
            )}
            {activeMenu === 'users' && (
              <UserManagementPortal userAccounts={userAccounts} setUserAccounts={setUserAccounts} showToast={showToast} />
            )}
            {activeMenu === 'accounts' && (
              <LedgerAccountsPortal chartOfAccounts={chartOfAccounts} setChartOfAccounts={setChartOfAccounts} showToast={showToast} />
            )}
            {activeMenu === 'tenants' && (
              <TenantManagementPortal companies={companies} showToast={showToast} />
            )}
            {activeMenu === 'ops-dash' && (
              <OpsDashboardPortal transactions={transactions} settlements={settlements} showToast={showToast} />
            )}
            {activeMenu === 'transactions' && (
              <TransactionMonitorPortal transactions={transactions} setTransactions={setTransactions} showToast={showToast} />
            )}
            {activeMenu === 'verification' && (
              <SettlementVerificationPortal settlements={settlements} setSettlements={setSettlements} showToast={showToast} />
            )}
            {activeMenu === 'repayments' && (
              <RepaymentsManagementPortal transactions={transactions} setTransactions={setTransactions} showToast={showToast} />
            )}
            {activeMenu === 'onboarding' && (
              <OnboardingTrackerPortal onboardingQueue={onboardingQueue} setOnboardingQueue={setOnboardingQueue} showToast={showToast} />
            )}
            {activeMenu === 'qr-transfers' && (
              <QRTransferPortal transactions={transactions} showToast={showToast} />
            )}
            {activeMenu === 'reports' && (
              <ReportsPortal transactions={transactions} companies={companies} />
            )}
            {activeMenu === 'risk-scoring' && (
              <RiskScoringPortal companies={companies} setCompanies={setCompanies} showToast={showToast} />
            )}
            {activeMenu === 'budgets' && (
              <BudgetManagementPortal companies={companies} setCompanies={setCompanies} showToast={showToast} />
            )}
            {activeMenu === 'ghosts' && (
              <GhostDetectionPortal ghostAlerts={ghostAlerts} setGhostAlerts={setGhostAlerts} showToast={showToast} />
            )}
            {activeMenu === 'global-notifications' && (
              <GlobalNotificationsPortal templates={notificationTemplates} setTemplates={setNotificationTemplates} showToast={showToast} />
            )}
            {activeMenu === 'audit-logs' && (
              <AuditLogsPortal logs={auditLogs} />
            )}
            {activeMenu === 'system-settings' && (
              <SystemSettingsPortal 
                settings={systemSettings} 
                setSettings={setSystemSettings} 
                customFields={customFields} 
                setCustomFields={setCustomFields} 
                showToast={showToast} 
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// --- PORTALS IMPLEMENTATIONS ---

// 4.1 Admin Dashboard
function AdminDashboardPortal({ stats, companies, transactions, showToast }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin Portal (F-18)</h1>
          <p className="text-sm text-slate-500 mt-1">Global ecosystem overview, limits, and configuration status.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Active Tenants" value={stats.activeTenantsCount} trend="up" trendValue="+8%" subtext="Across multi-org" />
        <KPICard title="Total Corporates" value={stats.totalCompaniesCount} trend="up" trendValue="+14%" subtext="Active integrated employers" />
        <KPICard title="MTD Volume Disbursed" value={`$${stats.totalVolume.toLocaleString()}`} trend="up" trendValue="+19.4%" subtext="Direct Clearing accounts" />
        <KPICard title="Platform Fee Accrued" value={`$${stats.feeRevenue.toFixed(2)}`} trend="up" trendValue="+5%" subtext="Calculated MTD yields" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-800">Dynamic Transaction Log Flow</h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full">Live Monitor Enabled</span>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {transactions.slice(0, 5).map((txn, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${txn.status === 'Success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                        {txn.status === 'Success' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{txn.employee}</div>
                        <div className="text-xs text-slate-400">{txn.company} • {txn.timestamp}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-bold text-slate-900">${txn.amount.toFixed(2)}</div>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${txn.status === 'Success' ? 'bg-emerald-100 border-emerald-200 text-emerald-800' : 'bg-red-100 border-red-200 text-red-800'}`}>
                        {txn.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-sm p-6">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">System Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white font-medium py-2.5 px-4 text-sm rounded-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add New Corporate
              </button>
              <button className="w-full bg-slate-100 text-slate-700 font-medium py-2.5 px-4 text-sm rounded-sm hover:bg-slate-200 transition-colors border border-slate-300">
                Trigger Escalation Audit
              </button>
              <button className="w-full bg-slate-100 text-slate-700 font-medium py-2.5 px-4 text-sm rounded-sm hover:bg-slate-200 transition-colors border border-slate-300">
                Generate Escrow Ledger XLS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4.2 Company Management
function CompanyManagementPortal({ companies, setCompanies, customFields, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  // Custom states for Company Form
  const [formName, setFormName] = useState('');
  const [formTenant, setFormTenant] = useState('Global Corp');
  const [formBranches, setFormBranches] = useState(1);
  const [formEmployees, setFormEmployees] = useState(10);
  const [formRisk, setFormRisk] = useState('Low');
  const [formBudget, setFormBudget] = useState(50000);
  const [customFieldValues, setCustomFieldValues] = useState({});

  const filtered = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tenant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCompany = (e) => {
    e.preventDefault();
    if (!formName) {
      showToast('Please enter a company name', 'error');
      return;
    }
    const newCompany = {
      id: `COMP-${Math.floor(100 + Math.random() * 900)}`,
      name: formName,
      tenant: formTenant,
      status: 'Active',
      branches: parseInt(formBranches),
      employees: parseInt(formEmployees),
      created: new Date().toISOString().split('T')[0],
      riskTier: formRisk,
      budget: parseInt(formBudget),
      utilized: 0,
      customFields: customFieldValues
    };
    setCompanies(prev => [...prev, newCompany]);
    setShowAddModal(false);
    resetForm();
    showToast(`Successfully created ${formName}`, 'success');
  };

  const handleEditCompany = (e) => {
    e.preventDefault();
    setCompanies(prev => prev.map(c => c.id === selectedCompany.id ? {
      ...c,
      name: formName,
      tenant: formTenant,
      branches: parseInt(formBranches),
      employees: parseInt(formEmployees),
      riskTier: formRisk,
      budget: parseInt(formBudget),
      customFields: { ...c.customFields, ...customFieldValues }
    } : c));
    setShowEditModal(false);
    resetForm();
    showToast(`Successfully updated company details`, 'success');
  };

  const toggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status: nextStatus } : c));
    showToast(`Company status updated to ${nextStatus}`, 'success');
  };

  const resetForm = () => {
    setFormName('');
    setFormTenant('Global Corp');
    setFormBranches(1);
    setFormEmployees(10);
    setFormRisk('Low');
    setFormBudget(50000);
    setCustomFieldValues({});
    setSelectedCompany(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Company Management (F-19)</h1>
          <p className="text-sm text-slate-500 mt-1">Manage corporate boundaries, active directory parameters, and risk profiles.</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => { resetForm(); setShowAddModal(true); }}>Add Company</Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search companies or tenants..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Company Name</th>
                <th className="p-4">Tenant Scope</th>
                <th className="p-4">Operational Status</th>
                <th className="p-4">Branches</th>
                <th className="p-4">Employees</th>
                <th className="p-4">Risk Rating</th>
                {customFields.map(cf => (
                  <th key={cf.id} className="p-4">{cf.label}</th>
                ))}
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="font-semibold text-slate-900">{c.name}</div>
                    <div className="text-xs text-slate-400">{c.id}</div>
                  </td>
                  <td className="p-4 text-slate-600">{c.tenant}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                      c.status === 'Active' ? 'bg-emerald-100 border-emerald-200 text-emerald-800' : 
                      c.status === 'Pending' ? 'bg-amber-100 border-amber-200 text-amber-800' : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{c.branches}</td>
                  <td className="p-4 text-slate-600">{c.employees.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${
                      c.riskTier === 'Low' ? 'bg-emerald-100 text-emerald-800' :
                      c.riskTier === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {c.riskTier}
                    </span>
                  </td>
                  {customFields.map(cf => (
                    <td key={cf.id} className="p-4 text-slate-600">{c.customFields?.[cf.id] || '--'}</td>
                  ))}
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => {
                          setSelectedCompany(c);
                          setFormName(c.name);
                          setFormTenant(c.tenant);
                          setFormBranches(c.branches);
                          setFormEmployees(c.employees);
                          setFormRisk(c.riskTier);
                          setFormBudget(c.budget);
                          setCustomFieldValues(c.customFields || {});
                          setShowEditModal(true);
                        }}
                        className="p-1.5 hover:bg-slate-100 rounded-sm text-slate-500 hover:text-blue-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => toggleStatus(c.id, c.status)}
                        className="p-1.5 hover:bg-slate-100 rounded-sm text-slate-500 hover:text-amber-600"
                        title="Toggle Status"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD COMPANY MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-slate-300 w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="font-semibold text-lg">Add New Corporate Entity</h3>
              <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleCreateCompany} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={formName} 
                  onChange={e => setFormName(e.target.value)} 
                  className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                  placeholder="e.g. Acme Logistics"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tenant Scope</label>
                  <select 
                    value={formTenant} 
                    onChange={e => setFormTenant(e.target.value)}
                    className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500"
                  >
                    <option>Global Corp</option>
                    <option>Nexus Group</option>
                    <option>Vanguard</option>
                    <option>Quantum</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Risk Tier Rating</label>
                  <select 
                    value={formRisk} 
                    onChange={e => setFormRisk(e.target.value)}
                    className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm bg-white"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Active Branches</label>
                  <input 
                    type="number" 
                    value={formBranches} 
                    onChange={e => setFormBranches(e.target.value)} 
                    className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Total Employees</label>
                  <input 
                    type="number" 
                    value={formEmployees} 
                    onChange={e => setFormEmployees(e.target.value)} 
                    className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">EWA Pool Limit Budget ($)</label>
                <input 
                  type="number" 
                  value={formBudget} 
                  onChange={e => setFormBudget(e.target.value)} 
                  className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm" 
                />
              </div>

              {customFields.map(cf => (
                <div key={cf.id}>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{cf.label}</label>
                  <input 
                    type="text" 
                    value={customFieldValues[cf.id] || ''} 
                    onChange={e => setCustomFieldValues(prev => ({ ...prev, [cf.id]: e.target.value }))}
                    className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm" 
                  />
                </div>
              ))}

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="primary" type="submit">Create Entity</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT COMPANY MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-slate-300 w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="font-semibold text-lg">Modify Company Parameters</h3>
              <button onClick={() => setShowEditModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleEditCompany} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={formName} 
                  onChange={e => setFormName(e.target.value)} 
                  className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tenant Scope</label>
                  <select 
                    value={formTenant} 
                    onChange={e => setFormTenant(e.target.value)}
                    className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm bg-white"
                  >
                    <option>Global Corp</option>
                    <option>Nexus Group</option>
                    <option>Vanguard</option>
                    <option>Quantum</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Risk Tier Rating</label>
                  <select 
                    value={formRisk} 
                    onChange={e => setFormRisk(e.target.value)}
                    className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm bg-white"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Active Branches</label>
                  <input 
                    type="number" 
                    value={formBranches} 
                    onChange={e => setFormBranches(e.target.value)} 
                    className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Total Employees</label>
                  <input 
                    type="number" 
                    value={formEmployees} 
                    onChange={e => setFormEmployees(e.target.value)} 
                    className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm" 
                  />
                </div>
              </div>

              {customFields.map(cf => (
                <div key={cf.id}>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{cf.label}</label>
                  <input 
                    type="text" 
                    value={customFieldValues[cf.id] || ''} 
                    onChange={e => setCustomFieldValues(prev => ({ ...prev, [cf.id]: e.target.value }))}
                    className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm" 
                  />
                </div>
              ))}

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
                <Button variant="primary" type="submit">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 4.3 Fee & Limit Rules (GoRule)
function RulesEnginePortal({ rules, setRules, companies, showToast }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [ruleName, setRuleName] = useState('');
  const [scope, setScope] = useState('Global');
  const [maxAdvance, setMaxAdvance] = useState(50);
  const [feeType, setFeeType] = useState('Flat Rate ($2.99)');
  const [velocity, setVelocity] = useState('3 transfers / cycle');

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!ruleName) return;
    const newRule = {
      id: `RUL-00${rules.length + 1}`,
      name: ruleName,
      scope,
      maxAdvancePct: parseInt(maxAdvance),
      feeType,
      velocityLimit: velocity,
      status: 'Active'
    };
    setRules(prev => [...prev, newRule]);
    setShowAddModal(false);
    showToast(`Created Rule overrides for ${ruleName}`, 'success');
  };

  const deleteRule = (id) => {
    setRules(prev => prev.filter(r => r.id !== id));
    showToast('Rule constraint removed', 'warning');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Fee & Limit Overrides [GoRule Engine] (F-20)</h1>
          <p className="text-sm text-slate-500 mt-1">Configure global ledger boundaries or target granular corporate payroll limits.</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setShowAddModal(true)}>Add GoRule Override</Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm p-6">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">GoRule Structural Priorities</h3>
        <div className="p-4 bg-slate-50 border-l-4 border-blue-600 rounded-sm mb-6 text-sm">
          <strong>Hierarchy Overwrite Mode:</strong> Corporate Specific Overrides supersede Tenant-Wide baseline configurations, which default fallback properties to the Global System ruleset.
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Rule Name</th>
                <th className="p-4">Target Scope</th>
                <th className="p-4">Max Earned Advance %</th>
                <th className="p-4">Fee Structure</th>
                <th className="p-4">Velocity Caps</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {rules.map(r => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">{r.name}</td>
                  <td className="p-4 text-slate-600">{r.scope}</td>
                  <td className="p-4 text-slate-600">{r.maxAdvancePct}%</td>
                  <td className="p-4 text-slate-600">{r.feeType}</td>
                  <td className="p-4 text-slate-600">{r.velocityLimit}</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => deleteRule(r.id)} className="text-red-500 hover:text-red-700 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-slate-300 w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="font-semibold text-lg">Define GoRule Strategy</h3>
              <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddRule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rule Name / Scope Target</label>
                <input type="text" value={ruleName} onChange={e => setRuleName(e.target.value)} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none" placeholder="e.g. Prime Retail Extra Limits" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Target Scope</label>
                  <select value={scope} onChange={e => setScope(e.target.value)} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm bg-white">
                    <option>Global</option>
                    <option>Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Max Advance %</label>
                  <input type="number" value={maxAdvance} onChange={e => setMaxAdvance(e.target.value)} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Fee Type Scheme</label>
                  <select value={feeType} onChange={e => setFeeType(e.target.value)} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm bg-white">
                    <option>Flat Rate ($2.99)</option>
                    <option>Flat Rate ($4.99)</option>
                    <option>Zero Fee (Employer Sponsored)</option>
                    <option>Percentage based (1.5%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Velocity Limit Counter</label>
                  <input type="text" value={velocity} onChange={e => setVelocity(e.target.value)} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm" placeholder="e.g. 2 transfers / cycle" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="primary" type="submit">Commit Override Ruleset</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 4.4 KYC Rules Config
function KYCControlPortal({ kycConfigs, setKycConfigs, showToast }) {
  const handleThresholdChange = (tenant, val) => {
    setKycConfigs(prev => prev.map(k => k.tenant === tenant ? { ...k, threshold: parseInt(val) } : k));
  };

  const toggleDocType = (tenant, doc) => {
    setKycConfigs(prev => prev.map(k => {
      if (k.tenant === tenant) {
        const nextDocs = k.docTypes.includes(doc) 
          ? k.docTypes.filter(d => d !== doc)
          : [...k.docTypes, doc];
        return { ...k, docTypes: nextDocs };
      }
      return k;
    }));
    showToast(`KYC Requirements checklist updated for ${tenant}`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">KYC Identity Assurance Rulesets (F-21)</h1>
        <p className="text-sm text-slate-500 mt-1">Tenant-wise requirements for automated onboarding pass metrics.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {kycConfigs.map((cfg, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-lg text-slate-800">{cfg.tenant} Config</h3>
              </div>
              <select className="border border-slate-300 rounded-sm text-sm px-3 py-1.5 bg-white text-slate-700">
                <option>{cfg.method}</option>
                <option>Automated OCR Only</option>
                <option>Fully Manual Compliance Desk</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Required Identity Instruments</h4>
                <div className="space-y-2">
                  {['National ID', 'Payslip', 'Employment Verification', 'Tax Declaration Certificate'].map((doc, dIdx) => {
                    const active = cfg.docTypes.includes(doc);
                    return (
                      <label key={dIdx} className="flex items-center gap-3 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={active} 
                          onChange={() => toggleDocType(cfg.tenant, doc)}
                          className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 rounded-sm" 
                        />
                        <span className="text-sm text-slate-700 font-medium">{doc}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">OCR Confidence Score Target Limit</h4>
                  <span className="text-sm font-bold text-blue-600">{cfg.threshold}% Match</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="100" 
                  value={cfg.threshold} 
                  onChange={e => handleThresholdChange(cfg.tenant, e.target.value)}
                  className="w-full accent-blue-600 cursor-pointer" 
                />
                <span className="text-[11px] text-slate-400">Values below target require manual oversight dispatch queues.</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4.5 Integration Management
function IntegrationsPortal({ integrations, setIntegrations, showToast }) {
  const [testingId, setTestingId] = useState(null);

  const handleTestConnection = (id) => {
    setTestingId(id);
    setIntegrations(prev => prev.map(it => it.id === id ? { ...it, status: 'Testing...' } : it));
    
    setTimeout(() => {
      setTestingId(null);
      const isSuccess = Math.random() > 0.15;
      setIntegrations(prev => prev.map(it => {
        if (it.id === id) {
          return {
            ...it,
            status: isSuccess ? 'Healthy' : 'Degraded',
            lastTested: new Date().toISOString().replace('T', ' ').substring(0, 16)
          };
        }
        return it;
      }));
      showToast(`Integration Diagnostic completed. Status: ${isSuccess ? 'Connected' : 'Sync Timed Out'}`, isSuccess ? 'success' : 'error');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Active API Integration Pipelines (F-22)</h1>
          <p className="text-sm text-slate-500 mt-1">Status connections for payroll directories, clearing operations, and ledger syncs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {integrations.map((it, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-sm border border-slate-200">
                <Database className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-slate-900">{it.name}</h3>
                <p className="text-xs text-slate-500">{it.type} • URL endpoint: {it.host}</p>
                <p className="text-[11px] text-slate-400 mt-1">Last Sync Check: {it.lastTested}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  it.status === 'Healthy' ? 'bg-emerald-500' :
                  it.status === 'Testing...' ? 'bg-blue-500 animate-pulse' :
                  it.status === 'Degraded' ? 'bg-amber-500' : 'bg-red-500'
                }`} />
                <span className="text-xs font-semibold text-slate-700">{it.status}</span>
              </div>
              
              <button 
                disabled={testingId === it.id}
                onClick={() => handleTestConnection(it.id)}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold px-3 py-1.5 text-xs rounded-sm transition-colors flex items-center gap-1"
              >
                {testingId === it.id ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                Diagnose Pipeline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4.6 User & Permission Management
function UserManagementPortal({ userAccounts, setUserAccounts, showToast }) {
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'permissions'
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('Operations Lead');
  const [userTenant, setUserTenant] = useState('Global Corp');
  const [showAddUser, setShowAddUser] = useState(false);

  // Core Role-Permission Matrix Simulation State
  const [matrix, setMatrix] = useState({
    'Super Admin': { read: true, write: true, approve: true, delete: true },
    'Operations Lead': { read: true, write: true, approve: true, delete: false },
    'Risk Officer': { read: true, write: false, approve: true, delete: false },
    'Finance Manager': { read: true, write: true, approve: false, delete: false },
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!userName || !userEmail) return;
    const newUser = {
      id: `USR-0${userAccounts.length + 1}`,
      name: userName,
      email: userEmail,
      role: userRole,
      tenant: userTenant,
      status: 'Active',
      lastLogin: 'Never'
    };
    setUserAccounts(prev => [...prev, newUser]);
    setShowAddUser(false);
    showToast(`Added system user ${userName}`, 'success');
  };

  const togglePermission = (role, action) => {
    setMatrix(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [action]: !prev[role][action]
      }
    }));
    showToast(`Permission Matrix Override updated for ${role}`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Identity Access Hub (F-23)</h1>
          <p className="text-sm text-slate-500 mt-1">Manage system logins, role allocation matrices, and administrative boundaries.</p>
        </div>
        {activeTab === 'users' && (
          <Button variant="primary" icon={Plus} onClick={() => setShowAddUser(true)}>Add System User</Button>
        )}
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Operational Directory
        </button>
        <button 
          onClick={() => setActiveTab('permissions')}
          className={`px-4 py-2 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'permissions' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Role-Permission Matrix Map
        </button>
      </div>

      {activeTab === 'users' ? (
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Name</th>
                <th className="p-4">Role Key</th>
                <th className="p-4">Tenant Scope</th>
                <th className="p-4">Operational Status</th>
                <th className="p-4">Last Activity Check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {userAccounts.map(u => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="font-semibold text-slate-900">{u.name}</div>
                    <div className="text-xs text-slate-400">{u.email}</div>
                  </td>
                  <td className="p-4 text-slate-700 font-medium">{u.role}</td>
                  <td className="p-4 text-slate-600">{u.tenant}</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">{u.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-4">
          <h3 className="font-semibold text-slate-800">Global Action Capabilities Override Map</h3>
          <p className="text-xs text-slate-500">Configure what access capabilities are granted globally depending on administrative roles.</p>
          
          <div className="overflow-x-auto pt-2">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Administrative Role Category</th>
                  <th className="p-4 text-center">Read Records</th>
                  <th className="p-4 text-center">Write Ledger</th>
                  <th className="p-4 text-center">Approve Clearance</th>
                  <th className="p-4 text-center">Delete Constraints</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {Object.keys(matrix).map(role => (
                  <tr key={role} className="hover:bg-slate-50">
                    <td className="p-4 font-semibold text-slate-800">{role}</td>
                    {['read', 'write', 'approve', 'delete'].map(action => (
                      <td key={action} className="p-4 text-center">
                        <button 
                          onClick={() => togglePermission(role, action)}
                          className={`px-3 py-1.5 rounded-sm border text-xs font-semibold ${
                            matrix[role][action] 
                              ? 'bg-blue-50 border-blue-200 text-blue-700' 
                              : 'bg-slate-100 border-slate-200 text-slate-400'
                          }`}
                        >
                          {matrix[role][action] ? 'Enabled' : 'Restricted'}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showAddUser && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-slate-300 w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="font-semibold text-lg">Onboard System Admin</h3>
              <button onClick={() => setShowAddUser(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm" placeholder="Elena Rostova" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">EWA Corporate Email Address</label>
                <input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm" placeholder="elena@company.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Assigned Role</label>
                  <select value={userRole} onChange={e => setUserRole(e.target.value)} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm bg-white">
                    <option>Super Admin</option>
                    <option>Operations Lead</option>
                    <option>Risk Officer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tenant Anchor</label>
                  <select value={userTenant} onChange={e => setUserTenant(e.target.value)} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm bg-white">
                    <option>Global Corp</option>
                    <option>Nexus Group</option>
                    <option>Vanguard</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button variant="secondary" onClick={() => setShowAddUser(false)}>Cancel</Button>
                <Button variant="primary" type="submit">Deploy Credentials</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 4.7 Chart of Accounts
function LedgerAccountsPortal({ chartOfAccounts, setChartOfAccounts, showToast }) {
  const [editingCode, setEditingCode] = useState(null);
  const [tempBalance, setTempBalance] = useState('');

  const handleUpdateBalance = (code) => {
    setChartOfAccounts(prev => prev.map(ac => {
      if (ac.code === code) {
        return { ...ac, balance: parseFloat(tempBalance) };
      }
      return ac;
    }));
    setEditingCode(null);
    showToast(`Ledger account balance adjusted successfully`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">EWA Double-Entry Ledger [Chart of Accounts] (F-24)</h1>
        <p className="text-sm text-slate-500 mt-1">Audit clearing nodes, escrow repositories, and outstanding advanced liabilities.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Account Code</th>
                <th className="p-4">Account Name</th>
                <th className="p-4">Ledger Type</th>
                <th className="p-4 text-right">Settled Balance ($)</th>
                <th className="p-4 text-right">Override Asset Pool Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {chartOfAccounts.map(ac => (
                <tr key={ac.code} className={`hover:bg-slate-50 ${ac.parent === null ? 'font-semibold text-slate-900 bg-slate-50/50' : 'text-slate-600'}`}>
                  <td className="p-4 font-mono">{ac.code}</td>
                  <td className={`p-4 ${ac.parent !== null ? 'pl-8 text-slate-600' : 'text-slate-900'}`}>{ac.name}</td>
                  <td className="p-4 text-xs font-bold uppercase text-slate-400">{ac.type}</td>
                  <td className="p-4 text-right font-mono font-bold">${ac.balance.toLocaleString()}</td>
                  <td className="p-4 text-right">
                    {editingCode === ac.code ? (
                      <div className="flex items-center justify-end gap-2">
                        <input 
                          type="number" 
                          value={tempBalance} 
                          onChange={e => setTempBalance(e.target.value)}
                          className="w-24 border border-slate-300 rounded-sm px-2 py-1 text-sm text-right" 
                        />
                        <button onClick={() => handleUpdateBalance(ac.code)} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditingCode(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => { setEditingCode(ac.code); setTempBalance(ac.balance.toString()); }}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Adjust Balance
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 4.8 Multi-Tenant Management
function TenantManagementPortal({ companies, showToast }) {
  // Extract summary stats from centralized company database
  const tenantSummary = useMemo(() => {
    const tenantsMap = {};
    companies.forEach(c => {
      if (!tenantsMap[c.tenant]) {
        tenantsMap[c.tenant] = { companiesCount: 0, totalEmployees: 0, status: 'Active' };
      }
      tenantsMap[c.tenant].companiesCount += 1;
      tenantsMap[c.tenant].totalEmployees += c.employees;
    });
    return Object.keys(tenantsMap).map(tName => ({
      name: tName,
      ...tenantsMap[tName]
    }));
  }, [companies]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Multi-Tenant Administration (F-25)</h1>
        <p className="text-sm text-slate-500 mt-1">Audit container partitions, localized timezone clearing schedules, and isolation health.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tenantSummary.map((tenant, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-sm flex items-center justify-center border border-slate-200 text-slate-700">
                <HardDrive className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-800">{tenant.name}</h3>
                <p className="text-xs text-slate-500">
                  Partitions: {tenant.companiesCount} Corporates Integrated • Total Pool Exposure Base: {tenant.totalEmployees.toLocaleString()} users
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-sm">Timezone: UTC -05:00</span>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-sm">Operational Base: USD ($)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs bg-blue-50 border border-blue-200 text-blue-700 font-semibold px-2.5 py-1 rounded-sm flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Direct Isolation Safe
              </span>
              <button 
                onClick={() => showToast(`Executing data consistency health checks for ${tenant.name}`, 'success')}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs px-3 py-1.5 rounded-sm transition-colors"
              >
                Audits Partition
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5.1 Ops Portal Dashboard
function OpsDashboardPortal({ transactions, settlements, showToast }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Operations Command Center (F-26)</h1>
        <p className="text-sm text-slate-500 mt-1">Clearing desk metrics, queue priorities, and processing status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard title="Pending Settlements Queue" value={settlements.filter(s => s.status === 'Pending').length} trend="up" trendValue="+2" subtext="Requires manual clearing proof check" />
        <KPICard title="Reconciled Today" value="$184,200" trend="up" trendValue="+8.2%" subtext="Automated ACH matching" />
        <KPICard title="Failed Disbursals" value={transactions.filter(t => t.status === 'Failed').length} trend="down" trendValue="-4%" subtext="Requiring direct operator retry actions" />
      </div>

      <div className="bg-white border border-slate-200 rounded-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-800">Clearing Horizon calendar Queue</h2>
          <span className="text-xs bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded-full">3 Settlement Cycles Pending Today</span>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { company: 'Nexus Industries', urgency: 'Immediate Priority', cycle: 'ACH Cycle 1', val: '$48,900.00' },
              { company: 'TechFlow Solutions', urgency: 'Standard Clearance', cycle: 'Real-Time Clearance', val: '$14,500.00' },
              { company: 'Quantum Financial', urgency: 'Under Audit Checks', cycle: 'Manual clearing escrow check', val: '$32,000.00' },
            ].map((cycle, cIdx) => (
              <div key={cIdx} className="border border-slate-200 rounded-sm p-4 bg-slate-50 flex flex-col justify-between h-36">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">{cycle.cycle}</span>
                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-sm">{cycle.urgency}</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mt-2">{cycle.company}</h4>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <span className="text-lg font-extrabold text-slate-900">{cycle.val}</span>
                  <button className="text-xs bg-blue-600 text-white font-semibold py-1 px-2.5 rounded-sm hover:bg-blue-700 transition-colors">
                    Clear Balance
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 5.2 Transaction Monitor
function TransactionMonitorPortal({ transactions, setTransactions, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleRetryTransaction = (id) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: 'Success' };
      }
      return t;
    }));
    showToast(`Executed instant gateway clearing for transaction ${id}`, 'success');
  };

  const filtered = transactions.filter(t => 
    t.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Disbursal Transaction Monitor (F-27)</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time ledger tracking, clearing responses, and clearing retry vectors.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID, Employee, Company..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Employee</th>
                <th className="p-4">Company Anchor</th>
                <th className="p-4 text-right">Advance Disbursed ($)</th>
                <th className="p-4">Gateway Path</th>
                <th className="p-4">Status Response</th>
                <th className="p-4">Clearing Timestamp</th>
                <th className="p-4 text-right">Gateway Remediation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-semibold text-slate-700">{t.id}</td>
                  <td className="p-4 font-medium text-slate-900">{t.employee}</td>
                  <td className="p-4 text-slate-600">{t.company}</td>
                  <td className="p-4 text-right font-bold text-slate-800">${t.amount.toFixed(2)}</td>
                  <td className="p-4 text-slate-500">{t.channel}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                      t.status === 'Success' ? 'bg-emerald-100 border-emerald-200 text-emerald-800' : 
                      t.status === 'Pending' ? 'bg-amber-100 border-amber-200 text-amber-800' : 'bg-red-100 border-red-200 text-red-800'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-xs">{t.timestamp}</td>
                  <td className="p-4 text-right">
                    {t.status === 'Failed' ? (
                      <button 
                        onClick={() => handleRetryTransaction(t.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-2.5 py-1 rounded-sm transition-colors"
                      >
                        Force Clearing Retry
                      </button>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 5.3 Settlement Verification
function SettlementVerificationPortal({ settlements, setSettlements, showToast }) {
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleVerify = (id) => {
    setSettlements(prev => prev.map(s => s.id === id ? { ...s, status: 'Verified' } : s));
    setSelectedSettlement(null);
    showToast(`Settlement cleared and applied back into the Escrow Accounts`, 'success');
  };

  const handleReject = (id) => {
    if (!rejectReason) {
      showToast('You must enter a reason to reject a settlement', 'error');
      return;
    }
    setSettlements(prev => prev.map(s => s.id === id ? { ...s, status: `Rejected: ${rejectReason}` } : s));
    setSelectedSettlement(null);
    setRejectReason('');
    showToast(`Settlement rejected. Company notification dispatched.`, 'warning');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settlement Verification Gateway (F-28)</h1>
        <p className="text-sm text-slate-500 mt-1">Audit escrow deposit proofs, confirm transactions, and clear balances.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Settlement ID</th>
                <th className="p-4">Corporate Account</th>
                <th className="p-4 text-right">Balance Due ($)</th>
                <th className="p-4">Submitted At</th>
                <th className="p-4">Document Proof</th>
                <th className="p-4">Verification Status</th>
                <th className="p-4 text-right">Clearance Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {settlements.map(s => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-semibold text-slate-700">{s.id}</td>
                  <td className="p-4 font-medium text-slate-900">{s.company}</td>
                  <td className="p-4 text-right font-bold text-slate-800">${s.amount.toLocaleString()}</td>
                  <td className="p-4 text-slate-500">{s.submittedAt}</td>
                  <td className="p-4">
                    <span className="text-xs text-blue-600 font-semibold cursor-pointer underline flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> {s.proof}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                      s.status === 'Pending' ? 'bg-amber-100 border-amber-200 text-amber-800' : 
                      s.status === 'Verified' ? 'bg-emerald-100 border-emerald-200 text-emerald-800' : 'bg-red-100 border-red-200 text-red-800'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {s.status === 'Pending' ? (
                      <button 
                        onClick={() => setSelectedSettlement(s)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-2.5 py-1 rounded-sm transition-colors"
                      >
                        Verify Transfer Proof
                      </button>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedSettlement && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-slate-300 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
              <h3 className="font-semibold text-lg">Verify Deposit Proof: {selectedSettlement.id}</h3>
              <button onClick={() => setSelectedSettlement(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm flex items-center justify-center h-48 relative">
              <div className="text-center">
                <FileText className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-semibold text-slate-800">{selectedSettlement.proof}</span>
                <p className="text-xs text-slate-400 mt-1">Digitized Bank Transfer Confirmation</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Entity</span>
                <span className="font-semibold text-slate-800">{selectedSettlement.company}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Verified Sum</span>
                <span className="font-semibold text-slate-800">${selectedSettlement.amount.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rejection Reason (If applicable)</label>
              <input 
                type="text" 
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="e.g. Deposit mismatch / unverified transaction signature" 
                className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="danger" onClick={() => handleReject(selectedSettlement.id)}>Reject Slip</Button>
              <Button variant="primary" onClick={() => handleVerify(selectedSettlement.id)}>Approve Escrow Balance</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 5.4 Repayments Management
function RepaymentsManagementPortal({ transactions, setTransactions, showToast }) {
  const handleMarkDeducted = (id) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'Reconciled via Deduction' } : t));
    showToast(`Deductions matched back to corporate clearing registers`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Repayments & Deductions Register (F-29)</h1>
        <p className="text-sm text-slate-500 mt-1">Audit active employee deductions pending execution at next cycle.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Transaction Reference</th>
                <th className="p-4">Employee</th>
                <th className="p-4">Corporate Entity</th>
                <th className="p-4 text-right">Deduction Principal ($)</th>
                <th className="p-4 text-right">Service Fee ($)</th>
                <th className="p-4">Deduction Status</th>
                <th className="p-4 text-right">Action Gate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-semibold text-slate-700">{t.id}</td>
                  <td className="p-4 font-medium text-slate-900">{t.employee}</td>
                  <td className="p-4 text-slate-600">{t.company}</td>
                  <td className="p-4 text-right font-semibold text-slate-800">${t.amount.toFixed(2)}</td>
                  <td className="p-4 text-right text-slate-500">$2.99</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                      t.status === 'Success' ? 'bg-amber-50 border-amber-200 text-amber-700' : 
                      t.status === 'Reconciled via Deduction' ? 'bg-emerald-100 border-emerald-200 text-emerald-800' : 'bg-slate-100 border-slate-200 text-slate-500'
                    }`}>
                      {t.status === 'Success' ? 'Pending Deduction Cycle' : t.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {t.status === 'Success' ? (
                      <button 
                        onClick={() => handleMarkDeducted(t.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-2.5 py-1 rounded-sm transition-colors"
                      >
                        Confirm Deduction Match
                      </button>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 5.5 Corporate Onboarding Tracker
function OnboardingTrackerPortal({ onboardingQueue, setOnboardingQueue, showToast }) {
  const handleAdvanceStage = (company, curProgress) => {
    setOnboardingQueue(prev => prev.map(o => {
      if (o.company === company) {
        const nextProg = Math.min(o.progress + 25, 100);
        const stageMap = {
          20: 'Due Diligence',
          45: 'Sandbox Testing',
          50: 'Sandbox Testing',
          70: 'Contract Signoff',
          75: 'Contract Signoff',
          100: 'Onboarding Completed / Go Live'
        };
        return {
          ...o,
          progress: nextProg,
          stage: stageMap[nextProg] || 'Completed Integration'
        };
      }
      return o;
    }));
    showToast(`${company} onboarding lifecycle updated`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Corporate Onboarding Lifecycle Tracker (F-30)</h1>
        <p className="text-sm text-slate-500 mt-1">Audit diligence tracks, contract parameters, and sandbox tests for corporate pipeline.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Company</th>
                <th className="p-4">Tenant Scope</th>
                <th className="p-4">Diligence Stage</th>
                <th className="p-4">Assigned Director</th>
                <th className="p-4">Progress Tracker</th>
                <th className="p-4 text-right">Diligence Action Gate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {onboardingQueue.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">{item.company}</td>
                  <td className="p-4 text-slate-600">{item.tenant}</td>
                  <td className="p-4">
                    <span className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-sm">
                      {item.stage}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{item.assigned}</td>
                  <td className="p-4">
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${item.progress}%` }}></div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold mt-1 block">{item.progress}% Completed</span>
                  </td>
                  <td className="p-4 text-right">
                    {item.progress < 100 ? (
                      <button 
                        onClick={() => handleAdvanceStage(item.company, item.progress)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-2.5 py-1 rounded-sm transition-colors"
                      >
                        Advance Diligence Track
                      </button>
                    ) : (
                      <span className="text-emerald-600 text-xs font-bold flex items-center justify-end gap-1">
                        <Check className="w-4 h-4" /> Go Live Active
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 5.7 QR Code Transfer Processing
function QRTransferPortal({ transactions, showToast }) {
  const [selectedTx, setSelectedTx] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">QR Code Transfer Dispatch (F-32)</h1>
        <p className="text-sm text-slate-500 mt-1">Audit digital checkouts, dynamic scan payloads, and checkout clearing keys.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-4">
        <h3 className="font-semibold text-slate-800">Clear QR code disbursements manually</h3>
        <p className="text-xs text-slate-500">Scan payload confirmation codes received from mobile retail terminals to execute balances.</p>
        
        <div className="overflow-x-auto pt-2">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Clearance reference</th>
                <th className="p-4">Disbursal Target</th>
                <th className="p-4 text-right">Clearing Limit Amount</th>
                <th className="p-4">Checkout QR code</th>
                <th className="p-4 text-right">Trigger Manual Clearing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {transactions.slice(0, 3).map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-semibold text-slate-700">{tx.id}-QR</td>
                  <td className="p-4 font-medium text-slate-900">{tx.employee}</td>
                  <td className="p-4 text-right font-bold text-slate-800">${tx.amount.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="text-xs font-bold font-mono text-blue-600 bg-blue-50 border border-blue-200 px-2 py-1 rounded-sm">
                      payload_signature_sha256_{tx.id}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => {
                        setSelectedTx(tx);
                        showToast(`Scanned and verified checkout payload for reference ${tx.id}`, 'success');
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-2.5 py-1.5 rounded-sm"
                    >
                      Process QR payload
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-slate-300 w-full max-w-sm p-6 text-center space-y-4">
            <h3 className="font-bold text-lg">Transaction Cleared Successfully</h3>
            <p className="text-sm text-slate-600">The QR Checkout payload signature was securely validated. Outstanding liability applied to corporate ledger account.</p>
            <div className="bg-slate-50 p-4 rounded border border-slate-100 font-mono text-xs">
              Ref: {selectedTx.id}-QR <br />
              Deducted sum: ${selectedTx.amount.toFixed(2)}
            </div>
            <Button variant="primary" onClick={() => setSelectedTx(null)}>Close Receipt</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// 5.8 Reports & Analytics
function ReportsPortal({ transactions, companies }) {
  const [selectedMetric, setSelectedMetric] = useState('Volume');

  const chartData = useMemo(() => {
    // Generate simple aggregation
    const dataMap = {};
    companies.forEach(c => {
      dataMap[c.name] = 0;
    });
    transactions.forEach(t => {
      if (t.status === 'Success' && dataMap[t.company] !== undefined) {
        dataMap[t.company] += t.amount;
      }
    });
    return Object.keys(dataMap).map(name => ({
      name,
      value: dataMap[name] || Math.floor(Math.random() * 2000) + 100
    }));
  }, [transactions, companies]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Financial Reports & Pivot Analytics (F-33)</h1>
        <p className="text-sm text-slate-500 mt-1">Consolidated utilization stats, revenue trends, and operational parameters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['Disbursement Volume', 'Utilisation Ratios', 'Average Advance Principal', 'Transaction Fee Yield'].map((metric, idx) => (
          <button 
            key={idx}
            onClick={() => setSelectedMetric(metric)}
            className={`p-4 rounded-sm border text-left transition-colors ${
              selectedMetric === metric ? 'bg-blue-600 text-white border-transparent shadow' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <span className="block text-xs font-bold uppercase tracking-wider opacity-80">Aggregate Vector</span>
            <span className="text-lg font-bold mt-1 block">{metric}</span>
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-4">
        <h3 className="font-semibold text-slate-800">Dynamic Multi-Variable Pivot View: {selectedMetric}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
          <div className="space-y-3">
            {chartData.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>{item.name}</span>
                  <span>${item.value.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full" style={{ width: `${Math.min((item.value / 4000) * 100, 100)}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-slate-50 rounded border border-slate-200 text-sm space-y-3">
            <h4 className="font-bold text-slate-800">Operational Summary Insights</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Consolidated data registers indicate an increase in EWA disbursements during mid-month liquidity gaps. Escrow balances remain resilient with zero defaults flagged under automated collection patterns.
            </p>
            <div className="flex gap-2 pt-2">
              <Button variant="secondary" icon={Download}>Export CSV Register</Button>
              <Button variant="secondary" icon={Download}>Export ledger PDF</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6.1 Risk Scoring Dashboard
function RiskScoringPortal({ companies, setCompanies, showToast }) {
  const handleScoreAdjust = (id, newScore) => {
    setCompanies(prev => prev.map(c => {
      if (c.id === id) {
        let tier = 'Low';
        if (newScore > 40) tier = 'Medium';
        if (newScore > 70) tier = 'High';
        if (newScore > 85) tier = 'Critical';
        return { ...c, riskTier: tier };
      }
      return c;
    }));
    showToast(`Corporate Risk parameters reassessed successfully`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Risk Scoring & Credit Auditing (F-34)</h1>
        <p className="text-sm text-slate-500 mt-1">Audit default vectors, adjust corporate risk weights, and evaluate coverage margins.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Entity</th>
                <th className="p-4">Tenant Scope</th>
                <th className="p-4">EWA Pool Limit ($)</th>
                <th className="p-4">Current Utilised Pool ($)</th>
                <th className="p-4">Assessed Risk Tier</th>
                <th className="p-4 text-right">Adjust Score Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {companies.map(c => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="font-semibold text-slate-900">{c.name}</div>
                    <div className="text-xs text-slate-400">{c.id}</div>
                  </td>
                  <td className="p-4 text-slate-600">{c.tenant}</td>
                  <td className="p-4 text-slate-800 font-medium">${c.budget.toLocaleString()}</td>
                  <td className="p-4 text-slate-800 font-medium">${c.utilized.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-sm border ${
                      c.riskTier === 'Low' ? 'bg-emerald-100 border-emerald-200 text-emerald-800' :
                      c.riskTier === 'Medium' ? 'bg-amber-100 border-amber-200 text-amber-800' : 'bg-red-100 border-red-200 text-red-800'
                    }`}>
                      {c.riskTier}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleScoreAdjust(c.id, 10)}
                        className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold text-[10px] px-2 py-1 rounded-sm transition-colors"
                      >
                        Set Low
                      </button>
                      <button 
                        onClick={() => handleScoreAdjust(c.id, 50)}
                        className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-semibold text-[10px] px-2 py-1 rounded-sm transition-colors"
                      >
                        Set Med
                      </button>
                      <button 
                        onClick={() => handleScoreAdjust(c.id, 80)}
                        className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-800 font-semibold text-[10px] px-2 py-1 rounded-sm transition-colors"
                      >
                        Set High
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 6.2 Budget Management
function BudgetManagementPortal({ companies, setCompanies, showToast }) {
  const [editingId, setEditingId] = useState(null);
  const [tempBudget, setTempBudget] = useState('');

  const handleUpdateBudget = (id) => {
    setCompanies(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, budget: parseInt(tempBudget) };
      }
      return c;
    }));
    setEditingId(null);
    showToast('Corporate EWA pool limits modified successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Corporate budget & Limit Allocation (F-35)</h1>
        <p className="text-sm text-slate-500 mt-1">Limit active EWA clearing pools based on corporate escrow levels.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Company Name</th>
                <th className="p-4">Tenant scope</th>
                <th className="p-4 text-right">EWA Pool Limit Budget</th>
                <th className="p-4 text-right">Utilised balance Pool</th>
                <th className="p-4 text-right">Action controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {companies.map(c => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">{c.name}</td>
                  <td className="p-4 text-slate-600">{c.tenant}</td>
                  <td className="p-4 text-right font-mono font-bold text-slate-800">
                    {editingId === c.id ? (
                      <input 
                        type="number" 
                        value={tempBudget} 
                        onChange={e => setTempBudget(e.target.value)} 
                        className="border border-slate-300 rounded-sm px-2 py-1 text-sm text-right w-28 focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      `$${c.budget.toLocaleString()}`
                    )}
                  </td>
                  <td className="p-4 text-right font-mono text-slate-500">${c.utilized.toLocaleString()}</td>
                  <td className="p-4 text-right">
                    {editingId === c.id ? (
                      <div className="flex justify-end gap-1">
                        <button onClick={() => handleUpdateBudget(c.id)} className="p-1 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-1 bg-slate-100 text-slate-400 border border-slate-200 rounded">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => { setEditingId(c.id); setTempBudget(c.budget.toString()); }}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Adjust Allocation Limits
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 6.5 Ghost Employee Detection Panel
function GhostDetectionPortal({ ghostAlerts, setGhostAlerts, showToast }) {
  const handleResolveAlert = (id) => {
    setGhostAlerts(prev => prev.map(al => al.id === id ? { ...al, status: 'Resolved' } : al));
    showToast(`Audit log flag marked resolved. Cleared directory discrepancy.`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Ghost Employee & Fraud Detection vectors (F-38)</h1>
        <p className="text-sm text-slate-500 mt-1">Audit active EWA requests against corporate payroll directories for verification.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-semibold text-lg text-slate-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" /> Active Discrepancy flags
          </h3>
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">2 Flagged anomalies Pending resolution</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Discrepancy Ref</th>
                <th className="p-4">Employee</th>
                <th className="p-4">Company Anchor</th>
                <th className="p-4 text-right">Variance Balance</th>
                <th className="p-4">Threat confidence score</th>
                <th className="p-4">Status Response</th>
                <th className="p-4 text-right">Manual Auditing Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {ghostAlerts.map(al => (
                <tr key={al.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-semibold text-slate-700">{al.id}</td>
                  <td className="p-4 font-semibold text-slate-900">{al.employee}</td>
                  <td className="p-4 text-slate-600">{al.company}</td>
                  <td className="p-4 text-right font-bold text-red-600">{al.imbalance}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden w-24">
                        <div className="bg-red-500 h-full" style={{ width: `${al.alertScore}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-red-500">{al.alertScore}% match</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                      al.status === 'Open' ? 'bg-red-100 border-red-200 text-red-800' : 'bg-emerald-100 border-emerald-200 text-emerald-800'
                    }`}>
                      {al.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {al.status === 'Open' ? (
                      <button 
                        onClick={() => handleResolveAlert(al.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-2.5 py-1 rounded-sm transition-colors"
                      >
                        Resolve Audited Record
                      </button>
                    ) : (
                      <span className="text-emerald-600 text-xs font-bold flex items-center justify-end gap-1">
                        <Check className="w-4 h-4" /> Cleared
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 7.1 Notification Management (Global)
function GlobalNotificationsPortal({ templates, setTemplates, showToast }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleUpdateTemplate = () => {
    setTemplates(prev => prev.map(t => t.id === selectedTemplate.id ? { ...t, content: editContent } : t));
    setSelectedTemplate(null);
    showToast('SMS and Email Notification templates updated', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Transactional Notification Templates</h1>
        <p className="text-sm text-slate-500 mt-1">Configure automated transactional dispatch messaging.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {templates.map(t => (
          <div key={t.id} className="bg-white border border-slate-200 rounded-sm p-6 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                {t.channel} dispatch
              </span>
              <h3 className="font-semibold text-base text-slate-800 mt-2">{t.trigger}</h3>
              <p className="text-xs text-slate-500 italic mt-1 bg-slate-50 p-2.5 rounded border border-slate-100">
                "{t.content}"
              </p>
            </div>
            <button 
              onClick={() => { setSelectedTemplate(t); setEditContent(t.content); }}
              className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs px-3 py-1.5 rounded-sm transition-colors"
            >
              Configure Template
            </button>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-slate-300 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
              <h3 className="font-semibold text-lg">Modify System notification Template</h3>
              <button onClick={() => setSelectedTemplate(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Trigger Event</label>
              <input type="text" disabled value={selectedTemplate.trigger} className="w-full bg-slate-100 border border-slate-200 rounded-sm px-3 py-2 text-sm text-slate-500" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">SMS / Email payload template text</label>
              <textarea 
                rows="4" 
                value={editContent} 
                onChange={e => setEditContent(e.target.value)}
                className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-500 font-mono" 
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Variables supported: {`{amount}`}</span>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="secondary" onClick={() => setSelectedTemplate(null)}>Cancel</Button>
              <Button variant="primary" onClick={handleUpdateTemplate}>Commit Template updates</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 7.3 Audit Log Viewer (Global)
function AuditLogsPortal({ logs }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = logs.filter(l => 
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">System Audit logs</h1>
        <p className="text-sm text-slate-500 mt-1">Audit administrative operations, rule modifications, and permission overrides.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by action keyword or actor..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Admin Actor</th>
                <th className="p-4">Action details</th>
                <th className="p-4 text-right">Origin IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-4 font-mono text-slate-400 text-xs">{log.timestamp}</td>
                  <td className="p-4 font-semibold text-slate-700">{log.user}</td>
                  <td className="p-4 text-slate-600">{log.action}</td>
                  <td className="p-4 text-right font-mono text-slate-400 text-xs">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 7.4-7.5 System Settings & Custom Fields Config
function SystemSettingsPortal({ settings, setSettings, customFields, setCustomFields, showToast }) {
  const [platformName, setPlatformName] = useState(settings.platformName);
  const [supportEmail, setSupportEmail] = useState(settings.supportEmail);
  const [sessionTimeout, setSessionTimeout] = useState(settings.sessionTimeout);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(settings.maxLoginAttempts);

  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldKey, setNewFieldKey] = useState('');

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    setSettings(prev => ({
      ...prev,
      platformName,
      supportEmail,
      sessionTimeout,
      maxLoginAttempts
    }));
    showToast('Platform operational settings saved', 'success');
  };

  const handleAddCustomField = (e) => {
    e.preventDefault();
    if (!newFieldLabel || !newFieldKey) {
      showToast('Key and label are required', 'error');
      return;
    }
    const newField = {
      id: `cf_${newFieldKey.toLowerCase().replace(/\s+/g, '_')}`,
      label: newFieldLabel,
      type: 'text',
      target: 'companies'
    };
    setCustomFields(prev => [...prev, newField]);
    setNewFieldLabel('');
    setNewFieldKey('');
    showToast(`Registered custom metadata attribute: ${newFieldLabel}`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Platform parameters & Configuration</h1>
        <p className="text-sm text-slate-500 mt-1">Configure security levels, system anchors, and custom company metadata fields.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-4">
          <h3 className="font-semibold text-slate-800 pb-3 border-b border-slate-100">Global Security & Operation thresholds</h3>
          <form onSubmit={handleSaveGeneral} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">EWA Platform Name</label>
              <input type="text" value={platformName} onChange={e => setPlatformName(e.target.value)} className="w-full border border-slate-300 rounded-sm px-3 py-2" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Corporate Escalations Email</label>
              <input type="email" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} className="w-full border border-slate-300 rounded-sm px-3 py-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Session timeout limits</label>
                <select value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)} className="w-full border border-slate-300 rounded-sm px-3 py-2 bg-white">
                  <option>15 Minutes</option>
                  <option>30 Minutes</option>
                  <option>60 Minutes</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Lockout Attempt Threshold</label>
                <select value={maxLoginAttempts} onChange={e => setMaxLoginAttempts(e.target.value)} className="w-full border border-slate-300 rounded-sm px-3 py-2 bg-white">
                  <option>3 Attempts</option>
                  <option>5 Attempts</option>
                  <option>10 Attempts</option>
                </select>
              </div>
            </div>
            <Button variant="primary" type="submit">Commit Parameters</Button>
          </form>
        </div>

        {/* Custom Fields (Dynamic Customization) */}
        <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-4">
          <h3 className="font-semibold text-slate-800 pb-3 border-b border-slate-100">Company Table Extensible Metadata Attributes</h3>
          <p className="text-xs text-slate-500">Inject additional operational details into the Company table model globally.</p>
          
          <form onSubmit={handleAddCustomField} className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Attribute Display Label</label>
                <input type="text" value={newFieldLabel} onChange={e => setNewFieldLabel(e.target.value)} placeholder="e.g. Local Registration ID" className="w-full border border-slate-300 rounded-sm px-3 py-2" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Database API Key</label>
                <input type="text" value={newFieldKey} onChange={e => setNewFieldKey(e.target.value)} placeholder="e.g. local_reg_id" className="w-full border border-slate-300 rounded-sm px-3 py-2" />
              </div>
            </div>
            <Button variant="secondary" type="submit" icon={Plus}>Register Meta Property</Button>
          </form>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase">Registered properties</h4>
            <div className="flex flex-wrap gap-2">
              {customFields.map(cf => (
                <span key={cf.id} className="text-xs bg-slate-100 border border-slate-200 px-3 py-1 rounded-sm text-slate-600 font-medium">
                  {cf.label} ({cf.id})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- KPI CARD HELPER ---
function KPICard({ title, value, trend, trendValue, subtext }) {
  const isPositive = trend === 'up';
  return (
    <div className="bg-white border border-slate-200 border-l-4 border-l-blue-600 rounded-sm p-5 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</span>
        <div className="flex items-end justify-between mt-2">
          <span className="text-2xl font-bold tracking-tight text-slate-950">{value}</span>
          {trend && (
            <div className={`flex items-center text-xs font-bold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
              {isPositive ? '+' : '-'} {trendValue}
            </div>
          )}
        </div>
      </div>
      {subtext && <span className="text-[11px] text-slate-400 mt-2 font-medium">{subtext}</span>}
    </div>
  );
}

// --- BASE REUSABLE BUTTON COMPONENT ---
function Button({ children, variant = 'primary', icon: Icon, onClick, className = '', type = 'button', disabled = false }) {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white rounded-sm border border-transparent shadow-sm",
    secondary: "bg-white hover:bg-slate-50 text-slate-700 rounded-sm border border-slate-300",
    danger: "bg-red-600 hover:bg-red-700 text-white rounded-sm border border-transparent shadow-sm"
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
}

```
