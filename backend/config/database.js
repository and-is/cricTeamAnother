import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export class Database {
  constructor({ host, user, password, database }) {
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;
  }

  async connect() {
    try {
      this.connection = mysql.createPool({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      console.log("Successfully connected to the database.");
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error;
    }
  }

  async query(sql, params) {
    try {
      if (!this.connection) {
        throw new Error("Database connection not established.");
      }
      const [results] = await this.connection.execute(sql, params);
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async close() {
    await this.connection.end();
  }
}

const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

export const db = new Database(dbConfig);
