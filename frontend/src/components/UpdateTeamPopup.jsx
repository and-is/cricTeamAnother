import { useState } from "react";

const UpdatePopup = ({ team, onUpdateTeam, onCancel }) => {
  const [updatedTeam, setUpdatedTeam] = useState({
    name: team.name,
    coach: team.coach,
  });

  const handleUpdateTeam = () => {
    onUpdateTeam(updatedTeam);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Update Team</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Team Name"
            className="border p-2 mr-2"
            value={updatedTeam.name}
            onChange={(e) =>
              setUpdatedTeam({ ...updatedTeam, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Coach"
            className="border p-2 mr-2"
            value={updatedTeam.coach}
            onChange={(e) =>
              setUpdatedTeam({ ...updatedTeam, coach: e.target.value })
            }
          />
        </div>
        <button
          className="bg-blue-500 text-white p-2 mr-2"
          onClick={handleUpdateTeam}
        >
          Update Team
        </button>
        <button className="bg-gray-500 text-white p-2" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdatePopup;
