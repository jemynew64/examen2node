import { Field } from "../models/field.js";

// Obtener todos los campos
export const getAllFields = async (req, res) => {
  try {
    const fields = await Field.findAll({ where: { enabled: true } });
    res.json(fields);
  } catch (error) {
    res.status(500).json({ error: "Error fetching fields" });
  }
};

// Obtener un campo por ID
export const getFieldById = async (req, res) => {
  const { id } = req.params;
  try {
    const field = await Field.findOne({ where: { id, enabled: true } });
    if (field) {
      res.json(field);
    } else {
      res.status(404).json({ error: "Field not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching field" });
  }
};

// Crear un nuevo campo
export const createField = async (req, res) => {
  const { name, location } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const newField = await Field.create({ name, location });
    res.status(201).json(newField);
  } catch (error) {
    res.status(500).json({ error: "Error creating field" });
  }
};

// Actualizar un campo por ID
export const updateField = async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const field = await Field.findByPk(id);
    if (field) {
      field.name = name;
      field.location = location;
      await field.save();
      res.json(field);
    } else {
      res.status(404).json({ error: "Field not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating field" });
  }
};

// Soft delete un campo por ID
export const deleteField = async (req, res) => {
  const { id } = req.params;
  try {
    const field = await Field.findByPk(id);
    if (field) {
      field.enabled = false; // Marcar como deshabilitado
      await field.save();
      res.json({ message: "Field soft deleted successfully" });
    } else {
      res.status(404).json({ error: "Field not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting field" });
  }
};
