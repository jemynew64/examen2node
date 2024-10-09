import { Attendance } from "../models/attendance.js"; // Asegúrate de que la ruta sea correcta

// Obtener todas las asistencias
export const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.findAll({ where: { enabled: true } });
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ error: "Error fetching attendances" });
  }
};

// Obtener una asistencia por ID
export const getAttendanceById = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.findOne({
      where: { id, enabled: true },
    });
    if (attendance) {
      res.json(attendance);
    } else {
      res.status(404).json({ error: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching attendance" });
  }
};

// Crear una nueva asistencia
export const createAttendance = async (req, res) => {
  const { userId, trainingId } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const newAttendance = await Attendance.create({ userId, trainingId });
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(500).json({ error: "Error creating attendance" });
  }
};

// Actualizar una asistencia por ID
export const updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { userId, trainingId } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const attendance = await Attendance.findByPk(id);
    if (attendance) {
      attendance.userId = userId;
      attendance.trainingId = trainingId;
      await attendance.save();
      res.json(attendance);
    } else {
      res.status(404).json({ error: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating attendance" });
  }
};

// Soft delete una asistencia por ID
export const deleteAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.findByPk(id);
    if (attendance) {
      attendance.enabled = false; // Marcar como deshabilitado
      await attendance.save();
      res.json({ message: "Attendance soft deleted successfully" });
    } else {
      res.status(404).json({ error: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting attendance" });
  }
};
