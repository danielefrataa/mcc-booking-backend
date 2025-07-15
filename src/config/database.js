  // src/config/database.js
  const { Sequelize } = require('sequelize');
  require('dotenv').config();

  // Cek apakah pakai DATABASE_URL atau variabel terpisah
  const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false // Penting untuk Supabase
          }
        }
      })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          dialect: 'postgres'
        }
      );

  // Fungsi untuk menguji koneksi DB (dipanggil di server.js)
  const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connected successfully.');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  };

  module.exports = {
    sequelize,
    connectDB
  };
