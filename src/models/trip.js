/*Table: Trip
Columns:
idTrip int AI PK 
Time date 
idGuide int 
idRoute int 
weather enum('Cloudy','Sunny',
'Rainy','Windy',
'Snowy','Unknown')
*/

import { DataTypes } from "sequelize";
import connection from "../config/sequelize.js";

const Trip = connection.define("trip",{
    idTrip: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    idGuide: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    idRoute: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    }, 
    weather: {
        type: DataTypes.ENUM("Cloudy", "Sunny", "Rainy", "Windy", "Snowy", "Unknown"),
        allowNull: false,
    }
});

export default Trip;