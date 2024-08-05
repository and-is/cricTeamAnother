import { db } from "../config/database.js";

class Match {
  constructor(date, venue, team1Id, team2Id, winnerId = null, id = null) {
    this.date = date;
    this.venue = venue;
    this.team1Id = team1Id;
    this.team2Id = team2Id;
    this.winnerId = winnerId;
    this.id = id;
  }

  static async initialize() {
    try {
      const sql = `CREATE TABLE IF NOT EXISTS Matches (
        MatchID INT PRIMARY KEY AUTO_INCREMENT,
        Date DATE,
        Venue VARCHAR(100),
        Team1ID INT,
        Team2ID INT,
        WinnerID INT NULL,
        FOREIGN KEY (Team1ID) REFERENCES Teams(TeamID),
        FOREIGN KEY (Team2ID) REFERENCES Teams(TeamID),
        FOREIGN KEY (WinnerID) REFERENCES Teams(TeamID)
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
          "UPDATE Matches SET Date = ?, Venue = ?, Team1ID = ?, Team2ID = ?, WinnerID = ? WHERE MatchID = ?",
          [
            this.date,
            this.venue,
            this.team1Id,
            this.team2Id,
            this.winnerId,
            this.id,
          ]
        );
      } else {
        const result = await db.query(
          "INSERT INTO Matches (Date, Venue, Team1ID, Team2ID, WinnerID) VALUES (?, ?, ?, ?, ?)",
          [this.date, this.venue, this.team1Id, this.team2Id, this.winnerId]
        );
        this.id = result.insertId;
      }
      return this;
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(id) {
    try {
      const rows = await db.query(
        `SELECT m.Date AS date, m.Venue AS venue, 
                t1.TeamName AS team1Name, t2.TeamName AS team2Name, 
                w.TeamName AS winnerName
         FROM Matches m
         JOIN Teams t1 ON m.Team1ID = t1.TeamID
         JOIN Teams t2 ON m.Team2ID = t2.TeamID
         LEFT JOIN Teams w ON m.WinnerID = w.TeamID
         WHERE m.MatchID = ?`,
        [id]
      );
      if (rows.length === 0) return null;
      const match = rows[0];
      return new Match(
        match.date,
        match.venue,
        match.team1Name,
        match.team2Name,
        match.winnerName
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const sql = `
      DELETE FROM Matches WHERE MatchID = ?;
      `;
      await db.query(sql, [id]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async find() {
    try {
      const rows = await db.query(`
        SELECT m.MatchID AS id, m.Date AS date, m.Venue AS venue,
               t1.TeamName AS team1Name, t2.TeamName AS team2Name, 
               w.TeamName AS winnerName
        FROM Matches m
        JOIN Teams t1 ON m.Team1ID = t1.TeamID
        JOIN Teams t2 ON m.Team2ID = t2.TeamID
        LEFT JOIN Teams w ON m.WinnerID = w.TeamID
      `);
      return rows.map((row) => ({
        id: row.id,
        date: row.date,
        venue: row.venue,
        team1Name: row.team1Name,
        team2Name: row.team2Name,
        winnerName: row.winnerName,
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default Match;
