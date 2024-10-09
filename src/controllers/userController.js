import { User } from "../models/user.js"; // Asegúrate de que la ruta sea correcta

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { enabled: true } }); // Solo usuarios habilitados
    res.render("user/list", { users }); // Renderizar la vista y pasar los usuarios
  } catch (error) {
    res.status(500).render("error", { error: "Error fetching users" });
  }
};

// Obtener un usuario por ID
// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params; // Obtener el ID del usuario de los parámetros de la URL
  try {
    const user = await User.findOne({ where: { id, enabled: true } }); // Buscar usuario habilitado por ID
    if (user) {
      // Renderizar la vista de edición y pasar los datos del usuario
      res.render("user/edit", { user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

export const createUser = async (req, res) => {
  console.log(req.body); // Verifica qué datos llegan aquí
  const {
    firstName,
    lastName,
    password,
    dni,
    emergency_number,
    phone,
    birthDate,
    gender,
    roleId,
    locationId,
  } = req.body;
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      password,
      dni,
      emergency_number,
      phone,
      birthDate,
      gender,
      roleId,
      locationId,
    });

    // Redireccionar a la lista de usuarios después de crear el usuario
    res.redirect("/api/users");
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

// Actualizar un usuario por ID
// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    password,
    dni,
    emergency_number,
    phone,
    birthDate,
    gender,
    roleId,
    locationId,
  } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.password = password;
      user.dni = dni;
      user.emergency_number = emergency_number;
      user.phone = phone;
      user.birthDate = birthDate;
      user.gender = gender;
      user.roleId = roleId;
      user.locationId = locationId;
      await user.save();
      res.redirect("/api/users"); // Redireccionar a la lista de usuarios después de actualizar
    } else {
      res.status(404).render("error", { error: "User not found" });
    }
  } catch (error) {
    res.status(500).render("error", { error: "Error updating user" });
  }
};

// Soft delete un usuario por ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.enabled = false; // Marcar como deshabilitado
      await user.save();
      res.redirect("/api/users"); // Redireccionar a la lista de usuarios después de eliminar
    } else {
      res.status(404).render("error", { error: "User not found" });
    }
  } catch (error) {
    res.status(500).render("error", { error: "Error deleting user" });
  }
};

export const renderCreateUserForm = (req, res) => {
  res.render("User/add");
};
