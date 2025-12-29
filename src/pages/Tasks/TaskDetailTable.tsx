import { useState } from 'react';
import { Search, Filter, Download, SortAsc, SortDesc } from 'lucide-react';
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

        {/* Export Button */}
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-text text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
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
