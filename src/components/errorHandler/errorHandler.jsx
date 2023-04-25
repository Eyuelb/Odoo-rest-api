import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function ErrorBoundary({ children }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  useEffect(() => {
    window.onerror = (message, source, lineno, colno, error) => {
      const errorObject = {
        message,
        source,
        lineno,
        colno,
        stack: error ? error.stack : null,
        name: error ? error.name : null
      };
      setError(errorObject);
      navigate('/error');
    };
  }, []);

  return error ? <ErrorFallback error={error} /> : children;
}

function ErrorFallback({ error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-red-500 text-white p-6 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-4">Please try refreshing the page or contact support if the problem persists.</p>
        {/* <div className="text-xs">{error.stack}</div> */}
        <button className="bg-blue-700 text-white py-2 px-4 rounded-md mt-4" onClick={() => window.location.href = "/"}>Refresh</button>
      </div>
    </div>
  );
}