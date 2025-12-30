import { useState } from 'react';
import { Search, Filter, Download, FileText, SortAsc, SortDesc } from 'lucide-react';
import { TaskDetailRow } from '../../types/domain';
import { TaskTypeIcon, PriorityBadge, taskTypeConfig } from '../../config/taskIcons';

interface TaskDetailTableProps {
  tasks: TaskDetailRow[];
}

type SortKey = keyof TaskDetailRow;
type SortDirection = 'asc' | 'desc';

export const TaskDetailTable = ({ tasks }: TaskDetailTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('dueDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Sorting logic
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Filtering and sorting
  const filteredAndSortedTasks = tasks
    .filter(task => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.vin.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return null;
    return sortDirection === 'asc' ? 
      <SortAsc className="h-3 w-3 inline ml-1" /> : 
      <SortDesc className="h-3 w-3 inline ml-1" />;
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'Aufgabe',
      'Typ',
      'Status',
      'Priorität',
      'Fahrzeug',
      'Marke',
      'Modell',
      'Kennzeichen',
      'FIN',
      'Kilometerstand',
      'Erstzulassung',
      'Kraftstoff',
      'Preis (€)',
      'Kosten (€)',
      'Zuständig',
      'Fällig am',
      'Erstellt am',
      'Notizen'
    ];
    
    const rows = filteredAndSortedTasks.map(task => [
      task.title,
      taskTypeConfig[task.taskType]?.label || task.taskType,
      task.status,
      task.priority,
      task.vehicleName,
      task.brand,
      task.model,
      task.licensePlate,
      task.vin,
      task.mileage,
      task.firstRegistration,
      task.fuelType,
      task.price,
      task.estimatedCost,
      task.assignee || '-',
      task.dueDate,
      task.createdAt,
      task.notes || '-'
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `aufgaben_details_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Export to PDF (opens print dialog)
  const exportToPDF = () => {
    const priorityLabels: Record<string, string> = {
      low: 'Niedrig',
      medium: 'Mittel',
      high: 'Hoch',
      urgent: 'Dringend'
    };

    const statusLabels: Record<string, string> = {
      pending: 'Ausstehend',
      in_progress: 'In Bearbeitung',
      done: 'Erledigt',
      cancelled: 'Storniert'
    };

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const tableRows = filteredAndSortedTasks.map(task => `
      <tr>
        <td>${task.title}</td>
        <td>${taskTypeConfig[task.taskType]?.label || task.taskType}</td>
        <td>${statusLabels[task.status] || task.status}</td>
        <td>${priorityLabels[task.priority] || task.priority}</td>
        <td>${task.vehicleName}</td>
        <td>${task.licensePlate}</td>
        <td>${task.assignee || '-'}</td>
        <td>${task.dueDate}</td>
        <td style="text-align: right;">${task.estimatedCost ? `${task.estimatedCost.toLocaleString('de-DE')} €` : '-'}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="UTF-8">
        <title>Aufgaben Details - ${new Date().toLocaleDateString('de-DE')}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            padding: 20px; 
            color: #333;
          }
          .header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid #2563eb;
          }
          .header h1 { font-size: 24px; color: #1e40af; }
          .header .date { color: #6b7280; font-size: 14px; }
          .summary {
            display: flex;
            gap: 24px;
            margin-bottom: 20px;
            padding: 12px 16px;
            background: #f3f4f6;
            border-radius: 8px;
          }
          .summary-item { font-size: 14px; }
          .summary-item strong { color: #2563eb; }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            font-size: 11px;
          }
          th { 
            background: #1e40af; 
            color: white; 
            padding: 10px 8px; 
            text-align: left;
            font-weight: 600;
          }
          td { 
            padding: 8px; 
            border-bottom: 1px solid #e5e7eb;
          }
          tr:nth-child(even) { background: #f9fafb; }
          tr:hover { background: #f3f4f6; }
          .footer {
            margin-top: 24px;
            padding-top: 12px;
            border-top: 1px solid #e5e7eb;
            font-size: 11px;
            color: #9ca3af;
            text-align: center;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📋 Aufgaben Details</h1>
          <div class="date">Erstellt am: ${new Date().toLocaleDateString('de-DE', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</div>
        </div>
        
        <div class="summary">
          <div class="summary-item">Gesamt: <strong>${filteredAndSortedTasks.length}</strong> Aufgaben</div>
          <div class="summary-item">Ausstehend: <strong>${filteredAndSortedTasks.filter(t => t.status === 'pending').length}</strong></div>
          <div class="summary-item">In Bearbeitung: <strong>${filteredAndSortedTasks.filter(t => t.status === 'in_progress').length}</strong></div>
          <div class="summary-item">Erledigt: <strong>${filteredAndSortedTasks.filter(t => t.status === 'done').length}</strong></div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Aufgabe</th>
              <th>Typ</th>
              <th>Status</th>
              <th>Priorität</th>
              <th>Fahrzeug</th>
              <th>Kennzeichen</th>
              <th>Zuständig</th>
              <th>Fällig am</th>
              <th style="text-align: right;">Kosten (€)</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>

        <div class="footer">
          Autohaus Management System • Generiert am ${new Date().toLocaleString('de-DE')}
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="space-y-4 p-6">
      {/* Filters and Search */}
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-surface border border-border">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Suchen nach Aufgabe, Fahrzeug, Kennzeichen, FIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-text-secondary" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Alle Status</option>
            <option value="pending">Ausstehend</option>
            <option value="in_progress">In Bearbeitung</option>
            <option value="done">Erledigt</option>
          </select>
        </div>

        {/* Priority Filter */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Alle Prioritäten</option>
          <option value="low">Niedrig</option>
          <option value="medium">Mittel</option>
          <option value="high">Hoch</option>
          <option value="urgent">Dringend</option>
        </select>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-foreground text-sm font-semibold hover:bg-bg-secondary transition-colors"
          >
            <Download className="h-4 w-4" />
            CSV
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-text text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            <FileText className="h-4 w-4" />
            PDF
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-text-secondary px-6">
        {filteredAndSortedTasks.length} von {tasks.length} Aufgaben
      </div>

      {/* Table - Full Width Excel-like Grid */}
      <div className="border-t border-border">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold uppercase cursor-pointer hover:bg-background/50 transition-colors border-r border-border"
                onClick={() => handleSort('title')}
              >
                Aufgabe <SortIcon columnKey="title" />
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold uppercase cursor-pointer hover:bg-background/50 transition-colors border-r border-border"
                onClick={() => handleSort('taskType')}
              >
                Typ <SortIcon columnKey="taskType" />
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold uppercase cursor-pointer hover:bg-background/50 transition-colors border-r border-border"
                onClick={() => handleSort('status')}
              >
                Status <SortIcon columnKey="status" />
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold uppercase cursor-pointer hover:bg-background/50 transition-colors border-r border-border"
                onClick={() => handleSort('priority')}
              >
                Priorität <SortIcon columnKey="priority" />
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold uppercase cursor-pointer hover:bg-background/50 transition-colors border-r border-border"
                onClick={() => handleSort('vehicleName')}
              >
                Fahrzeug <SortIcon columnKey="vehicleName" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase border-r border-border">Marke</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase border-r border-border">Modell</th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold uppercase cursor-pointer hover:bg-background/50 transition-colors border-r border-border"
                onClick={() => handleSort('licensePlate')}
              >
                Kennzeichen <SortIcon columnKey="licensePlate" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase border-r border-border">FIN</th>
              <th 
                className="px-4 py-3 text-right text-xs font-semibold uppercase cursor-pointer hover:bg-background/50 transition-colors border-r border-border"
                onClick={() => handleSort('mileage')}
              >
                KM <SortIcon columnKey="mileage" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase border-r border-border">Erstzulassung</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase border-r border-border">Kraftstoff</th>
              <th 
                className="px-4 py-3 text-right text-xs font-semibold uppercase cursor-pointer hover:bg-background/50 transition-colors border-r border-border"
                onClick={() => handleSort('price')}
              >
                Preis <SortIcon columnKey="price" />
              </th>
              <th 
                className="px-4 py-3 text-right text-xs font-semibold uppercase cursor-pointer hover:bg-background/50 transition-colors border-r border-border"
                onClick={() => handleSort('estimatedCost')}
              >
                Kosten <SortIcon columnKey="estimatedCost" />
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold uppercase cursor-pointer hover:bg-background/50 transition-colors border-r border-border"
                onClick={() => handleSort('assignee')}
              >
                Zuständig <SortIcon columnKey="assignee" />
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold uppercase cursor-pointer hover:bg-background/50 transition-colors border-r border-border"
                onClick={() => handleSort('dueDate')}
              >
                Fällig am <SortIcon columnKey="dueDate" />
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold uppercase cursor-pointer hover:bg-background/50 transition-colors border-r border-border"
                onClick={() => handleSort('createdAt')}
              >
                Erstellt <SortIcon columnKey="createdAt" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Notizen</th>
            </tr>
          </thead>
          <tbody className="bg-background">
            {filteredAndSortedTasks.map((task, idx) => (
              <tr 
                key={task.id}
                className="border-b border-border group"
              >
                <td className="px-4 py-3 font-medium border-r border-border group-hover:bg-surface/20 transition-colors">{task.title}</td>
                <td className="px-4 py-3 border-r border-border group-hover:bg-surface/20 transition-colors">
                  <div className="flex items-center gap-2">
                    <TaskTypeIcon type={task.taskType} size="sm" />
                  </div>
                </td>
                <td className="px-4 py-3 border-r border-border group-hover:bg-surface/20 transition-colors">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    task.status === 'done' ? 'bg-green-500/10 text-green-500' :
                    task.status === 'in_progress' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-gray-500/10 text-gray-500'
                  }`}>
                    {task.status === 'done' ? 'Erledigt' : task.status === 'in_progress' ? 'In Bearbeitung' : 'Ausstehend'}
                  </span>
                </td>
                <td className="px-4 py-3 border-r border-border group-hover:bg-surface/20 transition-colors">
                  <PriorityBadge priority={task.priority} />
                </td>
                <td className="px-4 py-3 font-medium border-r border-border group-hover:bg-surface/20 transition-colors">{task.vehicleName}</td>
                <td className="px-4 py-3 text-text-secondary border-r border-border group-hover:bg-surface/20 transition-colors">{task.brand}</td>
                <td className="px-4 py-3 text-text-secondary border-r border-border group-hover:bg-surface/20 transition-colors">{task.model}</td>
                <td className="px-4 py-3 font-mono text-xs border-r border-border group-hover:bg-surface/20 transition-colors">{task.licensePlate}</td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary border-r border-border group-hover:bg-surface/20 transition-colors">{task.vin}</td>
                <td className="px-4 py-3 text-right text-text-secondary border-r border-border group-hover:bg-surface/20 transition-colors">{task.mileage.toLocaleString()}</td>
                <td className="px-4 py-3 text-text-secondary border-r border-border group-hover:bg-surface/20 transition-colors">{task.firstRegistration}</td>
                <td className="px-4 py-3 text-text-secondary capitalize border-r border-border group-hover:bg-surface/20 transition-colors">{task.fuelType}</td>
                <td className="px-4 py-3 text-right font-semibold border-r border-border group-hover:bg-surface/20 transition-colors">{task.price.toLocaleString()} €</td>
                <td className="px-4 py-3 text-right text-orange-500 font-semibold border-r border-border group-hover:bg-surface/20 transition-colors">{task.estimatedCost.toLocaleString()} €</td>
                <td className="px-4 py-3 text-text-secondary border-r border-border group-hover:bg-surface/20 transition-colors">{task.assignee || '-'}</td>
                <td className="px-4 py-3 text-text-secondary border-r border-border group-hover:bg-surface/20 transition-colors">{task.dueDate}</td>
                <td className="px-4 py-3 text-text-secondary text-xs border-r border-border group-hover:bg-surface/20 transition-colors">{task.createdAt}</td>
                <td className="px-4 py-3 text-text-secondary text-xs group-hover:bg-surface/20 transition-colors">{task.notes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedTasks.length === 0 && (
        <div className="text-center py-12 text-text-secondary">
          Keine Aufgaben gefunden
        </div>
      )}
    </div>
  );
};
