import React, { useState } from "react";

const ViewResults = () => {
  const [prn, setPrn] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setResults([]);

    try {
      const res = await fetch(`http://localhost:5000/api/results/${prn}`);
      const data = await res.json();

      if (res.ok) {
        setResults(data);
      } else {
        setError(data.error || "No records found");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">View Results</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter PRN"
          value={prn}
          onChange={(e) => setPrn(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {results.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Student: {results[0].name}</h3>
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Course</th>
                <th className="border p-2">MSE</th>
                <th className="border p-2">ESE</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td className="border p-2">{r.course_name}</td>
                  <td className="border p-2">{r.mse_marks}</td>
                  <td className="border p-2">{r.ese_marks}</td>
                  <td className="border p-2">{r.total}</td>
                  <td className="border p-2">{r.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewResults;
