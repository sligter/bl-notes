import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotes } from '../contexts/NoteContext';
import { FolderTree, Tag, Search, Plus } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { categories, addCategory, addNote } = useNotes();
  const [newCategoryName, setNewCategoryName] = useState('');
  const navigate = useNavigate();

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory({ name: newCategoryName.trim(), parentId: null, children: [] });
      setNewCategoryName('');
    }
  };

  const handleCreateNewNote = () => {
    const newNoteId = addNote();
    navigate(`/note/${newNoteId}`);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Notes</h1>
        <button 
          className="text-blue-500 hover:text-blue-600"
          onClick={handleCreateNewNote}
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="mb-4">
        <div className="flex items-center bg-gray-100 rounded-md p-2">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search notes..."
            className="bg-transparent outline-none w-full"
          />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          <li className="mb-2">
            <Link to="/" className="flex items-center text-gray-700 hover:text-blue-500">
              <FolderTree size={18} className="mr-2" />
              All Notes
            </Link>
          </li>
          {categories.map(category => (
            <li key={category.id} className="mb-2">
              <Link to={`/category/${category.id}`} className="flex items-center text-gray-700 hover:text-blue-500">
                <FolderTree size={18} className="mr-2" />
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-4">
        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder="New category"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-1 p-2 border rounded-l-md"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
          >
            <Plus size={18} />
          </button>
        </div>
        <Link to="/tags" className="flex items-center text-gray-700 hover:text-blue-500">
          <Tag size={18} className="mr-2" />
          Manage Tags
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;