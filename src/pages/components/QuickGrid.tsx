import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

export const QuickGrid = () => {
  const { t } = useTranslation();
  
  const items = useMemo(() => [
    { id: 'vehicles', title: t('nav.vehicles'), description: t('dashboard.manageFleet') },
    { id: 'tasks', title: t('nav.tasks'), description: t('dashboard.assignTasks') },
    { id: 'calendar', title: t('nav.calendar'), description: t('dashboard.viewSchedule') },
    { id: 'photos', title: t('nav.photos'), description: t('dashboard.uploadMedia') }
  ], [t]);
  
  const data = items;

  const onDragEnd = (result: DropResult) => {
    // Placeholder: can be extended to persist ordering.
    if (!result.destination) return;
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-slate-900/30">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{t('dashboard.dynamicGrid')}</p>
          <h3 className="text-lg font-semibold text-white">{t('dashboard.dragDropCards')}</h3>
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
