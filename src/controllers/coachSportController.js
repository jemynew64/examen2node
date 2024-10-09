import { CoachSport } from "../models/coachsport.js";

// Obtener todos los entrenadores
export const getAllCoaches = async (req, res) => {
  try {
    const coaches = await CoachSport.findAll({ where: { enabled: true } });
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ error: "Error fetching coaches" });
  }
};

// Obtener un entrenador por ID
export const getCoachById = async (req, res) => {
  const { id } = req.params;
  try {
    const coach = await CoachSport.findOne({ where: { id, enabled: true } });
    if (coach) {
      res.json(coach);
    } else {
      res.status(404).json({ error: "Coach not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching coach" });
  }
};

// Crear un nuevo entrenador
export const createCoach = async (req, res) => {
  const { userId, sportId } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const newCoach = await CoachSport.create({ userId, sportId });
    res.status(201).json(newCoach);
  } catch (error) {
    res.status(500).json({ error: "Error creating coach" });
  }
};

// Actualizar un entrenador por ID
export const updateCoach = async (req, res) => {
  const { id } = req.params;
  const { userId, sportId } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const coach = await CoachSport.findByPk(id);
    if (coach) {
      coach.userId = userId;
      coach.sportId = sportId;
      await coach.save();
      res.json(coach);
    } else {
      res.status(404).json({ error: "Coach not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating coach" });
  }
};

// Soft delete un entrenador por ID
export const deleteCoach = async (req, res) => {
  const { id } = req.params;
  try {
    const coach = await CoachSport.findByPk(id);
    if (coach) {
      coach.enabled = false; // Marcar como deshabilitado
      await coach.save();
      res.json({ message: "Coach soft deleted successfully" });
    } else {
      res.status(404).json({ error: "Coach not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting coach" });
  }
};
