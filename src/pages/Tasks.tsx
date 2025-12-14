import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { TaskItem } from '../types/domain';

const initialTasks: TaskItem[] = [
  { id: 't1', title: 'Oil change - BMW 320i', assignee: 'Anna', status: 'pending', dueDate: '2024-05-11' },
  { id: 't2', title: 'Tire rotation - Audi A4', assignee: 'Max', status: 'in_progress', dueDate: '2024-05-13' },
  { id: 't3', title: 'Inspection - VW Golf', assignee: 'Lena', status: 'pending', dueDate: '2024-05-10' }
];

const columns: { key: TaskItem['status']; title: string }[] = [
  { key: 'pending', title: 'Backlog' },
  { key: 'in_progress', title: 'In progress' },
  { key: 'done', title: 'Done' }
];

export const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const next = tasks.map((task) =>
      task.id === draggableId ? { ...task, status: destination.droppableId as TaskItem['status'] } : task
    );
    setTasks(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Tasks</h3>
          <p className="text-sm text-text-secondary">Assign, track, and drag between statuses.</p>
        </div>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-text shadow hover:bg-primary-hover">
          + New task
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid gap-4 md:grid-cols-3">
          {columns.map((column) => (
            <Droppable key={column.key} droppableId={column.key}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-[260px] rounded-2xl border border-border bg-surface p-4 shadow-inner"
                >
                  <h4 className="text-sm font-semibold text-foreground">{column.title}</h4>
                  <div className="mt-3 space-y-3">
                    {tasks
                      .filter((task) => task.status === column.key)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(drag) => (
                            <div
                              ref={drag.innerRef}
                              {...drag.draggableProps}
                              {...drag.dragHandleProps}
                              className="rounded-xl border border-border bg-bg-secondary px-4 py-3 text-sm text-foreground shadow hover:border-primary"
                            >
                              <p className="font-semibold text-foreground">{task.title}</p>
                              <p className="text-xs text-text-secondary">Assignee: {task.assignee ?? '—'}</p>
                              <p className="text-xs text-text-secondary">Due: {task.dueDate ?? '—'}</p>
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
    </div>
  );
};
