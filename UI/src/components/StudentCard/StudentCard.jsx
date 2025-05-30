import React from "react";
import "./StudentCard.css";

const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <h3>{student.name}</h3>
      <div className="student-details">
        <p>
          <strong>Class:</strong> {student.class}
        </p>
        <p>
          <strong>Roll Number:</strong> {student.rollNumber}
        </p>
      </div>
    </div>
  );
};

export default StudentCard;
