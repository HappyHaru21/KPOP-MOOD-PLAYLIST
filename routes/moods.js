const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');
const { getPlaylistByMood } = require('../utils/spotify');
const axios = require('axios'); // Make sure this is included
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


// Add this to your routes/moods.js file
// Route to get idol images from Last.fm
// Add this sleep function at the top of your file for rate limiting
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

router.get('/idols/images/:group', async (req, res) => {
  try {
    const idolGroup = req.params.group;
    
    // Collection to hold all images
    let allImages = [];

    // 1. Try MusicBrainz for artist info and album art (better quality)
    try {
      const encodedArtist = encodeURIComponent(idolGroup);
      const mbResponse = await axios.get(
        `https://musicbrainz.org/ws/2/artist?query=${encodedArtist}+AND+tag:kpop&fmt=json&limit=1`,
        { 
          headers: { 
            'User-Agent': 'KpopMoodTracker/1.0 (sidakdeep2016@gmail.com)' 
          } 
        }
      );
      
      if (mbResponse.data.artists && mbResponse.data.artists.length > 0) {
        const artist = mbResponse.data.artists[0];
        const mbid = artist.id;
        
        // Get album covers which tend to be high quality
        await sleep(1100); // Respect rate limit
        const releasesResponse = await axios.get(
          `https://musicbrainz.org/ws/2/release?artist=${mbid}&limit=10&fmt=json`,
          { 
            headers: { 
              'User-Agent': 'KpopMoodTracker/1.0 (sidakdeep2016@gmail.com)' 
            } 
          }
        );
        
        if (releasesResponse.data.releases) {
          for (const release of releasesResponse.data.releases.slice(0, 5)) { // Limit to 5 releases
            try {
              await sleep(1100); // Respect rate limit
              const coverArtResponse = await axios.get(
                `https://coverartarchive.org/release/${release.id}`,
                { 
                  headers: { 
                    'User-Agent': 'KpopMoodTracker/1.0 (sidakdeep2016@gmail.com)' 
                  } 
                }
              );
              
              if (coverArtResponse.data && coverArtResponse.data.images) {
                const coverImages = coverArtResponse.data.images
                  .map(img => img.image);
                allImages = [...allImages, ...coverImages];
              }
            } catch (coverErr) {
              // Continue to next release if this one fails
              continue;
            }
          }
        }
      }
    } catch (mbErr) {
      console.error('Error fetching from MusicBrainz:', mbErr);
    }
    
    // 2. Use Spotify API as an alternative source for artist images
    if (allImages.length < 3) {
      try {
        // You'll need to set up Spotify auth in your utils/spotify.js
        const { getSpotifyToken } = require('../utils/spotify');
        const token = await getSpotifyToken();
        
        const spotifyResponse = await axios.get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(idolGroup)}&type=artist&limit=1`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        if (spotifyResponse.data && 
            spotifyResponse.data.artists && 
            spotifyResponse.data.artists.items && 
            spotifyResponse.data.artists.items.length > 0) {
          
          const artist = spotifyResponse.data.artists.items[0];
          if (artist.images && artist.images.length > 0) {
            const spotifyImages = artist.images.map(img => img.url);
            allImages = [...allImages, ...spotifyImages];
          }
        }
      } catch (spotifyErr) {
        console.error('Error fetching from Spotify:', spotifyErr);
      }
    }
    
    // 3. Last resort: Predefined images for popular K-pop groups
    if (allImages.length === 0) {
      const kpopImages = {
        'bts': [
          'https://i.scdn.co/image/ab6761610000e5eb5704a64c80dea3717407ff9c',
          'https://i.scdn.co/image/ab67616d0000b273a7b4a0a42359fa16c5d274ee'
        ],
        'blackpink': [
          'https://i.scdn.co/image/ab6761610000e5ebc9690bc1b5db548e36985dde',
          'https://i.scdn.co/image/ab67616d0000b27305c10f7d6bf1beac48800a0a'
        ],
        'twice': [
          'https://i.scdn.co/image/ab6761610000e5eb4566b2f87e2a5cde8f0570cc',
          'https://i.scdn.co/image/ab67616d0000b27362544f755987522519a27f86'
        ],
        'ateez': [
          'https://i.scdn.co/image/ab6761610000e5ebc5b0a7514f7816861c0a8853',
          'https://i.scdn.co/image/ab67616d0000b2731bf3d990fd4296e52026c801'
        ],
        'stray kids': [
          'https://i.scdn.co/image/ab6761610000e5ebca99fccf6faa2979cd923aff',
          'https://i.scdn.co/image/ab67616d0000b2736d5998e75b936ed459b719e2'
        ],
        'enhypen': [
          'https://i.scdn.co/image/ab6761610000e5eb0ced19449e6ea4c3277a7852',
          'https://i.scdn.co/image/ab67616d0000b273130dea5f2bf7089a574a4688'
        ],
        'nmixx': [
          'https://i.scdn.co/image/ab67616d0000b2738fcdaf2b80002963f4a1eaa2',
          'https://i.scdn.co/image/ab67616d0000b273afd87cf4e506be72bc605a28'
        ],
        'ive': [
          'https://i.scdn.co/image/ab6761610000e5eb77202c069526ca8ca11dadda',
          'https://i.scdn.co/image/ab67616d0000b27381b25857888ea4aabb704bed'
        ]
      };
      
      const groupName = idolGroup.toLowerCase();
      if (kpopImages[groupName]) {
        allImages = kpopImages[groupName];
      }
    }
    
    // Remove duplicate images
    const uniqueImages = [...new Set(allImages)];
    
    if (uniqueImages.length > 0) {
      res.json(uniqueImages);
    } else {
      res.status(404).json({ error: 'No images found for this idol group.' });
    }
  } catch (error) {
    console.error('Error fetching idol images:', error);
    res.status(500).json({ error: 'Failed to fetch idol images' });
  }
});

module.exports = router;