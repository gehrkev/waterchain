const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { setupFabricNetwork } = require('./fabric/network');
const { initializeDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

async function startServer() {
  try {
    // Initialize Fabric network connection
    await setupFabricNetwork();
    
    // Initialize database
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();