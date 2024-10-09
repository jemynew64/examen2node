import { Role } from "../models/role.js"; // Asegúrate de que la ruta sea correcta

// Obtener todos los roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({ where: { enabled: true } }); // Solo roles habilitados
    res.render("roles/list", { roles }); // Renderizar la vista y pasar los roles
  } catch (error) {
    res.status(500).render("error", { error: "Error fetching roles" });
  }
};

// Obtener un rol por ID
export const getRoleById = async (req, res) => {
  const { id } = req.params; // Obtener el ID del rol de los parámetros de la URL
  try {
    const role = await Role.findOne({ where: { id, enabled: true } }); // Buscar rol habilitado por ID
    if (role) {
      // Renderizar la vista de edición y pasar los datos del rol
      res.render("roles/edit", { role });
    } else {
      res.status(404).render("error", { error: "Role not found" });
    }
  } catch (error) {
    res.status(500).render("error", { error: "Error fetching role" });
  }
};

// Crear un nuevo rol
export const createRole = async (req, res) => {
  const { description } = req.body; // Obtener la descripción del rol
  try {
    await Role.create({ description });
    res.redirect("/api/roles"); // Redireccionar a la lista de roles después de crear el rol
  } catch (error) {
    res.status(500).render("error", { error: "Error creating role" });
  }
};

// Actualizar un rol por ID
export const updateRole = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const role = await Role.findByPk(id);
    if (role) {
      role.description = description;
      await role.save();
      res.redirect("/api/roles"); // Redireccionar a la lista de roles después de actualizar
    } else {
      res.status(404).render("error", { error: "Role not found" });
    }
  } catch (error) {
    res.status(500).render("error", { error: "Error updating role" });
  }
};

// Soft delete un rol por ID
export const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (role) {
      role.enabled = false; // Marcar como deshabilitado
      await role.save();
      res.redirect("/api/roles"); // Redireccionar a la lista de roles después de eliminar
    } else {
      res.status(404).render("error", { error: "Role not found" });
    }
  } catch (error) {
    res.status(500).render("error", { error: "Error deleting role" });
  }
};

// Renderizar formulario para crear un rol
export const renderCreateRoleForm = (req, res) => {
  res.render("roles/add"); // Renderiza la vista para agregar un rol
};

// Renderizar formulario para editar un rol
export const renderEditRoleForm = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findOne({ where: { id } }); // Buscar rol por ID
    if (role) {
      res.render("roles/edit", { role }); // Renderiza la vista de edición con los datos del rol
    } else {
      res.status(404).render("error", { error: "Role not found" });
    }
  } catch (error) {
    res.status(500).render("error", { error: "Error fetching role" });
  }
};
