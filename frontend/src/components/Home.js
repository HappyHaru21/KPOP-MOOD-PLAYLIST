import React, { useState } from 'react';
import axios from 'axios';
// Import icons for the toggle button - you'll need to install react-icons
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Home() {
  const [selectedIdol, setSelectedIdol] = useState(null);
  const [idolImages, setIdolImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // New state for sidebar

  // Expanded list of top 70 K-pop groups
  const idols = [
    'aespa', 'after school', 'astro', 'ateez', 'babymonster', 
    'bambam', 'bigbang', 'blackpink', 'brave girls', 'btob',
    'bts', 'cix', 'cravity', 'day6', 'dreamcatcher',
    'enhypen', 'everglow', 'exid', 'exo', 'fromis_9',
    'g-dragon', 'girls generation', 'gidle', 'gfriend', 'got7',
    'golden child', 'highlights', 'hot issue', 'illit', 'itzy',
    'iu', 'ive', 'iz*one', 'jay park', 'kard',
    'kep1er', 'le sserafim', 'loona', 'mamamoo', 'monsta x',
    'nct', 'nct 127', 'nct dream', 'nmixx', 'nuest',
    'oneus', 'onf', 'pentagon', 'purple kiss', 'red velvet',
    'riize', 'seventeen', 'shinee', 'sistar', 'stayc',
    'stray kids', 'super junior', 'super m', 'taeyeon', 'the boyz',
    'tomorrow x together', 'treasure', 'twice', 'txt', 'verivery',
    'victon', 'wayv', 'winner', 'wjsn', 'zico'
  ]; 

  const fetchIdolImages = async (idolGroup) => {
    setLoading(true);
    setError(null);
    setIdolImages([]);
    
    try {
      const res = await axios.get(`/api/moods/idols/images/${idolGroup}`);
      
      if (res.data && res.data.length > 0) {
        setIdolImages(res.data);
      } else {
        setError('No images found for this group');
      }
    } catch (err) {
      console.error('Error fetching idol images:', err);
      setError('Failed to fetch idol images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="home-container">
      {/* Collapsible Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>K-pop Groups</h2>
          <button 
            className="toggle-button" 
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
        
        {sidebarOpen && (
          <div className="group-list">
            {idols.map((idol) => (
              <button 
                key={idol} 
                onClick={() => { setSelectedIdol(idol); fetchIdolImages(idol); }}
                className={selectedIdol === idol ? 'selected' : ''}
              >
                {idol.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main content area */}
      <div className="main-content">
        <h1>Welcome to K-pop Mood Tracker</h1>
        
        {selectedIdol ? (
          <div className="idol-content">
            <h3>{selectedIdol.toUpperCase()} Images</h3>
            
            {loading && <div className="loading-spinner">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            
            {!loading && !error && (
              <div className="idol-images">
                {idolImages.map((imgSrc, index) => (
                  <img 
                    key={index} 
                    src={imgSrc} 
                    alt={`${selectedIdol} image`} 
                    className="idol-image" 
                    onError={(e) => {e.target.style.display = 'none'}}
                  />
                ))}
                {idolImages.length === 0 && !loading && !error && (
                  <p>No images available for this group.</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="instruction">
            <p>Select a K-pop group from the sidebar to view their images</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;