import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Matches from "./pages/Matches";
import Stats from "./pages/PlayerStatistics";

const App = () => {
  return (
    <Router>
      <div className="p-4">
        <nav className="pb-4 text-center font-bold">
          <Link to="/" className="mr-10">
            Home
          </Link>
          <Link to="/teams" className="mr-10">
            Teams
          </Link>
          <Link to="/players" className="mr-10">
            Players
          </Link>
          <Link to="/matches" className="mr-10">
            Matches
          </Link>
          <Link to="/stats">Statistics</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/players" element={<Players />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
