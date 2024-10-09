import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const db = new Sequelize(process.env.DB_CONNECTION as string, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Si no necesitas verificar el certificado
    }
  }
});

export default db;
