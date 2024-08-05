import { updateStat } from "../api/api";

const UpdatePlayerStatisticsPopup = ({
  stat,
  playerStatistics,
  setPlayerStatistics,
  newPlayerStatistics,
  setNewPlayerStatistics,
  onClose,
}) => {
  const handleUpdatePlayerStatistics = async (id, updatedStat) => {
    try {
      await updateStat(id, updatedStat);
      setPlayerStatistics(
        playerStatistics.map((s) =>
          s.id === id ? { ...s, ...updatedStat } : s
        )
      );
      onClose();
    } catch (error) {
      console.error("Error updating player statistics:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Update Player Statistics</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Player ID"
            className="border p-2 mr-2"
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
            onClick={() =>
              handleUpdatePlayerStatistics(stat.id, {
                playerId: newPlayerStatistics.playerId,
                matchId: newPlayerStatistics.matchId,
                runs: newPlayerStatistics.runs,
                wickets: newPlayerStatistics.wickets,
                catches: newPlayerStatistics.catches,
              })
            }
          >
            Update Player Statistics
          </button>
          <button className="bg-gray-500 text-white p-2 ml-2" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePlayerStatisticsPopup;
