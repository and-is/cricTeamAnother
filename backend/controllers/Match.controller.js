import Match from "../models/Match.model.js";

export const insertMatch = async function (req, res) {
  try {
    const { date, venue, team1Id, team2Id, winnerId } = req.body;

    const newMatch = new Match(date, venue, team1Id, team2Id, winnerId);
    const savedMatch = await newMatch.save();
    if (!savedMatch) {
      return res.status(500).json({
        error: "Error while inserting match",
      });
    }
    return res.status(201).json({
      match: newMatch,
      message: "Insert successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const updateMatch = async function (req, res) {
  try {
    const { id } = req.params;
    const { date, venue, team1Id, team2Id, winnerId } = req.body;
    const matchToUpdate = await Match.findById(id);
    if (!matchToUpdate) {
      return res.status(500).json({
        error: "Invalid id",
      });
    }
    matchToUpdate.date = date;
    matchToUpdate.venue = venue;
    matchToUpdate.team1Id = team1Id;
    matchToUpdate.team2Id = team2Id;
    matchToUpdate.winnerId = winnerId;
    matchToUpdate.id = id;
    const updatedMatch = await matchToUpdate.save();
    return res.status(200).json({
      match: updatedMatch,
      message: "Update successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const deleteMatch = async function (req, res) {
  try {
    const { id } = req.params;
    await Match.delete(id);
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

export const viewMatch = async function (req, res) {
  try {
    const allMatches = await Match.find();
    return res.status(200).json({
      matches: allMatches,
      message: "View Matches Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
