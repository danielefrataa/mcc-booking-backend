const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport'); 


require('dotenv').config();
require('./config/passport'); // ✅ load strategi Google (penting!)

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize()); // ✅ inisialisasi passport

// Routes
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

const kotaRoutes = require('./routes/kota.routes');
app.use('/api/kotas', kotaRoutes);


const kecamatanRoutes = require('./routes/kecamatan.routes');
const subsektorRoutes = require('./routes/subsektor.routes');

app.use('/api/kecamatans', kecamatanRoutes);
app.use('/api/subsektors', subsektorRoutes);

const roomRoutes = require('./routes/rooms.routes');
app.use('/api/rooms', roomRoutes);

const bookingRoutes = require('./routes/bookings.routes');

app.use('/api/bookings', bookingRoutes);



module.exports = app;
