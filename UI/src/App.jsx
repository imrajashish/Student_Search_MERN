import React, { useState } from 'react';
import SearchBar from './components/SearchBar';  // Fixed: Removed curly braces
import StudentCard from './components/StudentCard';
import './App.css';

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="app-container">
      <h1>Student Search</h1>
      <div className="search-wrapper">
        <SearchBar onSelectStudent={setSelectedStudent} />
      </div>
      
      {selectedStudent && (
        <div className="student-display">
          <h2>Selected Student</h2>
          <StudentCard student={selectedStudent} />
        </div>
      )}
    </div>
  );
}

export default App;