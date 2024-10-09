import { Training } from "../models/training.js";

// Obtener todos los entrenamientos
export const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.findAll({ where: { enabled: true } });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching trainings" });
  }
};

// Obtener un entrenamiento por ID
export const getTrainingById = async (req, res) => {
  const { id } = req.params;
  try {
    const training = await Training.findOne({ where: { id, enabled: true } });
    if (training) {
      res.json(training);
    } else {
      res.status(404).json({ error: "Training not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching training" });
  }
};

// Crear un nuevo entrenamiento
export const createTraining = async (req, res) => {
  const { name, description } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const newTraining = await Training.create({ name, description });
    res.status(201).json(newTraining);
  } catch (error) {
    res.status(500).json({ error: "Error creating training" });
  }
};

// Actualizar un entrenamiento por ID
export const updateTraining = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const training = await Training.findByPk(id);
    if (training) {
      training.name = name;
      training.description = description;
      await training.save();
      res.json(training);
    } else {
      res.status(404).json({ error: "Training not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating training" });
  }
};

// Soft delete un entrenamiento por ID
export const deleteTraining = async (req, res) => {
  const { id } = req.params;
  try {
    const training = await Training.findByPk(id);
    if (training) {
      training.enabled = false; // Marcar como deshabilitado
      await training.save();
      res.json({ message: "Training soft deleted successfully" });
    } else {
      res.status(404).json({ error: "Training not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting training" });
  }
};
