# KPOP Mood Tracker

KPOP Mood Tracker is a web application that allows users to track their moods and get K-pop playlist recommendations based on their current mood. Additionally, users can view images of their favorite K-pop idols and analyze their mood trends over time.

## Features

- **Mood Tracking**: Users can log their moods and add notes about their day.
- **Playlist Recommendations**: Get K-pop playlist recommendations based on the logged mood.
- **Idol Images**: View images of popular K-pop idols.
- **Mood Analytics**: Visualize mood trends over time using charts.

## Technologies Used

- **Frontend**: React, Styled-Components, Chart.js
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **APIs**: Spotify API, MusicBrainz API, Cover Art Archive API, Last.fm API
- **Testing**: Jest, Supertest

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Spotify Developer Account (for API credentials)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/kpop-mood-tracker.git
   cd kpop-mood-tracker/KPOP-MOOD-PLAYLIST
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   npm install
   cd frontend
   npm install
   cd ..
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```plaintext
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Create a `.env.development` file in the `frontend` directory:
   ```plaintext
   WDS_SOCKET_HOST=localhost
   WDS_SOCKET_PORT=3000
   HOST=127.0.0.1
   ```

### Running the Application

1. Start the backend server:
   ```bash
   npm run server
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`.

### Running Tests

To run the tests, use the following command:
```bash
npm test
```

## Project Structure

```
KPOP-MOOD-PLAYLIST/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── .env.development
│   ├── package.json
│   └── ...
├── models/
│   ├── Mood.js
│   └── ...
├── routes/
│   ├── moods.js
│   └── ...
├── utils/
│   ├── spotify.js
│   └── ...
├── server.js
├── .env
├── package.json
└── ...
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Spotify API](https://developer.spotify.com/documentation/web-api/)
- [MusicBrainz API](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2)
- [Cover Art Archive API](https://coverartarchive.org/)
- [Last.fm API](https://www.last.fm/api)
````