import { useState } from "react";
import { updateMatch } from "../api/api";

const UpdateMatchPopup = ({ match, matches, setMatches, setIsUpdating }) => {
  const [updatedMatch, setUpdatedMatch] = useState(match);

  const handleUpdateMatch = async () => {
    try {
      const response = await updateMatch(match.id, updatedMatch);
      setMatches(
        matches.map((m) => (m.id === match.id ? response.data.match : m))
      );
      setIsUpdating(false);
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

  return (
    <div>
      <h2>Update Match</h2>
      <div className="mb-4">
        <input
          type="date"
          placeholder="Date"
          className="border p-2 mr-2"
          value={updatedMatch.date}
          onChange={(e) =>
            setUpdatedMatch({ ...updatedMatch, date: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Venue"
          className="border p-2 mr-2"
          value={updatedMatch.venue}
          onChange={(e) =>
            setUpdatedMatch({ ...updatedMatch, venue: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Team 1 ID"
          className="border p-2 mr-2"
          value={updatedMatch.team1Id}
          onChange={(e) =>
            setUpdatedMatch({ ...updatedMatch, team1Id: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Team 2 ID"
          className="border p-2 mr-2"
          value={updatedMatch.team2Id}
          onChange={(e) =>
            setUpdatedMatch({ ...updatedMatch, team2Id: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Winner ID"
          className="border p-2 mr-2"
          value={updatedMatch.winnerId}
          onChange={(e) =>
            setUpdatedMatch({ ...updatedMatch, winnerId: e.target.value })
          }
        />
        <button
          className="bg-blue-500 text-white p-2"
          onClick={handleUpdateMatch}
        >
          Update Match
        </button>
        <button
          className="bg-gray-500 text-white p-2 ml-2"
          onClick={() => setIsUpdating(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateMatchPopup;
