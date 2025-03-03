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
    const searchQuery = `k-pop ${mood}`; // Combine "k-pop" with the mood
    const response = await spotifyApi.searchPlaylists(searchQuery, { limit: 1 }); // Fetch only 1 playlist
    return response.body.playlists.items[0]; // Return the first playlist
  } catch (err) {
    console.error('Error fetching playlist:', err);
    return null; // Return null if an error occurs
  }
};

module.exports = { authenticateSpotify, getPlaylistByMood };
