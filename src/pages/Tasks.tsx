import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Plus, Calendar, User, Car, LayoutGrid, Table2 } from 'lucide-react';
import { TaskItem } from '../types/domain';
import { TaskTypeIcon, PriorityBadge, taskTypeConfig } from '../config/taskIcons';
import { TaskDetailTable } from './Tasks/TaskDetailTable';
import { taskDetailFixtures } from '../services/taskDetailFixtures';

const initialTasks: TaskItem[] = [
  {
    id: 't1',
    title: 'Ölwechsel',
    description: 'Motoröl und Filter wechseln',
    taskType: 'oil_change',
    priority: 'medium',
    assignee: 'Anna',
    status: 'pending',
    dueDate: '2024-05-11',
    vehicleName: 'BMW 320i',
  },
  {
    id: 't2',
    title: 'Reifenwechsel',
    description: 'Winterreifen montieren',
    taskType: 'tire_rotation',
    priority: 'high',
    assignee: 'Max',
    status: 'in_progress',
    dueDate: '2024-05-13',
    vehicleName: 'Audi A4',
  },
  {
    id: 't3',
    title: 'HU/AU Inspektion',
    description: 'TÜV Hauptuntersuchung',
    taskType: 'inspection',
    priority: 'urgent',
    assignee: 'Lena',
    status: 'pending',
    dueDate: '2024-05-10',
    vehicleName: 'VW Golf',
  },
  {
    id: 't4',
    title: 'Bremsen vorne',
    description: 'Bremsbeläge und Scheiben erneuern',
    taskType: 'brake_repair',
    priority: 'high',
    assignee: 'Max',
    status: 'pending',
    dueDate: '2024-05-14',
    vehicleName: 'Mercedes C200',
  },
  {
    id: 't5',
    title: 'Motordiagnose',
    description: 'Check Engine Lampe prüfen',
    taskType: 'engine_repair',
    priority: 'medium',
    assignee: 'Anna',
    status: 'in_progress',
    dueDate: '2024-05-12',
    vehicleName: 'BMW X3',
  },
  {
    id: 't6',
    title: 'Klimaanlage Service',
    description: 'Klimaanlage befüllen und desinfizieren',
    taskType: 'ac_repair',
    priority: 'low',
    status: 'done',
    dueDate: '2024-05-08',
    vehicleName: 'Audi Q5',
  },
  {
    id: 't7',
    title: 'Batterie tauschen',
    description: 'Neue Starterbatterie einbauen',
    taskType: 'battery',
    priority: 'medium',
    assignee: 'Lena',
    status: 'done',
    dueDate: '2024-05-09',
    vehicleName: 'VW Passat',
  },
  {
    id: 't8',
    title: 'Lack polieren',
    description: 'Fahrzeug polieren und versiegeln',
    taskType: 'paint',
    priority: 'low',
    status: 'pending',
    dueDate: '2024-05-15',
    vehicleName: 'Porsche 911',
  },
];

const columns: { key: TaskItem['status']; title: string; color: string }[] = [
  { key: 'pending', title: 'Ausstehend', color: 'border-gray-500/30' },
  { key: 'in_progress', title: 'In Bearbeitung', color: 'border-blue-500/30' },
  { key: 'done', title: 'Erledigt', color: 'border-green-500/30' },
];

export const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState<'kanban' | 'table'>('kanban');

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const next = tasks.map((task) =>
      task.id === draggableId
        ? { ...task, status: destination.droppableId as TaskItem['status'] }
        : task
    );
    setTasks(next);
  };

  const getTaskCountByStatus = (status: TaskItem['status']) =>
    tasks.filter((t) => t.status === status).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Aufgaben</h3>
          <p className="text-sm text-text-secondary">Reparaturen und Wartung verwalten</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-text shadow hover:bg-primary-hover transition-colors">
          <Plus className="h-4 w-4" />
          Neue Aufgabe
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-surface border border-border w-fit">
        <button
          onClick={() => setActiveTab('kanban')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'kanban'
              ? 'bg-primary text-primary-text shadow-sm'
              : 'text-text-secondary hover:text-foreground hover:bg-background/50'
          }`}
        >
          <LayoutGrid className="h-4 w-4" />
          Kanban Ansicht
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'table'
              ? 'bg-primary text-primary-text shadow-sm'
              : 'text-text-secondary hover:text-foreground hover:bg-background/50'
          }`}
        >
          <Table2 className="h-4 w-4" />
          Detaillierte Tabelle
        </button>
      </div>

      {/* Kanban View */}
      {activeTab === 'kanban' && (
        <>
          {/* Task Type Legend */}
          <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-surface border border-border">
            <span className="text-xs text-text-secondary mr-2 self-center">Aufgabentypen:</span>
            {Object.entries(taskTypeConfig)
              .slice(0, 10)
              .map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <div
                    key={key}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${config.bgColor} cursor-default`}
                    title={config.label}
                  >
                    <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                    <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                  </div>
                );
              })}
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid gap-6 md:grid-cols-3">
              {columns.map((column) => (
                <Droppable key={column.key} droppableId={column.key}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`
                        min-h-[320px] rounded-2xl border-2 bg-surface p-4 transition-all
                        ${snapshot.isDraggingOver ? 'border-primary bg-primary/5' : column.color}
                      `}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold text-foreground">{column.title}</h4>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-bg-secondary text-text-secondary">
                          {getTaskCountByStatus(column.key)}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {tasks
                          .filter((task) => task.status === column.key)
                          .map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(drag, dragSnapshot) => (
                                <div
                                  ref={drag.innerRef}
                                  {...drag.draggableProps}
                                  {...drag.dragHandleProps}
                                  className={`
                                    rounded-xl border bg-bg-secondary p-4 transition-all
                                    ${
                                      dragSnapshot.isDragging
                                        ? 'border-primary shadow-lg scale-[1.02]'
                                        : 'border-border hover:border-primary/50'
                                    }
                                  `}
                                >
                                  {/* Task Header with Icon */}
                                  <div className="flex items-start gap-3">
                                    <TaskTypeIcon type={task.taskType} size="md" />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2">
                                        <h5 className="font-semibold text-foreground truncate">
                                          {task.title}
                                        </h5>
                                        {task.priority && (
                                          <PriorityBadge
                                            priority={task.priority}
                                            showLabel={false}
                                          />
                                        )}
                                      </div>
                                      {task.description && (
                                        <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">
                                          {task.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Task Meta */}
                                  <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                                    {task.vehicleName && (
                                      <div className="flex items-center gap-1">
                                        <Car className="h-3 w-3" />
                                        <span>{task.vehicleName}</span>
                                      </div>
                                    )}
                                    {task.dueDate && (
                                      <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>
                                          {new Date(task.dueDate).toLocaleDateString('de-DE', {
                                            day: '2-digit',
                                            month: '2-digit',
                                          })}
                                        </span>
                                      </div>
                                    )}
                                    {task.assignee && (
                                      <div className="flex items-center gap-1 ml-auto">
                                        <User className="h-3 w-3" />
                                        <span>{task.assignee}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </>
      )}

      {/* Table View - Full Width */}
      {activeTab === 'table' && (
        <div className="fixed left-[80px] right-0 top-[140px] bottom-0 overflow-auto bg-background z-40">
          <TaskDetailTable tasks={taskDetailFixtures} />
        </div>
      )}
    </div>
  );
};
