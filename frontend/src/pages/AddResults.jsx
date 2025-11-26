import React, { useState } from "react";

const subjects = [
  { id: 1, name: "Design and Analysis of Algorithms (DAA)" },
  { id: 2, name: "Computer Networks Technology (CNT)" },
  { id: 3, name: "Cloud Computing (CC)" },
  { id: 4, name: "Artificial Neural Networks (ANN)" },
];

const AddResults = () => {
  const [prn, setPrn] = useState("");
  const [name, setName] = useState("");
  const [marks, setMarks] = useState(
    subjects.map((s) => ({ course_id: s.id, mse_marks: "", ese_marks: "" }))
  );
  const [message, setMessage] = useState("");

  const handleMarkChange = (index, field, value) => {
    const updated = [...marks];
    updated[index][field] = value;
    setMarks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prn, name, marks }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Results added successfully!");
        setPrn("");
        setName("");
        setMarks(
          subjects.map((s) => ({
            course_id: s.id,
            mse_marks: "",
            ese_marks: "",
          }))
        );
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Add Student Results
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* PRN + Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">PRN</label>
            <input
              type="text"
              value={prn}
              onChange={(e) => setPrn(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
        </div>

        {/* Marks Table */}
        <div>
          <h3 className="font-medium mb-2">Marks for Each Subject</h3>
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Subject</th>
                <th className="border p-2">MSE (30)</th>
                <th className="border p-2">ESE (70)</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s, i) => (
                <tr key={s.id}>
                  <td className="border p-2">{s.name}</td>
                  <td className="border p-2">
                    <input
                      type="number"
                      placeholder="MSE"
                      value={marks[i].mse_marks}
                      onChange={(e) =>
                        handleMarkChange(i, "mse_marks", e.target.value)
                      }
                      className="border p-1 w-20 text-center rounded"
                      required
                      min="0"
                      max="30"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      placeholder="ESE"
                      value={marks[i].ese_marks}
                      onChange={(e) =>
                        handleMarkChange(i, "ese_marks", e.target.value)
                      }
                      className="border p-1 w-20 text-center rounded"
                      required
                      min="0"
                      max="70"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full mt-4"
        >
          Submit Results
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default AddResults;
