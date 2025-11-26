import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddResults from "./pages/AddResults";
import ViewResults from "./pages/ViewResults";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white p-4 flex justify-between">
          <h1 className="text-lg font-bold">VIT Results Portal</h1>
          <div className="space-x-4">
            <Link to="/add" className="hover:underline">
              Add Results
            </Link>
            <Link to="/view" className="hover:underline">
              View Results
            </Link>
          </div>
        </nav>

        {/* Routes */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<AddResults />} />
            <Route path="/add" element={<AddResults />} />
            <Route path="/view" element={<ViewResults />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
