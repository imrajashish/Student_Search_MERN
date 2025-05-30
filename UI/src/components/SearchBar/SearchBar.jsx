// frontend/src/components/SearchBar/SearchBar.jsx
import React, { useState, useEffect } from "react";
import { searchStudents } from "../../services/studentService";
import useDebounce from '../../hooks/useDebounce';
import "./SearchBar.css";

const SearchBar = ({ onSelectStudent }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length < 3) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await searchStudents(debouncedQuery);
        setResults(data);
      } catch (err) {
        setError("Failed to fetch results");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleSelect = (student) => {
    onSelectStudent(student);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search students (min 3 chars)..."
        className="search-input"
      />

      {loading && <div className="loading-indicator">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {results.length > 0 && (
        <ul className="results-dropdown">
          {results.map((student) => (
            <li
              key={student.rollNumber}
              onClick={() => handleSelect(student)}
              className="result-item"
            >
              {student.name} (Class: {student.class})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
