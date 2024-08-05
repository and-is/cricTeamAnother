import PlayerStatistics from "../models/PlayerStatistics.model.js";

export const insertPlayerStatistics = async function (req, res) {
  try {
    const { playerId, matchId, runs, wickets, catches } = req.body;

    const newPlayerStatistics = new PlayerStatistics(
      playerId,
      matchId,
      runs,
      wickets,
      catches
    );
    const savedPlayerStatistics = await newPlayerStatistics.save();
    if (!savedPlayerStatistics) {
      return res.status(500).json({
        error: "Error while inserting player statistics",
      });
    }
    return res.status(201).json({
      playerStatistics: newPlayerStatistics,
      message: "Insert successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const updatePlayerStatistics = async function (req, res) {
  try {
    const { id } = req.params;
    const { playerId, matchId, runs, wickets, catches } = req.body;
    const playerStatisticsToUpdate = await PlayerStatistics.findById(id);
    console.log(playerStatisticsToUpdate);
    if (!playerStatisticsToUpdate) {
      return res.status(500).json({
        error: "Invalid id",
      });
    }
    playerStatisticsToUpdate.id = id;
    playerStatisticsToUpdate.playerId = playerId;
    playerStatisticsToUpdate.matchId = matchId;
    playerStatisticsToUpdate.runs = runs;
    playerStatisticsToUpdate.wickets = wickets;
    playerStatisticsToUpdate.catches = catches;
    const updatedPlayerStatistics = await playerStatisticsToUpdate.save();
    return res.status(200).json({
      playerStatistics: updatedPlayerStatistics,
      message: "Update successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const deletePlayerStatistics = async function (req, res) {
  try {
    const { id } = req.params;
    await PlayerStatistics.delete(id);
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

export const viewPlayerStatistics = async function (req, res) {
  try {
    const allPlayerStatistics = await PlayerStatistics.findAll();
    return res.status(200).json({
      playerStatistics: allPlayerStatistics,
      message: "View Player Statistics Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const viewAdvancedStats = async function (req, res) {
  try {
    const { id } = req.params;
    const playerDetails = await PlayerStatistics.find(id);
    console.log(playerDetails);
    if (!playerDetails) {
      res.status(500).json({
        message: "Details unable to fetch",
      });
    }
    res.status(200).json({
      data: playerDetails,
      message: "Details Fetch successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while getting stats",
    });
  }
};
