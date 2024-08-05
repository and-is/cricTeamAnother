import Player from "../models/Player.model.js";

export const insertPlayer = async function (req, res) {
  try {
    const { name, age, role, teamId } = req.body;

    const newPlayer = new Player(name, age, role, teamId);
    const savedPlayer = await newPlayer.save();
    if (!savedPlayer) {
      return res.status(500).json({
        error: "Error while inserting player",
      });
    }
    return res.status(201).json({
      player: newPlayer,
      message: "Insert successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const updatePlayer = async function (req, res) {
  try {
    const { id } = req.params;
    const { name, age, role, teamId } = req.body;
    const playerToUpdate = await Player.findById(id);
    if (!playerToUpdate) {
      return res.status(500).json({
        error: "Invalid id",
      });
    }
    console.log(playerToUpdate);
    playerToUpdate.name = name;
    playerToUpdate.age = age;
    playerToUpdate.role = role;
    playerToUpdate.teamId = teamId;
    playerToUpdate.id = id;
    const updatedPlayer = await playerToUpdate.save();
    return res.status(200).json({
      player: updatedPlayer,
      message: "Update successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const deletePlayer = async function (req, res) {
  try {
    const { id } = req.params;
    await Player.delete(id);
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

export const viewPlayer = async function (req, res) {
  try {
    const allPlayers = await Player.find();
    return res.status(200).json({
      players: allPlayers,
      message: "View Players Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
