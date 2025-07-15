'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// ============================
// ✅ Daftar semua model di sini
// ============================
db.Kota = require('./kota.model')(sequelize, Sequelize.DataTypes);
db.Kecamatan = require('./kecamatan.model')(sequelize, Sequelize.DataTypes);
db.Kategori = require('./kategori.model')(sequelize, Sequelize.DataTypes);
db.Subsektor = require('./subsektor.model')(sequelize, Sequelize.DataTypes);
db.User = require('./user.model')(sequelize, Sequelize.DataTypes);
db.Room = require('./room.model')(sequelize, Sequelize.DataTypes);
db.Booking = require('./booking.model')(sequelize, Sequelize.DataTypes);
db.Checkin = require('./checkin.model')(sequelize, Sequelize.DataTypes);
db.UploadedFile = require('./uploadedFile.model')(sequelize, Sequelize.DataTypes);
db.ActivityLog = require('./activityLog.model')(sequelize, Sequelize.DataTypes);
db.RefreshToken = require('./refreshToken.model')(sequelize, Sequelize.DataTypes);

// ============================
// ✅ Jalankan associate (relasi antar model)
// ============================
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Ekspor koneksi
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
