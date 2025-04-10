-- -----------------------------------------------------
-- Dummy Data Inserts for `routes` Schema
-- -----------------------------------------------------

-- Insert Members
INSERT INTO `routes`.`Member` (`name`, `username`, `password`, `isAdmin`, `firstAid`)
VALUES
('Alice Walker', 'alicew', 'pass123', 0, 1),
('Bob Stone', 'bobstone', 'secure456', 1, 1),
('Charlie Moon', 'charliem', 'charliepass', 0, 0);

-- Insert Routes
INSERT INTO `routes`.`Route` (`difficulty`, `location`, `meetingPoint`, `distance`, `elevationGain`, `durationMins`, `terrainType`)
VALUES
('Easy', 'Sunny Hills', 'Main Gate', '5km', '150m', 90, 'Forest'),
('Hard', 'Rocky Peaks', 'East Parking', '12km', '900m', 240, 'Rocky');

-- Insert Trips
INSERT INTO `routes`.`Trip` (`Time`, `idGuide`, `idRoute`, `weather`)
VALUES
('2025-04-10', 2, 1, 'Sunny'),  -- Bob Stone guides Route 1
('2025-04-15', 1, 2, 'Cloudy'); -- Alice Walker guides Route 2

-- Insert Member_has_Trip
INSERT INTO `routes`.`Member_has_Trip` (`Member_idMember`, `Trip_idTrip`, `hasVehicle`, `freeSeats`)
VALUES
(1, 1, 1, 3), -- Alice on Trip 1 with vehicle
(3, 1, 0, 0), -- Charlie on Trip 1, no vehicle
(2, 2, 1, 2); -- Bob on Trip 2 with vehicle

-- Insert Photos
INSERT INTO `routes`.`Photos` (`url`, `idAuthor`, `idTrip`)
VALUES
('https://picsum.photos/200?image=1', 1, 1),
('https://picsum.photos/200?image=2', 3, 1),
('https://picsum.photos/200?image=3', 2, 2);

-- Insert Reviews
INSERT INTO `routes`.`Reviews` (`idAuthor`, `idTrip`, `review`)
VALUES
(1, 1, 'Great walk in the woods, perfect weather!'),
(3, 1, 'Could have used more shade, but still a nice hike.'),
(2, 2, 'Challenging route, but rewarding views!');

