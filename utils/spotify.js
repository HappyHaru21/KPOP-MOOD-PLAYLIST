const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Authenticate with Spotify using Client Credentials Flow
const authenticateSpotify = async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('Spotify authenticated successfully!');
  } catch (err) {
    console.error('Error authenticating with Spotify:', err);
  }
};

// Function to get a playlist based on mood
const getPlaylistByMood = async (mood) => {
  try {
    // Map moods to search queries for better results
    const moodQueries = {
      happy: "happy upbeat k-pop",
      sad: "sad emotional k-pop ballad",
      excited: "energetic k-pop dance",
      calm: "relaxing k-pop chill",
      angry: "intense k-pop",
      fearful: "dramatic k-pop",
      neutral: "popular k-pop playlist"
    };

    // Use mapped query if available, otherwise just combine "k-pop" with the mood
    const query = moodQueries[mood.toLowerCase()] || `k-pop ${mood}`;
    
    console.log(`Searching for playlists with query: "${query}"`);
    
    // Search for top 5 playlists matching the query
    const response = await spotifyApi.searchPlaylists(query, { limit: 5 });
    
    // Check if we got valid results
    if (!response.body.playlists || !response.body.playlists.items || response.body.playlists.items.length === 0) {
      console.log('No playlists found for the query');
      return null;
    }
    
    // Get all valid playlists from the response
    const playlists = response.body.playlists.items.filter(playlist => playlist !== null);
    
    if (playlists.length === 0) {
      console.log('No valid playlists after filtering');
      return null;
    }
    
    // Select a random playlist from the results
    const randomIndex = Math.floor(Math.random() * playlists.length);
    console.log(`Found ${playlists.length} playlists, randomly selected index ${randomIndex}`);
    
    return playlists[randomIndex];
  } catch (err) {
    console.error('Error searching playlists:', err);
    return null;
  }
};



// Function to get a Spotify token for external API requests
const getSpotifyToken = async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    return data.body['access_token']; // Return the token directly
  } catch (err) {
    console.error('Error getting Spotify token:', err);
    throw new Error('Failed to obtain Spotify access token');
  }
};

module.exports = { authenticateSpotify, getPlaylistByMood, getSpotifyToken };