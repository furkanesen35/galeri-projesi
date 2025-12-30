import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Plus,
  Building2,
  User,
  Store,
  Phone,
  Mail,
  MapPin,
  Car,
  Calendar,
  Tag,
  ChevronRight,
  LayoutGrid,
  List,
  Download,
  UserPlus,
  TrendingUp,
  UserCheck,
  UserX,
  Clock,
} from 'lucide-react';
import { customerFixtures, getCustomerStats } from '../../services/customerFixtures';
import { Customer, CustomerType, CustomerStatus } from '../../types/domain';
import { vehicleFixtures } from '../../services/vehicleFixtures';

const typeConfig: Record<CustomerType, { label: string; icon: React.ElementType; color: string; bgColor: string }> = {
  private: { label: 'Privat', icon: User, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  business: { label: 'Geschäft', icon: Building2, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  dealer: { label: 'Händler', icon: Store, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
};

const statusConfig: Record<CustomerStatus, { label: string; color: string; bgColor: string }> = {
  active: { label: 'Aktiv', color: 'text-green-500', bgColor: 'bg-green-500/10' },
  inactive: { label: 'Inaktiv', color: 'text-gray-500', bgColor: 'bg-gray-500/10' },
  lead: { label: 'Lead', color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  blocked: { label: 'Gesperrt', color: 'text-red-500', bgColor: 'bg-red-500/10' },
};

const CustomerCard = ({ customer, onClick }: { customer: Customer; onClick: () => void }) => {
  const type = typeConfig[customer.type];
  const status = statusConfig[customer.status];
  const TypeIcon = type.icon;
  const vehicleCount = customer.vehicleIds.length;
  const lastActivity = customer.activities[customer.activities.length - 1];

  return (
    <div
      onClick={onClick}
      className="bg-surface border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full ${type.bgColor} flex items-center justify-center`}>
            <TypeIcon className={`h-6 w-6 ${type.color}`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {customer.companyName || `${customer.firstName} ${customer.lastName}`}
            </h3>
            {customer.companyName && (
              <p className="text-sm text-text-secondary">{customer.firstName} {customer.lastName}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${status.bgColor} ${status.color}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Mail className="h-3.5 w-3.5" />
          <span className="truncate">{customer.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Phone className="h-3.5 w-3.5" />
          <span>{customer.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate">{customer.address.city}</span>
        </div>
      </div>

      {/* Stats & Tags */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm text-text-secondary">
            <Car className="h-3.5 w-3.5" />
            <span>{vehicleCount} Fzg.</span>
          </div>
          {lastActivity && (
            <div className="flex items-center gap-1 text-sm text-text-secondary">
              <Clock className="h-3.5 w-3.5" />
              <span>{new Date(lastActivity.date).toLocaleDateString('de-DE')}</span>
            </div>
          )}
        </div>
        <ChevronRight className="h-4 w-4 text-text-secondary group-hover:text-primary transition-colors" />
      </div>

      {/* Tags */}
      {customer.tags && customer.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {customer.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded bg-bg-secondary text-text-secondary">
              {tag}
            </span>
          ))}
          {customer.tags.length > 3 && (
            <span className="text-xs text-text-secondary">+{customer.tags.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
};

const CustomerRow = ({ customer, onClick }: { customer: Customer; onClick: () => void }) => {
  const type = typeConfig[customer.type];
  const status = statusConfig[customer.status];
  const TypeIcon = type.icon;
  const vehicleCount = customer.vehicleIds.length;

  return (
    <tr
      onClick={onClick}
      className="hover:bg-bg-secondary/50 cursor-pointer transition-colors"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${type.bgColor} flex items-center justify-center`}>
            <TypeIcon className={`h-4 w-4 ${type.color}`} />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {customer.companyName || `${customer.firstName} ${customer.lastName}`}
            </p>
            {customer.companyName && (
              <p className="text-xs text-text-secondary">{customer.firstName} {customer.lastName}</p>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={`text-xs px-2 py-1 rounded-full ${type.bgColor} ${type.color}`}>
          {type.label}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`text-xs px-2 py-1 rounded-full ${status.bgColor} ${status.color}`}>
          {status.label}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary">{customer.email}</td>
      <td className="px-4 py-3 text-sm text-text-secondary">{customer.phone}</td>
      <td className="px-4 py-3 text-sm text-text-secondary">{customer.address.city}</td>
      <td className="px-4 py-3 text-sm text-text-secondary">{vehicleCount}</td>
      <td className="px-4 py-3 text-sm text-text-secondary">
        {new Date(customer.updatedAt).toLocaleDateString('de-DE')}
      </td>
    </tr>
  );
};

export const Customers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<CustomerType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<CustomerStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'activity'>('activity');

  const stats = getCustomerStats();

  const filteredCustomers = useMemo(() => {
    return customerFixtures
      .filter(customer => {
        // Search
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = searchQuery === '' ||
          customer.firstName.toLowerCase().includes(searchLower) ||
          customer.lastName.toLowerCase().includes(searchLower) ||
          customer.email.toLowerCase().includes(searchLower) ||
          customer.companyName?.toLowerCase().includes(searchLower) ||
          customer.customerId.toLowerCase().includes(searchLower) ||
          customer.address.city.toLowerCase().includes(searchLower) ||
          customer.tags?.some(t => t.toLowerCase().includes(searchLower));

        // Type filter
        const matchesType = filterType === 'all' || customer.type === filterType;

        // Status filter
        const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;

        return matchesSearch && matchesType && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          const nameA = a.companyName || `${a.lastName} ${a.firstName}`;
          const nameB = b.companyName || `${b.lastName} ${b.firstName}`;
          return nameA.localeCompare(nameB);
        }
        if (sortBy === 'date') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        // activity
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [searchQuery, filterType, filterStatus, sortBy]);

  const handleCustomerClick = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Firma', 'Typ', 'Status', 'E-Mail', 'Telefon', 'Stadt'];
    const rows = filteredCustomers.map(c => [
      c.customerId,
      `${c.firstName} ${c.lastName}`,
      c.companyName || '',
      typeConfig[c.type].label,
      statusConfig[c.status].label,
      c.email,
      c.phone,
      c.address.city
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.map(cell => `"${cell}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kunden_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Kundenverwaltung
          </h1>
          <p className="text-text-secondary mt-1">
            {stats.total} Kunden • {stats.active} aktiv • {stats.leads} Leads
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-text rounded-lg hover:opacity-90 transition-opacity">
          <UserPlus className="h-4 w-4" />
          Neuer Kunde
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.active}</p>
              <p className="text-sm text-text-secondary">Aktive Kunden</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.leads}</p>
              <p className="text-sm text-text-secondary">Offene Leads</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.business}</p>
              <p className="text-sm text-text-secondary">Geschäftskunden</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <User className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.private}</p>
              <p className="text-sm text-text-secondary">Privatkunden</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Kunden suchen (Name, E-Mail, Stadt, Tags...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-bg-secondary border border-border rounded-lg text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Type Filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as CustomerType | 'all')}
          className="px-4 py-2.5 bg-bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Alle Typen</option>
          <option value="private">Privatkunden</option>
          <option value="business">Geschäftskunden</option>
          <option value="dealer">Händler</option>
        </select>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as CustomerStatus | 'all')}
          className="px-4 py-2.5 bg-bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Alle Status</option>
          <option value="active">Aktiv</option>
          <option value="lead">Lead</option>
          <option value="inactive">Inaktiv</option>
          <option value="blocked">Gesperrt</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'activity')}
          className="px-4 py-2.5 bg-bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="activity">Letzte Aktivität</option>
          <option value="name">Name</option>
          <option value="date">Erstelldatum</option>
        </select>

        {/* View Toggle */}
        <div className="flex bg-bg-secondary border border-border rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-primary-text' : 'text-text-secondary hover:text-foreground'}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded ${viewMode === 'table' ? 'bg-primary text-primary-text' : 'text-text-secondary hover:text-foreground'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>

        {/* Export */}
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-bg-secondary border border-border rounded-lg text-foreground hover:bg-bg-tertiary transition-colors"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      {/* Results Count */}
      <div className="text-sm text-text-secondary">
        {filteredCustomers.length} von {customerFixtures.length} Kunden
      </div>

      {/* Customer List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map(customer => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onClick={() => handleCustomerClick(customer.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-bg-secondary border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-secondary">Kunde</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-secondary">Typ</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-secondary">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-secondary">E-Mail</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-secondary">Telefon</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-secondary">Stadt</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-secondary">Fzg.</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-secondary">Aktualisiert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCustomers.map(customer => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  onClick={() => handleCustomerClick(customer.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="bg-surface border border-border rounded-xl p-12 text-center">
          <Users className="h-12 w-12 text-text-secondary mx-auto mb-3" />
          <h3 className="text-lg font-medium text-foreground mb-1">Keine Kunden gefunden</h3>
          <p className="text-text-secondary text-sm">
            Versuchen Sie einen anderen Suchbegriff oder Filter
          </p>
        </div>
      )}
    </div>
  );
};

export default Customers;
