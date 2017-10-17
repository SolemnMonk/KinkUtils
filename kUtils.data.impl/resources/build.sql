DROP TABLE IF EXISTS `relationships`;
CREATE TABLE IF NOT EXISTS `relationships` (`relationshipId` INTEGER PRIMARY KEY AUTOINCREMENT, `parentId` INTEGER NOT NULL, `childId` INTEGER NOT NULL, FOREIGN KEY(`childId`) REFERENCES `entityList`(`IdListId`), FOREIGN KEY(`parentId`) REFERENCES `entityList`(`IdListId`));

DROP TABLE IF EXISTS `plugins`;
CREATE TABLE IF NOT EXISTS `plugins` (`pluginId` INTEGER PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL, `version` TEXT NOT NULL, `description` TEXT, `pluginReferenceId` TEXT NOT NULL UNIQUE);

DROP TABLE IF EXISTS `metadataTypes`;
CREATE TABLE IF NOT EXISTS `metadataTypes` (`metadataTypeId` INTEGER PRIMARY KEY AUTOINCREMENT, `name` TEXT);

DROP TABLE IF EXISTS `genders`;
CREATE TABLE IF NOT EXISTS `genders` (`genderId` INTEGER PRIMARY KEY AUTOINCREMENT, `name` TEXT);
INSERT INTO `genders` (`genderId`,`name`) VALUES (1,'Male'), (2,'Female'), (3,'Male-to-Female'), (4,'Female-to-Male'), (5,'Unknown');

DROP TABLE IF EXISTS `entityList`;
CREATE TABLE IF NOT EXISTS `entityList` (`entryId` INTEGER PRIMARY KEY AUTOINCREMENT, `entityid` INTEGER NOT NULL, `classId` INTEGER NOT NULL, FOREIGN KEY(`classId`) REFERENCES `classes`(`classId`));

DROP TABLE IF EXISTS `config`;
CREATE TABLE IF NOT EXISTS `config` (`configId` INTEGER PRIMARY KEY AUTOINCREMENT, `key` TEXT NOT NULL, `value` TEXT, `pluginReferenceId` TEXT NOT NULL);

DROP TABLE IF EXISTS `classes`;
CREATE TABLE IF NOT EXISTS `classes` (`classId` INTEGER PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL UNIQUE);
INSERT INTO `classes` (`classId`,`name`) VALUES (1,'site'), (2,'search'), (3,'channel'), (4,'item'), (5,'bundle');

DROP TABLE IF EXISTS `actors`;
CREATE TABLE IF NOT EXISTS `actors` (`actorId` INTEGER PRIMARY KEY AUTOINCREMENT, `name` TEXT, `genderId` INTEGER, `parentActorId` INTEGER, FOREIGN KEY(`parentActorId`) REFERENCES `actors`(`actorId`), FOREIGN KEY(`genderId`) REFERENCES `genders`(`genderId`));

DROP TABLE IF EXISTS `actorLinks`;
CREATE TABLE IF NOT EXISTS `actorLinks` (`actorLinkId` INTEGER PRIMARY KEY AUTOINCREMENT, `actorId` INTEGER NOT NULL, `link` TEXT, FOREIGN KEY(`actorId`) REFERENCES `actors`(`actorId`));

DROP TABLE IF EXISTS `actorImages`;
CREATE TABLE IF NOT EXISTS `actorImages` (`actorLinkId` INTEGER PRIMARY KEY AUTOINCREMENT, `actorId` INTEGER NOT NULL, `path` TEXT, `base64` TEXT, `hash` TEXT, FOREIGN KEY(`actorId`) REFERENCES `actors`(`actorId`));

DROP TABLE IF EXISTS `actorAttributes`;
CREATE TABLE IF NOT EXISTS `actorAttributes` (`actorAttributeId` INTEGER PRIMARY KEY AUTOINCREMENT, `actorId` INTEGER NOT NULL, `name` TEXT, `value` TEXT, FOREIGN KEY(`actorId`) REFERENCES `actors`(`actorId`));

DROP INDEX IF EXISTS `idIndex`;
CREATE UNIQUE INDEX IF NOT EXISTS `idIndex` ON `entityList` (`entityid`, `classId`);
