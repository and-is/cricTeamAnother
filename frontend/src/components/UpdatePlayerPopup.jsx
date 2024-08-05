import { useState } from "react";
import { updatePlayer } from "../api/api";

const UpdatePlayerPopup = ({ player, players, setPlayers, setIsUpdating }) => {
  const [updatedPlayer, setUpdatedPlayer] = useState(player);

  const handleUpdatePlayer = async () => {
    try {
      const response = await updatePlayer(player.id, updatedPlayer);
      setPlayers(
        players.map((p) => (p.id === player.id ? response.data.player : p))
      );
      setIsUpdating(false);
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  return (
    <div>
      <h2>Update Player</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Player Name"
          className="border p-2 mr-2"
          value={updatedPlayer.name}
          onChange={(e) =>
            setUpdatedPlayer({ ...updatedPlayer, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Age"
          className="border p-2 mr-2"
          value={updatedPlayer.age}
          onChange={(e) =>
            setUpdatedPlayer({ ...updatedPlayer, age: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Role"
          className="border p-2 mr-2"
          value={updatedPlayer.role}
          onChange={(e) =>
            setUpdatedPlayer({ ...updatedPlayer, role: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Team ID"
          className="border p-2 mr-2"
          value={updatedPlayer.teamId}
          onChange={(e) =>
            setUpdatedPlayer({ ...updatedPlayer, teamId: e.target.value })
          }
        />
        <button
          className="bg-blue-500 text-white p-2"
          onClick={handleUpdatePlayer}
        >
          Update Player
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

export default UpdatePlayerPopup;
