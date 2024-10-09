import { Sport } from "../models/sport.js"; // Asegúrate de que la ruta sea correcta

// Obtener todos los deportes
export const getAllSports = async (req, res) => {
  try {
    const sports = await Sport.findAll({ where: { enabled: true } });
    res.json(sports);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sports" });
  }
};

// Obtener un deporte por ID
export const getSportById = async (req, res) => {
  const { id } = req.params;
  try {
    const sport = await Sport.findOne({ where: { id, enabled: true } });
    if (sport) {
      res.json(sport);
    } else {
      res.status(404).json({ error: "Sport not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching sport" });
  }
};

// Crear un nuevo deporte
export const createSport = async (req, res) => {
  const { name } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const newSport = await Sport.create({ name });
    res.status(201).json(newSport);
  } catch (error) {
    res.status(500).json({ error: "Error creating sport" });
  }
};

// Actualizar un deporte por ID
export const updateSport = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const sport = await Sport.findByPk(id);
    if (sport) {
      sport.name = name;
      await sport.save();
      res.json(sport);
    } else {
      res.status(404).json({ error: "Sport not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating sport" });
  }
};

// Soft delete un deporte por ID
export const deleteSport = async (req, res) => {
  const { id } = req.params;
  try {
    const sport = await Sport.findByPk(id);
    if (sport) {
      sport.enabled = false; // Marcar como deshabilitado
      await sport.save();
      res.json({ message: "Sport soft deleted successfully" });
    } else {
      res.status(404).json({ error: "Sport not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting sport" });
  }
};
