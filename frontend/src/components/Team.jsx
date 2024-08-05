import { useState, useEffect } from "react";
import { fetchTeams, createTeam, deleteTeam, updateTeam } from "../api/api";
import UpdatePopup from "./UpdateTeamPopup.jsx";

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({ name: "", coach: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState(null);

  useEffect(() => {
    const getTeams = async () => {
      const response = await fetchTeams();
      setTeams(response.data.teams);
    };
    getTeams();
  }, []);

  const handleCreateTeam = async () => {
    try {
      const response = await createTeam(newTeam);
      setTeams([...teams, response.data.team]);
      setNewTeam({ name: "", coach: "" });
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  const handleDeleteTeam = async (id) => {
    try {
      await deleteTeam(id);
      setTeams(teams.filter((team) => team.id !== id));
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  const handleEditTeam = (team) => {
    setIsUpdating(true);
    setTeamToEdit(team);
  };

  const handleUpdateTeam = async (updatedTeam) => {
    try {
      const response = await updateTeam(teamToEdit.id, updatedTeam);
      setTeams(
        teams.map((team) =>
          team.id === teamToEdit.id ? response.data.team : team
        )
      );
      setIsUpdating(false);
      setTeamToEdit(null);
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold m-2 text-center">Teams</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Team Name"
          className="border p-2 mr-2"
          value={newTeam.name}
          onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Coach"
          className="border p-2 mr-2"
          value={newTeam.coach}
          onChange={(e) => setNewTeam({ ...newTeam, coach: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white p-2"
          onClick={handleCreateTeam}
        >
          Add Team
        </button>
      </div>
      <ul>
        {teams.map((team) => (
          <li
            key={team.id}
            className="mb-2 border-2 border-blue-300 rounded-lg p-5 mt-5"
          >
            ID: {team.id} <br />
            {team.name} ({team.coach})
            <button
              className="bg-green-500 text-white p-2 ml-2 rounded-lg"
              onClick={() => handleEditTeam(team)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-2 ml-2 rounded-lg"
              onClick={() => handleDeleteTeam(team.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {isUpdating && (
        <UpdatePopup
          team={teamToEdit}
          onUpdateTeam={handleUpdateTeam}
          onCancel={() => setIsUpdating(false)}
        />
      )}
    </div>
  );
};

export default Team;
