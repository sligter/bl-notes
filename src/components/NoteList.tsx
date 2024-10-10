import React from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../contexts/NoteContext';
import { FileText, Tag } from 'lucide-react';

const NoteList: React.FC = () => {
  const { notes } = useNotes();

  return (
    <div className="flex-1 bg-white p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">All Notes</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map(note => (
          <Link
            key={note.id}
            to={`/note/${note.id}`}
            className="block p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-2">
              <FileText size={18} className="text-gray-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
            </div>
            <p className="text-gray-600 mb-2 line-clamp-2">{note.content}</p>
            <div className="flex flex-wrap gap-2">
              {note.tags.map(tag => (
                <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Tag size={12} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NoteList;