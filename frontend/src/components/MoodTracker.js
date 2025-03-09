import React, { useState } from 'react';
import axios from 'axios';

function MoodTracker() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [playlist, setPlaylist] = useState(null);
  
  const moodOptions = ['happy', 'excited', 'calm', 'neutral', 'sad', 'angry', 'fearful'];

  const submitMood = async (e) => {
    e.preventDefault();
    try {
      // Save mood and note to database
      await axios.post('/api/moods', { mood, note });
      
      console.log(`Fetching playlist for mood: ${mood}`);
      // Fetch playlist based on mood
      const res = await axios.get(`/api/moods/playlist/${mood}`);
      console.log("Playlist data:", res.data);
      setPlaylist(res.data);
    } catch (err) {
      console.error("Error fetching playlist:", err);
      alert(`Couldn't find K-pop recommendations for "${mood}" mood. Try another mood!`);
    }
  };

  return (
    <div>
      <h2>✨ How are you feeling today? ✨</h2>
      
      <div className="mood-grid">
        {moodOptions.map((option) => (
          <div 
            key={option}
            className={`mood-item ${mood === option ? 'selected' : ''}`}
            onClick={() => setMood(option)}
          >
            {option}
          </div>
        ))}
      </div>
      
      <form onSubmit={submitMood}>
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="Or type your mood here..."
          required
        />
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about your day (optional)"
          rows="4"
        ></textarea>
        <button type="submit">Find My K-pop Playlist! 💕</button>
      </form>

      {playlist && (
        <div className="playlist-card">
          <h3>✨ Your K-pop Playlist ✨</h3>
          <div className="playlist-content">
            {playlist.images && playlist.images.length > 0 && (
              <div className="playlist-cover">
                <img 
                  src={playlist.images[0].url} 
                  alt={`${playlist.name}`}
                  className="playlist-image"
                />
              </div>
            )}
            <div className="playlist-info">
              <h4>{playlist.name}</h4>
              <p>{playlist.description || "K-pop songs to match your mood!"}</p>
              
              {/* Display tracks if available */}
              {playlist.tracks && playlist.tracks.length > 0 && (
                <div className="track-list">
                  <h5>Tracks:</h5>
                  <ul>
                    {playlist.tracks.map((track, index) => (
                      <li key={track.id || index}>
                        {track.name} - {track.artists.map(artist => artist.name).join(', ')}
                        {track.preview_url && (
                          <audio controls>
                            <source src={track.preview_url} type="audio/mpeg" />
                          </audio>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {playlist.external_urls && (
                <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  <button>Open in Spotify</button>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodTracker;
