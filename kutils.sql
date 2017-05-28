-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2017 at 05:51 AM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kutils`
--

-- --------------------------------------------------------

--
-- Table structure for table `actorattributes`
--

CREATE TABLE `actorattributes` (
  `actorAttributeId` bigint(20) NOT NULL,
  `actorId` bigint(20) NOT NULL,
  `key` text NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `actordata`
--

CREATE TABLE `actordata` (
  `actorId` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `genderId` bigint(20) NOT NULL,
  `priority` text,
  `externalLinks` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `actorimages`
--

CREATE TABLE `actorimages` (
  `actorImageId` bigint(20) NOT NULL,
  `actorId` bigint(20) NOT NULL,
  `imagePath` text NOT NULL,
  `imageHash` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `genders`
--

CREATE TABLE `genders` (
  `genderId` bigint(20) NOT NULL,
  `genderName` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `genders`
--

INSERT INTO `genders` (`genderId`, `genderName`) VALUES
(1, 'Unknown'),
(2, 'Male'),
(3, 'Female'),
(4, 'Transsexual'),
(5, 'Male-to-Female Transsexual'),
(6, 'Female-to-Male Transsexual');

-- --------------------------------------------------------

--
-- Table structure for table `globalconfig`
--

CREATE TABLE `globalconfig` (
  `configId` bigint(20) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `networkcredentials`
--

CREATE TABLE `networkcredentials` (
  `credentialId` bigint(20) NOT NULL,
  `networkId` bigint(20) DEFAULT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `networks`
--

CREATE TABLE `networks` (
  `networkId` bigint(20) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `plugins`
--

CREATE TABLE `plugins` (
  `pluginId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `relatedshoots`
--

