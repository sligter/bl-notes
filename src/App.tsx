import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import { NoteProvider } from './contexts/NoteContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <NoteProvider>
        <Router>
          <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Sidebar />
            <div className="flex-1 flex overflow-hidden">
              <Routes>
                <Route path="/" element={<NoteList />} />
                <Route path="/note/:id" element={<NoteEditor />} />
              </Routes>
            </div>
          </div>
        </Router>
      </NoteProvider>
    </ThemeProvider>
  );
}

export default App;