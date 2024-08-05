import { db } from "../config/database.js";

class Team {
  constructor(name, coach, id = null) {
    this.name = name;
    this.coach = coach;
    this.id = id;
  }

  static async initialize() {
    try {
      const sql = `CREATE TABLE IF NOT EXISTS Teams (
        TeamID INT PRIMARY KEY AUTO_INCREMENT,
        TeamName VARCHAR(100),
        Coach VARCHAR(100)
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
          "UPDATE Teams SET TeamName = ?, Coach = ? WHERE TeamID = ?",
          [this.name, this.coach, this.id]
        );
      } else {
        const result = await db.query(
          "INSERT INTO Teams (TeamName, Coach) VALUES (?, ?)",
          [this.name, this.coach]
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
      const rows = await db.query("SELECT * FROM Teams WHERE TeamID = ?", [id]);
      if (rows.length === 0) return null;
      const team = rows[0];
      return new Team(team.TeamName, team.coach, team.TeamId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const sql = `
      DELETE FROM Teams WHERE TeamID = ?;
      `;
      await db.query(sql, [id]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async find() {
    try {
      const rows = await db.query(
        "SELECT TeamID AS id, TeamName AS name, Coach AS coach FROM Teams"
      );
      console.log(rows);
      return rows.map((row) => new Team(row.name, row.coach, row.id));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default Team;