CREATE TABLE `relatedshoots` (
  `relationshipId` bigint(20) NOT NULL,
  `shootId1` bigint(20) NOT NULL,
  `shootId2` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `shootdata`
--

CREATE TABLE `shootdata` (
  `shootId` bigint(20) NOT NULL,
  `siteId` bigint(20) NOT NULL,
  `shootTypeId` bigint(20) NOT NULL,
  `pluginId` int(11) NOT NULL,
  `pluginIdentifier` varchar(255) DEFAULT NULL,
  `title` text,
  `description` text,
  `date` text,
  `actorIds` text,
  `tags` text,
  `numRatings` bigint(20) DEFAULT NULL,
  `rating` bigint(20) DEFAULT NULL,
  `externalUrl` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `shootfiles`
--

CREATE TABLE `shootfiles` (
  `shootFileId` bigint(20) NOT NULL,
  `shootId` bigint(20) NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `shootimages`
--

CREATE TABLE `shootimages` (
  `imageId` bigint(20) NOT NULL,
  `shootImageTypeId` bigint(20) NOT NULL,
  `shootId` bigint(20) NOT NULL,
  `imagePath` text NOT NULL,
  `imageHash` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `shootimagetypes`
--

CREATE TABLE `shootimagetypes` (
  `imageTypeId` bigint(20) NOT NULL,
  `imageTypeName` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shootimagetypes`
--

INSERT INTO `shootimagetypes` (`imageTypeId`, `imageTypeName`) VALUES
(1, 'Cover'),
(2, 'Preview');

-- --------------------------------------------------------

--
-- Table structure for table `shoottypes`
--

CREATE TABLE `shoottypes` (
  `shootTypeId` bigint(20) NOT NULL,
  `shootTypeName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shoottypes`
--

INSERT INTO `shoottypes` (`shootTypeId`, `shootTypeName`) VALUES
(1, 'Unknown'),
(2, 'Video'),
(3, 'Images'),
(4, 'VideoAndImages');

-- --------------------------------------------------------

--
-- Table structure for table `sitecredentials`
--

CREATE TABLE `sitecredentials` (
  `credentialId` bigint(20) NOT NULL,
  `siteId` bigint(20) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sites`
--

CREATE TABLE `sites` (
  `siteId` bigint(20) NOT NULL,
  `networkId` bigint(20) DEFAULT NULL,
  `siteDisplayName` varchar(255) NOT NULL,
  `urlSafeSiteName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actorattributes`
--
ALTER TABLE `actorattributes`
  ADD PRIMARY KEY (`actorAttributeId`),
  ADD KEY `actorId` (`actorId`);

--
-- Indexes for table `actordata`
--
ALTER TABLE `actordata`
  ADD PRIMARY KEY (`actorId`),
  ADD KEY `gender` (`genderId`);

--
-- Indexes for table `actorimages`
--
ALTER TABLE `actorimages`
  ADD PRIMARY KEY (`actorImageId`),
  ADD KEY `actorId` (`actorId`);

--
-- Indexes for table `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`genderId`);

--
-- Indexes for table `globalconfig`
--
ALTER TABLE `globalconfig`
  ADD PRIMARY KEY (`configId`);

--
-- Indexes for table `networkcredentials`
--
ALTER TABLE `networkcredentials`
  ADD PRIMARY KEY (`credentialId`),
  ADD KEY `networkId` (`networkId`);

--
-- Indexes for table `networks`
--
ALTER TABLE `networks`
  ADD PRIMARY KEY (`networkId`);

--
-- Indexes for table `plugins`
--
ALTER TABLE `plugins`
  ADD PRIMARY KEY (`pluginId`);

--
-- Indexes for table `relatedshoots`
--
ALTER TABLE `relatedshoots`
  ADD PRIMARY KEY (`relationshipId`),
  ADD KEY `shootId1` (`shootId1`),
  ADD KEY `shootId2` (`shootId2`);

--
-- Indexes for table `shootdata`
--
ALTER TABLE `shootdata`
  ADD PRIMARY KEY (`shootId`),
  ADD KEY `siteId` (`siteId`),
  ADD KEY `shootTypeId` (`shootTypeId`),
  ADD KEY `pluginId` (`pluginId`);

--
-- Indexes for table `shootfiles`
--
ALTER TABLE `shootfiles`
  ADD PRIMARY KEY (`shootFileId`),
  ADD KEY `shootId` (`shootId`);

--
-- Indexes for table `shootimages`
--
ALTER TABLE `shootimages`
  ADD PRIMARY KEY (`imageId`),
  ADD KEY `shootId` (`shootId`),
  ADD KEY `shootImageType` (`shootImageTypeId`);

--
-- Indexes for table `shootimagetypes`
--
ALTER TABLE `shootimagetypes`
  ADD PRIMARY KEY (`imageTypeId`),
  ADD UNIQUE KEY `imageTypeName` (`imageTypeName`);

--
-- Indexes for table `shoottypes`
--
ALTER TABLE `shoottypes`
  ADD PRIMARY KEY (`shootTypeId`);

--
-- Indexes for table `sitecredentials`
--
ALTER TABLE `sitecredentials`
  ADD PRIMARY KEY (`credentialId`),
  ADD KEY `siteId` (`siteId`);

--
-- Indexes for table `sites`
--
ALTER TABLE `sites`
  ADD PRIMARY KEY (`siteId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actorattributes`
--
ALTER TABLE `actorattributes`
  MODIFY `actorAttributeId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1951;
--
-- AUTO_INCREMENT for table `actordata`
--
ALTER TABLE `actordata`
  MODIFY `actorId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=192;
--
-- AUTO_INCREMENT for table `actorimages`
--
ALTER TABLE `actorimages`
  MODIFY `actorImageId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=858;
--
-- AUTO_INCREMENT for table `genders`
--
ALTER TABLE `genders`
  MODIFY `genderId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `globalconfig`
--
ALTER TABLE `globalconfig`
  MODIFY `configId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `networkcredentials`
--
ALTER TABLE `networkcredentials`
  MODIFY `credentialId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `networks`
--
ALTER TABLE `networks`
  MODIFY `networkId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `plugins`
--
ALTER TABLE `plugins`
  MODIFY `pluginId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `relatedshoots`
--
ALTER TABLE `relatedshoots`
  MODIFY `relationshipId` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `shootdata`
--
ALTER TABLE `shootdata`
  MODIFY `shootId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;
--
-- AUTO_INCREMENT for table `shootfiles`
--
ALTER TABLE `shootfiles`
  MODIFY `shootFileId` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `shootimages`
--
ALTER TABLE `shootimages`
  MODIFY `imageId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2059;
--
-- AUTO_INCREMENT for table `shootimagetypes`
--
ALTER TABLE `shootimagetypes`
  MODIFY `imageTypeId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `shoottypes`
--
ALTER TABLE `shoottypes`
  MODIFY `shootTypeId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `sitecredentials`
--
ALTER TABLE `sitecredentials`
  MODIFY `credentialId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `sites`
--
ALTER TABLE `sites`
  MODIFY `siteId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `actorattributes`
--
ALTER TABLE `actorattributes`
  ADD CONSTRAINT `actorattributes_ibfk_1` FOREIGN KEY (`actorId`) REFERENCES `actordata` (`actorId`);

--
-- Constraints for table `networkcredentials`
--
ALTER TABLE `networkcredentials`
  ADD CONSTRAINT `networkcredentials_ibfk_1` FOREIGN KEY (`networkId`) REFERENCES `networks` (`networkId`);

--
-- Constraints for table `shootdata`
--
ALTER TABLE `shootdata`
  ADD CONSTRAINT `shootdata_ibfk_1` FOREIGN KEY (`pluginId`) REFERENCES `plugins` (`pluginId`);

--
-- Constraints for table `shootfiles`
--
ALTER TABLE `shootfiles`
  ADD CONSTRAINT `shootfiles_ibfk_1` FOREIGN KEY (`shootId`) REFERENCES `shootdata` (`shootId`);

--
-- Constraints for table `shootimages`
--
ALTER TABLE `shootimages`
  ADD CONSTRAINT `shootimages_ibfk_1` FOREIGN KEY (`shootImageTypeId`) REFERENCES `shootimagetypes` (`imageTypeId`);

--
-- Constraints for table `sitecredentials`
--
ALTER TABLE `sitecredentials`
  ADD CONSTRAINT `sitecredentials_ibfk_1` FOREIGN KEY (`siteId`) REFERENCES `sites` (`siteId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
