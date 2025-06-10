import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// Creates a SQL connection using our DB URL
export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
    // Decimal (10,2) - means a "fixed" point number with 10 digits total
    // and 2 after the decimal point, so max number stored can be eight 9's before the point and 2 9's after
    console.log("Database initialised successfully!");
  } catch (error) {
    console.log("Error initialising database ", error);
    process.exit(1); // status code 1 - failure and 0 - success
  }
}
