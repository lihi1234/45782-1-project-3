-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 17, 2025 at 12:22 PM
-- Server version: 9.4.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_king`
--
CREATE DATABASE IF NOT EXISTS `book_king` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `book_king`;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `vacation_id`) VALUES
(1, '5ef92a7a-f88d-4c11-9f18-9e1d4e833912', '2b8a7e21-4321-4c39-9a3c-1c9b47af3b7d'),
(2, '5ef92a7a-f88d-4c11-9f18-9e1d4e833912', '9e3f2a77-04db-4b93-bcf1-5a6a6ce1a621'),
(3, '5ef92a7a-f88d-4c11-9f18-9e1d4e833912', 'd71a3f59-1a3f-4a19-a3d5-6474a3dc9f9a'),
(4, '5ef92a7a-f88d-4c11-9f18-9e1d4e833912', 'f2a91413-8e63-4720-b278-1b76a03e0ad1'),
(5, '5ef92a7a-f88d-4c11-9f18-9e1d4e833912', '9f7b27cb-4f91-42ac-b6c0-1edb7c6e1c44'),
(6, '5ef92a7a-f88d-4c11-9f18-9e1d4e833912', 'fa2c987d-5b32-46e2-92b4-2f3c714b5272'),
(7, '9b6fd64e-96a3-4a7a-b8cb-d7f57b602a4e', '2b8a7e21-4321-4c39-9a3c-1c9b47af3b7d'),
(8, '9b6fd64e-96a3-4a7a-b8cb-d7f57b602a4e', '4c4b83b8-8b92-47c2-937b-fb901ccde41e'),
(9, '9b6fd64e-96a3-4a7a-b8cb-d7f57b602a4e', '3f8f8132-204c-4809-84d8-2e593bf42f92'),
(10, '9b6fd64e-96a3-4a7a-b8cb-d7f57b602a4e', '7d5f1b76-7e11-44ce-8a13-55746b9d5b99'),
(11, '9b6fd64e-96a3-4a7a-b8cb-d7f57b602a4e', 'df471ac1-2e6d-4579-a678-ecb212e5a6a4'),
(12, '9b6fd64e-96a3-4a7a-b8cb-d7f57b602a4e', 'ab71a6df-fb9d-4a0c-9b92-21845ecbce8a'),
(13, '9b6fd64e-96a3-4a7a-b8cb-d7f57b602a4e', 'd71a3f59-1a3f-4a19-a3d5-6474a3dc9f9a'),
(14, 'b39c9f74-5d12-4b17-9f85-6f23401d45a9', '5a9d5f33-61e7-4c8d-9b31-3d8f62bcd14a'),
(15, 'b39c9f74-5d12-4b17-9f85-6f23401d45a9', 'e3b91c48-6b12-4ec0-9f0d-6c4e70b1bfb1'),
(16, 'b39c9f74-5d12-4b17-9f85-6f23401d45a9', 'cbb81254-5e82-47ed-a239-c3dc38b785c2'),
(17, 'b39c9f74-5d12-4b17-9f85-6f23401d45a9', '314f1b52-79c8-4b4a-8d54-f3f3bc8b46b4'),
(18, 'b39c9f74-5d12-4b17-9f85-6f23401d45a9', 'ce942f0c-7a41-48a5-a6e7-2ab72f0af39a'),
(19, 'b39c9f74-5d12-4b17-9f85-6f23401d45a9', 'f0da1ed2-5c4e-4a8d-86c1-61dfc31d5b10'),
(20, 'b39c9f74-5d12-4b17-9f85-6f23401d45a9', 'e9c5b5df-2f46-41f4-b2d2-6761f1e3b1a7'),
(21, 'b39c9f74-5d12-4b17-9f85-6f23401d45a9', '9f7b27cb-4f91-42ac-b6c0-1edb7c6e1c44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`) VALUES
('5ef92a7a-f88d-4c11-9f18-9e1d4e833912', 'Bob', 'Smith', 'bob@example.com', 'd44eec1d8afe02c819cb1a737de263637e743005c95035c2193732ca58352319', 'user'),
('9b6fd64e-96a3-4a7a-b8cb-d7f57b602a4e', 'Carol', 'Davis', 'carol@example.com', 'd44eec1d8afe02c819cb1a737de263637e743005c95035c2193732ca58352319', 'user'),
('b39c9f74-5d12-4b17-9f85-6f23401d45a9', 'David', 'Miller', 'david@example.com', 'd44eec1d8afe02c819cb1a737de263637e743005c95035c2193732ca58352319', 'user'),
('b4a21ed7-6c1a-4a92-bf3e-d4ab1e9cb8e8', 'Emma', 'Wilson', 'emma@example.com', 'd44eec1d8afe02c819cb1a737de263637e743005c95035c2193732ca58352319', 'admin'),
('c5c4e5a4-8b2a-4f91-83f3-7d5c89e67951', 'Alice', 'Johnson', 'alice@example.com', 'd44eec1d8afe02c819cb1a737de263637e743005c95035c2193732ca58352319', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destination` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `started_at` datetime NOT NULL,
  `ended_at` datetime NOT NULL,
  `price` float NOT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `started_at`, `ended_at`, `price`, `image_url`) VALUES
('2b8a7e21-4321-4c39-9a3c-1c9b47af3b7d', 'Paris, France', 'Explore the city of love with museum tours, French cuisine, and a romantic Seine cruise.', '2025-03-01 00:00:00', '2025-03-10 00:00:00', 1899.99, 'https://example.com/images/paris.jpg'),
('314f1b52-79c8-4b4a-8d54-f3f3bc8b46b4', 'Cairo, Egypt', 'Tour the Great Pyramids, Sphinx, and cruise along the Nile River.', '2025-10-20 00:00:00', '2025-10-28 00:00:00', 1899.49, 'https://example.com/images/cairo.jpg'),
('3f8f8132-204c-4809-84d8-2e593bf42f92', 'Cape Town, South Africa', 'Adventure in Cape Town with Table Mountain hiking and wine-tasting tours.', '2025-09-01 00:00:00', '2025-09-10 00:00:00', 1799.5, 'https://example.com/images/capetown.jpg'),
('4c4b83b8-8b92-47c2-937b-fb901ccde41e', 'Tokyo, Japan', 'Discover Tokyo’s futuristic skyline, ancient temples, and authentic sushi experiences.', '2025-04-10 00:00:00', '2025-04-20 00:00:00', 2199, 'https://example.com/images/tokyo.jpg'),
('5a9d5f33-61e7-4c8d-9b31-3d8f62bcd14a', 'Rome, Italy', 'Historic journey through Rome’s ancient ruins, Colosseum, and Vatican City.', '2025-06-05 00:00:00', '2025-06-15 00:00:00', 1599.95, 'https://example.com/images/rome.jpg'),
('7d5f1b76-7e11-44ce-8a13-55746b9d5b99', 'Reykjavik, Iceland', 'Witness the Northern Lights and relax in geothermal lagoons.', '2025-11-10 00:00:00', '2025-11-17 00:00:00', 2599.75, 'https://example.com/images/iceland.jpg'),
('848b4a77-0474-49f3-b839-91d80d598ecf', 'Los Angeles, USA', 'Hollywood tours, beaches, and entertainment galore.', '2025-07-20 00:00:00', '2025-07-27 00:00:00', 1399, 'https://example.com/images/la.jpg'),
('9e3f2a77-04db-4b93-bcf1-5a6a6ce1a621', 'Bali, Indonesia', 'Relax on Bali’s beaches with daily yoga, snorkeling, and tropical sunsets.', '2025-05-15 00:00:00', '2025-05-25 00:00:00', 1399.49, 'https://example.com/images/bali.jpg'),
('9f7b27cb-4f91-42ac-b6c0-1edb7c6e1c44', 'Barcelona, Spain', 'Discover Gaudí’s architecture, tapas, and sunny beaches in this Mediterranean gem.', '2025-05-10 00:00:00', '2025-05-17 00:00:00', 1449, 'https://example.com/images/barcelona.jpg'),
('a28159a4-b3b5-482d-97f5-bd2b7f9c28e4', 'Rio de Janeiro, Brazil', 'Carnival vibes, beaches, and the Christ the Redeemer statue.', '2025-02-15 00:00:00', '2025-02-25 00:00:00', 1999.99, 'https://example.com/images/rio.jpg'),
('ab71a6df-fb9d-4a0c-9b92-21845ecbce8a', 'Bangkok, Thailand', 'Vibrant street markets, temples, and authentic Thai cuisine.', '2025-04-05 00:00:00', '2025-04-12 00:00:00', 1099, 'https://example.com/images/bangkok.jpg'),
('cbb81254-5e82-47ed-a239-c3dc38b785c2', 'Honolulu, Hawaii', 'Surf, snorkel, and relax on the beautiful beaches of Oahu.', '2025-08-01 00:00:00', '2025-08-10 00:00:00', 2599, 'https://example.com/images/hawaii.jpg'),
('ce942f0c-7a41-48a5-a6e7-2ab72f0af39a', 'Zurich, Switzerland', 'Alpine adventures, chocolate tasting, and scenic lake views.', '2025-12-05 00:00:00', '2025-12-12 00:00:00', 2399, 'https://example.com/images/zurich.jpg'),
('d71a3f59-1a3f-4a19-a3d5-6474a3dc9f9a', 'New York City, USA', 'Experience the city that never sleeps with Broadway shows, skyline views, and Central Park walks.', '2025-07-01 00:00:00', '2025-07-07 00:00:00', 999, 'https://example.com/images/nyc.jpg'),
('df471ac1-2e6d-4579-a678-ecb212e5a6a4', 'Santorini, Greece', 'Iconic white houses, sunset views, and Mediterranean dining.', '2025-05-22 00:00:00', '2025-05-29 00:00:00', 1649.89, 'https://example.com/images/santorini.jpg'),
('e3b91c48-6b12-4ec0-9f0d-6c4e70b1bfb1', 'Dubai, UAE', 'Luxury shopping, desert safaris, and the tallest building in the world.', '2025-10-05 00:00:00', '2025-10-12 00:00:00', 2299.99, 'https://example.com/images/dubai.jpg'),
('e9c5b5df-2f46-41f4-b2d2-6761f1e3b1a7', 'Vancouver, Canada', 'Nature, cityscapes, and mountain exploration in one trip.', '2025-06-20 00:00:00', '2025-06-28 00:00:00', 1849.95, 'https://example.com/images/vancouver.jpg'),
('f0da1ed2-5c4e-4a8d-86c1-61dfc31d5b10', 'Amsterdam, Netherlands', 'Canal cruises, art museums, and cycling through beautiful streets.', '2025-09-10 00:00:00', '2025-09-17 00:00:00', 1699, 'https://example.com/images/amsterdam.jpg'),
('f2a91413-8e63-4720-b278-1b76a03e0ad1', 'Sydney, Australia', 'Enjoy Sydney’s beaches, the Opera House, and a day trip to the Blue Mountains.', '2025-08-10 00:00:00', '2025-08-20 00:00:00', 2499, 'https://example.com/images/sydney.jpg'),
('fa2c987d-5b32-46e2-92b4-2f3c714b5272', 'London, United Kingdom', 'Classic sightseeing with Big Ben, the London Eye, and afternoon tea.', '2025-09-15 00:00:00', '2025-09-22 00:00:00', 1890, 'https://example.com/images/london.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email` (`email`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
