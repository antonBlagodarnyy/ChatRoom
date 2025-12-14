CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender` varchar(25) DEFAULT NULL,
  `text` varchar(100) DEFAULT NULL,
  `ts` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)