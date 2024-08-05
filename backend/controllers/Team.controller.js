import Team from "../models/Team.model.js";

export const insertTeam = async function (req, res) {
  try {
    const { name, coach } = req.body;

    const newTeam = new Team(name, coach);
    const savedTeam = await newTeam.save();
    if (!savedTeam) {
      return res.status(500).json({
        error: "Error while inserting team",
      });
    }
    return res.status(201).json({
      team: newTeam,
      message: "Insert successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const updateTeam = async function (req, res) {
  try {
    const { id } = req.params;
    const { name, coach } = req.body;
    const teamToUpdate = await Team.findById(id);
    if (!teamToUpdate) {
      return res.status(500).json({
        error: "Invalid id",
      });
    }
    console.log(teamToUpdate);
    teamToUpdate.name = name;
    teamToUpdate.coach = coach;
    const updatedTeam = await teamToUpdate.save();
    return res.status(200).json({
      team: updatedTeam,
      message: "Update successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const deleteTeam = async function (req, res) {
  try {
    const { id } = req.params;
    await Team.delete(id);
    return res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const viewTeam = async function (req, res) {
  try {
    const allTeams = await Team.find();
    return res.status(200).json({
      teams: allTeams,
      message: "View Teams Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
