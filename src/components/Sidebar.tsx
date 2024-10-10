import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotes } from '../contexts/NoteContext';
import { FolderTree, Tag, Search, Plus } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

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
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Notes</h1>
        <div className="flex items-center">
          <ThemeToggle />
          <button 
            className="ml-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={handleCreateNewNote}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md p-2">
          <Search size={18} className="text-gray-400 dark:text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search notes..."
            className="bg-transparent outline-none w-full dark:text-gray-200"
          />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          <li className="mb-2">
            <Link to="/" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
              <FolderTree size={18} className="mr-2" />
              All Notes
            </Link>
          </li>
          {categories.map(category => (
            <li key={category.id} className="mb-2">
              <Link to={`/category/${category.id}`} className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
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
            className="flex-1 p-2 border rounded-l-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <Plus size={18} />
          </button>
        </div>
        <Link to="/tags" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
          <Tag size={18} className="mr-2" />
          Manage Tags
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;