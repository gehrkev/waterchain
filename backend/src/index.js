// backend/src/index.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { setupFabricNetwork } = require('./fabric/network');
const { initializeDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 4000;  // Usar a porta que definimos no entrypoint

app.use(cors());
app.use(express.json());
app.use('/api', routes);

async function startServer() {
  try {
    await setupFabricNetwork();
    await initializeDatabase();

    app.listen(PORT, '0.0.0.0', () => {  // Adicionado '0.0.0.0' para ouvir em todas as interfaces
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();