import { Location } from "../models/location.js";

// Obtener todas las ubicaciones
export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({ where: { enabled: true } });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching locations" });
  }
};

// Obtener una ubicación por ID
export const getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findOne({ where: { id, enabled: true } });
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ error: "Location not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching location" });
  }
};

// Crear una nueva ubicación
export const createLocation = async (req, res) => {
  const { name } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const newLocation = await Location.create({ name });
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ error: "Error creating location" });
  }
};

// Actualizar una ubicación por ID
export const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const location = await Location.findByPk(id);
    if (location) {
      location.name = name;
      await location.save();
      res.json(location);
    } else {
      res.status(404).json({ error: "Location not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating location" });
  }
};

// Soft delete una ubicación por ID
export const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findByPk(id);
    if (location) {
      location.enabled = false; // Marcar como deshabilitado
      await location.save();
      res.json({ message: "Location soft deleted successfully" });
    } else {
      res.status(404).json({ error: "Location not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting location" });
  }
};
