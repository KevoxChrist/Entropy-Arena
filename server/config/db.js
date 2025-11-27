import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Use Railway DATABASE_URL if available, otherwise fallback to AWS RDS or local config
const databaseUrl = process.env.DATABASE_URL;

const db = databaseUrl 
  ? mysql.createPool(databaseUrl)
  : mysql.createPool({
      // AWS RDS Configuration
      host: process.env.DB_HOST || 'entropy-arena-db.cgfkwaa6om1f.us-east-1.rds.amazonaws.com',
      user: process.env.DB_USER || 'ea_admin',
      password: process.env.DB_PASSWORD || 'capstone17', 
      database: process.env.DB_NAME || 'entropy_arena', 
      port: process.env.DB_PORT || 3306,
      connectionLimit: 10,
      ssl: {
        rejectUnauthorized: false // Required for AWS RDS
      }
    });

async function verifyDatabaseConnection() {
  try {
    const connection = await db.getConnection();
    console.log('Database connected successfully');
    connection.release();
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
}

export {
  db,
  verifyDatabaseConnection
};