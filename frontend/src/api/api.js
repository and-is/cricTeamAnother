import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Replace with your backend URL
});

export const fetchTeams = () => api.get("/api/team");
export const fetchPlayers = () => api.get("/api/player");
export const fetchMatches = () => api.get("/api/match");
export const fetchStats = () => api.get("/api/stats");

export const createTeam = (team) => api.post("/api/team", team);
export const createPlayer = (player) => api.post("/api/player", player);
export const createMatch = (match) => api.post("/api/match", match);
export const createStat = (stat) => api.post("api/stats", stat);

export const updateTeam = (id, team) => api.put(`/api/team/${id}`, team);
export const updatePlayer = (id, player) =>
  api.put(`/api/player/${id}`, player);
export const updateMatch = (id, match) => api.put(`/api/match/${id}`, match);
export const updateStat = (id, stat) => api.put(`/api/stats/${id}`, stat);

export const deleteTeam = (id) => api.delete(`/api/team/${id}`);
export const deletePlayer = (id) => api.delete(`/api/player/${id}`);
export const deleteMatch = (id) => api.delete(`/api/match/${id}`);
export const deleteStat = (id) => api.delete(`/api/stats/${id}`);

export const advancedStat = (id) => api.get(`/api/stats/advanced/${id}`);
