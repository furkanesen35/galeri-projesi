import { useMemo } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

const items = [
  { id: 'vehicles', title: 'Vehicles', description: 'Manage fleet inventory' },
  { id: 'tasks', title: 'Tasks', description: 'Assign and track tasks' },
  { id: 'calendar', title: 'Calendar', description: 'View workshop schedule' },
  { id: 'photos', title: 'Photos', description: 'Upload and order media' }
];

export const QuickGrid = () => {
  const data = useMemo(() => items, []);

  const onDragEnd = (result: DropResult) => {
    // Placeholder: can be extended to persist ordering.
    if (!result.destination) return;
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-slate-900/30">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">Dynamic grid</p>
          <h3 className="text-lg font-semibold text-white">Drag & drop cards</h3>
        </div>
      </div>
      <div className="mt-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="quick-grid" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
              >
                {data.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(drag) => (
                      <div
                        ref={drag.innerRef}
                        {...drag.draggableProps}
                        {...drag.dragHandleProps}
                        className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-primary-400 hover:shadow-lg hover:shadow-primary-500/10"
                      >
                        <h4 className="text-base font-semibold text-white">{item.title}</h4>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
