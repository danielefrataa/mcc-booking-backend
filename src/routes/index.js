const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
