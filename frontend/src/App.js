import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MoodTracker from './components/MoodTracker';
import MoodAnalytics from './components/MoodAnalytics';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracker" element={<MoodTracker />} />
          <Route path="/analytics" element={<MoodAnalytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;