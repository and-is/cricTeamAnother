import { db } from "../config/database.js";

class Player {
  constructor(name, age, role, teamId, id = null) {
    this.name = name;
    this.age = age;
    this.role = role;
    this.teamId = teamId;
    this.id = id;
  }

  static async initialize() {
    try {
      const sql = `CREATE TABLE IF NOT EXISTS Players (
        PlayerID INT PRIMARY KEY AUTO_INCREMENT,
        Name VARCHAR(100),
        Age INT,
        Role VARCHAR(50),
        TeamID INT,
        FOREIGN KEY (TeamID) REFERENCES Teams(TeamID)
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
          "UPDATE Players SET Name = ?, Age = ?, Role = ?, TeamID = ? WHERE PlayerID = ?",
          [this.name, this.age, this.role, this.teamId, this.id]
        );
      } else {
        const result = await db.query(
          "INSERT INTO Players (Name, Age, Role, TeamID) VALUES (?, ?, ?, ?)",
          [this.name, this.age, this.role, this.teamId]
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
        `SELECT p.Name AS name, p.Age AS age, p.Role AS role, t.TeamName AS teamName
         FROM Players p
         JOIN Teams t ON p.TeamID = t.TeamID
         WHERE p.PlayerID = ?`,
        [id]
      );
      if (rows.length === 0) return null;
      const player = rows[0];
      return new Player(player.name, player.age, player.role, player.teamName);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const sql = `
      DELETE FROM Players WHERE PlayerID = ?;
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
        SELECT p.PlayerID AS id, p.Name AS name, p.Age AS age, p.Role AS role, t.TeamName AS teamName
        FROM Players p
        JOIN Teams t ON p.TeamID = t.TeamID
      `);
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        age: row.age,
        role: row.role,
        teamName: row.teamName,
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default Player;
