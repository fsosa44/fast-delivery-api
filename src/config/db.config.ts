import { Sequelize } from "sequelize";
const db = new Sequelize(process.env.DB_CONNECTION as string);
export default db;
