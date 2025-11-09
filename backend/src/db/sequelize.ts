import { Sequelize } from "sequelize-typescript";
import config from 'config'
import Vacation from "../models/Vacation";
import User from "../models/User";
import Like from "../models/Likes";


const sequelize = new Sequelize({
    ...config.get('db'),
    dialect: 'mysql',
    models: [Vacation, User, Like],
    logging: console.log
})

export default sequelize