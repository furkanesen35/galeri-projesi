import { useState } from 'react';
import { MessageSquare, Send, Trash2, Edit2, User } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/de';

dayjs.extend(relativeTime);
dayjs.locale('de');

export type VehicleComment = {
  id: string;
  author: string;
  authorRole?: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
};

interface VehicleCommentsProps {
  vehicleId: string;
}

// Mock initial comments
const mockComments: Record<string, VehicleComment[]> = {
  'v1': [
    {
      id: 'c1',
      author: 'Anna Schmidt',
      authorRole: 'Verkaufsberaterin',
      text: 'Kunde ist sehr interessiert. Probefahrt für Mittwoch geplant.',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'c2',
      author: 'Max Müller',
      authorRole: 'Werkstattleiter',
      text: 'Ölwechsel überfällig! Vor Verkauf unbedingt durchführen.',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ]
};

export const VehicleComments = ({ vehicleId }: VehicleCommentsProps) => {
  const [comments, setComments] = useState<VehicleComment[]>(mockComments[vehicleId] || []);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: VehicleComment = {
      id: `c${Date.now()}`,
      author: 'Aktueller Benutzer',
      authorRole: 'Mitarbeiter',
      text: newComment,
      createdAt: new Date().toISOString(),
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleEditComment = (id: string) => {
    const comment = comments.find(c => c.id === id);
    if (comment) {
      setEditingId(id);
      setEditText(comment.text);
    }
  };

  const handleSaveEdit = () => {
    if (!editText.trim() || !editingId) return;

    setComments(comments.map(c => 
      c.id === editingId 
        ? { ...c, text: editText, updatedAt: new Date().toISOString() }
        : c
    ));
    setEditingId(null);
    setEditText('');
  };

  const handleDeleteComment = (id: string) => {
    if (confirm('Möchten Sie diesen Kommentar wirklich löschen?')) {
      setComments(comments.filter(c => c.id !== id));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      action();
    }
  };

  return (
    <div className="space-y-4">

      {/* Add New Comment */}
      <div className="rounded-lg border border-border bg-surface p-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, handleAddComment)}
          placeholder="Kommentar hinzufügen... (Strg+Enter zum Senden)"
          rows={3}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-text-secondary">
            Drücken Sie Strg+Enter zum Senden
          </span>
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-text rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
            Senden
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Noch keine Kommentare vorhanden</p>
            <p className="text-xs mt-1">Fügen Sie den ersten Kommentar hinzu</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div 
              key={comment.id}
              className="rounded-lg border border-border bg-surface p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                {/* Author Avatar */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>

                {/* Comment Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="text-sm font-semibold text-foreground">
                        {comment.author}
                      </span>
                      {comment.authorRole && (
                        <span className="text-xs text-text-secondary ml-2">
                          • {comment.authorRole}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditComment(comment.id)}
                        className="p-1 text-text-secondary hover:text-primary transition-colors"
                        title="Bearbeiten"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="p-1 text-text-secondary hover:text-red-500 transition-colors"
                        title="Löschen"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Comment Text or Edit Mode */}
                  {editingId === comment.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e, handleSaveEdit)}
                        rows={3}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="px-3 py-1 bg-primary text-primary-text rounded text-xs font-medium hover:bg-primary-hover"
                        >
                          Speichern
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditText('');
                          }}
                          className="px-3 py-1 bg-surface border border-border text-foreground rounded text-xs font-medium hover:bg-bg-secondary"
                        >
                          Abbrechen
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {comment.text}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-text-secondary">
                        <span>{dayjs(comment.createdAt).fromNow()}</span>
                        {comment.updatedAt && (
                          <>
                            <span>•</span>
                            <span>bearbeitet {dayjs(comment.updatedAt).fromNow()}</span>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
