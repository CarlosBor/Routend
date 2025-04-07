-- MySQL Script generated by MySQL Workbench
-- Mon 07 Apr 2025 04:37:59 PM CEST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema routes
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `routes` ;

-- -----------------------------------------------------
-- Schema routes
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `routes` DEFAULT CHARACTER SET utf8 ;
USE `routes` ;

-- -----------------------------------------------------
-- Table `routes`.`Member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `routes`.`Member` ;

CREATE TABLE IF NOT EXISTS `routes`.`Member` (
  `idMember` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `isAdmin` TINYINT UNSIGNED NOT NULL,
  `firstAid` TINYINT NULL,
  PRIMARY KEY (`idMember`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `routes`.`Route`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `routes`.`Route` ;

CREATE TABLE IF NOT EXISTS `routes`.`Route` (
  `idRoute` INT NOT NULL AUTO_INCREMENT,
  `difficulty` ENUM("Easy", "Medium", "Hard") NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `meetingPoint` VARCHAR(45) NOT NULL,
  `distance` VARCHAR(45) NOT NULL,
  `elevationGain` VARCHAR(45) NOT NULL,
  `durationMins` INT UNSIGNED NOT NULL,
  `terrainType` ENUM("Rocky", "Sand", "Forest", "Trail", "Snow") NOT NULL,
  PRIMARY KEY (`idRoute`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `routes`.`Trip`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `routes`.`Trip` ;

CREATE TABLE IF NOT EXISTS `routes`.`Trip` (
  `idTrip` INT NOT NULL AUTO_INCREMENT,
  `Time` DATE NOT NULL,
  `idGuide` INT NOT NULL,
  `idRoute` INT NOT NULL,
  `weather` ENUM("Cloudy", "Sunny", "Rainy", "Windy", "Snowy", "Unknown") NOT NULL,
  PRIMARY KEY (`idTrip`),
  INDEX `fk_Trip_Route1_idx` (`idRoute` ASC) VISIBLE,
  CONSTRAINT `fk_Trip_Route1`
    FOREIGN KEY (`idRoute`)
    REFERENCES `routes`.`Route` (`idRoute`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `routes`.`Member_has_Trip`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `routes`.`Member_has_Trip` ;

CREATE TABLE IF NOT EXISTS `routes`.`Member_has_Trip` (
  `Member_idMember` INT NOT NULL,
  `Trip_idTrip` INT NOT NULL,
  `hasVehicle` TINYINT NOT NULL,
  `freeSeats` INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`Member_idMember`, `Trip_idTrip`),
  INDEX `fk_Member_has_Trip_Trip1_idx` (`Trip_idTrip` ASC) VISIBLE,
  INDEX `fk_Member_has_Trip_Member_idx` (`Member_idMember` ASC) VISIBLE,
  CONSTRAINT `fk_Member_has_Trip_Member`
    FOREIGN KEY (`Member_idMember`)
    REFERENCES `routes`.`Member` (`idMember`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Member_has_Trip_Trip1`
    FOREIGN KEY (`Trip_idTrip`)
    REFERENCES `routes`.`Trip` (`idTrip`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `routes`.`Photos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `routes`.`Photos` ;

CREATE TABLE IF NOT EXISTS `routes`.`Photos` (
  `idPhotos` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(45) NULL,
  `idAuthor` INT NOT NULL,
  `idTrip` INT NOT NULL,
  PRIMARY KEY (`idPhotos`),
  INDEX `fk_Photos_Member1_idx` (`idAuthor` ASC) VISIBLE,
  INDEX `fk_Photos_Trip1_idx` (`idTrip` ASC) VISIBLE,
  CONSTRAINT `fk_Photos_Member1`
    FOREIGN KEY (`idAuthor`)
    REFERENCES `routes`.`Member` (`idMember`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Photos_Trip1`
    FOREIGN KEY (`idTrip`)
    REFERENCES `routes`.`Trip` (`idTrip`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `routes`.`Reviews`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `routes`.`Reviews` ;

CREATE TABLE IF NOT EXISTS `routes`.`Reviews` (
  `idReview` INT NOT NULL AUTO_INCREMENT,
  `idAuthor` INT NOT NULL,
  `idTrip` INT NOT NULL,
  `review` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`idReview`),
  INDEX `fk_Photos_Member1_idx` (`idAuthor` ASC) VISIBLE,
  INDEX `fk_Photos_Trip1_idx` (`idTrip` ASC) VISIBLE,
  CONSTRAINT `fk_Photos_Member10`
    FOREIGN KEY (`idAuthor`)
    REFERENCES `routes`.`Member` (`idMember`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Photos_Trip10`
    FOREIGN KEY (`idTrip`)
    REFERENCES `routes`.`Trip` (`idTrip`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
