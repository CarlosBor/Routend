/*
Table: Photos
Columns:
idPhotos int AI PK 
url varchar(45) 
idAuthor int 
idTrip int */

import { DataTypes } from "sequelize";
import connection from "../config/sequelize.js";

const Photos = connection.define("Photos",{
    idPhotos: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: null
    },
    idAuthor: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    idTrip: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },    
})

export default Photos;