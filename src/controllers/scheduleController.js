import { Schedule } from "../models/schedule.js";

// Obtener todos los horarios
export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({ where: { enabled: true } });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: "Error fetching schedules" });
  }
};

// Obtener un horario por ID
export const getScheduleById = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await Schedule.findOne({ where: { id, enabled: true } });
    if (schedule) {
      res.json(schedule);
    } else {
      res.status(404).json({ error: "Schedule not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching schedule" });
  }
};

// Crear un nuevo horario
export const createSchedule = async (req, res) => {
  const { trainingId, startTime, endTime } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const newSchedule = await Schedule.create({
      trainingId,
      startTime,
      endTime,
    });
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ error: "Error creating schedule" });
  }
};

// Actualizar un horario por ID
export const updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { trainingId, startTime, endTime } = req.body; // Asegúrate de que los campos sean correctos
  try {
    const schedule = await Schedule.findByPk(id);
    if (schedule) {
      schedule.trainingId = trainingId;
      schedule.startTime = startTime;
      schedule.endTime = endTime;
      await schedule.save();
      res.json(schedule);
    } else {
      res.status(404).json({ error: "Schedule not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating schedule" });
  }
};

// Soft delete un horario por ID
export const deleteSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await Schedule.findByPk(id);
    if (schedule) {
      schedule.enabled = false; // Marcar como deshabilitado
      await schedule.save();
      res.json({ message: "Schedule soft deleted successfully" });
    } else {
      res.status(404).json({ error: "Schedule not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting schedule" });
  }
};
