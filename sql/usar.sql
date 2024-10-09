-- Eliminar la base de datos si existe
DROP DATABASE IF EXISTS dblluvians;

-- Crear la base de datos nuevamente
CREATE DATABASE dblluvians;

-- Usar la base de datos creada
USE dblluvians;

-- Crear Roles
CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Locations
CREATE TABLE `Locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `branch` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Fields
CREATE TABLE `Fields` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Sports
CREATE TABLE `Sports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Users
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `dni` int DEFAULT NULL,
  `emergency_number` varchar(255) DEFAULT NULL,
  `phone` int DEFAULT NULL,
  `birthDate` datetime DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  `locationId` int DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`),
  FOREIGN KEY (`locationId`) REFERENCES `Locations`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear CoachSports
CREATE TABLE `CoachSports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUser` int DEFAULT NULL,
  `idSport` int DEFAULT NULL,
  `coachType` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idUser`) REFERENCES `Users`(`id`),
  FOREIGN KEY (`idSport`) REFERENCES `Sports`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Schedules
CREATE TABLE `Schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `day` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Trainings
CREATE TABLE `Trainings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idCoachSport` int DEFAULT NULL,
  `idSchedule` int DEFAULT NULL,
  `idField` int DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idCoachSport`) REFERENCES `CoachSports`(`id`),
  FOREIGN KEY (`idSchedule`) REFERENCES `Schedules`(`id`),
  FOREIGN KEY (`idField`) REFERENCES `Fields`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Registrations
CREATE TABLE `Registrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idTraining` int DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idUser`) REFERENCES `Users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Attendances
CREATE TABLE `Attendances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idRegistration` int DEFAULT NULL,
  `classNumber` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `attendanceStatus` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idRegistration`) REFERENCES `Registrations`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Dates
CREATE TABLE `Dates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

