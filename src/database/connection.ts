import "dotenv";
import AppDataSource from "./dataSource";

export async function connection() {
  try {
    const conn = await AppDataSource.initialize();

    if (!conn) {
      throw new Error("Could not connect to the database");
    }

    return conn;
  } catch (error) {
    console.error("Error executing query:", error);
    return error;
  }
}
