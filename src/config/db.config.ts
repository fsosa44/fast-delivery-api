import { Sequelize } from "sequelize";
const db = new Sequelize(process.env.DB_CONNECTION as string, {
  dialect: "postgres",
});
export default db;
