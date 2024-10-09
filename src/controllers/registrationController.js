import { Registration } from "../models/registration.js";

// Obtener todas las inscripciones
export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.findAll({
      where: { enabled: true },
    });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching registrations" });
  }
};

// Obtener una inscripción por ID
export const getRegistrationById = async (req, res) => {
  const { id } = req.params;
  try {
    const registration = await Registration.findOne({
      where: { id, enabled: true },
    });
    if (registration) {
      res.json(registration);
    } else {
      res.status(404).json({ error: "Registration not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching registration" });
  }
};

// Crear una nueva inscripción
export const createRegistration = async (req, res) => {
  const { userId, trainingId } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const newRegistration = await Registration.create({ userId, trainingId });
    res.status(201).json(newRegistration);
  } catch (error) {
    res.status(500).json({ error: "Error creating registration" });
  }
};

// Actualizar una inscripción por ID
export const updateRegistration = async (req, res) => {
  const { id } = req.params;
  const { userId, trainingId } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const registration = await Registration.findByPk(id);
    if (registration) {
      registration.userId = userId;
      registration.trainingId = trainingId;
      await registration.save();
      res.json(registration);
    } else {
      res.status(404).json({ error: "Registration not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating registration" });
  }
};

// Soft delete una inscripción por ID
export const deleteRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    const registration = await Registration.findByPk(id);
    if (registration) {
      registration.enabled = false; // Marcar como deshabilitado
      await registration.save();
      res.json({ message: "Registration soft deleted successfully" });
    } else {
      res.status(404).json({ error: "Registration not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting registration" });
  }
};
