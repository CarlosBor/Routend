/*
Table: Member
Columns:
idMember int AI PK 
name varchar(45) 
username varchar(45) 
password varchar(45) 
isAdmin tinyint UN 
firstAid tinyint UN

FK:-
*/

import { DataTypes } from "sequelize";
import connection from "../config/sequelize.js";
//import Sale from "./sale.js";

const Member = connection.define("member",{
    idMember: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING(45),
    },
    isAdmin: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
    },
    firstAid: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    }
    
})

// Product.belongsToMany(Sale,{through:"sale_has_product",foreignKey:"product_id"});
// Sale.belongsToMany(Product,{through:"sale_has_product",foreignKey:"sale_id"});
export default Member;