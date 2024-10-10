import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import { NoteProvider } from './contexts/NoteContext';

function App() {
  return (
    <NoteProvider>
      <Router>
        <div className="flex h-screen bg-gray-100">
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
  );
}

export default App;