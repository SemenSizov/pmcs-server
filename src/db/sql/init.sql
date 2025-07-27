CREATE DATABASE `pmcs` 

USE `pmcs`;

CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `locations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT 'Назва місця встановлення',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `changed_by` int unsigned DEFAULT NULL COMMENT 'ID користувача, який останнім змінив запис',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_locations_name` (`name`),
  CONSTRAINT `fk_locations_changed_by`
    FOREIGN KEY (`changed_by`) REFERENCES `users`(`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `equipment_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT 'Назва типу техніки (унікальна)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `changed_by` int unsigned DEFAULT NULL COMMENT 'ID користувача, який останнім змінив запис',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_equipment_types_name` (`name`),
  CONSTRAINT `fk_equipment_types_changed_by`
    FOREIGN KEY (`changed_by`) REFERENCES `users`(`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `procedures` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT 'Назва процедури',
  `type` varchar(50) NOT NULL COMMENT 'Тип періодичності: period або hours',
  `hours` smallint unsigned DEFAULT NULL COMMENT 'Інтервал у мотогодинах (якщо type = hours)',
  `period` varchar(50) DEFAULT NULL COMMENT 'Інтервал (якщо type = period): weekly, monthly тощо',
  `equipment_type_id` int unsigned NOT NULL COMMENT 'ID типу техніки',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `changed_by` int unsigned DEFAULT NULL COMMENT 'ID користувача, який змінив запис',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_procedures_name_type_eqtype` (`name`, `type`, `equipment_type_id`),
  KEY `fk_procedures_equipment_type` (`equipment_type_id`),
  KEY `fk_procedures_changed_by` (`changed_by`),
  CONSTRAINT `fk_procedures_equipment_type` FOREIGN KEY (`equipment_type_id`) REFERENCES `equipment_types` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_procedures_changed_by` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `equipment_units` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `serial` varchar(100) NOT NULL COMMENT 'Унікальний серійний номер обладнання',
  `equipment_type_id` int unsigned NOT NULL COMMENT 'Зовнішній ключ на тип обладнання',
  `location_id` int unsigned DEFAULT NULL COMMENT 'Місце встановлення (може бути NULL)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Час створення запису',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Час останнього оновлення',
  `changed_by` int unsigned DEFAULT NULL COMMENT 'ID користувача, який останнім змінив запис',

  PRIMARY KEY (`id`),
  UNIQUE KEY `unit_unique` (`serial`),
  KEY `unit_location_fk` (`location_id`),
  KEY `unit_unit_type_fk` (`equipment_type_id`),
  KEY `unit_changed_by_fk` (`changed_by`),

  CONSTRAINT `unit_location_fk` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `unit_unit_type_fk` FOREIGN KEY (`equipment_type_id`) REFERENCES `equipment_types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `unit_changed_by_fk` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `log_entries` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL COMMENT 'Дата виконання процедури',
  `hours` int unsigned DEFAULT NULL COMMENT 'Поточні мотогодини на момент обслуговування',
  `procedure_id` int unsigned NOT NULL COMMENT 'ID виконаної процедури',
  `unit_id` int unsigned NOT NULL COMMENT 'ID одиниці техніки',
  `user_id` int unsigned DEFAULT NULL COMMENT 'ID користувача, що зробив запис',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_log_entries_procedure` (`procedure_id`),
  KEY `fk_log_entries_unit` (`unit_id`),
  KEY `fk_log_entries_user` (`user_id`),
  CONSTRAINT `fk_log_entries_procedure` FOREIGN KEY (`procedure_id`) REFERENCES `procedures` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_log_entries_unit` FOREIGN KEY (`unit_id`) REFERENCES `equipment_units` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_log_entries_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `meters_readings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL COMMENT 'Дата зняття показників',
  `unit_id` int unsigned NOT NULL COMMENT 'ID одиниці техніки',
  `hours` int unsigned NOT NULL COMMENT 'Показник мотогодин',
  `user_id` int unsigned DEFAULT NULL COMMENT 'ID користувача, який вніс запис',
  `changed_by` int unsigned DEFAULT NULL COMMENT 'ID користувача, який останнім змінив запис',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_meters_readings_unit` (`unit_id`),
  KEY `fk_meters_readings_user` (`user_id`),
  KEY `fk_meters_readings_changed_by` (`changed_by`),
  CONSTRAINT `fk_meters_readings_unit` FOREIGN KEY (`unit_id`) REFERENCES `equipment_units` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_meters_readings_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_meters_readings_changed_by` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
