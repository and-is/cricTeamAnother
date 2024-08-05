import { useState, useEffect } from "react";
import { fetchPlayers, createPlayer, deletePlayer } from "../api/api";
import UpdatePlayerPopup from "./UpdatePlayerPopup.jsx";

const Player = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    age: "",
    role: "",
    teamId: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [playerToUpdate, setPlayerToUpdate] = useState(null);

  useEffect(() => {
    const getPlayers = async () => {
      const response = await fetchPlayers();
      setPlayers(response.data.players);
    };
    getPlayers();
  }, []);

  const handleCreatePlayer = async () => {
    try {
      const response = await createPlayer(newPlayer);
      setPlayers([...players, response.data.player]);
      setNewPlayer({ name: "", age: "", role: "", teamId: "" });
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  const handleDeletePlayer = async (id) => {
    try {
      await deletePlayer(id);
      setPlayers(players.filter((player) => player.id !== id));
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const handleUpdatePlayerClick = (player) => {
    setPlayerToUpdate(player);
    setIsUpdating(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold m-2 text-center">Players</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Player Name"
          className="border p-2 mr-2 mb-2"
          value={newPlayer.name}
          onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Age"
          className="border p-2 mr-2"
          value={newPlayer.age}
          onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          className="border p-2 mr-2"
          value={newPlayer.role}
          onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
        />
        <input
          type="text"
          placeholder="Team ID"
          className="border p-2 mr-2"
          value={newPlayer.teamId}
          onChange={(e) =>
            setNewPlayer({ ...newPlayer, teamId: e.target.value })
          }
        />
        <button
          className="bg-blue-500 text-white p-2"
          onClick={handleCreatePlayer}
        >
          Add Player
        </button>
      </div>
      <ul>
        {players.map((player) => (
          <li
            key={player.id}
            className="mb-2 border-2 border-blue-300 rounded-lg p-5 mt-5"
          >
            ID: {player.id} <br />
            {player.name} ({player.role})
            <br />
            Team Name: {player.teamName}
            <button
              className="bg-green-500 text-white p-2 ml-2 rounded-lg"
              onClick={() => handleUpdatePlayerClick(player)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-2 ml-2 rounded-lg"
              onClick={() => handleDeletePlayer(player.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {isUpdating && (
        <UpdatePlayerPopup
          player={playerToUpdate}
          players={players}
          setPlayers={setPlayers}
          setIsUpdating={setIsUpdating}
        />
      )}
    </div>
  );
};

export default Player;
