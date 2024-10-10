import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotes } from '../contexts/NoteContext';
import ReactMarkdown from 'react-markdown';
import { Save, Trash2, Tag, Eye, Edit } from 'lucide-react';

const NoteEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notes, updateNote, deleteNote } = useNotes();
  const [note, setNote] = useState(notes.find(n => n.id === id) || { title: '', content: '', tags: [] });
  const [isEditing, setIsEditing] = useState(true);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const foundNote = notes.find(n => n.id === id);
    if (foundNote) {
      setNote(foundNote);
    } else {
      navigate('/');
    }
  }, [id, notes, navigate]);

  const handleSave = () => {
    if (id && note.title.trim() && note.content.trim()) {
      updateNote(id, note);
    } else {
      alert('Please provide both a title and content for the note.');
    }
  };

  const handleDelete = () => {
    if (id) {
      deleteNote(id);
      navigate('/');
    }
  };

  const handleAddTag = () => {
    if (newTag && !note.tags.includes(newTag)) {
      setNote({ ...note, tags: [...note.tags, newTag] });
      setNewTag('');
    }
  };

  return (
    <div className="flex-1 bg-white p-6 overflow-y-auto flex flex-col h-full">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          className="text-2xl font-bold w-full mr-4"
          placeholder="Note Title"
        />
        <div className="flex items-center">
          <button onClick={() => setIsEditing(!isEditing)} className="mr-2 p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            {isEditing ? <Eye size={18} /> : <Edit size={18} />}
          </button>
          <button onClick={handleSave} className="mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <Save size={18} />
          </button>
          <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {note.tags.map(tag => (
          <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Tag size={12} className="mr-1" />
            {tag}
          </span>
        ))}
        <div className="flex items-center">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            placeholder="Add tag"
            className="border rounded px-2 py-1 text-sm"
          />
          <button onClick={handleAddTag} className="ml-1 p-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            <Tag size={14} />
          </button>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        {isEditing ? (
          <textarea
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            className="w-1/2 h-full p-2 border rounded resize-none"
            placeholder="Note content"
          />
        ) : null}
        <div className={`${isEditing ? 'w-1/2' : 'w-full'} h-full overflow-y-auto p-2 border-l`}>
          <div className="prose max-w-none">
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;