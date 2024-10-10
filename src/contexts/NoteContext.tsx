import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Note, Category } from '../types';

interface NoteContextType {
  notes: Note[];
  categories: Category[];
  addNote: (note?: Partial<Note>) => string;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    const savedCategories = localStorage.getItem('categories');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [notes, categories]);

  const addNote = (note: Partial<Note> = {}) => {
    const newNote: Note = {
      id: uuidv4(),
      title: note.title || 'New Note',
      content: note.content || '',
      tags: note.tags || [],
      parentId: note.parentId || null,
      children: note.children || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
    return newNote.id;
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: uuidv4(),
    };
    setCategories(prevCategories => [...prevCategories, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === id ? { ...category, ...updates } : category
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
  };

  return (
    <NoteContext.Provider value={{
      notes,
      categories,
      addNote,
      updateNote,
      deleteNote,
      addCategory,
      updateCategory,
      deleteCategory,
    }}>
      {children}
    </NoteContext.Provider>
  );
};