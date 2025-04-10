/*Table: Member_has_Trip
Columns:
Member_idMember int PK 
Trip_idTrip int PK 
hasVehicle tinyint 
freeSeats int UN */



import { DataTypes } from "sequelize";        
import connection from "../config/sequelize.js";

const Member_has_Trip = connection.define("member_has_trip",{
    Member_idMember: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    Trip_idTrip: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    hasVehicle: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    freeSeats: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0
    }
})