import { db } from "../config/database.js";

class PlayerStatistics {
  constructor(playerId, matchId, runs, wickets, catches, id = null) {
    this.playerId = playerId;
    this.matchId = matchId;
    this.runs = runs;
    this.wickets = wickets;
    this.catches = catches;
    this.id = id;
  }

  static async initialize() {
    try {
      const sql = `CREATE TABLE IF NOT EXISTS PlayerStatistics (
        StatID INT PRIMARY KEY AUTO_INCREMENT,
        PlayerID INT,
        MatchID INT,
        Runs INT,
        Wickets INT,
        Catches INT,
        FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID),
        FOREIGN KEY (MatchID) REFERENCES Matches(MatchID)
      );`;
      await db.query(sql);
    } catch (error) {
      console.log(error);
    }
  }

  async save() {
    try {
      if (this.id) {
        await db.query(
          "UPDATE PlayerStatistics SET PlayerID = ?, MatchID = ?, Runs = ?, Wickets = ?, Catches = ? WHERE StatID = ?",
          [
            this.playerId,
            this.matchId,
            this.runs,
            this.wickets,
            this.catches,
            this.id,
          ]
        );
      } else {
        const result = await db.query(
          "INSERT INTO PlayerStatistics (PlayerID, MatchID, Runs, Wickets, Catches) VALUES (?, ?, ?, ?, ?)",
          [this.playerId, this.matchId, this.runs, this.wickets, this.catches]
        );
        this.id = result.insertId;
      }
      return this;
    } catch (error) {
      console.log(error);
    }
  }

  static async findByPlayerId(playerId) {
    try {
      const rows = await db.query(
        `SELECT ps.Runs AS runs, ps.Wickets AS wickets, ps.Catches AS catches,
                m.Date AS matchDate, m.Venue AS matchVenue
         FROM PlayerStatistics ps
         JOIN Matches m ON ps.MatchID = m.MatchID
         WHERE ps.PlayerID = ?`,
        [playerId]
      );
      if (rows.length === 0) return null;
      return rows.map((row) => ({
        runs: row.runs,
        wickets: row.wickets,
        catches: row.catches,
        matchDate: row.matchDate,
        matchVenue: row.matchVenue,
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const sql = `DELETE FROM PlayerStatistics WHERE StatID = ?;`;
      await db.query(sql, [id]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async find(playerId) {
    try {
      const rows = await db.query(
        `SELECT SUM(Runs) AS totalRuns, SUM(Wickets) AS totalWickets, SUM(Catches) AS totalCatches,
                COUNT(DISTINCT MatchID) AS matchCount
         FROM PlayerStatistics
         WHERE PlayerID = ?`,
        [playerId]
      );
      if (rows.length === 0) return null;
      const stats = rows[0];
      return {
        totalRuns: stats.totalRuns,
        totalWickets: stats.totalWickets,
        totalCatches: stats.totalCatches,
        matchCount: stats.matchCount,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const rows = await db.query(`
        SELECT 
        s.StatId as id,
          p.PlayerID AS pid, 
          m.MatchID as mid,
          p.Name AS name, 
          p.Age AS age, 
          p.Role AS role, 
          t.TeamName AS teamName,
          m.Venue AS matchVenue, 
          s.Runs AS runs, 
          s.Wickets AS wickets, 
          s.Catches AS catches
        FROM Players p
        JOIN Teams t ON p.TeamID = t.TeamID
        JOIN PlayerStatistics s ON p.PlayerID = s.PlayerID
        JOIN Matches m ON s.MatchID = m.MatchID;
      `);
      console.log(rows);
      return rows.map((row) => ({
        id: row.id,
        pid: row.pid,
        mid: row.mid,
        name: row.name,
        age: row.age,
        role: row.role,
        teamName: row.teamName,
        venue: row.venue,
        runs: row.runs,
        wickets: row.wickets,
        catches: row.catches,
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async findById(id) {
    try {
      const rows = await db.query(
        `SELECT ps.StatID AS id, ps.PlayerID AS playerId, ps.MatchID AS matchId, ps.Runs AS runs, ps.Wickets AS wickets, ps.Catches AS catches,
                p.Name AS playerName, m.Date AS matchDate, m.Venue AS matchVenue
         FROM PlayerStatistics ps
         JOIN Players p ON ps.PlayerID = p.PlayerID
         JOIN Matches m ON ps.MatchID = m.MatchID
         WHERE ps.StatID = ?`,
        [id]
      );
      if (rows.length === 0) return null;
      const stats = rows[0];
      return new PlayerStatistics(
        stats.id,
        stats.playerId,
        stats.matchId,
        stats.runs,
        stats.wickets,
        stats.catches,
        stats.playerName,
        stats.matchDate,
        stats.matchVenue
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default PlayerStatistics;
