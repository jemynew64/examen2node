import { Date } from "../models/date.js"; // Asegúrate de que la ruta sea correcta

// Obtener todas las fechas
export const getAllDates = async (req, res) => {
  try {
    const dates = await Date.findAll({ where: { enabled: true } });
    res.json(dates);
  } catch (error) {
    res.status(500).json({ error: "Error fetching dates" });
  }
};

// Obtener una fecha por ID
export const getDateById = async (req, res) => {
  const { id } = req.params;
  try {
    const date = await Date.findOne({ where: { id, enabled: true } });
    if (date) {
      res.json(date);
    } else {
      res.status(404).json({ error: "Date not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching date" });
  }
};

// Crear una nueva fecha
export const createDate = async (req, res) => {
  const { date } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const newDate = await Date.create({ date });
    res.status(201).json(newDate);
  } catch (error) {
    res.status(500).json({ error: "Error creating date" });
  }
};

// Actualizar una fecha por ID
export const updateDate = async (req, res) => {
  const { id } = req.params;
  const { date } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const foundDate = await Date.findByPk(id);
    if (foundDate) {
      foundDate.date = date;
      await foundDate.save();
      res.json(foundDate);
    } else {
      res.status(404).json({ error: "Date not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating date" });
  }
};

// Soft delete una fecha por ID
export const deleteDate = async (req, res) => {
  const { id } = req.params;
  try {
    const foundDate = await Date.findByPk(id);
    if (foundDate) {
      foundDate.enabled = false; // Marcar como deshabilitado
      await foundDate.save();
      res.json({ message: "Date soft deleted successfully" });
    } else {
      res.status(404).json({ error: "Date not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting date" });
  }
};
