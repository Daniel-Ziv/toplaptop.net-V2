import React from 'react';

const Results = ({ answers }) => {
  // Map keys to human-readable labels for each question
  const questionLabels = {
    student: "סטודנט",
    tasks: "משימות שבחרת",
    budget: "תקציב",
    screenSize: "גודל מסך",
    portability: "מאפייני ניידות",
    features: "מאפיינים מיוחדים"
  };

  // Helper function to format answers, handling nested objects and arrays
  const formatAnswer = (answer) => {
    if (typeof answer === "object") {
      // If answer is an object, format it as key-value pairs
      return Object.entries(answer)
        .map(([key, value]) => `${value}`)
        .join(", ");
    }

    return answer || "לא סופק מידע";
  };

  return (
    <div className="section">
      <h1 dir="rtl" className="text-4xl font-bold text-center leading-none tracking-tight text-gray-900 dark:text-black">
        התוצאות שלך
      </h1>
      <hr className="linebreak my-4" />
      <p dir="rtl" className="text-lg font-normal text-gray-800 dark:text-gray-700 text-center">
        סיכום התשובות שלך
      </p>
      <ul dir="rtl" className="mt-6 space-y-4 text-gray-800 dark:text-gray-700 text-center">
        {Object.entries(answers).map(([question, answer]) => (
          <li key={question}>
            <strong>{questionLabels[question] || question}</strong>: {formatAnswer(answer)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
