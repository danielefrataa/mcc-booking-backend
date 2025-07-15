require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/database');

const PORT = process.env.PORT || 3000;

console.log('📡 Connecting to DB...');

connectDB().then(() => {
    console.log('✅ DB connected!');
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('❌ Failed to start server due to DB error:', error);
    process.exit(1);
});
