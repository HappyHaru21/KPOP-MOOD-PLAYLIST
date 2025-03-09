import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Quicksand:wght@400;500;700&family=Nunito:wght@400;600;800&display=swap');
  
  :root {
    --pink-primary: #FF79C6;
    --pink-secondary: #FFB7D5;
    --pink-light: #FFE6F2;
    --purple-accent: #B388FF;
    --blue-accent: #80D8FF;
    --yellow-accent: #FFE66D;
    --mint-accent: #A4F9C8;
    --text-dark: #333333;
    --text-light: #FFFFFF;
    --background: #FFFAFD;
    --card-gradient: linear-gradient(145deg, #ffffff, #fff4fa);
    --box-shadow: 0 8px 20px rgba(255, 183, 213, 0.2);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Nunito', 'Poppins', sans-serif;
    background: linear-gradient(135deg, var(--background) 0%, var(--pink-light) 100%);
    margin: 0;
    padding: 0;
    color: var(--text-dark);
    min-height: 100vh;
    line-height: 1.6;
  }

  h1, h2, h3 {
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    color: var(--pink-primary);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    letter-spacing: 0.5px;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    background: linear-gradient(to right, var(--pink-primary), var(--purple-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    
    &::after {
      content: "✨";
      position: absolute;
      font-size: 1.5rem;
      margin-left: 0.5rem;
      -webkit-text-fill-color: var(--yellow-accent);
      text-shadow: 0 0 5px rgba(255, 230, 109, 0.7);
    }
  }

  button {
    background: linear-gradient(45deg, var(--pink-primary), var(--purple-accent));
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 4px 15px rgba(255, 121, 198, 0.4);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 7px 20px rgba(255, 121, 198, 0.6);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 0 3px 8px rgba(255, 121, 198, 0.4);
    }
    
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: 0.5s;
    }
    
    &:hover::before {
      left: 100%;
    }
  }

  input, textarea {
    width: 100%;
    padding: 14px 18px;
    margin: 12px 0;
    border: 2px solid var(--pink-secondary);
    border-radius: 20px;
    font-family: 'Poppins', sans-serif;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: var(--purple-accent);
      box-shadow: 0 0 12px rgba(179, 136, 255, 0.5);
      transform: translateY(-2px);
    }
    
    &::placeholder {
      color: #b8b8b8;
      font-style: italic;
      opacity: 0.8;
    }
  }

  /* Navbar styling */
  nav {
    background: linear-gradient(90deg, var(--pink-primary), var(--purple-accent));
    padding: 15px 0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  nav ul {
    display: flex;
    justify-content: center;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  nav ul li {
    margin: 0 20px;
    position: relative;
  }

  nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    position: relative;
    padding: 8px 0;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background-color: var(--yellow-accent);
      transition: width 0.3s ease;
      border-radius: 3px;
      box-shadow: 0 0 5px rgba(255, 230, 109, 0.5);
    }
    
    &:hover:after {
      width: 100%;
    }
    
    &:hover {
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
    }
  }

  /* Containers */
  .container {
    max-width: 1200px;
    margin: 30px auto;
    padding: 25px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 25px;
    box-shadow: 0 10px 30px rgba(255, 183, 213, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
    }
  }

  /* Form styling */
  form {
    display: flex;
    flex-direction: column;
    gap: 18px;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: var(--card-gradient);
    border-radius: 20px;
    box-shadow: var(--box-shadow);
  }

  /* Card styling for playlists */
  .playlist-card {
    background: linear-gradient(145deg, white, var(--pink-light));
    border-radius: 20px;
    padding: 25px;
    margin-top: 25px;
    box-shadow: 0 10px 25px rgba(255, 121, 198, 0.2);
    border: 2px solid var(--pink-secondary);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;

    &::before {
      content: "💿";
      position: absolute;
      top: -15px;
      right: -15px;
      font-size: 5rem;
      opacity: 0.1;
      transform: rotate(15deg);
    }

    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 15px 35px rgba(255, 121, 198, 0.3);
    }
  }

  /* Mood tracker specific styling */
  .mood-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 15px;
    margin: 25px 0;
  }

  .mood-item {
    background: white;
    border: 2px solid var(--pink-secondary);
    border-radius: 18px;
    padding: 18px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
    
    &::after {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      transform: rotate(45deg);
      opacity: 0;
      transition: 0.5s;
    }

    &:hover, &.selected {
      background-color: var(--pink-light);
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 8px 15px rgba(255, 121, 198, 0.3);
    }
    
    &:hover::after {
      opacity: 1;
      left: 100%;
    }
    
    &.selected {
      border-color: var(--purple-accent);
      border-width: 3px;
      font-weight: bold;
      color: var(--pink-primary);
    }
  }

  /* Analytics styling */
  .analytics-container {
    background: var(--card-gradient);
    border-radius: 20px;
    padding: 25px;
    box-shadow: var(--box-shadow);
    margin: 25px 0;
    border: 1px solid rgba(255, 183, 213, 0.3);
  }
    
  .playlist-content {
    display: flex;
    align-items: center;
    gap: 25px;
  }

  .playlist-cover {
    flex-shrink: 0;
    position: relative;
    
    &::before {
      content: "";
      position: absolute;
      top: 10px;
      left: 10px;
      right: -10px;
      bottom: -10px;
      border-radius: 10px;
      background: linear-gradient(45deg, var(--mint-accent), var(--purple-accent));
      z-index: -1;
      opacity: 0.5;
    }
  }

  .playlist-image {
    max-width: 150px;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(255, 121, 198, 0.5);
    border: 3px solid white;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    
    &:hover {
      transform: scale(1.08) rotate(2deg);
    }
  }

  .playlist-info {
    flex-grow: 1;
  }

  .playlist-info h4 {
    margin-top: 0;
    font-size: 1.7rem;
    background: linear-gradient(to right, var(--pink-primary), var(--purple-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.7px;
    position: relative;
    
    &::after {
      content: "🎵";
      position: absolute;
      font-size: 1.2rem;
      margin-left: 10px;
      -webkit-text-fill-color: initial;
    }
  }
  
  /* Home component specific styles */
  .home-container {
    display: flex;
    min-height: 100vh;
  }

  /* Sidebar styling */
  .sidebar {
    width: 240px;
    background: rgba(255, 255, 255, 0.95);
    border-right: 2px solid var(--pink-secondary);
    overflow-y: auto;
    max-height: 100vh;
    position: sticky;
    top: 0;
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 100;
    backdrop-filter: blur(10px);
    
    /* Hide scrollbar but maintain functionality */
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .sidebar::-webkit-scrollbar {
    display: none;
  }

  .sidebar.closed {
    width: 60px;
    overflow: hidden;
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 2px solid var(--pink-secondary);
    background: linear-gradient(135deg, var(--pink-light), white);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .sidebar h2 {
    margin: 0;
    font-size: 1.3rem;
    color: var(--pink-primary);
    position: relative;
    
    &::after {
      content: "🎤";
      position: absolute;
      font-size: 0.9rem;
      top: 0;
      margin-left: 6px;
    }
  }

  .toggle-button {
    background: linear-gradient(45deg, var(--pink-primary), var(--purple-accent));
    color: white;
    border: none;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    font-size: 0.9rem;
  }

  .toggle-button:hover {
    transform: rotate(180deg) scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  .sidebar.closed .sidebar-header h2 {
    display: none;
  }

  .group-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px;
  }

  .group-list button {
    background: white;
    border: 2px solid var(--pink-secondary);
    border-radius: 12px;
    padding: 10px 12px;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    font-size: 1rem;
    color: var(--text-dark);
    box-shadow: none;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: "💫";
      position: absolute;
      left: -25px;
      opacity: 0;
      transition: all 0.3s ease;
    }
  }

  .group-list button:hover {
    background: linear-gradient(135deg, #fff9fc, var(--pink-light));
    border-color: var(--pink-primary);
    transform: translateX(8px);
    padding-left: 20px;
    box-shadow: 0 4px 10px rgba(255, 121, 198, 0.25);
    
    &::before {
      left: 5px;
      opacity: 1;
    }
  }

  .group-list button.selected {
    background: linear-gradient(to right, var(--pink-light), #f0e6ff);
    border: 3px solid var(--pink-primary);
    font-weight: bold;
    color: var(--pink-primary);
    box-shadow: 0 4px 12px rgba(255, 121, 198, 0.35);
    padding-left: 25px;
    
    &::before {
      left: 5px;
      opacity: 1;
    }
  }

  .main-content {
    flex: 1;
    padding: 1.5rem 2.5rem;
    animation: fadeIn 0.5s ease-out forwards;
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  }

  .idol-images {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .idol-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    border: 3px solid white;
    
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        0deg,
        rgba(179, 136, 255, 0.3) 0%,
        rgba(255, 121, 198, 0.3) 100%
      );
      border-radius: 12px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  }

  .idol-image:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    
    &::after {
      opacity: 1;
    }
  }

  .loading-spinner {
    margin: 3rem auto;
    text-align: center;
    font-style: italic;
    color: var(--pink-primary);
    font-size: 1.2rem;
    position: relative;
    
    &::before, &::after {
      content: "✨";
      position: relative;
      font-size: 1rem;
      margin: 0 10px;
      display: inline-block;
      animation: spin 2s linear infinite;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  }

  .error-message {
    color: #d32f2f;
    padding: 1.2rem;
    background-color: #ffebee;
    border-radius: 12px;
    margin: 1.2rem 0;
    border-left: 5px solid #d32f2f;
    font-weight: 500;
  }

  .instruction {
    margin-top: 3rem;
    text-align: center;
    color: #666;
    font-size: 1.3rem;
    padding: 2rem;
    background: var(--card-gradient);
    border-radius: 20px;
    box-shadow: var(--box-shadow);
    position: relative;
    
    &::before, &::after {
      content: "💕";
      position: relative;
      margin: 0 10px;
      font-size: 1.2rem;
    }
  }
  
  /* Custom scrollbar for the main content */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.5);
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(var(--pink-secondary), var(--purple-accent));
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(var(--pink-primary), var(--purple-accent));
  }
`;

export default GlobalStyles;