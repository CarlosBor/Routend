/*
Table: Route
Columns:
idRoute int AI PK 
difficulty enum('Easy','Medium','Hard') 
location varchar(45) 
meetingPoint varchar(45) 
distance varchar(45) 
elevationGain varchar(45) 
durationMins int UN 
terrainType enum('Rocky','Sand','Forest','Trail','Snow')
*/

import { DataTypes } from "sequelize";
import connection from "../config/sequelize.js";
import Trip from "./trip.js";

const   difficulties=["Easy", "Medium", "Hard"], 
        terrains= ["Rocky", "Sand", "Forest", "Trail", "Snow"];

const Route = connection.define("Route", {
    idRoute: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    difficulty: {
        type: DataTypes.ENUM(difficulties),
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    distance: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    elevationGain: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    durationMins: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    terrainType: {
        type: DataTypes.ENUM(terrains),
        allowNull: false,
    }
});

// Una ruta se puede realizar muchas veces, un viaje solo tiene una ruta
// Si se borra una ruta, no se borran los viajes que se hicieron con ella
// solo se pone a NULL el idRoute correspondiente a esa ruta en Trips
Route.hasMany(Trip, { foreignKey: "idRoute", onDelete: "SET NULL" });
Trip.belongsTo(Route, { foreignKey: "idRoute" });

export default Route;
export { difficulties, terrains };
