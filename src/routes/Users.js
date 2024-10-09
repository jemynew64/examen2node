import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  renderCreateUserForm,
} from "../controllers/userController.js";

const router = express.Router();

// Ruta para mostrar el formulario de creación
router.get("/add", renderCreateUserForm);

// Ruta para crear un nuevo usuario
router.post("/add", createUser);

// Ruta para obtener un usuario por ID y mostrar el formulario de edición
router.get("/edit/:id", getUserById);

// Ruta para actualizar un usuario
router.post("/edit/:id", updateUser);

// Ruta para eliminar (soft delete) un usuario
router.post("/delete/:id", deleteUser);

// Ruta para obtener todos los usuarios
router.get("/", getAllUsers);

export default router;
