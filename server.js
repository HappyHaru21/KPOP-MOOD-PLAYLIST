const path = "/kpop/server.js";
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const { authenticateSpotify } = require('./utils/spotify');
authenticateSpotify();

app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

const moodRoutes = require('./routes/moods');
app.use('/api/moods', moodRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));