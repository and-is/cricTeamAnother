import { useState, useEffect } from "react";
import { fetchMatches, createMatch, deleteMatch } from "../api/api";
import UpdateMatchPopup from "./UpdateMatchPopup.jsx";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({
    date: "",
    venue: "",
    team1Id: "",
    team2Id: "",
    winnerId: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [matchToUpdate, setMatchToUpdate] = useState(null);

  useEffect(() => {
    const getMatches = async () => {
      const response = await fetchMatches();
      setMatches(response.data.matches);
    };
    getMatches();
  }, []);

  const handleCreateMatch = async () => {
    try {
      const response = await createMatch(newMatch);
      setMatches([...matches, response.data.match]);
      setNewMatch({
        date: "",
        venue: "",
        team1Id: "",
        team2Id: "",
        winnerId: "",
      });
    } catch (error) {
      console.error("Error creating match:", error);
    }
  };

  const handleDeleteMatch = async (id) => {
    try {
      await deleteMatch(id);
      setMatches(matches.filter((match) => match.id !== id));
    } catch (error) {
      console.error("Error deleting match:", error);
    }
  };

  const handleUpdateMatchClick = (match) => {
    setMatchToUpdate(match);
    setIsUpdating(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold m-2 text-center">Matches</h1>
      <div className="mb-4">
        <input
          type="date"
          placeholder="Date"
          className="border p-2 mr-2 mb-2"
          value={newMatch.date}
          onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Venue"
          className="border p-2 mr-2"
          value={newMatch.venue}
          onChange={(e) => setNewMatch({ ...newMatch, venue: e.target.value })}
        />
        <input
          type="text"
          placeholder="Team 1 ID"
          className="border p-2 mr-2"
          value={newMatch.team1Id}
          onChange={(e) =>
            setNewMatch({ ...newMatch, team1Id: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Team 2 ID"
          className="border p-2 mr-2"
          value={newMatch.team2Id}
          onChange={(e) =>
            setNewMatch({ ...newMatch, team2Id: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Winner ID"
          className="border p-2 mr-2"
          value={newMatch.winnerId}
          onChange={(e) =>
            setNewMatch({ ...newMatch, winnerId: e.target.value })
          }
        />
        <button
          className="bg-blue-500 text-white p-2"
          onClick={handleCreateMatch}
        >
          Add Match
        </button>
      </div>
      <ul>
        {matches.map((match) => (
          <li
            key={match.id}
            className="mb-2 border-2 border-blue-300 rounded-lg p-5 mt-5"
          >
            ID: {match.id} <br />
            {match.date.split("T")[0]} at {match.venue}
            <br />
            Teams: {match.team1Name} vs {match.team2Name} - Winner:{" "}
            {match.winnerName}
            <button
              className="bg-green-500 text-white p-2 ml-2 rounded-lg"
              onClick={() => handleUpdateMatchClick(match)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-2 ml-2 rounded-lg"
              onClick={() => handleDeleteMatch(match.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {isUpdating && (
        <UpdateMatchPopup
          match={matchToUpdate}
          matches={matches}
          setMatches={setMatches}
          setIsUpdating={setIsUpdating}
        />
      )}
    </div>
  );
};

export default Matches;
