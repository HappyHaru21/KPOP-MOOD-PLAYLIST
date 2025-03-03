const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');
const { getPlaylistByMood } = require('../utils/spotify');

// Route to add a new mood
router.post('/', async (req, res) => {
  try {
    const { mood, note } = req.body;
    const newMood = new Mood({ mood, note });
    const savedMood = await newMood.save();
    res.json(savedMood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save mood' });
  }
});

// Route to get all moods
router.get('/', async (req, res) => {
  try {
    const moods = await Mood.find().sort({ date: -1 }); // Fetch moods sorted by date
    res.json(moods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch moods' });
  }
});

// Route to get a Spotify playlist based on mood
router.get('/playlist/:mood', async (req, res) => {
  try {
    const mood = req.params.mood;
    const playlist = await getPlaylistByMood(mood);

    if (!playlist) {
      return res.status(404).json({ error: 'No relevant playlist found for this mood.' });
    }

    res.json(playlist);
  } catch (err) {
    console.error('Error fetching playlist:', err);
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
});

module.exports = router;
