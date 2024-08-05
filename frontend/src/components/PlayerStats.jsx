import { useState, useEffect } from "react";
import { fetchStats, createStat, deleteStat } from "../api/api";
import UpdatePopup from "./UpdatePlayerStatisticsPopup.jsx";

const PlayerStatistics = () => {
  const [playerStatistics, setPlayerStatistics] = useState([]);
  const [newPlayerStatistics, setNewPlayerStatistics] = useState({
    playerId: "",
    matchId: "",
    runs: "",
    wickets: "",
    catches: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatId, setCurrentStatId] = useState(null);

  useEffect(() => {
    const getPlayerStatistics = async () => {
      const response = await fetchStats();
      console.log(response.data.playerStatistics);
      setPlayerStatistics(response.data.playerStatistics);
    };
    getPlayerStatistics();
  }, []);

  const handleCreatePlayerStatistics = async () => {
    try {
      const response = await createStat(newPlayerStatistics);
      setPlayerStatistics([
        ...playerStatistics,
        response.data.playerStatistics,
      ]);
      setNewPlayerStatistics({
        playerId: "",
        matchId: "",
        runs: "",
        wickets: "",
        catches: "",
      });
    } catch (error) {
      console.error("Error creating player statistics:", error);
    }
  };

  const handleDeletePlayerStatistics = async (id) => {
    try {
      await deleteStat(id);
      setPlayerStatistics(playerStatistics.filter((stat) => stat.id !== id));
    } catch (error) {
      console.error("Error deleting player statistics:", error);
    }
  };

  const handleUpdateClick = (id) => {
    setIsUpdating(true);
    setCurrentStatId(id);
  };

  const handleClosePopup = () => {
    setIsUpdating(false);
    setCurrentStatId(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold m-2 text-center">Player Statistics</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Player ID"
          className="border p-2 mr-2 mb-2"
          value={newPlayerStatistics.playerId}
          onChange={(e) =>
            setNewPlayerStatistics({
              ...newPlayerStatistics,
              playerId: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Match ID"
          className="border p-2 mr-2"
          value={newPlayerStatistics.matchId}
          onChange={(e) =>
            setNewPlayerStatistics({
              ...newPlayerStatistics,
              matchId: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Runs"
          className="border p-2 mr-2"
          value={newPlayerStatistics.runs}
          onChange={(e) =>
            setNewPlayerStatistics({
              ...newPlayerStatistics,
              runs: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Wickets"
          className="border p-2 mr-2"
          value={newPlayerStatistics.wickets}
          onChange={(e) =>
            setNewPlayerStatistics({
              ...newPlayerStatistics,
              wickets: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Catches"
          className="border p-2 mr-2"
          value={newPlayerStatistics.catches}
          onChange={(e) =>
            setNewPlayerStatistics({
              ...newPlayerStatistics,
              catches: e.target.value,
            })
          }
        />
        <button
          className="bg-blue-500 text-white p-2"
          onClick={handleCreatePlayerStatistics}
        >
          Add Player Statistics
        </button>
      </div>
      <ul>
        {playerStatistics.map((stat) => (
          <li
            key={stat.id}
            className="mb-2 border-2 border-blue-300 rounded-lg p-5 mt-5"
          >
            ID: {stat.id} Player: {stat.pid} Match: {stat.mid} <br /> Player
            Name: {stat.name}, Team Name: {stat.teamName} <br /> Runs:{" "}
            {stat.runs}, Wickets: {stat.wickets}, Catches: {stat.catches} <br />{" "}
            <button
              className="bg-green-500 text-white p-2 ml-2 rounded-lg"
              onClick={() => handleUpdateClick(stat.id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-2 ml-2 rounded-lg"
              onClick={() => handleDeletePlayerStatistics(stat.id)}
            >
              Delete
            </button>
            {isUpdating && currentStatId === stat.id && (
              <UpdatePopup
                stat={stat}
                playerStatistics={playerStatistics}
                setPlayerStatistics={setPlayerStatistics}
                newPlayerStatistics={newPlayerStatistics}
                setNewPlayerStatistics={setNewPlayerStatistics}
                onClose={handleClosePopup}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerStatistics;
