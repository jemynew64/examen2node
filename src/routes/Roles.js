import { Router } from "express";
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  renderCreateRoleForm,
  renderEditRoleForm,
} from "../controllers/roleController.js";

const router = Router();

// Rutas
router.get("/", getAllRoles); // Obtener todos los roles
router.get("/add", renderCreateRoleForm); // Vista para agregar un rol
router.get("/edit/:id", renderEditRoleForm); // Vista para editar un rol
router.get("/:id", getRoleById); // Obtener un rol por ID
router.post("/", createRole); // Crear un nuevo rol
// router.put("/edit/:id", updateRole); // Actualizar un rol por ID
router.post("/edit/:id", updateRole); // Actualizar un rol por ID
router.post("/delete/:id", deleteRole); // Soft delete un rol por ID

export default router;
